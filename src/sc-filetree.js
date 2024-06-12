import { html, css, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import ScElement from './ScElement.js';
import './utils/sc-context-menu.js';
import './sc-text.js';

// note, colors in sublime filetree
// bg: #21262a
// hover: #282d33
// active: #383f47

class ScFileTree extends ScElement {
  static properties = {
    value: {
      type: Object
    },
    editable: {
      type: Boolean,
      reflect: true,
    },
    _contextMenuInfos: {
      type: Object,
      state: true,
    },
    _updateTreeInfos: {
      type: Object,
      state: true,
    },
  };

  static styles = css`
    :host {
      display: flex;
      box-sizing: border-box;
      font-size: 0 !important;
      flex-direction: row;
      display: inline-block;
      overflow: auto;
      color: #cccccc;
      padding: 10px 0;
      width: 300px;
      height: 150px;
      margin: 0;
      padding: 0;
      position: relative;

      background-color: var(--sc-color-primary-2);
      --sc-filetree-hover-background-color: var(--sc-color-primary-3);
      --sc-filetree-active-background-color: var(--sc-color-primary-4);
    }

    :host([hidden]) {
      display: none
    }

    ul {
      font-size: 11px;
      list-style: none;
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

    li {
      cursor: default;
      position: relative;
      min-height: 22px;
      vertical-align: middle;
    }

    li span {
      height: 22px;
      line-height: 22px;
      display: inline-block;
    }

    li .hover, li .hover-bg {
      position: absolute;
      top: 0;
      left: 0;
      height: 22px;
      width: 100%;
      background-color: transparent;
      z-index: 0;
    }

    li .content {
      position: relative;
      z-index: 1;
    }

    li .hover {
      z-index: 2;
    }

    li.trigger-context-menu .hover + .hover-bg {
      background-color: var(--sc-filetree-hover-background-color);
    }

    li .hover:hover + .hover-bg {
      background-color: var(--sc-filetree-hover-background-color);
    }

    li.active > .hover-bg, li.active .hover:hover + .hover-bg {
      background-color: var(--sc-filetree-active-background-color);
    }

    li.directory + li {
      display: none;
    }

    li.open + li {
      display: block;
    }

    li.directory::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 7px;
      font-size: 0;
      width: 0px;
      height: 0px;
      border-left: 7px solid white;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      z-index: 1;
    }

    li.directory.open::before {
      top: 9px;
      border-top: 6px solid white;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    }

    /** prevent hover and blur on list */
    .capture-panel {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 9;
    }

    sc-context-menu {
      z-index: 11;
    }

    sc-text {
      width: 100%;
      position: absolute;
      z-index: 10;
      left: 0;
      bottom: 0;
    }
  `;

  get editable() {
    return this._editable;
  }

  set editable(value) {
    const oldValue = this._editable;
    // reset everything
    this._contextMenuInfos = null;
    this._updateTreeInfos = null;
    this._editable = value;

    this.requestUpdate('editable', oldValue);
  }

  constructor() {
    super();

    // when editable
    this._contextMenuInfos = null;
    this._updateTreeInfos = null;
    this._editable = false;

    this.value = null;
    this.editable = false;

    // store the active "highlighted" element, directly modified from code, no state
    this._currentActive = null;
  }

  _renderNode(node, depth) {
    if (!node) {
      return nothing;
    }

    const depthPadding = 16;
    const paddingLeft = 6;
    const classes = {
      directory: (node.type === 'directory'),
      open: (depth === 0),
    }

    return html`
      <li
        style="text-indent: ${depth * depthPadding + paddingLeft}px;"
        class=${classMap(classes)}
        @click=${e => this._onItemClick(e, node)}
        @contextmenu=${e => this._showContextMenu(e, node)}
      >
        <div class="hover"></div>
        <div class="hover-bg"></div><!-- must be after .hover -->
        <div class="content">
          <span style="
            text-indent: ${node.type === 'directory' ? depthPadding : 0}px;
          ">${node.name}</span>
        </div>
      </li>
      ${node.type === 'directory' ?
        html`
          <li>
            <ul>
              ${node.children.map(child => this._renderNode(child, depth + 1))}
            </ul>
          </li>
        `
      : nothing}
    `
  }

  render() {
    return html`
      ${this._contextMenuInfos !== null
        ? html`
            <div class="capture-panel"></div>
            <sc-context-menu
              .event=${this._contextMenuInfos.event}
              .options=${this._contextMenuInfos.options}
              @close=${this._hideContextMenu}
              @input=${this._onContextMenuCommand}
            ></sc-context-menu>`
        : nothing
      }
      ${this._updateTreeInfos !== null
        ? html`
            <sc-text
              editable
              @input=${e => e.stopPropagation()}
              @change=${this._onTreeChange}
            >${this._updateTreeInfos.command === 'rename'
              ? this._updateTreeInfos.node.name
              : ''
            }</sc-text>
        `
        : nothing
      }
      <ul>
        ${this._renderNode(this.value, 0)}
      </ul>
    `
  }

  updated() {
    super.updated();

    if (this._updateTreeInfos) {
      // we need to wait for the input to be rendered
      setTimeout(() => this.shadowRoot.querySelector('sc-text').focus(), 0);
    }
  }

  _onItemClick(e, node) {
    e.stopPropagation();

    if (node.type === 'directory') {
      e.currentTarget.classList.toggle('open');
    }

    this._setActive(e.currentTarget);

    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: node },
    });

    this.dispatchEvent(event);
  }

  _onTreeChange(e) {
    // do not propagate change event from sc-text
    e.stopPropagation();

    const pathname = e.detail.value;

    const { node, command } = this._updateTreeInfos;
    const filename = e.detail.value.trim().replace('\n', '');
    const value = { command };

    switch (command) {
      case 'mkdir':
      case 'writeFile': {
        value.pathname = `${node.path}/${filename}`;
        break;
      }
      case 'rename': {
        value.oldPathname = node.path;
        value.newPathname = node.path.replace(node.name, pathname);
        break;
      }
    }

    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value },
    });

    this.dispatchEvent(event);
    this._updateTreeInfos = null;
  }

  _onContextMenuCommand(e) {
    // note that context menu is closed through the close event just after
    // this method is called, so `this._contextMenuInfos` is still valid and
    // will be reset in the `_hideContextMenu` method
    //
    // do not propagate input event from context menu
    e.stopPropagation();

    // set target event as active
    this._setActive(this._contextMenuInfos.$el);

    const command = e.detail.value;

    switch (command) {
      case 'rm': {
        const pathname = this._contextMenuInfos.node.path;
        const value = { command, pathname };
        const event = new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value },
        });

        this.dispatchEvent(event);
        break;
      }
      case 'mkdir':
      case 'writeFile':
      case 'rename': {
        const { node } = this._contextMenuInfos;
        // show text input
        this._updateTreeInfos = { node, command };
      }
    }
  }

  _setActive($el) {
    if (this._currentActive) {
      this._currentActive.classList.toggle('active');
    }

    $el.classList.toggle('active');
    this._currentActive = $el;
  }

  _showContextMenu(e, node) {
    e.preventDefault();
    e.stopPropagation();

    // if not editable
    if (!this.editable) {
      return;
    }

    // cannot have two context menu
    if (this._contextMenuInfos !== null) {
      return;
    }

    const $el = e.currentTarget;
    let options = null;

    // follow soundworks plugin API

    if (node.type === 'directory') {
      options = [
        { action: 'writeFile', label: 'New File' },
        { action: 'rename', label: 'Rename...' },
        { action: 'mkdir', label: 'New Folder...' },
        { action: 'rm', label: 'Delete Folder' },
      ];
    } else {
      options = [
        { action: 'rename', label: 'Rename...' },
        { action: 'rm', label: 'Delete File' },
      ];
    }

    $el.classList.add('trigger-context-menu');
    this._contextMenuInfos = { event: e, $el, node, options };
  }

  _hideContextMenu() {
    const $el = this._contextMenuInfos.$el;

    $el.classList.remove('trigger-context-menu');
    this._contextMenuInfos = null
  }
}

if (customElements.get('sc-filetree') === undefined) {
  customElements.define('sc-filetree', ScFileTree);
}

export default ScFileTree;
