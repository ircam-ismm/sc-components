import { html, css, svg, nothing } from 'lit';
import { 
  linearScale, 
  exponentialScale, 
  logarithmicScale 
} from '@ircam/sc-utils';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';
import midiControlled from './mixins/midi-controlled.js';
import './sc-speed-surface.js';

// from https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle/18473154#18473154
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');

  return d;
}

class ScDialBase extends ScElement {
  static properties = {
    min: {
      type: Number,
      reflect: true,
    },
    max: {
      type: Number,
      reflect: true,
    },
    value: {
      type: Number,
    },
    mode: {
      type: String,
      reflect: true,
    },
    modeBasis: {
      type: Number,
      reflect: true,
      attribute: 'mode-basis',
    },
    unit: {
      type: String,
      reflect: true,
    },
    hideValue: {
      type: Boolean,
      reflect: true,
      attribute: 'hide-value',
    },
    numDecimals: {
      type: Number,
      attribute: 'num-decimals',
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  }

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      width: 50px;
      height: 50px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      font-size: 0;
      line-height: 0;

      --sc-dial-color: var(--sc-color-secondary-1);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    path.bg {
      stroke: #fff;
      stroke-width: 3px;
      fill: transparent;
    }

    path.fg {
      stroke: var(--sc-dial-color);
      stroke-width: 4px;
      fill: transparent;
    }

    line {
      stroke-width: 3px;
      stroke: var(--sc-dial-color);
      stroke-linecap: butt;
    }

    sc-speed-surface {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    p {
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 100%;
      height: 12px;
      line-height: 12px;
      color: var(--sc-color-primary-5);
      font-size: 8px;
      margin: 0;
      text-align: center;
      user-select: none;
      webkit-user-select: none;
      webkit-touch-callout: none;
    }
  `;

  get min() {
    return this._min;
  }

  set min(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot set property 'min' on sc-dial: value (${value}) is not a finite value`);
    }
    // workaround weird display issue when min and max are equal
    if (value === this.max) {
      value -= 1e-10;
    }

    this._min = value;
    this._updateScales();
    this.requestUpdate();
  }

  get max() {
    return this._max;
  }

  set max(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot set property 'max' on sc-dial: value (${value}) is not a finite value`);
    }
    // workaround weird display issue when min and max are equal
    if (value === this.min) {
      value += 1e-10;
    }

    this._max = value;
    this._updateScales();
    this.requestUpdate();
  }

  get value() {
    return this._normToValue(this._normValue);
  }

  set value(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot set property 'value' on sc-dial: value (${value}) is not a finite value`);
    }

    this._normValue = this._valueToNorm(value);
    this.requestUpdate();
  }

  get mode() {
    return this._mode;
  }

  set mode(value) {
    if (!['lin', 'exp', 'log', 'linear', 'exponential', 'logarithmic'].includes(value)) {
      throw new TypeError(`Cannot set property 'value' on sc-dial: value (${value}) is not a valid enum value of ['lin', 'exp', 'log']`);
    }

    this._mode = value;
    this._updateScales();
    this.requestUpdate();
  }

  // midi-learn interface
  get midiType() {
    return "control";
  }

  set midiValue(value) {
    this._normValue = value / 127;

    this.requestUpdate();
    this._dispatchInputEvent();

    clearTimeout(this._midiValueTimeout);
    // triger change after some timeout
    this._midiValueTimeout = setTimeout(() => {
      this._dispatchChangeEvent();
    }, 500);
  }

  get midiValue() {
    return Math.round(this._normValue * 127);
  }

  constructor() {
    super();

    this._min = 0;
    this._max = 1;
    this._normValue = 0;
    this._minAngle = -140;
    this._maxAngle = 140;
    this._mode = 'lin';

    this.min = 0;
    this.max = 1;
    this.value = 0;
    this.modeBasis = 2;
    this.mode = 'lin';
    this.hideValue = false;
    this.disabled = false;
    this.numDecimals = 2;

    this._midiValueTimeout = null;

    this._normValueToAngleScale = linearScale(0, 1, this._minAngle, this._maxAngle);
    this._pixelToDiffScale = linearScale(0, 15, 0, 1);
    this._updateScales();

    this.keyboard = new KeyboardController(this, {
      filterCodes: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
      callback: this._onKeyboardEvent.bind(this),
    });
  }

  render() {
    const radius = 32;
    const cx = 50;
    const cy = this.hideValue ? 54 : 42;

    const angle = this._normValueToAngleScale(this._normValue); // computed from value
    const position = polarToCartesian(cx, cy, radius + 2, angle); // + 2  is half path stroke-width

    // prevent default to prevent focus when disabled
    return html`
      <div
        @mousedown=${e => e.preventDefault()}
        @touchstart=${e => e.preventDefault()}
        @dblclick=${this._resetValue}>
        <svg viewbox="0 0 100 100">
          <path
            class="bg"
            d="${describeArc(cx, cy, radius, Math.min(this._maxAngle, angle + 8), this._maxAngle)}"
          />
          <path
            class="fg"
            d="${describeArc(cx, cy, radius, this._minAngle, angle)}"
          />
          <line x1=${cx} y1=${cy} x2=${position.x} y2=${position.y} />
        </svg>

        ${!this.hideValue
          ? html`<p>${this.value.toFixed(this.numDecimals)}${this.unit ? ` ${this.unit}` : nothing}</p>`
          : nothing
        }

        <sc-speed-surface @input=${this._updateValue}></sc-speed-surface>
      </div>
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

  _updateScales() {
    // get current "real" value to recompute norm based on updated scales
    const currentValue = this._normToValue ? this._normToValue(this._normValue) : 0;

    switch (this._mode) {
      case 'lin':
      case 'linear':
        this._normToValue = linearScale(0, 1, this.min, this.max, true);
        this._valueToNorm = linearScale(this.min, this.max, 0, 1, true);
        break;
      case 'exp':
      case 'exponential':
        this._normToValue = exponentialScale(0, 1, this.min, this.max, this.modeBasis, true);
        this._valueToNorm = logarithmicScale(this.min, this.max, 0, 1, this.modeBasis, true);
        break;
      case 'log':
      case 'logarithmic':
        this._normToValue = logarithmicScale(0, 1, this.min, this.max, this.modeBasis, true);
        this._valueToNorm = exponentialScale(this.min, this.max, 0, 1, this.modeBasis, true);
        break;
    }

    this._normValue = this._valueToNorm(currentValue);
  }

  _onKeyboardEvent(e) {
    if (this.disabled) { return; }

    switch (e.type) {
      case 'keydown': {
        const incr = 1 / (e.shiftKey ? 10 : 100);

        if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
          this._normValue = Math.min(1, Math.max(0, this._normValue + incr));
        } else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
          this._normValue = Math.min(1, Math.max(0, this._normValue - incr));
        }

        this.requestUpdate();
        this._dispatchInputEvent();
        break;
      }
      case 'keyup': {
        this._dispatchChangeEvent();
        break;
      }
    }
  }

  _resetValue(e) {
    e.preventDefault(); // important to prevent focus when disabled
    if (this.disabled) { return; }

    this.focus();
    this._normValue = 0;

    this.requestUpdate();
    this._dispatchInputEvent();
    this._dispatchChangeEvent();
  }

  _updateValue(e) {
    e.preventDefault(); // important to prevent focus when disabled
    e.stopPropagation(); // stop prepagation of `sc-speed-surface` event
    if (this.disabled) { return; }

    this.focus();

    if (e.detail.pointerId !== null) {
      // ignore very small movements
      if (Math.abs(e.detail.dy) < 0.02) {
        return;
      }

      const lastValue = this._normValue;

      const sign = e.detail.dy < 0 ? -1 : 1;
      const diff = this._pixelToDiffScale(e.detail.dy);

      this._normValue = Math.min(1, Math.max(0, this._normValue + diff));

      this.requestUpdate();
      this._dispatchInputEvent();
    } else {
      this._dispatchChangeEvent();
    }
  }

  _dispatchInputEvent() {
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);
  }

  _dispatchChangeEvent() {
    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);
  }
}

const ScDial = midiControlled('ScDial', ScDialBase);

if (customElements.get('sc-dial') === undefined) {
  customElements.define('sc-dial', ScDial);
}

export default ScDial;
