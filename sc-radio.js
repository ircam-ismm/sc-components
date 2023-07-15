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
    disabled: {
      type: Boolean,
      reflect: true,
    },
    orientation: {
      type: String,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #fff;
      border-radius: 2px;
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
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    label {
      vertical-align: middle;
      user-select: none;
      webkit-user-select: none;
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
            ?checked=${value == this.value}
            ?disabled=${this.disabled && !(value == this.value)}
          />
          ${value}
        </label>
      `;
    });
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
