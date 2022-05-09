import { html, svg, css } from 'lit';
import { theme } from './styles.js';
import ScElement from './ScElement.js';

class ScLoop extends ScElement {
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
          viewbox="-10 -8 120 120"
          @mousedown="${this._onChange}"
          @touchstart="${this._onChange}"
          @contextmenu="${this._preventContextMenu}"
        >  
          <path
            d="M 30,20
              L 70,20
              C 75,20 80,25 80,30
              L 80,70
              C 80,75 75,80 70,80
              L 60,80
              M 40,80
              L 30,80
              C 25,80 20,75 20,70
              L 20,30
              C 20,25 25,20 30,20
            "
          ></path>
          <polygon points="45,80 60,65 60,95"></polygon>
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

customElements.define('sc-loop', ScLoop);

export default ScLoop;
