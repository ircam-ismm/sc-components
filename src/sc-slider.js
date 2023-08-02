import { html, svg, css, nothing } from 'lit';
import ScElement from './ScElement.js';

import midiLearn from './mixins/midi-learn.js';
import getScale from './utils/get-scale.js';
import getClipper from './utils/get-clipper.js';

import './sc-position-surface.js';
import './sc-number.js';

class ScSlider extends ScElement {
  static properties = {
    min: {
      type: Number,
      reflect: true,
    },
    max: {
      type: Number,
      reflect: true,
    },
    step: {
      type: Number,
      reflect: true,
    },
    value: {
      type: Number,
    },
    orientation: {
      type: String,
      reflect: true,
    },
    relative: {
      type: Boolean,
      reflect: true,
    },
    numberBox: {
      type: Boolean,
      reflect: true,
      attribute: 'number-box',
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: inline-flex;
      box-sizing: border-box;
      vertical-align: top;
      border: 1px solid var(--sc-color-primary-3);
      font-size: 0;

      --sc-slider-background-color: var(--sc-color-primary-2);
      --sc-slider-foreground-color: var(--sc-color-primary-5);
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

    :host([orientation="horizontal"]) {
      flex-direction: row;
      height: 30px;
      width: 200px;
    }

    :host([orientation="vertical"]) {
      flex-direction: column;
      height: 200px;
      width: 30px;
    }

    :host([number-box][orientation="horizontal"]) {
      width: 280px;
    }

    :host([number-box][orientation="vertical"]) {
      width: 80px;
    }

    :host([number-box][orientation="horizontal"]) .slider {
      width: calc(100% - 80px);
    }

    :host([number-box][orientation="vertical"]) .slider {
      flex-direction: column;
      height: calc(100% - 30px);
    }

    .slider {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: relative;
      display: inline-block;
    }

    svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    rect.background {
      fill: var(--sc-slider-background-color);
    }

    rect.foreground {
      fill: var(--sc-slider-foreground-color);
    }

    sc-position-surface {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    sc-number {
      display: inline-block;
      width: 80px;
      height: 100%;
      border: none;
    }

    :host([number-box][orientation="vertical"]) sc-number {
      display: block;
      height: 30px;
      width: 100%;
    }
  `;

  get min() {
    return this._min;
  }

  set min(value) {
    this._min = value;
    this._updateScales();
  }

  get max() {
    return this._max;
  }

  set max(value) {
    this._max = value;
    this._updateScales();
  }

  get step() {
    return this._step;
  }

  set step(value) {
    this._step = value;
    this._updateScales();
  }

  // midi-learn interface
  set midiValue(value) {
    const newValue = (this.max - this.min) * value / 127. + this.min;

    this.value = this._clipper(newValue);

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

    this._scale = null;
    this._clipper = null;

    this._min = 0;
    this._max = 1;
    this._step = 1e-3;

    // this.mode = 'jump'; // @todo: relative
    this.min = 0;
    this.max = 1;
    this.step = 1e-3;
    this.value = 0.5;
    this.orientation = 'horizontal';
    this.relative = false;
    this.numberBox = false;

    this._pointerId = null;
    // for relative interaction
    this._startPointerValue = null;
    this._startSliderValue = null;

    this._midiValueTimeout = null;
  }

  render() {
    const size = Math.max(0, this._scale(this.value));

    return html`
      <div class="slider">
        <svg viewbox="0 0 1000 1000" preserveAspectRatio="none">
          ${this.orientation === 'horizontal'
            ? svg`
                <rect class="background" width="1000" height="1000"></rect>
                <rect class="foreground" width="${size}" height="1000"></rect>
              `
            : svg`
                <rect class="foreground" width="1000" height="1000"></rect>
                <rect class="background" width="1000" height="${1000 - size}"></rect>
              `
          }
        </svg>
        <sc-position-surface
          x-range=${JSON.stringify([this.min, this.max])}
          y-range=${JSON.stringify([this.max, this.min])}
          clamp
          @input=${this._onPositionInput}
          @pointerend=${this._onPositionChange}
        ></sc-position-surface>
      </div>
      ${this.numberBox
        ? html`
          <sc-number
            min=${this.min}
            max=${this.max}
            value=${this.value}
            @input=${this._onNumberBoxInput}
            @change=${this._onNumberBoxChange}
          ></sc-number>
        `
        : nothing
      }
    `;
  }

  updated(changedProperties) {
    this.disabled ? this.removeAttribute('tabindex') : this.setAttribute('tabindex', 0);
  }

  _updateScales() {
    if (this._max < this._min) {
      const tmp = this._max;
      this._max = this._min;
      this._min = tmp;
    }

    // define transfert functions and scales
    this._scale = getScale([this._min, this._max], [0, 1000]); // 0 1000 is the svg viewport
    this._clipper = getClipper(this._min, this._max, this._step);
    // clean current value
    this.value = this._clipper(this.value);
  }

  _onNumberBoxInput(e) {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.value = this._clipper(e.detail.value);
    this._dispatchInputEvent();
  }

  _onNumberBoxChange(e) {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.value = this._clipper(e.detail.value);
    this._dispatchChangeEvent();
  }

  _onPositionChange(e) {
    if (this.disabled) {
      return;
    }

    if (e.detail.pointerId === this._pointerId) {
      this._pointerId = null;
      this._dispatchChangeEvent();
    }
  }

  _onPositionInput(e) {
    // stop propagation of event from sc-position-surface
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    if (this.relative) {
      // consider only first pointer in list, we don't want a multitouch slider...
      if (
        e.detail.value[0] &&
        (this._pointerId === null || e.detail.value[0].pointerId === this._pointerId)
      ) {
        const { x, y, pointerId } = e.detail.value[0];
        const value = this.orientation === 'horizontal' ? x : y;

        if (this._pointerId === null) {
          this._startPointerValue = value;
          this._startSliderValue = this.value;
        }

        this._pointerId = pointerId;

        const diff = value - this._startPointerValue;

        this.value = this._clipper(this._startSliderValue + diff);
        this._dispatchInputEvent();
      }
    } else {
      // consider only first pointer in list, we don't want a multitouch slider...
      if (
        e.detail.value[0] &&
        (this._pointerId === null || e.detail.value[0].pointerId === this._pointerId)
      ) {
        const { x, y, pointerId } = e.detail.value[0];
        const value = this.orientation === 'horizontal' ? x : y;

        this._pointerId = pointerId;

        this.value = this._clipper(value);
        this._dispatchInputEvent();
      }
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

if (customElements.get('sc-slider') === undefined) {
  customElements.define('sc-slider', midiLearn('ScSlider', ScSlider));
}

export default ScSlider;
