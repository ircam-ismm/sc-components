import { html, svg, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import ScElement from './ScElement.js';

let groupId = 0;
let elementId = 0;

class ScRadio extends ScElement {
  static properties = {
    options: {
      type: Object,
    },
    value: {
      type: String,
      reflect: true,
    },
    name: {
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
      background-color: var(--sc-color-primary-1);
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #fff;
      padding: 6px 7px 7px 7px;
      border-radius: 2px;
      overflow: auto;
    }

    :host([orientation="horizontal"]) {
      height: 30px;
      width: auto;
    }

    :host([orientation="vertical"]) {
      width: 200px;
      height: auto;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-4);
    }

    label {
      vertical-align: middle;
      user-select: none;
    }

    :host([orientation="horizontal"]) label {
      display: inline-block;
      margin-right: 12px;
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
    this.name = `sc-radio-options-${groupId++}`;
  }

  render() {
    // note: `?disabled=${this.disabled && !(value == this.value)}`
    // is meant to keep a selected option displayed even when disabled
    return repeat(this.options, item => elementId++, (value, key) => {
      return html`
        <label>
          <input
            type="radio"
            value=${value}
            name=${this.name}
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

    // we don't want to trigger the render, as we loose the focus when
    // interacting with the keyboard, so we update the internal property, not
    // the reactive one.
    this._value = e.target.value;

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
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
