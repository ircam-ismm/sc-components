import { html, css, nothing } from 'lit';
import ScElement from './ScElement.js';

class ScText extends ScElement {
  static get properties() {
    return {
      readonly: {
        type: Boolean,
        reflect: true,
      },
      value: {
        type: String,
      },
      disabled: {
        type: Boolean,
        reflect: true,
      },
      _dirty: {
        type: Boolean,
        state: true,
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
        font-size: 0;
        width: 200px;
        height: 30px;
        font-size: var(--sc-font-size);
        font-family: var(--sc-font-family);
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

      textarea {
        width: 100%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        background-color: var(--sc-color-primary-2);
        border: 1px dotted var(--sc-color-primary-4);
        color: white;
        padding: 6px 2px 6px 6px;
        border-radius: 2px;
        font-size: inherit;
        font-family: inherit;
        resize: none;
        margin: 0;
      }

      :host(:focus) textarea, :host(:focus-visible) textarea {
        outline: none;
        border: 1px solid var(--sc-color-primary-4);
      }

      :host(:focus) textarea.dirty, :host(:focus-visible) textarea.dirty {
        border: 1px solid var(--sc-color-secondary-3);
      }

      textarea[readonly], textarea[readonly]:focus {
        background-color: var(--sc-color-primary-3);
        border: 1px solid var(--sc-color-primary-3);
      }
    `;
  }

  constructor() {
    super();

    this.readonly = false;
    this.value = '';
    this.disabled = false;

    this._dirty = false;

    this._propagateFocus = this._propagateFocus.bind(this);
  }

  render() {
    if (this.readonly === true) {
      this.removeAttribute('tabindex');
    } else {
      this.setAttribute('tabindex', 0);
    }

    this.textContent = this.value;

    return html`
      <textarea
        tabindex="-1"
        class="${this._dirty ? 'dirty' : ''}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        .value="${this.value}"
        @blur=${this._updateValue}
        @keydown=${this._onKeyDown}
        @keyup=${this._onKeyUp}
        @contextmenu=${this._preventContextMenu}
      ></textarea>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }

    this.addEventListener('focus', this._propagateFocus);

    this.value = this.textContent;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('focus', this._propagateFocus);
  }

  _propagateFocus() {
    this.shadowRoot.querySelector('textarea').focus()
  }

  _onKeyDown(e) {
    if (e.metaKey && e.key === 's') {
      e.preventDefault();
      this._updateValue(e, true);
    }
  }

  _onKeyUp(e) {
    if (e.target.value !== this.value && this._dirty === false) {
      this._dirty = true;
    } else if (e.target.value === this.value && this._dirty === true) {
      this._dirty = false;
    }
  }

  _updateValue(e, forceUpdate = false) {
    e.preventDefault();
    e.stopPropagation();

    if (this._dirty || forceUpdate) {
      this.value = this.shadowRoot.querySelector('textarea').value;
      this._dirty = false;

      const event = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(event);
    }
  }
}

if (customElements.get('sc-text') === undefined) {
  customElements.define('sc-text', ScText);
}

export default ScText;
