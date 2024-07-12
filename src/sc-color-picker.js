import { html, css } from 'lit';
import ScElement from './ScElement.js';


class ScColorPicker extends ScElement {
  static properties = {
    value: {
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
      width: 30px;
      border: 1px solid var(--sc-color-primary-3);
      overflow: auto;
    }

    :host([hidden]) {
      display: none
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    input {
      display: block;
      font-family: inherit;
      font-size: inherit;
      width: 100%;
      height: 100%;
      text-indent: 4px;
      border-radius: 0;
      border: none;
      background-color: var(--sc-color-primary-2);
      cursor: pointer
    }

    input:hover {
      background-color: var(--sc-color-primary-3) 
    }

    input:focus {
      outline: none;
    }

    :host([disabled]) input {
      cursor: default;
    }

    :host([disabled]) input:hover {
      background-color: var(--sc-color-primary-2);
      cursor: default;
    }
  `;

  constructor() {
    super();

    this.value = "#000000";
    this.disabled = false;
  }

  render() {
    return html`
      <input
        type="color"
        value=${this.value}
        ?disabled=${this.disabled}
        @input=${this._dispatchInputEvent}
        @change=${this._dispatchChangeEvent}
      />
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      const tabindex = this.disabled ? -1 : this._tabindex;
      const $input = this.shadowRoot.querySelector('input');
      $input.setAttribute('tabindex', tabindex);

      if (this.disabled) { this.blur(); }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // @note - this is important if the compoent is e.g. embedded in another component
    this._tabindex = this.getAttribute('tabindex') || 0;
  }

  _dispatchInputEvent(e) {
    e.stopPropagation();

    if (this.disabled) { return; }

    this.value = e.target.value;

    const inputEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
      },
    });

    this.dispatchEvent(inputEvent);
  }

  _dispatchChangeEvent(e) {
    e.stopPropagation();

    if (this.disabled) { return; }

    this.value = e.target.value;

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

if (customElements.get('sc-color-picker') === undefined) {
  customElements.define('sc-color-picker', ScColorPicker);
}

export default ScColorPicker;

