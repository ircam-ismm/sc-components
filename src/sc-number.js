import { html, css, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import NP from 'number-precision';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';
import './sc-speed-surface.js';

class ScNumber extends ScElement {
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
    integer: {
      type: Boolean,
      reflect: true,
    },
    readonly: {
      type: Boolean,
      reflect: true,
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      vertical-align: top;
      display: inline-block;
      width: 100px;
      height: 30px;
      box-sizing: border-box;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #ffffff;
      position: relative;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
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

    :host([disabled]:focus), :host([disabled]:focus-visible),
    :host([readonly]:focus), :host([readonly]:focus-visible) {
      outline: none;
      box-shadow: none;
      border: 1px solid var(--sc-color-primary-3);
    }

    .container {
      overflow-y: hidden;
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      user-select: none;
      webkit-user-select: none;
      webkit-touch-callout: none;
    }

    .container:focus {
      outline: none;
    }

    .info {
      width: 15px;
      height: 100%;
      display: inline-block;
      background-color: var(--sc-color-primary-3);
      box-sizing: border-box;
    }

    .container:focus .info {
      outline: 2px solid var(--sc-color-secondary-2);
    }

    :host([disabled]) .container:focus .info,
    :host([readonly]) .container:focus .info {
      outline: none;
    }

    .info.edited {
      background-color: var(--sc-color-primary-4);
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 15px;
      padding-left: 12px;
      height: 100%;
      width: calc(100% - 15px);
    }

    :host([readonly]) .info {
      width: 5px;
      background-color: var(--sc-color-primary-2);
    }

    :host([readonly]) .content {
      left: 5px;
      width: calc(100% - 5px);
    }

    .z {
      display: inline-block;
      vertical-align: top;
      text-align: center;
      position: relative;
      height: 100%;
      display: inline-flex;
      align-items: center;
    }

    /* contains the integer part which can be larger than one character */
    .z:first-child {
      width: auto;
      min-width: 7px;
    }

    /* full width if integer */
    :host([integer]) .z {
      width: 100%;
      text-align: left;
    }

    .z sc-speed-surface {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }

    input[type="number"] {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 1px;
      height: 1px;
      padding: 0;
      border: none;
      background-color: var(--sc-color-primary-3);
    }

    input[type="number"]:focus {
      outline: none;
    }
  `;

  set min(value) {
    this._min = Math.min(value, this._max);

    if (this._value < this._min) {
      this.value = this._min;
      this._emitChange();
    }
  }

  get min() {
    return this._min;
  }

  set max(value) {
    this._max = Math.max(value, this._min);

    if (this._value > this._max) {
      this.value = this._max;
      this._emitChange();
    }
  }

  get max() {
    return this._max;
  }

  set value(val) {
    val = Math.min(this._max, Math.max(this._min, val));

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

    this._min = -Infinity;
    this._max = +Infinity;
    this._value = 0;
    this._displayValue = '0';
    this.integer = false;
    this.disabled = false;
    this.readonly = false;

    this._valueChanged = false;

    this._updateValue1 = this._updateValueFromPointer(1);
    this._updateValue01 = this._updateValueFromPointer(0.1);
    this._updateValue001 = this._updateValueFromPointer(0.01);
    this._updateValue0001 = this._updateValueFromPointer(0.001);
    this._updateValue00001 = this._updateValueFromPointer(0.0001);
    this._updateValue000001 = this._updateValueFromPointer(0.00001);
    this._updateValue0000001 = this._updateValueFromPointer(0.000001);

    this._hasVirtualKeyboard = false;
    this._numKeyPressed = 0;
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);

    this.keyboard = new KeyboardController(this, {
      filterCodes: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
      callback: this._onKeyboardEvent.bind(this),
    });
  }

  render() {
    const parts = this._displayValue.split('.');

    if (!parts[1]) {
      parts[1] = [];
    }

    const emptySpace = unsafeHTML('&nbsp;');
    const characterWidth = 7; // in pixels
    const isEdited = { edited: (this._numKeyPressed !== 0) };

    // @focus and @blur are for desktop / keyboard interactions
    // @touchstart and @touchend are for special mobile handling

    // @todo - would be probably more consistant and simple by just removing
    // this div and work on `this` directly
    return html`
      <div
        tabindex="-1"
        class="container"
        @touchstart=${this._onTouchStart}
        @touchend=${this._openVirtualKeyboard}
      >
        <div class="info ${classMap(isEdited)}"></div>

        <div class="content">
          <span class="z">
            ${parts[0]}
            <sc-speed-surface @input="${this._updateValue1}"></sc-speed-surface>
          </span>
          ${!this.integer
            ? html`
              <span class="z">
                .
              </span>
              <span class="z">
                ${parts[1][0] || emptySpace}
                <sc-speed-surface @input="${this._updateValue01}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][1] || emptySpace}
                <sc-speed-surface @input="${this._updateValue001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][2] || emptySpace}
                <sc-speed-surface @input="${this._updateValue0001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][3] || emptySpace}
                <sc-speed-surface @input="${this._updateValue00001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][4] || emptySpace}
                <sc-speed-surface @input="${this._updateValue000001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${parts[1][5] || emptySpace}
                <sc-speed-surface @input="${this._updateValue0000001}"></sc-speed-surface>
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled') || changedProperties.has('disabled')) {
      const tabindex = this.disabled || this.readonly ? -1 : this._tabindex;
      this.setAttribute('tabindex', tabindex);

      if (this.disabled || this.readonly) { this.blur(); }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // @note - this is important if the compoent is e.g. embedded in another component
    this._tabindex = this.getAttribute('tabindex') || 0;

    this.addEventListener('focus', this._onFocus);
    this.addEventListener('blur', this._onBlur);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('focus', this._onFocus);
    this.removeEventListener('blur', this._onBlur);
  }

  // TAB keyboard interactions
  _onFocus() {
    this._numKeyPressed = 0;
    window.addEventListener('keydown', this._onKeyDown);
    this.shadowRoot.querySelector('.container').focus(); // container holds the focus
  }

  // blur does not work perperly on `Shift+Tab`
  // cf. https://javascript.info/focus-blur for possible fix?
  _onBlur() {
    this._updateValueFromDisplayValue();
    window.removeEventListener('keydown', this._onKeyDown);
  }

  // prevent focus for touch interfaces, we want to use a virtual keyboard in this case
  _onTouchStart(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // only works on touchend
  _openVirtualKeyboard(e) {
    e.preventDefault(); // go to end of page
    e.stopPropagation();

    if (this._hasVirtualKeyboard) {
      return;
    }

    if (this.disabled || this.readonly) {
      return;
    }

    // lock speed surface events
    this._hasVirtualKeyboard = true;

    const $number = document.createElement('input');
    $number.type = 'number';

    this.shadowRoot.appendChild($number);
    $number.focus();
    $number.click();

    $number.addEventListener('input', e => {
      e.preventDefault();
      e.stopPropagation();
      // when "." or "," is pressed e.target.value is empty in chrome
      // @todo - check firefox and safari
      if (e.target.value) {
        this.value = parseFloat(e.target.value);
        this._emitInput();
      }
    });

    $number.addEventListener('change', e => {
      e.preventDefault(); // go to end of page
      e.stopPropagation();

      // when "." or "," is pressed e.target.value is empty in chrome
      // @todo - check firefox and safari
      if (e.target.value) {
        this.value = parseFloat(e.target.value);
      }

      // this prevents the focus to go to the next focusable element
      this.focus();
      // clean the box
      $number.remove();
      this._hasVirtualKeyboard = false;

      this._emitInput();
      this._emitChange();
    });
  }

  // Keyboard controller callback,
  // @todo - harmonize with other keyboard controls (?)
  _onKeyboardEvent(e) {
    if (this.disabled || this.readonly) { return; }

    if (e.type === 'keydown') {
      if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
        this.value += e.shiftKey ? 10 : 1;
      } else {
        this.value -= e.shiftKey ? 10 : 1;
      }

      this._emitInput();
      this._emitChange();
    }
  }

  _onKeyDown(e) {
    if (this.disabled || this.readonly) { return; }

    const validSymbols = this.integer
      ? ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-']
      : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '.', ','];

    if (validSymbols.indexOf(e.key) !== -1) {
      e.preventDefault();
      e.stopPropagation();

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
      e.preventDefault();
      e.stopPropagation();
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
      e.preventDefault();
      e.stopPropagation();
      this._updateValueFromDisplayValue();
    }
  }

  _updateValueFromPointer(step) {
    return e => {
      e.stopPropagation();

      if (this.disabled || this.readonly) {
        return;
      }

      // bypass speed surface when virtual keyboard is opened
      if (this._hasVirtualKeyboard) {
        return;
      }

      // do all computation if not mouseup or touchend,
      // else only propagate the `change event`
      if (e.detail.pointerId !== null) {
        // ignore very small movements
        if (Math.abs(e.detail.dy) < 0.02) {
          return;
        }

        const lastValue = this._value;

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
        this._value = Math.max(this._min, Math.min(this._max, this._value));

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

        if (this._value !== lastValue) {
          this._valueChanged = true;
          this._emitInput();
        }
      } else {
        // this triggers a change when we select the box without changing the value
        if (this._valueChanged === true) {
          this._valueChanged = false;
          this._emitChange();
        }
      }

      this.requestUpdate();
    }
  }

  _updateValueFromDisplayValue() {
    if (this._numKeyPressed > 0) {
      this._value = this.integer
        ? parseInt(this._displayValue)
        : parseFloat(this._displayValue);

      // modify displayValue only if needed
      if (this._value < this._min || this._value > this._max) {
        this._value = Math.max(this._min, Math.min(this._max, this._value));
        this._displayValue = this._value.toString();
      }

      this._numKeyPressed = 0;

      this._emitInput();
      this._emitChange();
      this.requestUpdate();
    }
  }

  _emitInput() {
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this._value },
    });

    this.dispatchEvent(event);
  }

  _emitChange() {
    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this._value },
    });

    this.dispatchEvent(event);
  }
}

if (customElements.get('sc-number') === undefined) {
  customElements.define('sc-number', ScNumber);
}

export default ScNumber;
