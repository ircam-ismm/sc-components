import { html, css } from 'lit';
import ScElement from './ScElement.js';
import icons from './utils/icons.js';

class ScIcon extends ScElement {
  static properties = {
    type: {
      type: String,
      reflect: true,
    },
    href: {
      type: String,
      reflect: true,
    },
    value: {
      type: String,
      reflect: true,
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-2);
      cursor: pointer;
    }

    :host([disabled]) {
      opacity: 0.7;
      cursor: default;
    }

    :host([hidden]) {
      display: none;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    :host(:hover) {
      background-color: var(--sc-color-primary-3);
    }

    div {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    div:active {
      opacity: 0.7;
    }

    :host([disabled]) div:active {
      opacity: 1;
    }

    a {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
    }

    svg {
      box-sizing: border-box;
      padding: 3px;
      width: 100%;
      height: 100%;
    }
  `;

  constructor() {
    super();

    this.type = 'question';
    this.value = null;
    this.href = null;
    this.disabled = false;

    this._pressed = false;
    // @note: passive: false in event listener declaration lose the binding
    this._onEvent = this._onEvent.bind(this);
  }

  render() {
    let include;

    if (this.href !== null && this.href !== '' && !this.disabled) {
      include = html`
        <a href="${this.href}" target="_blank">
          ${icons[this.type]}
        </a>
      `;
    } else {
      include = icons[this.type];
    }

    return html`
      <div
        @mousedown="${this._onEvent}"
        @mouseup="${this._onEvent}"
        @touchstart="${{
          handleEvent:this._onEvent,
          passive: false,
        }}"
        @touchend="${this._onEvent}"
        @contextmenu="${this._preventContextMenu}"
      >
        ${include}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }
  }

  _onEvent(e) {
    e.preventDefault();

    if (this.disabled) {
      return;
    }

    const eventName = (e.type === 'touchend' || e.type === 'mouseup') ? 'release' : 'press';
    // we don't want to trigger a release if no pressed has been recorded
    if (eventName === 'release' && this._pressed === false) {
      return;
    }

    this._pressed = (eventName === 'press');

    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);

    if (eventName === 'press') {
      const inputEvent = new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(inputEvent);
    }
  }
}

if (customElements.get('sc-icon') === undefined) {
  customElements.define('sc-icon', ScIcon);
}

export default ScIcon;

