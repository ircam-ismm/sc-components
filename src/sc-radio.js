import { html, svg, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import ScElement from './ScElement.js';

let groupId = 0;
let itemId = 0;

class ScRadio extends ScElement {
  static properties = {
    options: {
      type: Object,
    },
    value: {
      type: String,
      reflect: true,
    },
    orientation: {
      type: String,
      reflect: true,
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #fff;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-2);
      overflow: auto;
    }

    :host([orientation="horizontal"]) {
      height: 30px;
      width: auto;
      padding: 4px 7px 4px 7px;
    }

    :host([orientation="vertical"]) {
      width: 200px;
      height: auto;
      padding: 6px 7px 8px 7px;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-3);
    }

    label {
      vertical-align: middle;
      user-select: none;
      webkit-user-select: none;
      webkit-touch-callout: none;
    }

    :host([orientation="horizontal"]) label {
      display: inline-block;
      margin-right: 12px;
      height: 20px;
      line-height: 20px;
    }

    :host([orientation="vertical"]) label {
      display: block;
      height: 20px;
      line-height: 20px;
    }

    input[type="radio"] {
      vertical-align: middle;
      position: relative;
      top: -1px;
    }

    input[type="radio"]:focus {
      outline: none;
    }
  `;

  // see  `_dispatchEvent` for the explaination of the getter / setter
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.requestUpdate();
  }

  constructor() {
    super();

    this.options = [];
    this.value = null;
    this.disabled = false;
    this.orientation = 'vertical';
    this._name = `sc-radio-${groupId++}`;
  }

  render() {
    return repeat(this.options, item => `sc-radio-${itemId++}`, (value, index) => {
      return html`
        <label>
          <input
            type="radio"
            value=${value}
            data-index=${index}
            name=${this._name}
            @change=${this._dispatchEvent}
            @input=${this._bypassEvent}
            ?checked=${value == this.value}
            ?disabled=${this.disabled && !(value == this.value)}
          />
          ${value}
        </label>
      `;
    });
  }

  updated(changedProperties) {
    // we don't want to check the changed properties because if the value is set
    // this must be reapplied, seems to contradict with checked somehow...
    const tabindex = this.disabled ? -1 : this._tabindex;
    const $inputs = this.shadowRoot.querySelectorAll('input');

    $inputs.forEach($input => {
      $input.setAttribute('tabindex', tabindex);
      $input.disabled = this.disabled;
    });

    if (this.disabled) { this.blur(); }
  }

  connectedCallback() {
    super.connectedCallback();
    // @note - this is important if the compoent is e.g. embedded in another component
    this._tabindex = this.getAttribute('tabindex') || 0;
  }

  _bypassEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _dispatchEvent(e) {
    if (this.disabled) {
      return;
    }

    // we don't want to trigger the render, because we loose the focus when
    // interacting with the keyboard, so we update the internal property, not
    // the reactive one.
    const index = parseInt(e.target.dataset.index);
    this._value = this.options[index];

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
      },
    });

    this.dispatchEvent(changeEvent);
  }
}

if (customElements.get('sc-radio') === undefined) {
  customElements.define('sc-radio', ScRadio);
}

export default ScRadio;
