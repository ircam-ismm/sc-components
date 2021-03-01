import { html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { nothing } from 'lit-html';
import NP from 'number-precision';
import ScElement from './ScElement.js';
import { fontFamily, fontSize, theme } from './styles.js';
import './sc-speed-surface.js';

class ScNumber extends ScElement {
  static get properties() {
    return {
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
      value: {
        type: Number,
      },
      integer: {
        type: Boolean,
        reflect: true,
      },
    }
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
      }

      :host > div {
        overflow-y: hidden;
        position: relative;
        box-sizing: border-box;
        background-color: ${theme['--color-primary-1']};
        border: 1px solid ${theme['--color-primary-2']};
        font-family: ${fontFamily};
        color: #ffffff;
        user-select: none;
      }

      .container:focus {
        outline: none;
      }

      .info {
        width: 15px;
        display: inline-block;
        background-color: ${theme['--color-primary-2']};
      }

      .container:focus .info {
        outline: 2px solid ${theme['--color-secondary-2']};
      }

      .info.edited {
        background-color: ${theme['--color-primary-3']};
      }

      .content {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 15px;
        padding-left: 4px;
        font-size: 0;
      }

      .z {
        display: inline-block;
        vertical-align: top;
        text-align: center;
        position: relative;
        font-size: ${fontSize};
      }

      .z:first-child {
        margin-left: 3px;
      }

      .z sc-speed-surface {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
    `;
  }

  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this._displayValue = val.toString();
      this.requestUpdate();
    }
  }

  get value() {
    return this._value;
  }

  constructor() {
    super();

    this.width = 100;
    this.height = 30;
    this.integer = false;
    this.value = 0;

    this.min = -Infinity;
    this.max = +Infinity;

    this._updateValue1 = this.updateValueFromPointer(1);

    if (!this.integer) {
      this._updateValue01 = this.updateValueFromPointer(0.1);
      this._updateValue001 = this.updateValueFromPointer(0.01);
      this._updateValue0001 = this.updateValueFromPointer(0.001);
      this._updateValue00001 = this.updateValueFromPointer(0.0001);
      this._updateValue000001 = this.updateValueFromPointer(0.00001);
      this._updateValue0000001 = this.updateValueFromPointer(0.000001);
    }

    this._numKeyPressed = 0;
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  /**
   * @note: do not remove spaces between <span> to avoid white space
   * https://stackoverflow.com/questions/5078239/how-do-i-remove-the-space-between-inline-inline-block-elements
   */
  render() {
    const parts = this._displayValue.split('.');

    if (!parts[1]) {
      parts[1] = [];
    }

    const emptySpace = ' ';
    const characterWidth = 7; // in pixels

    const isEdited = { edited: (this._numKeyPressed !== 0) };

    return html`
      <div
        tabindex="-1"
        class="container"
        style="
          width: ${this.width}px;
          height: ${this.height}px;
        "
        @focus="${this.onFocus}"
        @blur="${this.onBlur}"
        @touchstart="${this.triggerFocus}"
        @contextmenu="${this._preventContextMenu}"
      >
        <div
          class="info ${classMap(isEdited)}"
          style="height: ${this.height}px;"
        ></div>

        <div
          class="content"
          style="height: ${this.height}px;"
        >

          <span class="z"
            style="
              height: ${this.height}px;
              line-height: ${this.height}px;
              width: ${characterWidth * parts[0].length}px;
            "
          >
            ${parts[0]}
            <sc-speed-surface
              width="${characterWidth * Math.max(parts[0].length, 2)}"
              height="${this.height}"
              @input="${this._updateValue1}"
            ></sc-speed-surface>
          </span>
          ${!this.integer
            ? html`
              <span class="z" style="height: ${this.height}px; line-height: ${this.height}px">
                .
              </span>
              <span class="z"
                style="
                  height: ${this.height}px;
                  line-height: ${this.height}px;
                  width: ${characterWidth}px;
                "
              >
                ${parts[1][0] || emptySpace}
                <sc-speed-surface
                  width="${characterWidth}"
                  height="${this.height}"
                  @input="${this._updateValue01}"
                ></sc-speed-surface>
              </span>
              <span class="z"
                style="
                  height: ${this.height}px;
                  line-height: ${this.height}px;
                  width: ${characterWidth}px;
                "
              >
                ${parts[1][1] || emptySpace}
                <sc-speed-surface
                  width="${characterWidth}"
                  height="${this.height}"
                  @input="${this._updateValue001}"
                ></sc-speed-surface>
              </span>
              <span class="z"
                style="
                  height: ${this.height}px;
                  line-height: ${this.height}px;
                  width: ${characterWidth}px;
                "
              >
                ${parts[1][2] || emptySpace}
                <sc-speed-surface
                  width="${characterWidth}"
                  height="${this.height}"
                  @input="${this._updateValue0001}"
                ></sc-speed-surface>
              </span>
              <span class="z"
                style="
                  height: ${this.height}px;
                  line-height: ${this.height}px;
                  width: ${characterWidth}px;
                "
              >
                ${parts[1][3] || emptySpace}
                <sc-speed-surface
                  width="${characterWidth}"
                  height="${this.height}"
                  @input="${this._updateValue00001}"
                ></sc-speed-surface>
              </span>
              <span class="z"
                style="
                  height: ${this.height}px;
                  line-height: ${this.height}px;
                  width: ${characterWidth}px;
                "
              >
                ${parts[1][4] || emptySpace}
                <sc-speed-surface
                  width="${characterWidth}"
                  height="${this.height}"
                  @input="${this._updateValue000001}"
                ></sc-speed-surface>
              </span>
              <span class="z"
                style="
                  height: ${this.height}px;
                  line-height: ${this.height}px;
                  width: ${characterWidth}px;
                "
              >
                ${parts[1][5] || emptySpace}
                <sc-speed-surface
                  width="${characterWidth}"
                  height="${this.height}"
                  @input="${this._updateValue0000001}"
                ></sc-speed-surface>
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }

  // force focus for touchstart (is prevented by speed-surfaces...)
  triggerFocus() {
    const $container = this.shadowRoot.querySelector('.container');
    $container.focus();
  }

  // keyboard interactions
  onFocus() {
    this._numKeyPressed = 0;
    window.addEventListener('keydown', this.onKeyDown);
  }

  onBlur() {
    this.updateValueFromDisplayValue();
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    const validSymbols = this.integer
      ? ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-']
      : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '.', ','];

    if (validSymbols.indexOf(e.key) !== -1) {
      if (this._numKeyPressed === 0) {
        this._displayValue = '';
      }

      let symbol = e.key;

      if (symbol === ',') {
        symbol = '.'
      }

      this._displayValue += symbol;
      this._numKeyPressed += 1;

      this.requestUpdate();
    }

    // handle backspace
    if (e.key === 'Backspace' || e.which === 8) {
      // if last character is '.' remove it automatically
      if (this._displayValue[this._displayValue.length -1] === '.') {
        this._displayValue = this._displayValue.substring(0, this._displayValue.length - 1);
      }

      this._displayValue = this._displayValue.substring(0, this._displayValue.length - 1);

      this._numKeyPressed += 1;
      this.requestUpdate();
    }

    // Tab has the same effect as it triggers blur
    if (e.key === 'Enter' || e.which === 13) {
      this.updateValueFromDisplayValue();
    }
  }

  updateValueFromDisplayValue() {
    if (this._numKeyPressed > 0) {
      this._value = this.integer
        ? parseInt(this._displayValue)
        : parseFloat(this._displayValue);

      // modify displayValue only if needed
      if (this._value < this.min || this._value > this.max) {
        this._value = Math.max(this.min, Math.min(this.max, this._value));
        this._displayValue = this._value.toString();
      }

      const inputEvent = new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this._value },
      });

      const changeEvent = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this._value },
      });

      this._numKeyPressed = 0;

      this.requestUpdate();
      this.dispatchEvent(inputEvent);
      this.dispatchEvent(changeEvent);
    }
  }

  updateValueFromPointer(step) {
    return e => {
      e.stopPropagation();

      // do all computation if not mouseup or touchend,
      // else only propagate the `change event`
      if (e.detail.pointerId !== null) {
        // ignore very small movements
        if (Math.abs(e.detail.dy) < 0.02) {
          return;
        }

        const sign = e.detail.dy < 0 ? -1 : 1;
        // heuristically adjust sensiblity
        const scale = 8;
        const exponent = 1.2;
        // apply scale and exponent factors
        let dy = Math.pow(Math.abs(e.detail.dy * scale), exponent);
        // clamp at 1
        dy = Math.max(1, dy);
        // reapply sign
        dy = dy * sign;

        this._value += step * dy;
        // crop at step (use precision arythmetics)
        this._value = NP.times(Math.round(this._value / step), step);
        this._value = Math.max(this.min, Math.min(this.max, this._value));

        // format display value to show trailing zeros...)
        const displayValue = this._value.toString();
        const valueParts = displayValue.toString().split('.');
        const stepDecimals = step.toString().split('.')[1];

        if (stepDecimals) {
          if (!valueParts[1]) {
            valueParts[1] = [];
          }

          while (valueParts[1].length < stepDecimals.length) {
            valueParts[1] += '0';
          }
        }

        this._displayValue = valueParts.join('.');

        const event = new CustomEvent('input', {
          bubbles: true,
          composed: true,
          detail: { value: this._value },
        });

        this.dispatchEvent(event);
      } else {
        const event = new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value: this._value },
        });

        this.dispatchEvent(event);
      }

      this.requestUpdate();
    }
  }
}

customElements.define('sc-number', ScNumber);

export default ScNumber;
