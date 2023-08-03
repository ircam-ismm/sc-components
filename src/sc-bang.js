import { html, css, svg, nothing } from 'lit';

import ScElement from './ScElement.js';
import midiLearn from './mixins/midi-learn.js';
import KeyboardController from './controllers/keyboard-controller.js';

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
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      font-size: 0;
      line-height: 0;
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

    svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    circle {
      stroke-width: 8px;
      stroke: var(--sc-color-primary-4);
      fill: var(--sc-color-primary-2);
    }

    circle.active {
      fill: var(--sc-color-primary-5);
      stroke: none;
    }
  `;

  // midi-learn interface
  set midiValue(value) {
    // dispatch on any incomming value
    this.active = true;
    this._dispatchInputEvent();
  }

  get midiValue() {
    return this.active ? 127 : 0;
  }

  constructor() {
    super();

    this.active = false;
    this.disabled = false;

    this._timeoutId = null;

    // @note: passive: false in event listener declaration lose the binding
    this._triggerEvent = this._triggerEvent.bind(this);

    this._keyboard = new KeyboardController(this, {
      filterCodes: ['Enter', 'Space'],
      callback: this._onKeyboardEvent.bind(this),
      deduplicateEvents: true,
    });
  }

  render() {
    if (this.active) {
      clearTimeout(this._timeoutId);
      this._timeoutId = setTimeout(() => this.active = false, 50);
    }

    return html`
      <svg
        viewbox="0 0 100 100"
        @mousedown="${this._triggerEvent}"
        @touchstart="${{
          handleEvent: this._triggerEvent,
          passive: false,
        }}"
      >
        <circle cx="50" cy="50" r="34" ></circle>
        ${this.active
          ? svg`<circle class="active" cx="50" cy="50" r="20"></circle>`
          : nothing
        }
      </svg>
    `
  }

  updated(changedProperties) {
    this.disabled ? this.removeAttribute('tabindex') : this.setAttribute('tabindex', 0);
  }

  _onKeyboardEvent(e) {
    if (this.disabled) { return; }

    if (e.type === 'keydown') {
      this.active = true;
      this._dispatchInputEvent();
    }
  }

  _triggerEvent(e) {
    if (this.disabled) { return; }

    e.preventDefault();

    this.active = true;
    this._dispatchInputEvent();
  }

  _dispatchInputEvent() {
    const inputEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: true },
    });

    this.dispatchEvent(inputEvent);
  }
}

if (customElements.get('sc-bang') === undefined) {
  customElements.define('sc-bang', midiLearn('ScBang', ScBang));
}

export default ScBang;

