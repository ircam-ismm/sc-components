import { html, css, svg, nothing } from 'lit';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';
import midiLearn from './mixins/midi-learn.js';
import getScale from './utils/get-scale.js';
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

class ScDial extends ScElement {
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
    unit: {
      type: String,
      reflect: true,
    },
    hideValue: {
      type: Boolean,
      reflect: true,
      attribute: 'hide-value',
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
      user-select: none
    }
  `;

  get min() {
    return this._min;
  }

  set min(value) {
    // workaround weird display issue when min and max are equal
    if (value === this.max) {
      value -= 1e-10;
    }

    this._min = value;
    // clamp value
    this.value = this.value;
    // update scales
    this._updateScales();
    this.requestUpdate();
  }

  get max() {
    return this._max;
  }

  set max(value) {
    // workaround weird display issue when min and max are equal
    if (value === this.min) {
      value += 1e-10;
    }

    this._max = value;
    // clamp value
    this.value = this.value;
    // update scales
    this._updateScales();
    this.requestUpdate();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = Math.max(this.min, Math.min(this.max, value));
    this.requestUpdate();
  }

  // midi-learn interface
  set midiValue(value) {
    this.value = (this.max - this.min) * value / 127. + this.min;

    this._dispatchInputEvent();

    clearTimeout(this._midiValueTimeout);
    // triger change after some timeout
    this._midiValueTimeout = setTimeout(() => {
      this._dispatchChangeEvent();
    }, 500);
  }

  get midiValue() {
    return Math.round((this.value - this.min) / (this.max - this.min) * 127.);
  }

  constructor() {
    super();

    this._min = 0;
    this._max = 0;
    this._value = 0;
    this._minAngle = -140;
    this._maxAngle = 140;

    this.max = 1; // set max before min is important to avoid workaround in setters
    this.min = 0;
    this.value = 0;
    this.hideValue = false;
    this.disabled = false;

    this._midiValueTimeout = null;

    this.keyboard = new KeyboardController(this, {
      filterCodes: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
      callback: this._onKeyboardEvent.bind(this),
    });
  }

  render() {
    const radius = 32;
    const cx = 50;
    const cy = this.hideValue ? 54 : 42;

    const angle = this._valueToAngleScale(this.value); // computed from value
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
          ? html`<p>${this.value.toFixed(2)}${this.unit ? ` ${this.unit}` : nothing}</p>`
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
    this._valueToAngleScale = getScale([this.min, this.max], [this._minAngle, this._maxAngle]);
    this._pixelToDiffScale = getScale([0, 15], [0, this.max - this.min]);
  }

  _onKeyboardEvent(e) {
    if (this.disabled) { return; }

    switch (e.type) {
      case 'keydown': {
        // arbitrary MIDI like delta increment,
        const incr = Number.isFinite(this.min) && Number.isFinite(this.max)
          ? (this.max - this.min) / 100 : 1;

        if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
          this.value += incr;
        } else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
          this.value -= incr;
        }

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
    this.value = this.min;
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

      const lastValue = this._value;

      const sign = e.detail.dy < 0 ? -1 : 1;
      const diff = this._pixelToDiffScale(e.detail.dy);
      // const diff = e.detail.dy * 10;
      // console.log('updateValue', e.detail.dy, diff);
      this.value += diff;
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

if (customElements.get('sc-dial') === undefined) {
  customElements.define('sc-dial', midiLearn('ScDial', ScDial));
}

export default ScDial;
