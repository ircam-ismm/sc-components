import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';

class ScFlash extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      color: {
        type: String,
      },
      flashTime: {
        type: Number,
      },
      active: {
        type: Number,
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
        font-size: 0 !important;
        border: 0px;
      }

      svg {
        box-sizing: border-box;
      }
    `;
  }

  set width(value) {
    this._width = value;
    this.requestUpdate();
  }

  get width() {
    return this._width;
  }

  set flashTime(value) {
    this._flashTime = value;
  }

  get flashTime() {
    return this._flashTime;
  }

  set color(value) {
    this._color = value;
    this.requestUpdate();
  }

  get color() {
    return this._color;
  }

  set height(value) {
    this._heigth = value;
    this.requestUpdate();
  }

  get height() {
    return this._heigth;
  }

  set active(value) {
    clearTimeout(this._timeoutId);

    // use falsy values to be backward compatible
    if (value === true) {
      this._active = true;
      this.requestUpdate();

      this._timeoutId = setTimeout(() => {
        this.active = false;
        this.requestUpdate();
      }, this._flashTime);
    } else {
      this._active = false;
      this.requestUpdate();
    }
  }

  get active() {
    return false;
  }

  // attributeChangedCallback(name, old, value) {
  //   console.log(name, old, value);
  //   super.attributeChangedCallback(name, old, value);
  // }

  constructor() {
    super();

    this.width = 100;
    this.height = 30;

    this.flashTime = 75;

    this.color = "red";

    this._active = false;
    this._timeoutId = null;
  }

  render() {
    return svg`
      <svg
        style="
          width: ${this._width}px;
          height: ${this._heigth}px;
        "
        viewbox="0 0 ${this._width} ${this._heigth}"
      >
      ${this._active
        ? svg`
          <rect
            width="${this._width}"
            height="${this._heigth}"
            fill="${this._color}"
          ></rect>
        `
        : nothing
      }
      </svg>
    `
  }
}

if (customElements.get('sc-flash') === undefined) {
  customElements.define('sc-flash', ScFlash);
}

export default ScFlash;
