import { html, css } from 'lit';
import QRCode from 'qrcode';

import ScElement from './ScElement.js';

class ScQrCode extends ScElement {
  #value = 'https://ircam-ismm.github.io/sc-components/';
  #canvas = null;
  #resizeObserver = null;
  #size = null;

  static properties = {
    value: {
      type: String,
    },
  }

  static styles = css`
    :host {
      width: 200px;
      height: 200px;
      background-color: var(--sc-color-primary-1);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    canvas {
      width: 100%;
      height: 100%;
    }
  `;

  get value() {
    return this.#canvas;
  }

  set value(value) {
    if (value === this.#value) {
      return;
    }

    this.#value = value;
    this.#renderCanvas();
  }

  render() {
    return html`
      <canvas></canvas>
    `;
  }

  firstUpdated() {
    super.firstUpdated();

    this.#canvas = this.shadowRoot.querySelector('canvas');
    this.#canvas.width = this.#size;
    this.#canvas.height = this.#size;
  }

  connectedCallback() {
    super.connectedCallback();

    this.#resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      this.#size = Math.min(width, height);

      if (this.#canvas) {
        this.#canvas.width = this.#size;
        this.#canvas.height = this.#size;
        this.#renderCanvas();
      }
    });

    this.#resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.#resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  #renderCanvas() {
    QRCode.toCanvas(this.#canvas, this.#value, {
      width: this.#size,
      darkcolor: '#f4b43eff',
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }
}

if (customElements.get('sc-qrcode') === undefined) {
  customElements.define('sc-qrcode', ScQrCode);
}

export default ScQrCode;
