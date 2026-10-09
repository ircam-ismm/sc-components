import {
  html,
  css,
} from 'lit';

import ScElement from './ScElement.js';
import isMac from './utils/is-mac.js';
import './sc-icon.js';

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
      saveButton: {
        type: Boolean,
        reflect: true,
        attribute: 'save-button'
      }
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
        scrollbar-width: none;
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

      :host sc-icon {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
      }
    `;
  }

  get value() {
    // commit dirty state if value is requested from outside
    if (this.dirty) {
      this._value = this.shadowRoot.querySelector('input').value.trim();
      this.dirty = false;
    }

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
    // kind of hacky firstUpdated but prevent warning about re-render
    if (this._value === null) {
      this._value = this.textContent;
    }

    if (this.editable) {
      /**
       * !!! Important !!!
       * the `@touchend=${e => e.stopPropagation()}` look silly but allows to fix
       * a bug on touch screen where (in some cases...) the component do not respond to
       * user interaction anymore when rendered dynamically
       */
      const $els = [
        html`
          <input
            type="text"
            placeholder=${this.placeholder}
            .value=${this._value}
            ?disabled=${this.disabled}
            @keydown=${this._onKeyDown}
            @keyup=${this._onKeyUp}
            @input=${this._triggerInput}
            @change=${this._triggerChange}
            @touchend=${e => e.stopPropagation()}
          />
        `
      ];

      if (this.saveButton) {
        $els.push(html`
          <sc-icon
            type="save"
            @input=${this._triggerChange}
          ></sc-icon>
        `);
      }

      return $els;
    } else {
      return html`<div><slot></slot></div>`
    }
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
    if (((isMac ? e.metaKey : e.ctrlKey) && e.code === 'KeyS') || e.code === 'Enter') {
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
      const $input = this.shadowRoot.querySelector('input[type=text]');
      this._value = $input.value;
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
