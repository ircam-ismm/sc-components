import { html, css } from 'lit';
import ScElement from './ScElement.js';
import icons from './utils/icons.js';

class ScIcon extends ScElement {
  static get properties() {
    return {
      icon: {
        type: String,
        reflect: true,
      },
      href: {
        type: String,
        reflect: true,
      },
      value: {
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
        overflow: hidden;
        width: 30px;
        height: 30px;
        border: 1px solid var(--sc-color-primary-2);
        background-color: var(--sc-color-primary-1);
      }

      div {
        cursor: pointer;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }

      div:active {
        opacity: 0.7;
      }

      a {
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 100%;
      }

      svg {
        box-sizing: border-box;
        padding: 3px;
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();

    this.icon = 'question';
    this.value = null;
    this.href = '';

    this._pressed = false;

    this.onEvent = this.onEvent.bind(this);
  }

  render() {
    let include;

    if (this.href !== '') {
      include = html`
        <a href="${this.href}" target="_blank">
          ${icons[this.icon]}
        </a>
      `;
    } else {
      include = icons[this.icon];
    }

    return html`
      <div
        @mousedown="${this.onEvent}"
        @mouseup="${this.onEvent}"
        @touchstart="${{
          handleEvent:this.onEvent,
          passive: false,
        }}"
        @touchend="${this.onEvent}"
        @contextmenu="${this._preventContextMenu}"
      >
        ${include}
      </div>
    `;
  }

  onEvent(e) {
    e.preventDefault();

    const eventName = (e.type === 'touchend' || e.type === 'mouseup') ? 'release' : 'press';
    // we don't want to trigger a release if no pressed has been recorded
    if (eventName === 'release' && this._pressed === false) {
      return;
    }

    this._pressed = (eventName === 'press');

    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);

    if (eventName === 'press') {
      const inputEvent = new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      });

      this.dispatchEvent(inputEvent);
    }
  }
}

if (customElements.get('sc-icon') === undefined) {
  customElements.define('sc-icon', ScIcon);
}

export default ScIcon;

