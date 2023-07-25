import { html, css } from 'lit';
import ScElement from './ScElement.js';

class ScButton extends ScElement {
  static properties = {
    value: {
      type: String,
      reflect: true,
    },
    midiValue: {
      type: Number,
    },
    selected: {
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
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      width: 200px;
      height: 30px;
      line-height: 0;
      font-size: var(--sc-font-size);
      color: #ffffff;
      border-radius:  1px;
      border: 1px solid var(--sc-color-primary-3);

      --sc-button-selected: var(--sc-color-secondary-3);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    :host([selected]) {
      border: 1px solid var(--sc-button-selected);
    }

    button {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-family: var(--sc-font-family);
      background-color: var(--sc-color-primary-2);
      border: none;
      font-size: inherit;
      cursor: pointer;
      color: inherit;
    }

    /* remove default button focus */
    button:focus, button:focus-visible {
      outline: none;
    }

    button:hover {
      background-color: var(--sc-color-primary-3);
    }

    :host([disabled]) button:hover {
      background-color: var(--sc-color-primary-2);
      cursor: default;
    }

    /* use class because :active does not work in Firefox because of e.preventDefault(); */
    button.active {
      background-color: var(--sc-color-primary-4);
    }

    button.selected {
      background-color: var(--sc-button-selected);
    }

    :host([disabled]) button.selected:hover {
      background-color: var(--sc-button-selected);
      cursor: default;
    }
  `;

  // sc-midi controller interface
  set midiValue(value) {
    if (this.disabled) {
      return;
    }

    const eventName = value === 0 ? 'release' : 'press';
    this._dispatchEvent(eventName);
  }

  constructor() {
    super();

    this.value = null;
    this.selected = false;
    this.disabled = false;

    this._pressed = false;
    // @note: passive: false in event listener declaration lose the binding
    this._onEvent = this._onEvent.bind(this);
  }

  render() {
    return html`
      <button
        tabindex="-1"
        class="${this.selected ? 'selected' : ''}"
        @mousedown="${this._onEvent}"
        @mouseup="${this._onEvent}"

        @touchstart="${{
          handleEvent: this._onEvent,
          passive: false,
        }}"
        @touchend="${this._onEvent}"
        @contextmenu="${this._preventContextMenu}"
      >
        <slot>${this.value}</slot>
      </button>
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

    // add class for visual feedback
    if (eventName === 'release') {
      this.shadowRoot.querySelector('button').classList.remove('active');
    } else {
      this.shadowRoot.querySelector('button').classList.add('active');
    }

    this._dispatchEvent(eventName);
  }

  _dispatchEvent(eventName) {
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

if (customElements.get('sc-button') === undefined) {
  customElements.define('sc-button', ScButton);
}

export default ScButton;
