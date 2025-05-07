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
    mode: {
      type: String,
      reflect: true,
    },
    modeBase: {
      type: Number,
      reflect: true,
      attribute: 'mode-base',
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
      overflow: hidden;

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

  #normValue = 0.5;
  #min = 0;
  #max = 1;
  #step = 1e-3;
  #mode = 'lin';
  #modeBase = 2;
  #curve = null;
  #pointerId = null;
  #normToValue = null;
  #valueToNorm = null;
  #tabindex = 0;
  // for relative interaction
  #startPointerValue = null;
  #startSliderValue = null;
  #midiValueTimeout = null;


  get value() {
    const value = this.#normToValue(this.#normValue);
    return NP.times(Math.round(value / this.#step), this.#step);
  }

  set value(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot set property 'value' on sc-slider: value (${value}) is not a finite value`);
    }

    this.#normValue = this.#valueToNorm(value);
    this.requestUpdate();
  }


  get min() {
    return this.#min;
  }

  set min(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot set property 'min' on sc-slider: value (${value}) is not a finite value`);
    }

    const oldValue = this.#min;
    this.#min = value;
    this.#updateScales();
    this.requestUpdate('min', oldValue);
  }

  get max() {
    return this.#max;
  }

  set max(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Cannot set property 'max' on sc-slider: value (${value}) is not a finite value`);
    }

    const oldValue = this.#max;
    this.#max = value;
    this.#updateScales();
    this.requestUpdate('max', oldValue);
  }

  get step() {
    return this.#step;
  }

  set step(value) {
    if (!Number.isFinite(value) && value <= 0) {
      throw new TypeError(`Cannot set property 'step' on sc-slider: value (${value}) is not a strictly positive number`);
    }

    const oldValue = this.#step;
    this.#step = value;
    this.#updateScales();
    this.requestUpdate('step', oldValue);
  }

  get mode() {
    return this.#mode;
  }

  set mode(value) {
    if (!['lin', 'exp', 'log', 'linear', 'exponential', 'logarithmic'].includes(value)) {
      throw new TypeError(`Cannot set property 'mode' on sc-dial: value (${value}) is not a valid enum value of ['lin', 'exp', 'log']`);
    }

    this.#mode = value;
    this.#updateScales();
    this.requestUpdate();
  }

  get modeBase() {
    return this.#modeBase;
  }

  set modeBase(value) {
    if (value <= 0) {
      throw new TypeError(`Cannot set property 'modeBase' on sc-slider: value (${value}) is not a strictly positive number`);
    }

    this.#modeBase = value;
    this.#updateScales();
    this.requestUpdate();
  }

  get curve() {
    return this.#curve;
  }

  set curve(value) {
    if (!isSequence(value)) {
      this.#curve = null;
    }

    this.#curve = value;
    this.#min = this.#curve[0];
    this.#max = this.#curve[this.#curve.length - 1];
    this.#updateScales();
    this.requestUpdate();
  }

  // midi-learn interface
  get midiType() {
    return "control";
  }

  set midiValue(value) {
    this.#normValue = value / 127;

    this.requestUpdate();
    this.#dispatchInputEvent();

    clearTimeout(this.#midiValueTimeout);
    // trigger change after some timeout
    this.#midiValueTimeout = setTimeout(() => {
      this.#dispatchChangeEvent();
    }, 500);
  }

  get midiValue() {
    return Math.round(this.#normValue * 127);
  }

  constructor() {
    super();

    this.orientation = 'horizontal';
    this.relative = false;
    this.numberBox = false;
    this.disabled = false;

    this.#updateScales();

    this.keyboard = new KeyboardController(this, {
      filterCodes: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
      callback: this.#onKeyboardEvent.bind(this),
    });

    this.#updateScales();
  }

  render() {
    const svgSize = 1000;
    // apply step for display
    const sliderSize = this.#valueToNorm(this.value) * svgSize;
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
          @input=${this.#onPositionInput}
          @pointerend=${this.#onPositionChange}
        ></sc-position-surface>
      </div>
      ${this.numberBox
        ? html`
          <sc-number
            min=${this.min}
            max=${this.max}
            value=${this.value}
            @input=${this.#onNumberBoxInput}
            @change=${this.#onNumberBoxChange}
          ></sc-number>
        `
        : nothing
      }
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      const tabindex = this.disabled ? -1 : this.#tabindex;
      this.setAttribute('tabindex', tabindex);

      if (this.disabled) { this.blur(); }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // @note - this is important if the component is e.g. embedded in another component
    this.#tabindex = this.getAttribute('tabindex') || 0;
  }

  #updateScales() {
    // get current "real" value to recompute norm based on updated scales
    const currentValue = this.#normToValue ? this.#normToValue(this.#normValue) : this.#normValue;

    if (this.#curve !== null) {
      this.#normToValue = normalizedToTableScale(this.#curve);
      this.#valueToNorm = tableToNormalizedScale(this.#curve);
    } else {
      switch (this.#mode) {
        case 'lin':
        case 'linear':
          this.#normToValue = linearScale(0, 1, this.min, this.max, true);
          this.#valueToNorm = linearScale(this.min, this.max, 0, 1, true);
          break;
        case 'exp':
        case 'exponential':
          this.#normToValue = exponentialScale(0, 1, this.min, this.max, this.#modeBase, true);
          this.#valueToNorm = logarithmicScale(this.min, this.max, 0, 1, this.#modeBase, true);
          break;
        case 'log':
        case 'logarithmic':
          this.#normToValue = logarithmicScale(0, 1, this.min, this.max, this.#modeBase, true);
          this.#valueToNorm = exponentialScale(this.min, this.max, 0, 1, this.#modeBase, true);
          break;
      }
    }

    this.#normValue = this.#valueToNorm(currentValue);
  }

  #onKeyboardEvent(e) {
    if (this.disabled) { return; }

    switch (e.type) {
      case 'keydown': {
        const incr = 1 / (e.shiftKey ? 10 : 100);

        if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
          this.#normValue = Math.min(1, Math.max(0, this.#normValue + incr));
        } else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
          this.#normValue = Math.min(1, Math.max(0, this.#normValue - incr));
        }

        this.requestUpdate();
        this.#dispatchInputEvent();
        break;
      }
      case 'keyup': {
        this.#dispatchChangeEvent();
        break;
      }
    }
  }

  #onNumberBoxInput(e) {
    e.stopPropagation(); // stop event propagation from sc-number
    if (this.disabled) { return; }

    this.#normValue = this.#valueToNorm(e.detail.value);
    this.requestUpdate();
    this.#dispatchInputEvent();
  }

  #onNumberBoxChange(e) {
    e.stopPropagation(); // stop event propagation from sc-number
    if (this.disabled) { return; }

    this.#normValue = this.#valueToNorm(e.detail.value);
    this.requestUpdate();
    this.#dispatchChangeEvent();
  }

  #onPositionInput(e) {
    e.stopPropagation(); // stop event propagation from sc-position-surface
    if (this.disabled) { return; }

    this.focus();

    if (
      e.detail.value[0] &&
      (this.#pointerId === null || e.detail.value[0].pointerId === this.#pointerId)
    ) {
      const { x, y, pointerId } = e.detail.value[0];
      const normValue = this.orientation === 'horizontal' ? x : y;

      if (this.#pointerId === null) {
        this.#startPointerValue = normValue;
        this.#startSliderValue = this.#normValue;
      }

      this.#pointerId = pointerId;

      const oldValue = this.value;

      if (this.relative) {
        const diff = normValue - this.#startPointerValue;
        this.#normValue = Math.min(1, Math.max(0, this.#startSliderValue + diff));
      } else {
        this.#normValue = Math.min(1, Math.max(0, normValue));
      }

      const newValue = this.value;
      // dispatch input event only if value changed with step applied
      if (oldValue !== newValue) {
        this.requestUpdate();
        this.#dispatchInputEvent();
      }
    }
  }

  #onPositionChange(e) {
    e.stopPropagation(); // stop event propagation from sc-position-surface
    if (this.disabled) { return; }

    if (e.detail.pointerId === this.#pointerId) {
      this.#pointerId = null;
      this.#dispatchChangeEvent();
    }
  }

  #dispatchInputEvent() {
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);
  }

  #dispatchChangeEvent() {
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
