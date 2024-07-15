import { html, svg, css, nothing } from 'lit';
import NP from 'number-precision';
import {
  linearScale,
  exponentialScale,
  logarithmicScale,
  normalizedToTableScale,
  tableToNormalizedScale,
  isSequence,
} from '@ircam/sc-utils';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';
import midiControlled from './mixins/midi-controlled.js';
import './sc-position-surface.js';
import './sc-number.js';

class ScSliderBase extends ScElement {
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

  get value() {
    const value = this._normToValue(this._normValue);
    return NP.times(Math.round(value / this.step), this.step);
  }

  set value(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot set property 'value' on sc-slider: value (${value}) is not a finite value`);
    }

    this._normValue = this._valueToNorm(value);
    this.requestUpdate();
  }


  get min() {
    return this._min;
  }

  set min(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot set property 'min' on sc-slider: value (${value}) is not a finite value`);
    }

    const oldValue = this._min;
    this._min = value;
    this._updateScales();
    this.requestUpdate('min', oldValue);
  }

  get max() {
    return this._max;
  }

  set max(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot set property 'max' on sc-slider: value (${value}) is not a finite value`);
    }

    const oldValue = this._max;
    this._max = value;
    this._updateScales();
    this.requestUpdate('max', oldValue);
  }

  get step() {
    return this._step;
  }

  set step(value) {
    if (!Number.isFinite(value) && value <= 0) {
      throw new TypeError(`Cannot set property 'step' on sc-slider: value (${value}) is not a strictly positive number`);
    }

    const oldValue = this._step;
    this._step = value;
    this._updateScales();
    this.requestUpdate('step', oldValue);
  }

  get mode() {
    return this._mode;
  }

  set mode(value) {
    if (!['lin', 'exp', 'log', 'linear', 'exponential', 'logarithmic'].includes(value)) {
      throw new TypeError(`Cannot set property 'mode' on sc-dial: value (${value}) is not a valid enum value of ['lin', 'exp', 'log']`);
    }

    this._mode = value;
    this._updateScales();
    this.requestUpdate();
  }

  get modeBase() {
    return this._modeBase;
  }

  set modeBase(value) {
    if (value <= 0) {
      throw new TypeError(`Cannot set property 'modeBase' on sc-slider: value (${value}) is not a strictly positive number`);
    }

    this._modeBase = value;
    this._updateScales();
    this.requestUpdate();
  }

  get lookupTable() {
    return this._lookupTable;
  }

  set lookupTable(value) {
    if (!isSequence(value)) {
      this._lookupTable = null;
    }

    this._lookupTable = value;
    this._updateScales();
    this.requestUpdate();
  }

  // midi-learn interface
  get midiType() {
    return "control";
  }

  set midiValue(value) {
    this._normValue = Math.round(value / 127);

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

    this._normValue = 0.5;
    this._min = 0;
    this._max = 1;
    this._step = 1e-3;
    this._mode = 'lin';
    this._modeBase = 2;
    this._lookupTable = null;

    this.orientation = 'horizontal';
    this.relative = false;
    this.numberBox = false;
    this.disabled = false;

    this._pointerId = null;
    // for relative interaction
    this._startPointerValue = null;
    this._startSliderValue = null;
    this._midiValueTimeout = null;

    this._updateScales();

    this.keyboard = new KeyboardController(this, {
      filterCodes: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
      callback: this._onKeyboardEvent.bind(this),
    });

    this._updateScales();
  }

  render() {
    const svgSize = 1000;
    const sliderSize = this._normValue * svgSize;
    const xRange = [0, 1];
    const yRange = [1, 0];

    // prevent focus when disabled
    return html`
      <div
        @mousedown=${e => e.preventDefault()}
        @touchstart=${e => e.preventDefault()}
        class="slider"
      >
        <svg viewbox="0 0 1000 1000" preserveAspectRatio="none">
          ${this.orientation === 'horizontal'
            ? svg`
                <rect class="background" width=${svgSize} height=${svgSize}></rect>
                <rect class="foreground" width="${sliderSize}" height=${svgSize}></rect>
              `
            : svg`
                <rect class="foreground" width=${svgSize} height=${svgSize}></rect>
                <rect class="background" width=${svgSize} height="${svgSize - sliderSize}"></rect>
              `
          }
        </svg>
        <sc-position-surface
          .xRange=${xRange}
          .yRange=${yRange}
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
    const currentValue = this._normToValue ? this._normToValue(this._normValue) : this._normValue;

    if (this._lookupTable !== null) {
      this._normToValue = normalizedToTableScale(this._lookupTable);
      this._valueToNorm = tableToNormalizedScale(this._lookupTable);
    } else {
      switch (this._mode) {
        case 'lin':
        case 'linear':
          this._normToValue = linearScale(0, 1, this.min, this.max, true);
          this._valueToNorm = linearScale(this.min, this.max, 0, 1, true);
          break;
        case 'exp':
        case 'exponential':
          this._normToValue = exponentialScale(0, 1, this.min, this.max, this._modeBase, true);
          this._valueToNorm = logarithmicScale(this.min, this.max, 0, 1, this._modeBase, true);
          break;
        case 'log':
        case 'logarithmic':
          this._normToValue = logarithmicScale(0, 1, this.min, this.max, this._modeBase, true);
          this._valueToNorm = exponentialScale(this.min, this.max, 0, 1, this._modeBase, true);
          break;
      }
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

  _onNumberBoxInput(e) {
    e.stopPropagation(); // stop event propagation from sc-number
    if (this.disabled) { return; }

    this._normValue = this._valueToNorm(e.detail.value);
    this._dispatchInputEvent();
  }

  _onNumberBoxChange(e) {
    e.stopPropagation(); // stop event propagation from sc-number
    if (this.disabled) { return; }

    this._normValue = this._valueToNorm(e.detail.value);
    this._dispatchChangeEvent();
  }

  _onPositionInput(e) {
    e.stopPropagation(); // stop event propagation from sc-position-surface
    if (this.disabled) { return; }

    this.focus();

    if (
      e.detail.value[0] &&
      (this._pointerId === null || e.detail.value[0].pointerId === this._pointerId)
    ) {
      const { x, y, pointerId } = e.detail.value[0];
      const normValue = this.orientation === 'horizontal' ? x : y;

      if (this._pointerId === null) {
        this._startPointerValue = normValue;
        this._startSliderValue = this._normValue;
      }

      this._pointerId = pointerId;

      if (this.relative) {
        const diff = normValue - this._startPointerValue;
        this._normValue = Math.min(1, Math.max(0, this._startSliderValue + diff));
      } else {
        this._normValue = Math.min(1, Math.max(0, normValue));
      }

      this.requestUpdate();
      this._dispatchInputEvent();
    }
  }

  _onPositionChange(e) {
    e.stopPropagation(); // stop event propagation from sc-position-surface
    if (this.disabled) { return; }

    if (e.detail.pointerId === this._pointerId) {
      this._pointerId = null;
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

// apply midi learn mixin
const ScSlider = midiControlled('ScSlider', ScSliderBase)

if (customElements.get('sc-slider') === undefined) {
  customElements.define('sc-slider', ScSlider);
}

export default ScSlider;
