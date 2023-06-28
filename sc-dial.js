import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import getScale from './utils/getScale.js';
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
    showValue: {
      type: Boolean,
      reflect: true,
      attribute: 'show-value',
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  }

  static styles = css`
    :host {
      display: inline-block;
      width: 50px;
      height: 50px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-1);
      font-size: 0;
      line-height: 0;
      position: relative;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-4);
    }

    path.bg {
      stroke: #fff;
      stroke-width: 3px;
      fill: transparent;
    }

    path.fg {
      stroke: var(--sc-color-secondary-1);
      stroke-width: 4px;
      fill: transparent;
    }

    line {
      stroke-width: 3px;
      stroke: var(--sc-color-secondary-1);
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
      color: var(--sc-color-primary-4);
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

  constructor() {
    super();

    this._min = 0;
    this._max = 0;
    this._value = 0;
    this._minAngle = -140;
    this._maxAngle = 140;

    this.min = 0;
    this.max = 1;
    this.value = 0;
    this.showValue = true;
    this.disabled = false;
  }

  render() {
    const radius = 32;
    const cx = 50;
    const cy = this.showValue ? 42 : 50;

    const angle = this._valueToAngleScale(this.value); // computed from value
    const position = polarToCartesian(cx, cy, radius + 2, angle); // + 2  is half path stroke-width

    return html`
      <div
        @contextmenu=${this._preventContextMenu}
        @dblclick=${this._resetValue}
        @keydown=${this._onKeypress}
        @keyup=${this._onKeyup}
      >
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
        ${this.showValue
          ? html`<p>${this.value.toFixed(2)}${this.unit ? ` ${this.unit}` : nothing}</p>`
          : nothing
        }

        <sc-speed-surface @input=${this._updateValue}></sc-speed-surface>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }
  }

  _updateScales() {
    this._valueToAngleScale = getScale([this.min, this.max], [this._minAngle, this._maxAngle]);
    this._pixelToDiffScale = getScale([0, 15], [0, this.max - this.min]);
  }

  _onKeypress(e) {
    console.log(e.key.code);
  }

  _onKeyup(e) {
    console.log(e.key.code);
  }

  _resetValue(e) {
    // stop prepagation of `sc-speed-surface` event
    e.preventDefault();
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.value = this.min;

    ['input', 'change'].forEach(eventName => {
      const event = new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(event);
    });
  }

  _updateValue(e) {
    // stop prepagation of `sc-speed-surface` event
    e.preventDefault();
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

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

      const event = new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(event);
    } else {
      // propagate change event
      const event = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(event);
    }
  }
}

if (customElements.get('sc-dial') === undefined) {
  customElements.define('sc-dial', ScDial);
}

export default ScDial;
