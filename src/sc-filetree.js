import { html, css, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { isString, isFunction } from '@ircam/sc-utils';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';
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
    _contextMenuCommand: {
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

      background-color: var(--sc-color-primary-1);
      --sc-filetree-hover-background-color: var(--sc-color-primary-2);
      --sc-filetree-active-background-color: var(--sc-color-primary-3);
      --sc-filetree-keyboard-selected-outline-color: var(--sc-color-primary-4);
    }

    :host([hidden]) {
      display: none;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
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
      box-sizing: border-box;
    }

    /* empty folder */
    li.sub-directory {
      min-height: 0;
    }

    li span {
      height: 22px;
      line-height: 22px;
      display: inline-block;
    }

    li .hover, li .hover-bg, li .keyboard-selection {
      position: absolute;
      top: 0;
      left: 0;
      height: 22px;
      width: 100%;
      background-color: transparent;
      z-index: 0;
      box-sizing: border-box;
    }

    li .content {
      position: relative;
      z-index: 1;
    }

    li .hover {
      z-index: 2;
    }

    li .hover:hover + .hover-bg {
      background-color: var(--sc-filetree-hover-background-color);
    }

    li.trigger-context-menu .hover + .hover-bg {
      background-color: var(--sc-filetree-hover-background-color);
    }

    li.active > .hover-bg,
    li.active .hover:hover + .hover-bg {
      background-color: var(--sc-filetree-active-background-color);
    }

    li .keyboard-selection {
      display: none;
      border: 1px dotted var(--sc-filetree-keyboard-selected-outline-color);
    }
    li.keyboard-selected .keyboard-selection {
      display: block;
    }

    li.sub-directory {
      display: none;
    }

    li.sub-directory.open {
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
      z-index: 10;
      height: 22px;
    }

    sc-text.errored {
      color: var(--sc-color-secondary-3);
    }
  `;

  get editable() {
    return this._editable;
  }

  set editable(value) {
    const oldValue = this._editable;
    // reset everything
    this._contextMenuInfos = null;
    this._contextMenuCommand = null;
    this._editable = value;

    this.requestUpdate('editable', oldValue);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    // deep copy value first to make ure we don't modify twice the same reference
    value = JSON.parse(JSON.stringify(value));

    (function sanitize(node) {
      if (!isString(node.path)) {
        throw new Error(`Cannot set 'value' of sc-filetree: Nodes should have a valid 'path' key`);
      }

      if (!isString(node.name)) {
        throw new Error(`Cannot set 'value' of sc-filetree: Node (${node.path}) should have a valid 'name' key`);
      }

      if (!['directory', 'file'].includes(node.type)) {
        throw new Error(`Cannot set 'value' of sc-filetree: Node (${node.path}) should have a valid 'type' key`);
      }

      if (node.type === 'directory' && !Array.isArray(node.children)) {
        throw new Error(`Cannot set 'value' of sc-filetree: Node (${node.path}) with type 'directory' should have a valid 'children' key`);
      }

      // copy a sanitized copy of self into self for propagation in events
      // avoid cpoying children as this could tend to be overkill memory wize
      // node.raw = JSON.parse(JSON.stringify(node));
      const raw = {};

      for (let key in node) {
        if (key !== 'children') {
          raw[key] = node[key];
        }
      }

      node.raw = raw;

      if (node.children) {
        node.children.map(child => sanitize(child));
      }
    }(value));

    (function sort(node) {
      if (!node.children) {
        return;
      }

      node.children.sort((a, b) => {
        if (a.type === 'directory' && b.type === 'file') {
          return -1;
        } else if (a.type === 'file' && b.type === 'directory') {
          return 1;
        } else {
          return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        }
      });

      // add pointers to sorted parent and siblings
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        child.parent = node;
        child.prev = node.children[i - 1] || null;
        child.next = node.children[i + 1] || null;

        sort(child);
      }
    }(value));

    // root has no siblings or parent
    value.parent = null;
    value.prev = null;
    value.next = null;

    this._value = value;
  }

  constructor() {
    super();

    // when editable
    this._contextMenuInfos = null;
    this._contextMenuCommand = null;
    this._editable = false;
    this._value = null;

    this.editable = false;

    // store the active "highlighted" element, directly modified from code, no state
    this._currentActive = null;
    this._openDirectories = new Set();
    this._inputError = false;

    // @todo - handle arrows to navigate, open/close dir, and trigger rename
    new KeyboardController(this, {
      filterCodes: ['Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space'],
      callback: this._onKeyboardEvent.bind(this),
    });
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
      <ul>
        ${this._renderNode(this._value, 0)}
      </ul>
    `
  }

  async updated(changedProperties) {
    super.updated();

    // @todo - implement disabled behavior
    this.setAttribute('tabindex', this._tabindex);

    if (this._contextMenuCommand) {
      await this.updateComplete; // sc-text input must be completely rendered to be focused
      this.shadowRoot.querySelector('sc-text').focus();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // add top level directory to opened directories
    this._openDirectories.add(this._value.path);
    this._tabindex = this.getAttribute('tabindex') || 0;
  }

  _isOpenDirectory(node) {
    return node.type === 'directory' && this._openDirectories.has(node.path);
  }

  _renderNode(node, depth) {
    if (!node) {
      return nothing;
    }

    const depthPadding = 16;
    const paddingLeft = 10;
    const dirClasses = {
      directory: (node.type === 'directory'),
      open: this._isOpenDirectory(node),
    }

    const subDirClasses = {
      'sub-directory': true,
      open: this._isOpenDirectory(node),
    }

    return html`
      <li
        style="padding-left: ${depth * depthPadding + paddingLeft}px;"
        class=${classMap(dirClasses)}
        @click=${e => this._onItemClick(e, node)}
        @contextmenu=${e => this._showContextMenu(e, node)}
        .node=${node}
        path=${node.path}
      >
        ${this._contextMenuCommand !== null && this._contextMenuCommand.node === node && this._contextMenuCommand.command === 'rename'
          ? html`
            <sc-text
              editable
              @input=${this._checkFilename}
              @change=${this._finalizeContextMenuCommand}
            >${this._contextMenuCommand.node.name}</sc-text>
          `
          : html`
            <div class="hover"></div>
            <div class="hover-bg"></div><!-- must be after .hover -->
            <div class="keyboard-selection"></div>
            <div class="content">
              <span style="padding-left: ${node.type === 'directory' ? depthPadding : 0}px;">${node.name}</span>
            </div>
          `
        }
      </li>
      ${node.type === 'directory' ?
        html`
          <li class=${classMap(subDirClasses)}>
            <ul>
              ${this._contextMenuCommand !== null && this._contextMenuCommand.node === node && this._contextMenuCommand.command !== 'rename'
                ? html`
                  <li style="padding-left: ${(depth + 1) * depthPadding + paddingLeft}px;">
                    <sc-text
                      editable
                      @input=${this._checkFilename}
                      @change=${this._finalizeContextMenuCommand}
                    ></sc-text>
                  </li>
                `
                : nothing
              }
              ${node.children.map(child => this._renderNode(child, depth + 1))}
            </ul>
          </li>
        `
      : nothing}
    `
  }

  _onKeyboardEvent(e) {
    e.stopPropagation();

    if (e.type === 'keyup') {
      switch (e.code) {
        case 'Escape': {
          if (this._contextMenuCommand !== null) {
            this._contextMenuCommand = null;
            this.requestUpdate();
          }
          break;
        }
      }
    }

    if (e.type === 'keydown') {
      switch (e.code) {
        case 'ArrowUp': {
          const current =  this._currentKeyboardActive.node;
          let prev = current.prev || current.parent;

          // we have reached root node abort
          if (prev === null) {
            return;
          }

          // if prev is a directory, it is opened and we come from its outside
          while (
            prev.type === 'directory'
            && this._openDirectories.has(prev.path)
            && prev.children.length > 0
            && !prev.children.includes(current)
          ) {
            prev = prev.children[prev.children.length - 1];
          }

          // retrieve corresponding DOM element
          const $el = this.shadowRoot.querySelector(`[path="${prev.path}"]`);

          this._currentKeyboardActive.classList.remove('keyboard-selected');
          this._currentKeyboardActive = $el;
          this._currentKeyboardActive.classList.add('keyboard-selected');
          break;
        }
        case 'ArrowDown': {
          const current =  this._currentKeyboardActive.node;
          let next = null;

          if (
            this._isOpenDirectory(current)
            && current.children.length > 0
          ) {
            next = current.children[0]; // enter into folder
          } else if (current.next) {
            next = current.next // next sibling
          } else { // exit folder
            let parent = current.parent;
            next = parent.next;

            while (parent && next === null) {
              parent = parent.parent;

              if (parent) {
                next = parent.next;
              }
            }
          }

          if (next === null) {
            return;
          }

          const $el = this.shadowRoot.querySelector(`[path="${next.path}"]`);

          this._currentKeyboardActive.classList.remove('keyboard-selected');
          this._currentKeyboardActive = $el;
          this._currentKeyboardActive.classList.add('keyboard-selected');
          break;
        }
        case 'ArrowLeft': {
          const node = this._currentKeyboardActive.node;
          if (node.type === 'directory' && this._openDirectories.has(node.path)) {
            this._openDirectories.delete(node.path);
            this.requestUpdate();
          }
          break;
        }
        case 'ArrowRight': {
          const node = this._currentKeyboardActive.node;
          if (node.type === 'directory' && !this._openDirectories.has(node.path)) {
            this._openDirectories.add(node.path);
            this.requestUpdate();
          }
          break;
        }
        case 'Enter': {
          if (!this._currentKeyboardActive) {
            return;
          }

          const node = this._currentKeyboardActive.node;
          this._contextMenuCommand = { node, command: 'rename' };
          break;
        }
        case 'Space': {
          if (this._currentKeyboardActive) {
            this._selectTarget(this._currentKeyboardActive);
          }
          break;
        }
      }

    }
  }

  _onItemClick(e, node) {
    e.stopPropagation();

    if (node.type === 'directory') {
      if (this._openDirectories.has(node.path)) {
        this._openDirectories.delete(node.path);
      } else {
        this._openDirectories.add(node.path);
      }

      this.requestUpdate();
    }

    this._selectTarget(e.currentTarget);
  }

  _selectTarget($el) {
    const propagateEvent = $el !== this._currentActive;
    this._setActive($el);

    if (propagateEvent) {
      const event = new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: $el.node.raw },
      });

      this.dispatchEvent(event);
    }
  }

  _setActive($el) {
    if (this._currentActive) {
      this._currentActive.classList.toggle('active');
    }

    $el.classList.toggle('active');
    this._currentActive = $el;

    if (this._currentKeyboardActive) {
      this._currentKeyboardActive.classList.remove('keyboard-selected');
    }

    this._currentKeyboardActive = $el;
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
      case 'delete': {
        const absPath = this._contextMenuInfos.node.path;
        const relPath = this._contextMenuInfos.node.relPath;
        const value = { command, absPath, relPath };
        const event = new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value },
        });

        this.dispatchEvent(event);
        break;
      }
      case 'rename': {
        const { node } = this._contextMenuInfos;
        this._contextMenuCommand = { node, command };
        break;
      }
      case 'mkdir':
      case 'touch': {
        // these only apply for directories, which should open if still closed
        const { node } = this._contextMenuInfos;
        this._openDirectories.add(node.path);
        this._contextMenuCommand = { node, command };
        break;
      }
    }
  }

  // if there is a "/" in filename, only keep last part
  _sanitizeFilename(input) {
    const parts = input.split('/');
    const filename = parts[parts.length - 1];
    return filename;
  }

  async _checkFilename(e) {
    e.stopPropagation();

    const $input = e.currentTarget;
    const filename = this._sanitizeFilename(e.detail.value);
    const { node, command } = this._contextMenuCommand;
    // make sure we can't create a file with same name
    let exists = false;
    let targetType;
    let siblings;

    if (command === 'touch' || command === 'mkdir') {
      targetType = command === 'touch' ? 'file' : 'directory';
      siblings = node.children;
    } else if (command === 'rename') {
      targetType = node.type;
      siblings = node.parent.children;
    }

    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];

      // for rename, do not check against itself
      if (sibling === node) {
        continue;
      }

      if (sibling.type === targetType && sibling.name === filename) {
        exists = true;
        break;
      }
    }

    if (exists) {
      this._inputError = true;
      $input.classList.add('errored');
    } else {
      this._inputError = false;
      $input.classList.remove('errored');
    }
  }

  async _finalizeContextMenuCommand(e) {
    // do not propagate change event from sc-text
    e.stopPropagation();
    // cannot finalize command if input is in errored state
    if (this._inputError) {
      return;
    }

    // this can be called if the value has been before aborting (press Escape)
    // probably due to blur event
    if (this._contextMenuCommand === null) {
      return;
    }

    const { node, command } = this._contextMenuCommand;
    const filename = this._sanitizeFilename(e.detail.value);

    if (filename === '') {
      return;
    }

    const rootDirname = this._value.name;
    const re = new RegExp(`^${rootDirname}/`);
    const value = { command };

    switch (command) {
      case 'mkdir':
      case 'touch': {
        value.absPath = `${node.path}/${filename}`;
        value.relPath = value.absPath.replace(re, '');
        break;
      }
      case 'rename': {
        value.oldAbsPath = node.path;
        value.oldRelPath = value.oldAbsPath.replace(re, '');

        value.newAbsPath = node.path.replace(node.name, filename);
        value.newRelPath = value.newAbsPath.replace(re, '');
        break;
      }
    }

    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value },
    });

    this.dispatchEvent(event);

    this._contextMenuCommand = null;
    // we loose focus somehow, when renaming a file
    await this.updateComplete;
    this.focus();
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

    // reset previous context menu command if it didn't go to its end
    this._contextMenuCommand = null;

    const $el = e.currentTarget;
    let options = null;

    // follow soundworks plugin filesystem / scripting API for commands
    if (node.type === 'directory') {
      if (node === this.value) {
        // cannot delete or rename root node
        options = [
          { action: 'touch', label: 'New File' },
          { action: 'mkdir', label: 'New Folder...' },
        ];
      } else {
        options = [
          { action: 'touch', label: 'New File' },
          { action: 'rename', label: 'Rename...' },
          { action: 'mkdir', label: 'New Folder...' },
          { action: 'delete', label: 'Delete Folder' },
        ];
      }
    } else {
      options = [
        { action: 'rename', label: 'Rename...' },
        { action: 'delete', label: 'Delete File' },
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
