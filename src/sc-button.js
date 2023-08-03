import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import ScElement from './ScElement.js';
import midiLearn from './mixins/midi-learn.js';
import KeyboardController from './controllers/keyboard-controller.js';

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
    _pressed: {
      type: Boolean,
      state: true,
    }
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
      border: 1px solid var(--sc-color-primary-3);

      --sc-button-background-color: var(--sc-color-primary-2);
      --sc-button-background-color-hover: var(--sc-color-primary-3);
      --sc-button-background-color-active: var(--sc-color-primary-4);
      --sc-button-background-color-selected: var(--sc-color-secondary-3);
    }

    :host([hidden]) {
      display: none
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    button {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-family: var(--sc-font-family);
      background-color: var(--sc-button-background-color);
      border: none;
      font-size: inherit;
      color: inherit;
      cursor: pointer;
    }

    /* remove default button focus */
    button:focus, button:focus-visible {
      outline: none;
    }

    button:hover {
      background-color: var(--sc-button-background-color-hover);
    }

    button.selected {
      background-color: var(--sc-button-background-color-selected);
    }

    :host([selected]) {
      border: 1px solid var(--sc-button-background-color-selected);
    }

    /* use class because :active does not work in Firefox because of e.preventDefault(); */
    button.active {
      background-color: var(--sc-button-background-color-active);
    }

    /* prevent any layout change when disabled */
    :host([disabled]) button {
      cursor: default;
    }

    :host([disabled]) button:hover {
      background-color: var(--sc-button-background-color);
      cursor: default;
    }

    :host([disabled]) button.selected:hover {
      background-color: var(--sc-button-background-color-selected);
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

  get midiValue() {
    return this._pressed ? 127 : 0;
  }

  constructor() {
    super();

    this.value = null;
    this.selected = false;
    this.disabled = false;

    this._pressed = false;
    // @note: passive: false in event listener declaration lose the binding

    this._keyboard = new KeyboardController(this, {
      filterCodes: ['Enter', 'Space'],
      callback: this._onKeyboardEvent.bind(this),
      deduplicateEvents: true,
    });
  }

  render() {
    const classes = {
      active: this._pressed,
      selected: this.selected,
    }

    return html`
      <button
        tabindex="-1"
        class="${classMap(classes)}"
        @mousedown="${this._onEvent}"
        @mouseup="${this._onEvent}"
        @touchstart="${{
          handleEvent: this._onEvent.bind(this),
          passive: false,
        }}"
        @touchend="${this._onEvent}"
      >
        <slot>${this.value}</slot>
      </button>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      const tabindex = this.disabled ? -1 : this._tabindex;
      this.setAttribute('tabindex', tabindex);

      if (this.disabled) { this.blur(); }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // @note - this is important if the compoent is e.g. embedded in another component
    this._tabindex = this.getAttribute('tabindex') || 0;
  }

  _onKeyboardEvent(e) {
    if (this.disabled) { return; }

    const eventName = e.type === 'keydown' ? 'press' : 'release';
    this._dispatchEvent(eventName);
  }

  _onEvent(e) {
    e.preventDefault(); // important to prevent focus when disabled
    if (this.disabled) { return; }

    this.focus();
    const eventName = (e.type === 'touchend' || e.type === 'mouseup') ? 'release' : 'press';
    this._dispatchEvent(eventName);
  }

  _dispatchEvent(eventName) {
        // we don't want to trigger a release if no pressed has been recorded
    if (eventName === 'release' && this._pressed === false) {
      return;
    }

    const value = this.value === null ? this.textContent : this.value;
    this._pressed = (eventName === 'press');

    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: { value: value },
    });

    this.dispatchEvent(event);

    if (eventName === 'press') {
      const inputEvent = new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: value },
      });

      this.dispatchEvent(inputEvent);
    }
  }
}

if (customElements.get('sc-button') === undefined) {
  customElements.define('sc-button', midiLearn('ScButton', ScButton));
}

export default ScButton;
