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

    this.value = 0;

    new EnterExitController(this, {
      onEnter: this.#onEnter.bind(this),
      onExit: this.#onExit.bind(this),
    });
  }

  #onEnter() {
    const event = new CustomEvent('enter', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        active: true,
      },
    });

    this.dispatchEvent(changeEvent);
  }

  #onExit() {
    const event = new CustomEvent('exit', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);

    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        active: false,
      },
    });

    this.dispatchEvent(changeEvent);
  }
}

if (customElements.get('sc-io-surface') === undefined) {
  customElements.define('sc-io-surface', ScIOSurface);
}
