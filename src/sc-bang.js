import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';

import midiLearn from './mixins/midi-learn.js';

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
        @contextmenu="${this._preventContextMenu}"
      >
        <circle cx="50" cy="50" r="34" ></circle>
        ${this.active
          ? svg`<circle class="active" cx="50" cy="50" r="20"></circle>`
          : nothing
        }
      </svg>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }
  }

  _triggerEvent(e) {
    if (this.disabled) {
      return;
    }

    e.preventDefault();
    this.focus();

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

