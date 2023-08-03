import { html, svg, css } from 'lit';

import ScElement from './ScElement.js';
import midiLearn from './mixins/midi-learn.js';
import KeyboardController from './controllers/keyboard-controller.js';

class ScToggle extends ScElement {
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

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    svg {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    svg line {
      stroke-width: 10px;
      stroke: var(--sc-color-primary-4);
    }

    svg.active line {
      stroke: #ffffff;
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
  set midiValue(value) {
    if (this.disabled) {
      return;
    }

    this.active = value === 0 ? false : true;
    this._dispatchEvent();
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
    const padding = 25;

    // we use touchend on mobile as it is more stable and does not spoil the responsiveness
    return html`
      <svg
        class="${this.active ? 'active' : ''}"
        viewbox="0 0 100 100"
        @mousedown="${this._updateValue}"
        @touchend="${{
          handleEvent: this._updateValue.bind(this),
          passive: false,
        }}"
      >
        <line x1="${padding}" y1="${padding}" x2="${100 - padding}" y2="${100 - padding}" />
        <line x1="${padding}" y1="${100 - padding}" x2="${100 - padding}" y2="${padding}" />
      </svg>
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

    if (e.type === 'keydown') {
      this.active = !this.active;
      this._dispatchEvent();
    }
  }

  _updateValue(e) {
    e.preventDefault(); // important to prevent focus when disabled
    if (this.disabled) { return; }

    this.focus();
    this.active = !this.active;
    this._dispatchEvent();
  }

  _dispatchEvent() {
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.active },
    });

    this.dispatchEvent(changeEvent);
  }
}

if (customElements.get('sc-toggle') === undefined) {
  customElements.define('sc-toggle', midiLearn('ScToggle', ScToggle));
}

export default ScToggle;
