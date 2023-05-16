import { css, html, svg, nothing } from 'lit';
import ScElement from './ScElement.js';

function padLeft(value, char, length) {
  value = value + ''; // cast to string

  while (value.length < length)
    value = char + value;

  return value;
}

function getFormattedTimeInfos(time) {   // [-][hh:]mm:ss
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
      sign,
      hours: padLeft(hours % 24, '0', 2),
      minutes: padLeft(minutes, '0', 2),
      seconds: padLeft(seconds, '0', 2),
      milliseconds: padLeft(milliseconds, '0', 3),
    };
}

class ScClock extends ScElement {
  static get properties() {
    return {
      getTimeFunction: {},
      fontSize: { type: Number, attribute: 'font-size' },
      width: { type: Number },
      height: { type: Number },
      twinkle: { type: Array },
    }
  }
  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
        font-size: 0;
      }

      div {
        vertical-align: middle;
        text-align: center;
        box-sizing: border-box;
        background-color: rgb(106, 106, 105);
        border: 1px solid rgb(106, 106, 105);
        color: white;
        font-family: Consolas, monaco, monospace;
        border-radius: 2px;
        line-height: 16px;
        resize: none;
      }
    `;
  }

  constructor() {
    super();

    // by default the component displays a raw clock (horloge)
    this._defaultGetTimeFunction = () => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return { hours, minutes };
    }
    this._currentTime = { hours: null, minutes: null };


    this.getTimeFunction = this._defaultGetTimeFunction;
    this.width = 400;
    this.height = 50;
    this.fontSize = 13;
    this.twinkle = null;
  }

  render() {
    // default simple clock with current hours and minutes from local date
    if (this.getTimeFunction === this._defaultGetTimeFunction) {
      const hours = this._currentTime.hours < 10 ?
        `0${this._currentTime.hours}` : `${this._currentTime.hours}`;
      const minutes = this._currentTime.minutes < 10 ?
        `0${this._currentTime.minutes}` : `${this._currentTime.minutes}`;

      return html`
        <div style="
          width: ${this.width}px;
          height: ${this.height}px;
          line-height: ${this.height}px;
          font-size: ${this.fontSize}px;
          opacity: 0.6;
        ">
             <span>${hours}</span><!--
          --><span style="visibility: ${visibility};">:</span><!--
          --><span>${minutes}</span>
        </div>
      `;
    }

    // user defined clock, format hh:mm:ss:msec
    // @todo - allow to change the format
    const now = this.getTimeFunction();
    const time = Number.isFinite(now) ? now : 0;
    const { sign, hours, minutes, seconds, milliseconds } = getFormattedTimeInfos(time);

    const millis = parseInt(milliseconds) / 1000;

    let visibility = 'visible';
    if (this.twinkle && millis >= this.twinkle[0] && millis < this.twinkle[1]) {
      visibility = 'hidden';
    }

    // 0 is always visible (weird on stop)
    if (millis === 0) {
      visibility = 'visible';
    }

    const opacity = time === 0 ? 0.3 : 1;

    // the HTML comments are weird, but prevent browsers to add
    // spaces between the <span> elements
    return html`
      <div style="
        width: ${this.width}px;
        height: ${this.height}px;
        line-height: ${this.height}px;
        font-size: ${this.fontSize}px;
        opacity: ${opacity};
      ">
           ${sign ? html`<span>${sign}</span>` : nothing}<!--
        --><span>${hours}</span><!--
        --><span style="visibility: ${visibility};">:</span><!--
        --><span>${minutes}</span><!--
        --><span style="visibility: ${visibility};">:</span><!--
        --><span>${seconds}</span><!--
        --><span style="visibility: ${visibility};">:</span><!--
        --><span>${milliseconds}</span>
      </div>
    `;
  }

  _render() {
    if (this.getTimeFunction === this._defaultGetTimeFunction) {
      const now = this.getTimeFunction();

      if (now.hours !== this._currentTime.hours || now.minutes !== this._currentTime.minutes) {
        this._currentTime = now;
        this.requestUpdate();
      }
    } else {
      // user defined clock
      this.requestUpdate();
    }

    this.requestUpdate();
    this._rafId = requestAnimationFrame(() => this._render());
  }

  connectedCallback() {
    super.connectedCallback();
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
