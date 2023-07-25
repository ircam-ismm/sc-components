import { html, svg, css } from 'lit';
import ScElement from './ScElement.js';

class ScToggle extends ScElement {
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
      box-shadow: 0 0 2px var(--sc-color-primary-5);
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

  // sc-midi controller interface
  set midiValue(value) {
    if (this.disabled) {
      return;
    }

    this.active = value === 0 ? false : true;
    this._dispatchEvent();
  }

  get midiValue() {
    return this.value ? 127 : 0;
  }

  constructor() {
    super();

    this.active = false;
    this.disabled = false;
    // @note: passive: false in event listener declaration lose the binding
    this._updateValue = this._updateValue.bind(this);
  }

  render() {
    const padding = 25;

    return html`
      <svg
        class="${this.active ? 'active' : ''}"
        viewbox="0 0 100 100"
        @mousedown="${this._updateValue}"
        @touchend="${{
          handleEvent: this._updateValue,
          passive: false,
        }}"
        @contextmenu="${this._preventContextMenu}"
      >
        <line x1="${padding}" y1="${padding}" x2="${100 - padding}" y2="${100 - padding}" />
        <line x1="${padding}" y1="${100 - padding}" x2="${100 - padding}" y2="${padding}" />
      </svg>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }
  }

  // we use touchend on mobile as it is more stable and does not spoil the responsiveness
  _updateValue(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

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
  customElements.define('sc-toggle', ScToggle);
}

export default ScToggle;
