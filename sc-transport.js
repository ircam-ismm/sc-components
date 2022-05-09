import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';

class ScTransport extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      buttons: {},
      state: {
        type: String,
      },
      value: {},
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
      }

      svg.play.active {
        fill: ${theme['--color-secondary-4']};
      }

      svg.pause.active {
        fill: ${theme['--color-secondary-5']};
      }

      svg.stop.active {
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

  set buttons(value) {
    const replace = value.replace(/[\[\]\s]/g, '');
    this._buttons = replace.split(',');
    this.requestUpdate();
  }

  constructor() {
    super();

    this.width = 30;
    this.height = 30;
    this.value = true;
    this.buttons = "";
    this.state = undefined;

    this.renderFunctions = {
      play: this.renderPlay.bind(this),
      pause: this.renderPause.bind(this),
      stop: this.renderStop.bind(this),
    };
  }

  renderPlay(size) {
    return html`
      <svg 
        class="play ${this.state === 'play' ? 'active' : ''}"
        style="
          width: ${size}px;
          height: ${size}px;
        "
        viewbox="0 0 20 20"
        @mousedown="${e => this._onChange(e, 'play')}"
        @touchstart="${e => this._onChange(e, 'play')}"
        @contextmenu="${this._preventContextMenu}"
      >
        <polygon class="play-shape" points="6, 5, 15, 10, 6, 15"></polygon>
      </svg>
    `
  }

  renderPause(size) {
    return html`
      <svg 
        class="pause ${this.state === 'pause' ? 'active' : ''}"
        style="
          width: ${size}px;
          height: ${size}px;
        "
        viewbox="0 0 20 20"
        @mousedown="${e => this._onChange(e, 'pause') }"
        @touchstart="${e => this._onChange(e, 'stop') }"
        @contextmenu="${this._preventContextMenu}"
      >
        <rect class="left" x="5" y="5" width="3" height="10"></rect>
        <rect class="right" x="12" y="5" width="3" height="10"></rect>
      </svg>
    `
  }

  renderStop(size) {
    return html`
      <svg 
        class="stop ${this.state === 'stop' ? 'active' : ''}"
        style="
          width: ${size}px;
          height: ${size}px;
        "
        viewbox="0 0 20 20"
        @mousedown="${e => this._onChange(e, 'stop') }"
        @touchstart="${e => this._onChange(e, 'stop') }"
        @contextmenu="${this._preventContextMenu}"
      >
        <rect class="stop-shape" x="6" y="6" width="8" height="8"></rect>
      </svg>
    `
  }

  render() {
    const size = this._size - 2;

    return html`
      ${this._buttons.map(type => {
        return this.renderFunctions[type](size);
      })}
    `
  }

  _onChange(e, value) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state !== value) {
      this.state = value;

      const changeEvent = new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.state },
      });

      this.dispatchEvent(changeEvent);
      this.requestUpdate();
    }
  }

}

customElements.define('sc-transport', ScTransport);

export default ScTransport;

