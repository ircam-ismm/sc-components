import { html, css, svg, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import ScElement from './ScElement.js';
import { theme, fontSize, arrowRight, arrowDown } from './styles.js';

class ScFileTree extends ScElement {
  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      value: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        font-size: 0 !important;
        border: 1px solid ${theme['--color-primary-4']};
      }

      nav {
        /*background-color: ${theme['--color-primary-4']};*/
        background-color: #ebedef;
        color: black;
        height: 100%;
        width: 100%;
        display: inline-block;
        overflow: auto;
      }

      ul {
        font-size: ${fontSize};
        list-style: none;
        margin: 0;
        padding: 0;
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

      li .hover:hover + .hover-bg {
        /*background-color: ${theme['--color-primary-3']};*/
        background-color: #dbdde0;
      }

      li.active > .hover-bg, li.active .hover:hover + .hover-bg {
        /*background-color: ${theme['--color-primary-2']};*/
        background-color: #c6cbd2;
      }

      li.directory + li {
        display: none;
      }

      li.open + li {
        display: block;
      }


      /*li.open > ul {
        display: block;
      }*/

      li.directory::before {
        content: '';
        display: inline-block;
        font-size: 0;
        background-image: url(${arrowRight});
        background-position: 0 50%;
        background-size: 14px;
        background-repeat: no-repeat;
        position: absolute;
        width: 22px;
        height: 22px;
        z-index: 1;
        /*left: -22px;*/
      }

      li.directory.open::before {
        background-image: url(${arrowDown});
        background-position: 20% 70%;
      }
    `;
  }

  constructor() {
    super();

    this.value = null;
    this.width = 300;
    this.height = 200;

    this._currentActive = null;
  }

  _renderNode(node, depth) {
    if (!node) {
      return nothing;
    }

    const classes = {
      directory: (node.type === 'directory'),
      open: (depth === 0),
    }

    return html`
      <li
        style="
          text-indent: ${depth * 20}px;
        "
        class="${classMap(classes)}"
        @click="${e => this._onItemClick(e, node)}"
      >
        <div class="hover"></div>
        <div class="hover-bg"></div><!-- must be after .hover -->
        <div class="content">
          <span style="
            text-indent: ${node.type === 'directory' ? 20 : 0}px;
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
      <nav style="
        width: ${this.width}px;
        height: ${this.height}px;
      ">
        <ul>
          ${this._renderNode(this.value, 0)}
        </ul>
      </nav>
    `
  }

  _onItemClick(e, node) {
    e.stopPropagation();

    if (node.type === 'directory') {
      e.currentTarget.classList.toggle('open');
    } else {
      if (this._currentActive) {
        this._currentActive.classList.toggle('active');
      }

      e.currentTarget.classList.toggle('active');
      this._currentActive = e.currentTarget;

      this._triggerInput(node);
    }
  }

  _triggerInput(node) {
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: node },
    });

    this.dispatchEvent(event);
  }
}

customElements.define('sc-file-tree', ScFileTree);

export default ScFileTree;
