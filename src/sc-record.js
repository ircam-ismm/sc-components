import { html, svg, css } from 'lit';

import ScElement from './ScElement.js';

class ScRecord extends ScElement {
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

  constructor() {
    super();

    this.active = false;
  }

  render() {
    return html`
      <svg
        class="${this.active ? 'active' : ''}"
        viewbox="0 0 20 20"
        @mousedown="${this._propagateChange}"
        @touchstart="${this._propagateChange}"
      >
        <circle cx="10" cy="10" r="5"></circle>
      </svg>
    `
  }

  updated(changedProperties) {
    this.disabled ? this.removeAttribute('tabindex') : this.setAttribute('tabindex', 0);
  }

  _propagateChange(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.active = !this.active;

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.active },
    });

    this.dispatchEvent(changeEvent);
    this.requestUpdate();
  }
}

if (customElements.get('sc-record') === undefined) {
  customElements.define('sc-record', ScRecord);
}

export default ScRecord;
