import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';

class ScTransport extends ScElement {
  static properties = {
    buttons: {
      type: Array,
    },
    state: {
      type: String,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      box-sizing: border-box;
      vertical-align: top;
      display: inline-flex;
      justify-content: space-between;
      width: auto;
      height: 30px;

      --sc-transport-background-color: var(--sc-color-primary-3);
      --sc-transport-active-background-color: var(--sc-color-primary-1);
      --sc-transport-active-play-fill: var(--sc-color-secondary-4);
      --sc-transport-active-pause-fill: var(--sc-color-secondary-1);
      --sc-transport-active-stop-fill: var(--sc-color-secondary-3);
    }

    svg {
      cursor: pointer;
      border-radius: 2px;
      border: 1px solid var(--sc-transport-background-color);
      background-color: var(--sc-transport-background-color);
      fill:  #ffffff;
      height: 100%;
      width: auto;
      margin-right: 4px;
    }

    svg:last-child {
      margin-right: 0px;
    }

    svg.active {
      background-color: var(--sc-transport-active-background-color);
    }

    svg.play.active {
      fill: var(--sc-transport-active-play-fill);
    }

    svg.pause.active {
      fill: var(--sc-transport-active-pause-fill);
    }

    svg.stop.active {
      fill: var(--sc-transport-active-stop-fill);
    }
  `;

  // alias state
  get value() {
    return this.state;
  }

  set value(value) {
    this.state = value;
  }

  constructor() {
    super();

    this.buttons = ['play', 'pause', 'stop'];
    this.state = null;
  }

  render() {
    return html`
      ${this.buttons.map(type => {
        switch (type) {
          case 'play':
            return html`
              <svg
                class="play ${this.state === 'play' ? 'active' : ''}"
                viewbox="0 0 20 20"
                @mousedown=${e => this._onChange(e, 'play')}
                @touchstart=${e => this._onChange(e, 'play')}
                @contextmenu=${this._preventContextMenu}
              >
                <polygon class="play-shape" points="6, 5, 15, 10, 6, 15"></polygon>
              </svg>
            `;
          case 'pause':
            return html`
              <svg
                class="pause ${this.state === 'pause' ? 'active' : ''}"
                viewbox="0 0 20 20"
                @mousedown=${e => this._onChange(e, 'pause')}
                @touchstart=${e => this._onChange(e, 'pause')}
                @contextmenu=${this._preventContextMenu}
              >
                <rect class="left" x="5" y="5" width="3" height="10"></rect>
                <rect class="right" x="12" y="5" width="3" height="10"></rect>
              </svg>
            `;
          case 'stop':
            return html`
              <svg
                class="stop ${this.state === 'stop' ? 'active' : ''}"
                viewbox="0 0 20 20"
                @mousedown=${e => this._onChange(e, 'stop')}
                @touchstart=${e => this._onChange(e, 'stop')}
                @contextmenu=${this._preventContextMenu}
              >
                <rect class="stop-shape" x="6" y="6" width="8" height="8"></rect>
              </svg>
            `;
        }
      })}
    `;
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
    }
  }

}

if (customElements.get('sc-transport') === undefined) {
  customElements.define('sc-transport', ScTransport);
}

export default ScTransport;

