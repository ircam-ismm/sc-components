import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';
import { getTime } from '@ircam/sc-gettime';

class ScTapTempo extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      value: {
        type: Number,
        reflect: true,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
        font-size: 0px;
      }

      div {
        box-sizing: border-box;
        border: 1px solid ${theme['--color-primary-3']};
        color: #ffffff;
        border-radius: 2px;
        font-size: 11px;
        text-align: center;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();

    this.width = 50;
    this.height = 30;
    this.value = 60;

    this._active = false;
    this._timeoutId = null;

    this._lastTime = null;
    this._lastDifference = null;
    this._timeQueue = [];
    this._timer = null;
    this._maxQueueSize = 6;
    this._timeout = 2000;
  }

  render() {

    return html`
      <div
        style="
          width: ${this.width}px;
          height: ${this.height}px;
          line-height: ${this.height}px;
          background-color: ${this._active ? theme['--color-secondary-6'] : theme['--color-primary-3']}
        "
        @mousedown="${this._tap}"
        @touchstart="${this._tap}"
        @contextmenu="${this._preventContextMenu}"
      >
        Tap
      </div>
    `
  }

  _tap(e) {
    e.preventDefault();

    clearTimeout(this._timeoutId);

    // trigger gui feedback
    this._active = true;
    this.requestUpdate();

    this._timeoutId = setTimeout(() => {
      this._active = false;
      this.requestUpdate();
    }, 100);

    // calcaulte new bpm
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

