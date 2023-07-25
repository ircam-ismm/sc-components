import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import ScElement from './ScElement.js';

let itemId = 0;

class ScTab extends ScElement {
  static properties = {
    options: {
      type: Array,
    },
    value: {
      type: String,
      reflect: true,
    },
    orientation: {
      type: String,
      reflect: true,
    },
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-1);
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #ffffff;
      overflow: auto;

      --sc-tab-selected: var(--sc-color-secondary-1);
    }

    :host([orientation="horizontal"]) {
      height: 30px;
      width: 400px;
    }

    :host([orientation="vertical"]) {
      width: 120px;
      height: auto;
      flex-direction: column;
      justify-content: space-between;
    }

    :host([orientation="vertical"]) sc-button {
      width: 100%;
    }

    sc-button {
      border-radius: 0;
      --sc-button-selected: var(--sc-tab-selected);
      height: 100%;
      font-size: inherit;
    }
  `;

  constructor() {
    super();

    this.options = [];
    this.value = null;
    // this.disabled = false;
    this.orientation = 'horizontal';
  }

  render() {
    return repeat(this.options, () => `sc-tab-${itemId++}`, value => {
      return html`
        <sc-button
          .value=${value}
          ?selected=${value === this.value}
          @input="${this._triggerChange}"
          tabindex="-1"
        >${value}</sc-button>
      `;
    });
  }

  _triggerChange(e) {
    e.stopPropagation();

    this.value = e.detail.value;

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

if (customElements.get('sc-tab') === undefined) {
  customElements.define('sc-tab', ScTab);
}

export default ScTab;
