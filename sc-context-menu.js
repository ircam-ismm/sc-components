import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme, fontSize } from './styles.js';

class ScContextMenu extends ScElement {
  static get properties() {
    return {
      value: { type: Array }, // [{ action, label }, ...]
    };
  }

  static get styles() {
    return css`
      :host {
        display: none;
        box-sizing: border-box;
        font-size: 0 !important;
        height: 0;
        width: 0;
        position: absolute;
      }

      :host(.show) {
        display: inline-block;
      }

      nav {
        width: 250px;
        display: block;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 4px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2), 0px 0px 3px 0px rgba(255,255,255,0.8) inset;
        position: fixed;
      }

      ul {
        list-style-type: none;
        padding: 12px 10px;
      }

      li {
        font-size: ${fontSize};
        padding: 4px 8px;
        color: white;
        border-radius: 2px;
        cursor: default;
      }

      li:hover {
        background-color: rgb(97, 141, 201);
      }

      li:active {
        background-color: rgb(97, 141, 201, 0.5);
      }
    `;
  }

  constructor() {
    super();

    this.visible = false;
    this.value = [];

    this._posX = 0;
    this._posY = 0;

    this.hide = this.hide.bind(this);
  }

  render() {
    return html`
      <nav
        style="
          top: ${this._posY}px;
          left: ${this._posX}px;
        "
      >
        <ul>
        ${this.value.map((entry) => {
          return html`
            <li
              @click="${e => this.triggerEvent(entry.action)}"
            >${entry.label}</li>
          `;
        })}
        <p>
      </nav>
    `
  }

  show(e) {
    this.visible = true;

    document.addEventListener('click', this.hide);
    this._posX = e.clientX;
    this._posY = e.clientY;

    this.requestUpdate();
    this.classList.add('show');
  }

  hide() {
    this.visible = false;

    document.removeEventListener('click', this.hide);

    this.classList.remove('show');

    // this.requestUpdate();
  }

  triggerEvent(action) {
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: action },
    });

    this.dispatchEvent(event);
  }
}

customElements.define('sc-context-menu', ScContextMenu);

export default ScContextMenu;
