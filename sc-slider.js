import { html, svg, css, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';
import getScale from './utils/getScale.js';
import getClipper from './utils/getClipper.js';
import './sc-position-surface.js';
import './sc-number.js';

class ScSlider extends ScElement {
  static get properties() {
    return {
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
      displayNumber: {
        type: Boolean,
        reflect: true,
        attribute: 'display-number',
      },
    }
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        width: 200px;
        height: 30px;
        vertical-align: top;
      }

      div {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: relative;
        display: inline-block;
        border: 1px solid var(--sc-color-primary-2);
      }

      :host([display-number][orientation="horizontal"]) div {
        width: calc(100% - 86px);
      }

      :host([display-number][orientation="vertical"]) div {
        height: calc(100% - 36px);
      }

      svg {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }

      rect.background {
        fill: var(--sc-color-primary-1);
      }

      rect.foreground {
        fill: var(--sc-color-primary-4);
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

      :host([display-number][orientation="vertical"]) sc-number {
        display: block;
      }
    `;
  }

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
    this.displayNumber = false;

    this._pointerId = null;
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
      ${this.displayNumber
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
      this.requestUpdate();
    }
  }
}

if (customElements.get('sc-slider') === undefined) {
  customElements.define('sc-slider', ScSlider);
}

export default ScSlider;
