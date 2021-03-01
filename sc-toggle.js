import { html, svg, css } from 'lit-element';
import { theme } from './styles.js';
import ScElement from './ScElement.js';

class ScToggle extends ScElement {
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
        user-select: none;
        font-size: 0 !important;
      }

      svg {
        box-sizing: border-box;
        border: 1px solid ${theme['--color-primary-2']};
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

    this.updateValue = this.updateValue.bind(this);
  }

  render() {
    const padding = 25;
    const strokeWidth = 10;

    return html`
      <svg
        style="width: ${this._size}px; height: ${this._size}px;"
        viewbox="0 0 100 100"
        @mousedown="${this.updateValue}"
        @touchstart="${{
          handleEvent: this.updateValue,
          passive: false,
        }}"

        @contextmenu="${this._preventContextMenu}"
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="${theme['--color-primary-1']}"
        ></rect>
        ${this.active
          ? svg`
              <line
                x1="${padding}"
                y1="${padding}"
                x2="${100 - padding}"
                y2="${100 - padding}"
                style="stroke-width:${strokeWidth}; stroke:#ffffff;" />
              <line
                x1="${padding}"
                y1="${100 - padding}"
                x2="${100 - padding}"
                y2="${padding}"
                style="stroke-width:${strokeWidth}; stroke:#ffffff;" />
            `
          : svg`
              <line
                x1="${padding}"
                y1="${padding}"
                x2="${100 - padding}"
                y2="${100 - padding}"
                style="stroke-width:${strokeWidth}; stroke:${theme['--color-primary-3']};" />
              <line
                x1="${padding}"
                y1="${100 - padding}"
                x2="${100 - padding}"
                y2="${padding}"
                style="stroke-width:${strokeWidth}; stroke:${theme['--color-primary-3']};" />
            `
        }
      </svg>
    `;
  }

  updateValue(e) {
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

customElements.define('sc-toggle', ScToggle);

export default ScToggle;
