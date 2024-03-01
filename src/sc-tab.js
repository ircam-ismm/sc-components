import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';
import './sc-button.js';

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
      border: 1px dotted var(--sc-color-primary-3);

      --sc-tab-selected: var(--sc-color-secondary-1);
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible), :host(:focus-within) {
      outline: none;
      border: 1px solid var(--sc-color-primary-3);
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
      border: none;
    }

    :host([orientation="horizontal"]) sc-button:not(:first-child) {
      border-left: 1px solid var(--sc-color-primary-3);
    }

    :host([orientation="vertical"]) sc-button:not(:first-child) {
      border-top: 1px solid var(--sc-color-primary-3);
    }
  `;

  constructor() {
    super();

    this.options = [];
    this.value = null;
    // this.disabled = false;
    this.orientation = 'horizontal';

    this._keyboard = new KeyboardController(this, {
      filterCodes: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Space', 'Enter'],
      callback: this._onKeyboardEvent.bind(this),
      deduplicateEvents: true,
    });
  }

  render() {
    return repeat(this.options, () => `sc-tab-${itemId++}`, value => {
      return html`
        <sc-button
          .value=${value}
          ?selected=${value === this.value}
          @input="${this._onInput}"
          @focus=${e => e.preventDefault()}
          tabindex="-1"
        >${value}</sc-button>
      `;
    });
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }
  }

  _onKeyboardEvent(e) {
    if (e.type === 'keydown') {
      let index = this.options.indexOf(this.value);

      // ArrowUp / ArrowDown do not behave the same regarding direction
      if (this.orientation === 'horizontal') {
        if (e.code === 'ArrowUp' || e.code === 'ArrowRight' || e.code === 'Space' || e.code == 'Enter') {
          index += 1;
        } else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
          index -= 1;
        }
      } else {
        if (e.code === 'ArrowDown' || e.code === 'ArrowRight' || e.code === 'Space' || e.code == 'Enter') {
          index += 1;
        } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
          index -= 1;
        }
      }

      if (index < 0) {
        index = this.options.length - 1;
      } else if (index >= this.options.length) {
        index = 0;
      }

      // @important: do not remove, otherwize we loose the focus somehow
      // the prevent default on input is not enought
      this.focus();

      this.value = this.options[index];
      this._dispatchEvent();
    }
  }

  _onInput(e) {
    // do not propagate button input
    e.stopPropagation();

    this.value = e.detail.value;

    this._dispatchEvent();
  }

  _dispatchEvent() {
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
