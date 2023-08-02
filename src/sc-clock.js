import { css, html, svg, nothing } from 'lit';
import ScElement from './ScElement.js';

function padLeft(value, char, length) {
  value = value + '';

  while (value.length < length) {
    value = char + value;
  }

  return value;
}

class ScClock extends ScElement {
  static properties = {
    // function that return a time in seconds
    getTimeFunction: {
      type: Function,
      attribute: false,
    },
    twinkle: {
      type: Boolean,
      reflect: true,
    },
    format: {
      type: String,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      width: 200px;
      height: 30px;
      vertical-align: top;
      border-radius: 2px;
      font-size: var(--sc-font-size);
      font-family: var(--sc-font-family);
      background-color: var(--sc-color-primary-4);
      color: white;
      text-align: center;
    }

    div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
    }

    .idle {
      opacity: 0.3;
    }

    .hidden {
      visibility: hidden;
    }
  `;

  get format() {
    return this._format;
  }

  set format(value) {
    this._showHours = /hh/.test(value) ? true : false;
    this._showMinutes = /mm/.test(value) ? true : false;
    this._showSeconds = /ss/.test(value) ? true : false;
    this._showMilliseconds = /ms/.test(value) ? true : false;

    this._format = value;
  }

  constructor() {
    super();

    this._currentTime = { hours: null, minutes: null, seconds: null, millesconds: null };
    this._format = null;
    this._showHours = false;
    this._showMinutes = false;
    this._showSeconds = false;
    this._showMilliseconds = false;

    const offset = new Date().getTimezoneOffset(); // in minutes
    const offsetInSec = offset * 60;

    this.getTimeFunction = () => Date.now() / 1000 - offsetInSec;
    this.twinkle = false;
    this.format = 'hh:mm:ss:ms';

  }

  render() {
    const { time, twinkle, sign, hours, minutes, seconds, milliseconds } = this._currentTime;
    const idle = time === 0 ? true : false;
    let inner = [];

    if (this._showHours) {
      inner.push(html`<span>${hours}</span>`);
    }
    if (this._showMinutes) {
      inner.push(html`<span>${minutes}</span>`);
    }
    if (this._showSeconds) {
      inner.push(html`<span>${seconds}</span>`);
    }
    if (this._showMilliseconds) {
      inner.push(html`<span>${milliseconds}</span>`);
    }

    inner = inner.flatMap(el =>
      [el, html`<span class="${twinkle ? 'hidden' : ''}">:</span>`]
    ).slice(0, -1);

    return html`
      <div class="${idle ? 'idle' : ''}">
        ${sign ? html`<span>${sign}</span>` : nothing}
        ${inner}
      </div>
    `;
  }

  _getFormattedInfos() {
    const time = this.getTimeFunction();

    let sign;
    let timeInSeconds;

    if (time >= 0) {
      sign = '';
      timeInSeconds = Math.abs(Math.floor(time));
    } else {
      sign = '-';
      timeInSeconds = Math.abs(Math.ceil(time));
    }

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
    const seconds = timeInSeconds - (hours * 3600) - (minutes * 60);
    const secondsFrac = Math.abs(time) - timeInSeconds; // fractional seconds (not used)
    const milliseconds = Math.floor(secondsFrac * 1000);

    return {
      time: time,
      sign: sign,
      hours: padLeft(hours % 24, '0', 2),
      minutes: padLeft(minutes, '0', 2),
      seconds: padLeft(seconds, '0', 2),
      milliseconds: padLeft(milliseconds, '0', 3),
    };
  }

  _render() {
    const now = this._getFormattedInfos();
    let requestUpdate = false;

    if (this._currentTime.sign !== now.sign) {
      requestUpdate = true;
    }

    if (this._showHours && this._currentTime.hours !== now.hours) {
      requestUpdate = true;
    }

    if (this._showMinutes && this._currentTime.minutes !== now.minutes) {
      requestUpdate = true;
    }

    if (this._showSeconds && this._currentTime.seconds !== now.seconds) {
      requestUpdate = true;
    }

    if (this._showMilliseconds && this._currentTime.milliseconds !== now.milliseconds) {
      requestUpdate = true;
    }

    now.twinkle = false;
    const millis = parseInt(now.milliseconds) / 1000;

    if (this.twinkle && millis >= 0.5 && millis < 1) {
      now.twinkle = true;
    }

    if (this._currentTime.twinkle !== now.twinkle) {
        requestUpdate = true;
    }

    if (requestUpdate) {
      this._currentTime = now;
      this.requestUpdate();
    }

    this._rafId = requestAnimationFrame(() => this._render());
  }

  connectedCallback() {
    super.connectedCallback();
    // launch request animation frame loop
    this._render();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._timeoutInterval);

    super.disconnectedCallback();
  }

}

if (customElements.get('sc-clock') === undefined) {
  customElements.define('sc-clock', ScClock);
}
