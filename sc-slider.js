import { html, svg, css, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';
import getScale from './utils/getScale.js';
import getClipper from './utils/getClipper.js';

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
      display: inline-block;
      box-sizing: border-box;
      width: 200px;
      height: 30px;
      vertical-align: top;

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
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: relative;
      display: inline-block;
      border: 1px solid var(--sc-color-primary-3);
    }

    :host([number-box][orientation="horizontal"]) div {
      width: calc(100% - 86px);
    }

    :host([number-box][orientation="vertical"]) div {
      height: calc(100% - 36px);
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
    }

    :host([number-box][orientation="vertical"]) sc-number {
      display: block;
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

  set midiValue(value) {
    const newValue = (this.max - this.min) * value / 127. + this.min;

    this.value = this._clipper(newValue);

    const inputEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(inputEvent);

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(changeEvent);
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
  }

  render() {
    const size = Math.max(0, this._scale(this.value));

    return html`
      <div @contextmenu=${this._preventContextMenu}>
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
          @input=${this._onInput}
          @pointerend=${this._onChange}
        ></sc-position-surface>
      </div>
      ${this.numberBox
        ? html`
          <sc-number
            min=${this.min}
            max=${this.max}
            value=${this.value}
            @input=${this._onNumberBoxChange}
          ></sc-number>
        `
        : nothing
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }
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

  _onNumberBoxChange(e) {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.value = this._clipper(e.detail.value);

    const inputEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(inputEvent);

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(changeEvent);
  }

  _onChange(e) {
    if (this.disabled) {
      return;
    }

    if (e.detail.pointerId === this._pointerId) {
      this._pointerId = null;

      const event = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(event);
    }
  }

  _onInput(e) {
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

        const event = new CustomEvent('input', {
          bubbles: true,
          composed: true,
          detail: { value: this.value },
        });

        this.dispatchEvent(event);
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

        const event = new CustomEvent('input', {
          bubbles: true,
          composed: true,
          detail: { value: this.value },
        });

        this.dispatchEvent(event);
      }
    }

  }
}

if (customElements.get('sc-slider') === undefined) {
  customElements.define('sc-slider', ScSlider);
}

export default ScSlider;
