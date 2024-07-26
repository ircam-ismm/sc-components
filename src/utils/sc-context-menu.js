import { html, css, svg, nothing } from 'lit';
import ScElement from '../ScElement.js';

class ScContextMenu extends ScElement {
  static get properties() {
    return {
      // list of possible actions [{ action, label }, ...]
      options: {
        type: Array,
      },
      // event that trigerred opening of context menu
      event: {
        type: Object,
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        font-size: 0 !important;
        height: auto;
        width: 250px;
        display: block;
/*        background-color: rgba(0, 0, 0, 0.8);*/
        background-color: var(--sc-color-primary-2);
        border-radius: 5px;
        border: 1px solid var(--sc-color-primary-4);
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
        position: fixed;
        font-size: var(--sc-font-size);
        color: white;
      }

      ul {
        list-style-type: none;
        padding: 5px;
      }

      li {
        font-size: calc(var(--sc-font-size) - 1px);
        color: white;
        padding: 4px 6px;
        color: white;
        border-radius: 1px;
        cursor: default;
      }

      li:hover {
        background-color: var(--sc-color-secondary-2);
        /* rgb(97, 141, 201); */
      }

      li:active {
        background-color: rgb(97, 141, 201, 0.5);
      }
    `;
  }

  constructor() {
    super();

    this.options = [];
    this.event = null;

    this._triggerClose = this._triggerClose.bind(this);
  }

  render() {
    return html`
      <ul>
      ${this.options.map(entry => html`
        <li @click="${e => this._triggerEvent(e, entry.action)}">${entry.label}</li>
      `)}
      </ul>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener('click', this._triggerClose);
    document.addEventListener('contextmenu', this._triggerClose);

    this.style.left = `${this.event.clientX}px`;
    this.style.top = `${this.event.clientY}px`;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('click', this._triggerClose);
    document.removeEventListener('contextmenu', this._triggerClose);
  }

  _triggerEvent(e, action) {
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: action },
    });

    this.dispatchEvent(event);

    this._triggerClose(e);
  }

  _triggerClose(e) {
    e.preventDefault();

    const event = new CustomEvent('close', {
      bubbles: true,
      composed: true,
      detail: null,
    });

    this.dispatchEvent(event);
  }
}

if (customElements.get('sc-context-menu') === undefined) {
  customElements.define('sc-context-menu', ScContextMenu);
}

export default ScContextMenu;

