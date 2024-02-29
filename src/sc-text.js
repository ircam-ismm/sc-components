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
      multiline: {
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
        line-height: 20px;
        padding: 5px 6px;
        /* white-space: pre; is important to keep the new lines
           cf. https://stackoverflow.com/a/33052216
        */
        white-space: pre;
        background-color: var(--sc-color-primary-1);
        outline: none;

        overflow-y: auto;
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
    this.multiline = false;
    this.dirty = false;
    this._value = null; // value on last change event

    this._triggerChange = this._triggerChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._preventContextMenu = this._preventContextMenu.bind(this);
  }

  render() {
    return html`<slot></slot>`;
  }

  firstUpdated() {
    this._value = this.textContent;
  }

  updated() {
    if (this.editable) {
      // for some reason it does not reflect in the DOM
      this.setAttribute('editable', true);

      if (!this.disabled) {
        this.setAttribute('tabindex', this._tabindex);
        this.setAttribute('contenteditable', 'true');
      } else {
        this.setAttribute('tabindex', -1);
        this.setAttribute('contenteditable', 'false');
      }
    } else {
      this.setAttribute('tabindex', -1);
      this.removeAttribute('editable');
      this.removeAttribute('contenteditable');
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // @note - this is important if the component is e.g. embedded in another component
    this._tabindex = this.getAttribute('tabindex') || 0;

    this.addEventListener('blur', this._triggerChange);
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('keyup', this._onKeyUp);
    this.addEventListener('contextmenu', this._preventContextMenu);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('blur', this._triggerChange);
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('keyup', this._onKeyUp);
    this.removeEventListener('contextmenu', this._preventContextMenu);
  }

  _onKeyDown(e) {
    e.stopPropagation();

    // we want to trigger change in key down
    if (e.metaKey && e.code === 'KeyS') {
      e.preventDefault();
      this._triggerChange(e, true);
    }

    if (!this.multiline && e.code === 'Enter') {
      e.preventDefault();
      this._triggerChange(e, true);
    }
  }

  _onKeyUp(e) {
    if (e.target.textContent !== this._value && this.dirty === false) {
      this.dirty = true;
    } else if (e.target.textContent === this._value && this.dirty === true) {
      this.dirty = false;
    }
  }

  // @note - this requires full refactor of the component because the native
  // input event cannot be bypassed and replaced
  // _triggerInput(e) {
  //   if (this.dirty) {
  //     const event = new CustomEvent('input', {
  //       bubbles: true,
  //       composed: true,
  //       detail: { value: e.target.textContent },
  //     });

  //     this.dispatchEvent(event);
  //   }
  // }

  _triggerChange(e, forceUpdate = false) {
    e.preventDefault();

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
