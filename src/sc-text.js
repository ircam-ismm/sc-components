import {
  html,
  css,
  nothing,
} from 'lit';

import ScElement from './ScElement.js';

class ScText extends ScElement {
  static get properties() {
    return {
      value: {
        type: String,
      },
      editable: {
        type: Boolean,
        reflect: true,
      },
      dirty: {
        type: Boolean,
        reflect: true,
      },
      disabled: {
        type: Boolean,
        reflect: true,
      },
      placeholder: {
        type: String,
        reflect: true,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
        width: 200px;
        height: 30px;
        border-radius: 0px;
        font-size: var(--sc-font-size);
        line-height: var(--sc-font-size);
        font-family: var(--sc-font-family);
        color: white;
        line-height: 18px; /* 18 + 2 * 5 (padding) + 2 * 1 (border) === 30 */
        padding: 5px 6px;
        background-color: var(--sc-color-primary-1);
        outline: none;
        border: 1px dotted var(--sc-color-primary-1);

        overflow-y: auto;
        position: relative;
      }

      :host([disabled]) {
        opacity: 0.7;
      }

      :host([hidden]) {
        display: none
      }

      :host(:focus), :host(:focus-visible) {
        outline: none;
      }

      :host([editable]) {
        background-color: var(--sc-color-primary-2);
        border: 1px dotted var(--sc-color-primary-4);
      }

      :host([editable]:focus),
      :host([editable]:focus-visible) {
        border: 1px solid var(--sc-color-primary-4);
      }

      :host([editable][dirty]:focus),
      :host([editable][dirty]:focus-visible) {
        border: 1px solid var(--sc-color-secondary-3);
      }

      :host > div {
        display: inline-block;
        white-space: pre;
      }

      :host.editable {
        padding:
      }

      :host input[type=text] {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        color: inherit;
        border: none;
        text-indent: 6px;
        font-family: inherit;
        font-size: inherit;
        outline: none;
        box-sizing: border-box;
        padding: 0;
      }
    `;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this.textContent = value; // not editable
    this._value = value; // editable
    this.requestUpdate();
  }

  constructor() {
    super();

    this.disabled = false;
    this.editable = false;
    this.dirty = false;
    this._value = null; // value on last change event

    this._onSlotChange = this._onSlotChange.bind(this);
  }

  render() {
    if (this.editable) {
      return html`
        <input
          type="text"
          placeholder=${this.placeholder}
          .value=${this._value}
          ?disabled=${this.disabled}
          @keydown=${this._onKeyDown}
          @keyup=${this._onKeyUp}
          @input=${this._triggerInput}
          @change=${this._triggerChange}
        />
      `;
      //
    } else {
      return html`<div><slot></slot></div>`
    }
  }

  firstUpdated() {
    this._value = this.textContent;
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();

    this.shadowRoot.addEventListener('slotchange', this._onSlotChange);
    // @note - this is important if the component is e.g. embedded in another component
    this._tabindex = this.getAttribute('tabindex') || 0;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.shadowRoot.removeEventListener('slotchange', this._onSlotChange);
  }

  focus() {
    if (this.editable) {
      this.shadowRoot.querySelector('input')?.focus();
    } else {
      super.focus();
    }
  }

  _onSlotChange(_) {
    this._value = this.textContent;

    if (this.editable) {
      this.requestUpdate();
    }
  }

  _onKeyDown(e) {
    e.stopPropagation();
    // we want to trigger change in key down
    if ((e.metaKey && e.code === 'KeyS') || e.code === 'Enter') {
      e.preventDefault();
      this._triggerChange(e, true);
    }
  }

  _onKeyUp(e) {
    if (e.target.value !== this._value && this.dirty === false) {
      this.dirty = true;
    } else if (e.target.value === this._value && this.dirty === true) {
      this.dirty = false;
    }
  }

  _triggerChange(e, forceUpdate = false) {
    e.preventDefault();

    if (this.dirty || forceUpdate) {
      this._value = e.target.value.trim();
      this.dirty = false;

      const event = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this._value },
      });

      this.dispatchEvent(event);
    }
  }

  _triggerInput(e) {
    e.stopPropagation();

    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: e.target.value.trim() },
    });

    this.dispatchEvent(event);
  }
}

if (customElements.get('sc-text') === undefined) {
  customElements.define('sc-text', ScText);
}

export default ScText;
