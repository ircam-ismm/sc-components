import { html, svg, css } from 'lit';

import ScElement from './ScElement.js';
import midiControlled from './mixins/midi-controlled.js';
import KeyboardController from './controllers/keyboard-controller.js';

class ScRecordBase extends ScElement {
  static properties = {
    active: {
      type: Boolean,
      reflect: true,
    },
    value: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-2);
    }

    :host([hidden]) {
      display: none
    }

    :host([disabled]) {
      opacity: 0.7;
      cursor: default;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    svg {
      width: 100%;
      height: 100%;
      fill: #ffffff;
    }

    svg.active {
      background-color: var(--sc-color-primary-1);
      fill: var(--sc-color-secondary-3);
    }
  `;

  // alias active for consistency and genericity with other components
  get value() {
    return this.active;
  }

  set value(active) {
    this.active = active;
  }

  // midi-learn interface
  get midiType() {
    return "control";
  }

  set midiValue(value) {
    if (this.disabled) {
      return;
    }

    this.active = value === 0 ? false : true;
    this._dispatchChangeEvent();
  }

  get midiValue() {
    return this.active ? 127 : 0;
  }

  constructor() {
    super();

    this.active = false;
    this.disabled = false;

    this._keyboard = new KeyboardController(this, {
      filterCodes: ['Enter', 'Space'],
      callback: this._onKeyboardEvent.bind(this),
      deduplicateEvents: true,
    });
  }

  render() {
    return html`
      <svg
        class="${this.active ? 'active' : ''}"
        viewbox="0 0 20 20"
        @mousedown="${this._triggerChange}"
        @touchstart="${this._triggerChange}"
      >
        <circle cx="10" cy="10" r="5"></circle>
      </svg>
    `
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

    if (e.type === 'keydown') {
      this.active = !this.active;
      this._dispatchChangeEvent();
    }
  }

  _triggerChange(e) {
    e.preventDefault();
    if (this.disabled) { return; }

    this.focus();
    this.active = !this.active;
    this._dispatchChangeEvent();
  }

  _dispatchChangeEvent() {
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.active },
    });

    this.dispatchEvent(changeEvent);
    this.requestUpdate();
  }
}

const ScRecord = midiControlled('ScRecord', ScRecordBase);


if (customElements.get('sc-record') === undefined) {
  customElements.define('sc-record', ScRecord);
}

export default ScRecord;
