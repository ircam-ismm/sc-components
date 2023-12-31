import { html, svg, css } from 'lit';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';

class ScSwitch extends ScElement {
  static properties = {
    active: {
      type: Boolean,
      reflect: true,
    },
    // do not reflect just an alias for the `active` attribute
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
      width: 60px;
      height: 30px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      font-size: 0;
      line-height: 0;
      border-radius: 1px;

      --sc-switch-transition-time: 75ms;
      --sc-switch-toggle-color: white;
      --sc-switch-active-color: var(--sc-color-secondary-1);
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

    :host > svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 3px;
      border-radius: inherit;
      transition: var(--sc-switch-transition-time);
      position: relative;
    }

    :host > svg.active {
      background-color: var(--sc-switch-active-color);
    }

    svg rect {
      transition: var(--sc-switch-transition-time);
      fill: var(--sc-switch-toggle-color);
    }
  `;

  // alias active for consistency and genericity with other components
  get value() {
    return this.active;
  }

  set value(active) {
    this.active = active;
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
        viewBox="0 0 10 10"
        preserveAspectRatio="none"
        @mousedown=${this._updateValue}
        @touchend=${this._updateValue}
      >
         <rect x="${this.active ? 5 : 0}" width="5" height="10" />
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


if (customElements.get('sc-switch') === undefined) {
  customElements.define('sc-switch', ScSwitch);
}

export default ScSwitch;
