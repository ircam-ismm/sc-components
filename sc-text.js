import { html, css, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import ScElement from './ScElement.js';
import { fontFamily, fontSize, theme } from './styles.js';

class ScText extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      value: {
        type: String,
      },
      readonly: {
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
      }

      textarea {
        vertical-align: top;
        box-sizing: border-box;
        background-color: ${theme['--color-primary-2']};
        border: 1px dotted ${theme['--color-primary-4']};
        color: white;
        font-family: ${fontFamily};
        padding: 6px 2px 6px 6px;
        border-radius: 2px;
        font-size: ${fontSize};
        line-height: ${16}px;
        resize: none;
      }

      textarea:focus {
        outline: none;
        border: 1px solid ${theme['--color-primary-4']};
      }

      textarea.dirty {
        border: 1px solid ${theme['--color-secondary-3']};
      }

      textarea[readonly], textarea[readonly]:focus {
        background-color: ${theme['--color-primary-3']};
        border: 1px solid ${theme['--color-primary-3']};
      }
    `;
  }

  constructor() {
    super();

    this.width = 200;
    this.height = 30;
    this.value = '';
    this.readonly = false;

    this._dirty = false;
  }

  render() {
    const classes = { dirty: this._dirty };

    return html`
      <textarea
        class=${classMap(classes)}
        style="
          width: ${this.width}px;
          height: ${this.height}px;
        "
        .value="${this.value}"
        ?readonly=${this.readonly}
        @blur=${this.updateValue}
        @keydown=${this.onKeyDown}
        @keyup=${this.onKeyUp}
        @contextmenu="${this._preventContextMenu}"
      ></textarea>
    `;
  }

  focus() {
    const $textarea = this.shadowRoot.querySelector('textarea');

    if ($textarea) {
      $textarea.focus();
    }
  }

  onKeyDown(e) {
    // manually do comment because opens Help menu otherwise...
    if (e.metaKey && e.key === 's') {
      e.preventDefault();

      this.updateValue(e, true);
    }
  }

  onKeyUp(e) {
    if (e.target.value !== this.value && this._dirty === false) {
      this._dirty = true;
      this.requestUpdate();
    } else if (e.target.value === this.value && this._dirty === true) {
      this._dirty = false;
      this.requestUpdate();
    }
  }

  updateValue(e, forceUpdate = false) {
    e.preventDefault();
    e.stopPropagation();

    if (this._dirty || forceUpdate) {
      this.value = e.target.value;
      this._dirty = false;

      const event = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(event);
      this.requestUpdate();
    }
  }
}

if (customElements.get('sc-text') === undefined) {
  customElements.define('sc-text', ScText);
}

export default ScText;
