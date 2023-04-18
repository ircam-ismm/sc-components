import { html, svg, css } from 'lit';
import { theme } from './styles.js';
import ScElement from './ScElement.js';

class ScRecord extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      active: {
        type: Boolean,
        reflect: true,
      },
      value: {
        type: Boolean,
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
        fill:  #ffffff;
      }

      svg.active {
        background-color: ${theme['--color-primary-0']};
        fill: ${theme['--color-secondary-3']};
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

  // alias active for consistency and genericity with other components
  get value() {
    return this.active;
  }

  set value(active) {
    this.active = active;
  }

  constructor() {
    super();

    this.width = 30;
    this.active = false;

  }

  render() {
    const size = this._size - 2;

    return html`
      <div>
        <svg
          class="${this.active ? 'active' : ''}"
          style="
            width: ${size}px;
            height: ${size}px;
          "
          viewbox="0 0 20 20"
          @mousedown="${this._onChange}"
          @touchstart="${this._onChange}"
          @contextmenu="${this._preventContextMenu}"
        >
          <circle class="record-shape" cx="10" cy="10" r="5"></circle>  
        </svg>
      </div>
    `
  }

  _onChange(e) {
    e.preventDefault();
    e.stopPropagation();

    this.active = !this.active;

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.active },
    });

    this.dispatchEvent(changeEvent);
    this.requestUpdate();
  }
}

if (customElements.get('sc-record') === undefined) {
  customElements.define('sc-record', ScRecord);
}

export default ScRecord;
