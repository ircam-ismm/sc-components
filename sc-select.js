import { html, svg, css, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import ScElement from './ScElement.js';

let groupId = 0;
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
    name: {
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
    this.name = `sc-select-${groupId++}`;
    this.placeholder = '';
  }

  render() {
    return html`
      <select
        ?disabled=${this.disabled}
        @change=${this._dispatchEvent}
      >
        ${this.placeholder
          ? html`<option value="">${this.placeholder}</option`
          : nothing
        }
        ${repeat(this.options, () => `sc-select-${itemId++}`, value => {
          return html`
            <option
              value=${value}
              ?selected=${value === this.value}
            >${value}</option>
          `;
        })}
      </select>
    `;
  }

  _dispatchEvent(e) {
    if (this.disabled) {
      return;
    }

    this.value = e.target.value;

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

if (customElements.get('sc-select') === undefined) {
  customElements.define('sc-select', ScSelect);
}

export default ScSelect;

