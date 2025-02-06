import { html, css, svg, nothing } from 'lit';

import ScElement from './ScElement.js';
import midiControlled from './mixins/midi-controlled.js';
import KeyboardController from './controllers/keyboard-controller.js';

class ScTransportBase extends ScElement {
  #tabindex = 0;

  static properties = {
    buttons: {
      type: Array,
    },
    value: {
      type: String,
      reflect: true,
    },
    disabled: {
      type: Boolean,
      reflect: true,
    }
  };

  static styles = css`
    :host {
      box-sizing: border-box;
      vertical-align: top;
      display: inline-flex;
      justify-content: space-between;
      width: auto;
      height: 30px;
      border-radius: 0;
      cursor: pointer;

      --sc-transport-background-color: var(--sc-color-primary-2);
      --sc-transport-active-background-color: var(--sc-color-primary-1);
      --sc-transport-active-play-fill: var(--sc-color-secondary-4);
      --sc-transport-active-pause-fill: var(--sc-color-secondary-1);
      --sc-transport-active-stop-fill: var(--sc-color-secondary-3);
    }

    :host([hidden]) {
      display: none
    }

    :host([disabled]) {
      opacity: 0.7;
      cursor: default;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }

    svg {
      box-sizing: border-box;
      border-radius: inherit;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-transport-background-color);
      fill:  #ffffff;
      height: 100%;
      width: auto;
      margin-right: 4px;
      outline: none;
    }

    :host(:focus) svg, :host(:focus-visible) svg {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
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

  // midi-learn interface
  get midiType() {
    return "control";
  }

  set midiValue(value) {
    if (this.disabled) {
      return;
    }

    if (value > 0) {
      let index = this.buttons.indexOf(this.value);
      index += 1;

      if (index < 0) {
        index = this.buttons.length - 1;
      } else if (index >= this.buttons.length) {
        index = 0;
      }

      this.value = this.buttons[index];
      this.#dispatchEvent();
    }
  }

  get midiValue() {
    // @todo - define what we should do here
    return null;
  }

  constructor() {
    super();

    this.buttons = ['play', 'pause', 'stop'];
    this.value = null;
    this.disabled = false;

    new KeyboardController(this, {
      filterCodes: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Space'],
      callback: this.#onKeyboardEvent.bind(this),
      deduplicateEvents: true,
    });
  }

  render() {
    return html`
      ${this.buttons.map(type => {
        switch (type) {
          case 'play':
          case 'start': // allow start as an alias for play
            return html`
              <svg
                class="play ${this.value === type ? 'active' : ''}"
                viewbox="0 0 20 20"
                @click=${e => this.#onClick(e, type)}
                tabindex="-1"
              >
                <polygon class="play-shape" points="6, 5, 15, 10, 6, 15"></polygon>
              </svg>
            `;
          case 'pause':
            return html`
              <svg
                class="pause ${this.value === 'pause' ? 'active' : ''}"
                viewbox="0 0 20 20"
                @click=${e => this.#onClick(e, 'pause')}
                tabindex="-1"
              >
                <rect class="left" x="5" y="5" width="3" height="10"></rect>
                <rect class="right" x="12" y="5" width="3" height="10"></rect>
              </svg>
            `;
          case 'stop':
            return html`
              <svg
                class="stop ${this.value === 'stop' ? 'active' : ''}"
                viewbox="0 0 20 20"
                @click=${e => this.#onClick(e, 'stop')}
                tabindex="-1"
              >
                <rect class="stop-shape" x="6" y="6" width="8" height="8"></rect>
              </svg>
            `;
        }
      })}
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      const tabindex = this.disabled ? -1 : this.#tabindex;
      this.setAttribute('tabindex', tabindex);

      if (this.disabled) { this.blur(); }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // @note - this is important if the component is e.g. embedded in another component
    this.#tabindex = this.getAttribute('tabindex') || 0;
  }

  #onKeyboardEvent(e) {
    if (e.type === 'keydown') {
      let index = this.buttons.indexOf(this.value);

      if (e.code === 'ArrowUp' || e.code === 'ArrowRight' || e.code === 'Space') {
        index += 1;
      } else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
        index -= 1;
      }

      if (index < 0) {
        index = this.buttons.length - 1;
      } else if (index >= this.buttons.length) {
        index = 0;
      }

      this.value = this.buttons[index];
      this.#dispatchEvent('input', this.value);
      this.#dispatchEvent('change', this.value);
    }
  }

  #onClick(e, value) {
    e.preventDefault();
    e.stopPropagation();

    if (this.disabled) { return; }

    this.focus();

    this.#dispatchEvent('input', value);

    if (this.value !== value) {
      this.value = value;
      this.#dispatchEvent('change', this.value);
    }
  }

  #dispatchEvent(type, value) {
    const changeEvent = new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: { value },
    });

    this.dispatchEvent(changeEvent);
  }
}

const ScTransport = midiControlled('ScTransport', ScTransportBase);

if (customElements.get('sc-transport') === undefined) {
  customElements.define('sc-transport', ScTransport);
}

export default ScTransport;

