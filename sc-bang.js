import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';

class ScBang extends ScElement {
  static properties = {
    active: {
      type: Boolean,
      reflect: true,
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-1);
      font-size: 0;
      line-height: 0;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-4);
    }

    svg {
      box-sizing: border-box;
      border: 1px solid var(--sc-color-primary-2);
      width: 100%;
      height: 100%;
    }

    circle {
      stroke-width: 8px;
      stroke: var(--sc-color-primary-3);
      fill: var(--sc-color-primary-1);
    }

    circle.active {
      fill: var(--sc-color-primary-4);
      stroke: none;
    }
  `;

  constructor() {
    super();

    this.active = false;
    this.disabled = false;

    this._timeoutId = null;
  }

  render() {
    const size = this._size - 2;

    if (this.active) {
      clearTimeout(this._timeoutId);
      this._timeoutId = setTimeout(() => this.active = false, 50);
    }

    return html`
      <svg
        viewbox="0 0 100 100"
        @mousedown="${this._triggerEvent}"
        @touchstart="${this._triggerEvent}"
        @contextmenu="${this._preventContextMenu}"
      >
        <circle cx="50" cy="50" r="34" ></circle>
        ${this.active
          ? svg`<circle class="active" cx="50" cy="50" r="20"></circle>`
          : nothing
        }
      </svg>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }
  }

  _triggerEvent(e) {
    if (this.disabled) {
      return;
    }

    e.preventDefault();
    this.focus();

    const inputEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: true },
    });

    this.active = true;
    this.dispatchEvent(inputEvent);
  }
}

if (customElements.get('sc-bang') === undefined) {
  customElements.define('sc-bang', ScBang);
}

export default ScBang;

