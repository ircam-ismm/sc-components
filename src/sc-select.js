import { html, svg, css, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { isPlainObject } from '@ircam/sc-utils';
import ScElement from './ScElement.js';

let itemId = 0;

class ScSelect extends ScElement {
  static properties = {
    options: {
      type: Object,
    },
    value: {
      type: String,
      reflect: true,
    },
    placeholder: {
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
      box-sizing: border-box;
      vertical-align: top;
      height: 30px;
      width: 200px;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #fff;
      border-radius: 2px;
      overflow: auto;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    select {
      display: block;
      font-family: inherit;
      font-size: inherit;
      width: 100%;
      height: 100%;
      text-indent: 4px;
    }

    select:focus {
      outline: none;
    }

    option {
      text-indent: 4px;
    }
  `;

  constructor() {
    super();

    this.options = [];
    this.value = null;
    this.disabled = false;
    this.placeholder = '';
  }

  render() {
    const isObject = isPlainObject(this.options);

    return html`
      <select
        ?disabled=${this.disabled}
        @change=${this._dispatchEvent}
      >
        ${this.placeholder
          ? html`<option value="">${this.placeholder}</option`
          : nothing
        }
        ${repeat(Object.entries(this.options), () => `sc-select-${itemId++}`, ([key, value]) => {
          // @note - key and value are always strings
          return html`
            <option
              value=${key}
              ?selected=${value === this.value}
            >${isObject ? key : value}</option>
          `;
        })}
      </select>
    `;
  }

  _dispatchEvent(e) {
    if (this.disabled) {
      return;
    }

    const isObject = isPlainObject(this.options);

    if (isObject) {
      // for objects the key is displayed and the value is used as value so that
      // it can be of any type
      const key = e.target.value;
      this.value = this.options[key];
    } else {
      // for Arrays, we need to find the index because option.value stringifies eveything
      const index = this.placeholder ? e.target.selectedIndex - 1 : e.target.selectedIndex;
      this.value = this.options[index];
    }

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

if (customElements.get('sc-select') === undefined) {
  customElements.define('sc-select', ScSelect);
}

export default ScSelect;

