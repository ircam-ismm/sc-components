import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';

class ScBang extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      active: {
        type: Number,
        reflect: true,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        background-color: ${theme['--color-primary-1']};
        font-size: 0 !important;
      }

      svg {
        box-sizing: border-box;
        border: 1px solid ${theme['--color-primary-2']};
      }
    `;
  }

  set width(value) {
    this._size = value;
    this.requestUpdate();
  }

  get width() {
    return this._size;
  }

  set height(value) {
    this._size = value;
    this.requestUpdate();
  }

  get height() {
    return this._size;
  }

  set active(value) {
    clearTimeout(this._timeoutId);

    // use falsy values to be backward compatible
    if (value === true) {
      this._active = true;
      this.requestUpdate();

      this._timeoutId = setTimeout(() => {
        this.active = false;
        this.requestUpdate();
      }, 50);
    } else {
      this._active = false;
      this.requestUpdate();
    }
  }

  get active() {
    return false;
  }

  // attributeChangedCallback(name, old, value) {
  //   console.log(name, old, value);
  //   super.attributeChangedCallback(name, old, value);
  // }

  constructor() {
    super();

    this.width = 30;
    this.height = 30;

    this._active = false;
    this._timeoutId = null;
  }

  render() {
    const size = this._size - 2;

    return html`
      <svg
        style="
          width: ${this._size}px;
          height: ${this._size}px;
        "
        viewbox="0 0 100 100"
        @mousedown="${this._triggerEvent}"
        @touchstart="${this._triggerEvent}"
        @contextmenu="${this._preventContextMenu}"
      >
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke-width="8"
          stroke="${theme['--color-primary-3']}"
          fill="${theme['--color-primary-1']}"
        ></circle>
        ${this._active
          ? svg`
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="${theme['--color-primary-4']}"
            ></circle>
          `
          : nothing
        }
      </svg>
    `
  }

  _triggerEvent(e) {
    e.preventDefault();

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

