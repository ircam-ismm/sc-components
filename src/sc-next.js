import { html, svg, css } from 'lit';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';

class ScNext extends ScElement {
  static properties = {
    _active: {
      type: Boolean,
      state: true,
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
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
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
      stroke: #ffffff;
    }

    svg.active {
      background-color: var(--sc-color-primary-1);
      fill: var(--sc-color-secondary-4);
      stroke: var(--sc-color-secondary-4);
    }

    path {
      stroke-width: 10;
      fill-opacity: 0;
    }
  `;

  constructor() {
    super();

    this._active = false;
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
        class="${this._active ? 'active' : ''}"
        viewbox="-10 -8 120 120"
        @mousedown="${this._onInput}"
        @touchstart="${this._onInput}"
        @mouseup="${this._onRelease}"
        @touchend="${this._onRelease}"
      >
        <path d="M 80,20L 80,80"></path>
        <polygon points="20,20 70,50 20,80"></polygon>
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
    if (e.type === 'keydown') {
      this._onInput(e);
    } else if (e.type === 'keyup') {
      this._onRelease();
    }
  }

  _onInput(e) {
    e.preventDefault(); // important to prevent focus when disabled
    if (this.disabled) { return; }

    this.focus();
    this._active = true;
    this._dispatchEvent();
  }

  _onRelease(e) {
    this._active = false;
  }

  _dispatchEvent() {
    const changeEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this._active },
    });

    this.dispatchEvent(changeEvent);
  }
}

customElements.define('sc-next', ScNext);

export default ScNext;

