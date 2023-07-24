import { html, css, nothing } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
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
      disabled: {
        type: Boolean,
        reflect: true,
      },
      dirty: {
        type: Boolean,
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
        font-size: 0;
        min-width: 200px;
        min-height: 30px;
        border-radius: 2px;
        font-size: var(--sc-font-size);
        line-height: var(--sc-font-size);
        font-family: var(--sc-font-family);
        color: white;
        line-height: 18px;
        /* white-space: pre; is important to keep the new lines
           cf. https://stackoverflow.com/a/33052216
        */
        white-space: pre;
        background-color: var(--sc-color-primary-4);
        border: 1px solid var(--sc-color-primary-4);
        padding: 5px 6px;
        outline: none;
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
        background-color: var(--sc-color-primary-3);
        border: 1px dotted var(--sc-color-primary-5);
      }

      :host([editable]:focus),
      :host([editable]:focus-visible) {
        border: 1px solid var(--sc-color-primary-5);
      }

      :host([editable][dirty]:focus),
      :host([editable][dirty]:focus-visible) {
        border: 1px solid var(--sc-color-secondary-3);
      }
    `;
  }

  get value() {
    return this.textContent;
  }

  set value(value) {
    // content only updates if contenteditable is set to false
    // note that `contenteditable` is an enumerated attribute
    if (this._editable) {
      this.setAttribute('contenteditable', 'false');
    }

    this.textContent = value;

    if (this._editable) {
      this.setAttribute('contenteditable', 'true');
    }
  }

  constructor() {
    super();

    this.disabled = false;
    this.editable = false;
    this.dirty = false;
    this._value = ''; // value on last change event

    this._updateValue = this._updateValue.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._preventContextMenu = this._preventContextMenu.bind(this);
  }

  render() {
    if (this.editable) {
      // for some reason it does not reflect in the DOM
      this.setAttribute('tabindex', 0);
      this.setAttribute('editable', true);

      if (!this.disabled) {
        this.setAttribute('contenteditable', 'true');
      } else {
        this.setAttribute('contenteditable', 'false');
      }
    } else {
      this.removeAttribute('tabindex');
      this.removeAttribute('editable');
      this.removeAttribute('contenteditable');
    }

    return html`<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }

    this.addEventListener('blur', this._updateValue);
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('keyup', this._onKeyUp);
    this.addEventListener('contextmenu', this._preventContextMenu);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('blur', this._updateValue);
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('keyup', this._onKeyUp);
    this.removeEventListener('contextmenu', this._preventContextMenu);
  }

  _onKeyDown(e) {
    if (e.metaKey && e.key === 's') {
      e.preventDefault();
      this._updateValue(e, true);
    }
  }

  _onKeyUp(e) {
    if (e.target.textContent !== this._value && this.dirty === false) {
      this.dirty = true;
    } else if (e.target.textContent === this._value && this.dirty === true) {
      this.dirty = false;
    }
  }

  _updateValue(e, forceUpdate = false) {
    e.preventDefault();
    e.stopPropagation();

    if (this.dirty || forceUpdate) {
      this._value = e.target.textContent;
      this.dirty = false;

      const event = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this._value },
      });

      this.dispatchEvent(event);
    }
  }
}

if (customElements.get('sc-text') === undefined) {
  customElements.define('sc-text', ScText);
}

export default ScText;
