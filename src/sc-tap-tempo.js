import { html, css, svg, nothing } from 'lit';
import { getTime } from '@ircam/sc-utils';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';

class ScTapTempo extends ScElement {
  static properties = {
    value: {
      type: Number,
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
      font-size: 0px;
      width: 50px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-2);
      font-size: 11px;
      color: #ffffff;
      font-family: var(--sc-font-family);
      cursor: pointer;

      --sc-tap-tempo-background-color: var(--sc-color-secondary-5);
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

    div {
      box-sizing: border-box;
      text-align: center;
      border-radius: inherit;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      color: inherit;
    }

    div.active {
      background-color: var(--sc-tap-tempo-background-color);
    }
  `;

  constructor() {
    super();

    this.value = 60;
    this.disabled = false;

    this._active = false;
    this._timeoutId = null;

    this._lastTime = null;
    this._lastDifference = null;
    this._timeQueue = [];
    this._timer = null;
    this._maxQueueSize = 6;
    this._timeout = 2000;

    this._keyboard = new KeyboardController(this, {
      filterCodes: ['Enter', 'Space'],
      callback: this._onKeyboardEvent.bind(this),
      deduplicateEvents: true,
    });
  }

  render() {
    return html`
      <div
        class="${this._active ? 'active' : ''}"
        @mousedown="${this._onTap}"
        @touchstart="${this._onTap}"
      >
        <slot>tap</slot>
      </div>
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
    if (e.type === 'keydown') {
      this._onTap(e);
    }
  }

  _onTap(e) {
    e.preventDefault();  // important to prevent focus when disabled

    if (this.disabled) { return; }

    this.focus();
    clearTimeout(this._timeoutId);

    // trigger gui feedback
    this._active = true;
    this.requestUpdate();

    this._timeoutId = setTimeout(() => {
      this._active = false;
      this.requestUpdate();
    }, 100);

    // calculate new bpm
    const time = getTime();

    if (this._lastTime) {
      this._lastDifference = time - this._lastTime;

      if (Math.abs(this._lastDifference - this._timeQueue[this._timeQueue.length-1]) > 0.2) {
        this._timeQueue = [];
        this._lastTime = null;
      }

      this._timeQueue.push(this._lastDifference);

      if (this._timeQueue.length) {
        let sum = 0;

        for (let i = 0; i < this._timeQueue.length; i++) {
          sum += this._timeQueue[i];
        }

        const mean = sum / this._timeQueue.length;

        const bpm = 1 / mean * 60;
        this.value = bpm;

        this._dispatchEvent();
      }

      if (this._timeQueue.length > this._maxQueueSize) {
        this._timeQueue.shift();
      }
    };

    this._lastTime = time;

    clearTimeout(this._timer);

    this._timer = setTimeout(() => {
      this._timeQueue = [];
      this._lastTime = null;
    }, this._timeout);
  }

  _dispatchEvent() {
    const inputEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(inputEvent);
  }
}

if (customElements.get('sc-tap-tempo') === undefined) {
  customElements.define('sc-tap-tempo', ScTapTempo);
}

export default ScTapTempo;

