import { html, svg, css } from 'lit-element';
import { nothing } from 'lit-html';
import ScElement from './ScElement.js';
import { theme } from './styles.js';
import getScale from './utils/getScale.js';
import getClipper from './utils/getClipper.js';
import './sc-position-surface.js';
import './sc-number.js';

class ScSlider extends ScElement {
  static get properties() {
    return {
      // mode: {
      //   type: String
      // },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
      step: {
        type: Number,
      },
      orientation: {
        type: String,
      },
      displayNumber: {
        type: Boolean,
        attribute: 'display-number',
        reflect: true,
      },
      value: {
        type: Number,
      },
      color: {
        type: String,
      }
    }
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        font-size: 0 !important;
        vertical-align: top;
        position: relative;
      }

      :host > div {
        position: relative;
        display: inline-block;
        font-size: 0;
        border: 1px solid ${theme['--color-primary-2']};
        vertical-align: top;
      }

      sc-position-surface {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }

      rect.foreground {}

      rect.background {
        fill: ${theme['--color-primary-1']};
      }

      sc-number {
        display: inline-block;
      }
    `;
  }

  constructor() {
    super();

    this.mode = 'jump'; // @todo: relative
    this.width = 200;
    this.height = 30;
    this.min = 0;
    this.max = 1;
    this.step = 0.001;
    this.value = 0.5;
    this.orientation = 'horizontal';
    this.displayNumber = false;
    this.color = theme['--color-primary-4'];

    this._marginSliderNumber = 3;
    this._numberWidth = 80;

    this._pointerId = null;
    this._dirty = true;
  }

  connectedCallback() {
    this._dirty = true;
    super.connectedCallback();
  }

  update(changedProperties) {
    this._dirty = true;
    super.update(changedProperties);
  }

  render() {
    if (this._dirty) {
      if (this.orientation === 'horizontal') {
        this._sliderWidth = this.displayNumber
          ? this.width - this._numberWidth - this._marginSliderNumber
          : this.width;
      } else {
        // @todo - clean vertical w/ number box
        this._sliderWidth = this.width;
      }

      this._sliderWidth -= 2; // take borders into account
      this._sliderHeight = this.height - 2; // take borders into account

      if (this.max < this.min) {
        const tmp = this.max;
        this.max = this.min;
        this.min = tmp;
      }

      // define transfert functions and scales
      this.scale = getScale(
        [this.min, this.max],
        [0, this.orientation === 'horizontal' ? this._sliderWidth : this._sliderHeight]
      );

      this.clipper = getClipper(this.min, this.max, this.step);

      // clean default value
      this.value = this.clipper(this.value);

      this._dirty = false;
    }

    return html`
      <div
        @contextmenu="${this._preventContextMenu}"
        style="width: ${this._sliderWidth}px; height: ${this._sliderHeight}px"
      >
        <svg
          style="width: ${this._sliderWidth}px; height: ${this._sliderHeight}px"
          viewport="0 0 ${this._sliderWidth} ${this._sliderHeight}"
        >
          ${this.orientation === 'horizontal' ?
            svg`
              <rect class="background" width="${this._sliderWidth}" height="${this._sliderHeight}"></rect>
              <rect class="foreground" width="${Math.max(0, this.scale(this.value))}" height="${this._sliderHeight}" fill="${this.color}"></rect>
            ` :
            svg`
              <rect class="foreground" width="${this._sliderWidth}" height="${this._sliderHeight}"></rect>
              <rect class="background" width="${this._sliderWidth}" height="${Math.max(0, this._sliderHeight - this.scale(this.value))}" fill="${this.color}"></rect>
            `
          }
        </svg>
        <sc-position-surface
          width="${this._sliderWidth}"
          height="${this._sliderHeight}"
          clamp
          x-range="${JSON.stringify([this.min, this.max])}"
          y-range="${JSON.stringify([this.max, this.min])}"
          @input="${this.updateValue}"
          @pointerend="${this.changeValue}"
        ></sc-position-surface>
      </div>
      ${this.displayNumber
        ? html`
          <sc-number
            style="margin-left: ${this._marginSliderNumber}px"
            width="${this._numberWidth}"
            min="${this.min}"
            max="${this.max}"
            value="${this.value}"
            @input="${this.updateValueFromNumber}"
          ></sc-number>
        `
        : nothing
      }
    `;
  }

  updateValueFromNumber(e) {
    e.stopPropagation();

    this.value = this.clipper(e.detail.value);

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

    this.requestUpdate();
  }

  changeValue(e) {
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

  updateValue(e) {
    e.stopPropagation(); // override event from sc-position-surface

    // consider only first pointer in list, we don't want a multitouch slider...
    if (
      e.detail.value[0] &&
      (this._pointerId === null || e.detail.value[0].pointerId === this._pointerId)
    ) {
      const { x, y, pointerId } = e.detail.value[0];
      const value = this.orientation === 'horizontal' ? x : y;
      this._pointerId = pointerId;
      this.value = this.clipper(value);

      const event = new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(event);
      this.requestUpdate();
    }
  }
}

customElements.define('sc-slider', ScSlider);

export default ScSlider;
