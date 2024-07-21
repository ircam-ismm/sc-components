import { css } from 'lit';
import ScElement from './ScElement.js';
import EnterExitController from './controllers/enter-exit-controller.js';

class ScIOSurface extends ScElement {
  static properties = {
    value: {
      type: Object,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      width: 100px;
      height: 100px;
    }
  `;

  constructor() {
    super();

    this.value = null;

    new EnterExitController(this, {
      onEnter: this.#onEnter.bind(this),
      onExit: this.#onExit.bind(this),
    });
  }

  #onEnter(clientX, clientY) {
    const event = new CustomEvent('enter', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        clientX,
        clientY,
      },
    });

    this.dispatchEvent(event);

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        active: true,
        clientX,
        clientY,
      },
    });

    this.dispatchEvent(changeEvent);
  }

  #onExit(clientX, clientY) {
    const event = new CustomEvent('exit', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        clientX,
        clientY,
      },
    });

    this.dispatchEvent(event);

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        active: false,
        clientX,
        clientY,
      },
    });

    this.dispatchEvent(changeEvent);
  }
}

if (customElements.get('sc-io-surface') === undefined) {
  customElements.define('sc-io-surface', ScIOSurface);
}
