import { html, svg, css } from 'lit';
import ScElement from './ScElement.js';

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
      border: 1px solid var(--sc-color-primary-4);
      font-size: 0;
      line-height: 0;
      /* @todo - must be dynamic */
      border-radius: 1px;
/*      cursor: pointer;*/

      --sc-switch-transition-time: 75ms;
      --sc-switch-toggle-color: white;
      --sc-switch-active-color: var(--sc-color-secondary-1);
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
  }

  render() {
    return html`
      <svg
        class="${this.active ? 'active' : ''}"
        viewBox="0 0 10 10"
        preserveAspectRatio="none"
        @mousedown=${this._updateValue}
        @touchstart=${this._updateValue}
      >
         <rect x="${this.active ? 5 : 0}" width="5" height="10" />
      </svg>
    `;
  }

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


if (customElements.get('sc-switch') === undefined) {
  customElements.define('sc-switch', ScSwitch);
}

export default ScSwitch;
