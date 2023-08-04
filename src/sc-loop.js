import { html, svg, css } from 'lit';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';

class ScLoop extends ScElement {
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
      cursor: default;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    svg {
      width: 100%;
      height: 100%;
      stroke: #ffffff;
      fill: #ffffff;
    }

    svg.active {
      background-color: var(--sc-color-primary-1);
      stroke: var(--sc-color-secondary-5);
      fill: var(--sc-color-secondary-5);
    }

    path {
      stroke-width: 10;
      fill: none;
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
    const size = this._size - 2;

    return html`
      <svg
        class="${this.active ? 'active' : ''}"
        style="
          width: ${size}px;
          height: ${size}px;
        "
        viewbox="-10 -8 120 120"
        @mousedown=${this._onInput}
        @touchstart=${this._onInput}
      >
        <path
          d="M 30,20
            L 70,20
            C 75,20 80,25 80,30
            L 80,70
            C 80,75 75,80 70,80
            L 60,80
            M 40,80
            L 30,80
            C 25,80 20,75 20,70
            L 20,30
            C 20,25 25,20 30,20
          "
        ></path>
        <polygon points="45,80 60,65 60,95"></polygon>
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

  _onInput(e) {
    e.preventDefault(); // important to prevent focus when disabled
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

if (customElements.get('sc-loop') === undefined) {
  customElements.define('sc-loop', ScLoop);
}

export default ScLoop;
