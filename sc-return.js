import { html, svg, css } from 'lit';
import { theme } from './styles.js';
import ScElement from './ScElement.js';

class ScReturn extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      value: {
        type: Number,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        font-size: 0 !important;
        cursor: pointer;
      }

      svg {
        margin-right: 5px;
        box-sizing: border-box;
        border-radius: 2px;
        border: 1px solid ${theme['--color-primary-2']};
        background-color: ${theme['--color-primary-2']};
        fill: #ffffff;
        stroke: #ffffff;
      }

      svg.active {
        background-color: ${theme['--color-primary-0']};
        fill: ${theme['--color-secondary-4']};
        stroke: ${theme['--color-secondary-4']};
      }

      path {
        stroke-width: 10;
        fill-opacity: 0;
      }

    `;
  }

  set width(value) {
    this._size = value;
    this.requestUpdate();
  }

  get width() {
    return this._size;
  }

  set height(value) {
    this._size = value;
    this.requestUpdate();
  }

  get height() {
    return this._size;
  }

  constructor() {
    super();

    this.width = 30;

    this._active = false;
  }

  render() {
    const size = this._size - 2;

    return html`
      <svg
        class="${this._active ? 'active' : ''}"
        style="
          width: ${size}px;
          height: ${size}px;
        "
        viewbox="-10 -8 120 120"
        @mousedown="${this._onInput}"
        @touchstart="${this._onInput}"
        @mouseup="${this._toggleOff}"
        @touchend="${this._toggleOff}"
        @contextmenu="${this._preventContextMenu}"
      >
        <path
          d="M 20,20
            L 20,80
          "
        ></path>
        <polygon points="30,50 80,20 80,80"></polygon>
      </svg>
    `
  }

  _onInput(e) {
    e.preventDefault();
    e.stopPropagation();

    this._active = true;

    const changeEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(changeEvent);
    this.requestUpdate();
  }

  _toggleOff(e) {
    e.preventDefault();
    e.stopPropagation();

    this._active = false;
    this.requestUpdate();
  }
}

customElements.define('sc-return', ScReturn);

export default ScReturn;
