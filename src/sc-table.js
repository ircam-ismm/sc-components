import { html, svg, css, nothing } from 'lit';
import { isTypedArray } from '@ircam/sc-utils';
import ScElement from './ScElement.js';

import './sc-position-surface.js';

class ScTable extends ScElement {
  #size = null;
  #range = null;
  #mode = null;
  #value = null;
  #rawValue = null;

  #canvas = null;
  #ctx = null;
  #width = null;
  #height = null;
  #resizeObserver = null;

  static properties = {
    range: {
      type: Array,
    },
    size: {
      type: Number,
      reflect: true,
    },
    mode: {
      type: String,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: block;
      width: 300px;
      height: 150px;
      background-color: white;
      position: relative;
      background-color: var(--sc-color-primary-3);
    }

    sc-position-surface, canvas {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  `;

  constructor() {
    super();

    this.mode = 'line';
    this.size = 128;
    this.range = [0, 1];
  }

  get size() {
    return this.#size;
  }

  set size(value) {
    if (!Number.isInteger(value)) {
      throw new TypeError(`Cannot set property 'size' on sc-table: value (${value}) is not an integer`);
    }

    if (value < 1 || value > 2048) {
      throw new DOMException(`Cannot set property 'size' on sc-table: value (${value}) is outside range [1, 2048]`, 'NotSupportedError');
    }

    if (value === this.size) {
      return;
    }

    const oldValue = this.size;
    this.#size = value;

    // update underlying buffers
    const newRawValue = new Array(this.size).fill(0);
    const newValue = new Array(this.size).fill(0);

    if (this.#rawValue !== null) {
      const maxIndex = Math.min(newRawValue.length, this.#rawValue.length);

      for (let i = 0; i < maxIndex; i++) {
        newRawValue[i] = this.#rawValue[i];
        newValue[i] = this.#value[i];
      }
    }

    this.#rawValue = newRawValue;
    this.#value = newValue;
    this.#renderCanvas();

    if (oldValue !== null) {
      this.#triggerChange();
    }

    this.requestUpdate('size', oldValue);
  }

  get range() {
    return this.#range;
  }

  set range(value) {
    if (!Array.isArray(value)) {
      throw new TypeError(`Cannot set property 'range' on sc-table: value is not an array`);
    }

    if (value.length !== 2) {
      throw new DOMException(`Cannot set property 'range' on sc-table: value length is not 2`, 'NotSupportedError');
    }

    if (!Number.isFinite(value[0])) {
      throw new DOMException(`Cannot set property 'range' on sc-table: value at index 0 is not a finite number`, 'NotSupportedError');
    }

    if (!Number.isFinite(value[1])) {
      throw new DOMException(`Cannot set property 'range' on sc-table: value at index 1 is not a finite number`, 'NotSupportedError');
    }

    const [newMin, newMax] = value;
    const oldValue = this.range;

    if (oldValue !== null) {
      const [oldMin, oldMax] = this.range;

      if (oldMin === newMin && oldMax === newMax) {
        return;
      }
    }

    this.#range = value;

    // apply new range on current values
    for (let i = 0; i < this.#rawValue.length; i++) {
      this.#value[i] = newMin + (newMax - newMin) * this.#rawValue[i];
    }

    this.#renderCanvas();

    if (oldValue !== null) {
      this.#triggerChange();
    }

    this.requestUpdate('range', oldValue);
  }

  get mode() {
    return this.#mode;
  }

  set mode(value) {
    if (!['line', 'slider'].includes(value)) {
      throw new TypeError(`Cannot set property 'mode' on sc-table: value is not 'line' or 'slider'`);
    }

    if (value === this.#mode) {
      return;
    }

    const oldValue = this.#mode;
    this.#mode = value;
    this.#renderCanvas();
    this.requestUpdate('mode', oldValue);
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    if (!Array.isArray(value) && !isTypedArray(value)) {
      throw new TypeError(`Cannot set property 'value' on sc-table: value is not an array`);
    }

    this.#value = Array.from(value);
    this.#size = value.length;
    this.#rawValue = new Array(this.size);
    const [min, max] = this.range;

    for (let i = 0; i < this.#value.length; i++) {
      const value = Math.min(max, Math.max(min, this.#value[i]));
      const norm = (value - min) / (max - min);
      this.#rawValue[i] = norm;
    }

    this.#renderCanvas();
    this.#triggerChange();
  }

  render() {
    return html`
      <canvas></canvas>
      <sc-position-surface
        .yRange=${[1, 0]}
        @input=${this.#updateValue}
      ></sc-position-surface>
    `;
  }

  firstUpdated() {
    super.firstUpdated();

    this.#canvas = this.shadowRoot.querySelector('canvas');
    this.#ctx = this.#canvas.getContext('2d');
    this.#canvas.width = this.#width;
    this.#canvas.height = this.#height;
  }

  connectedCallback() {
    super.connectedCallback();

    this.#resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      this.#width = width;
      this.#height = height;

      if (this.#ctx) {
        this.#canvas.width = this.#width;
        this.#canvas.height = this.#height;
        this.#renderCanvas();
      }
    });

    this.#resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.#resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  #updateValue(e) {
    e.stopPropagation();

    if (e.detail.value.length === 0) {
      this.#triggerChange();
      return;
    }

    const { x, y } = e.detail.value[0];
    const index = Math.max(0, Math.min(this.size - 1, Math.floor(x * this.size)));
    const clampedNorm = Math.max(0, Math.min(1, y));
    const [min, max] = this.range;
    const scaledValue = min + (max - min) * clampedNorm;

    this.#rawValue[index] = clampedNorm;
    this.#value[index] = scaledValue;

    this.#triggerInput(index, scaledValue);
    this.#renderCanvas();
  }

  #renderCanvas() {
    if (this.#ctx === null) {
      return;
    }

    const width = this.#width / this.size;

    this.#ctx.clearRect(0, 0, this.#width, this.#height);

    switch (this.mode) {
      case 'line': {
        this.#rawValue.forEach((value, index) => {
          const x = index * width;
          const y = this.#height - (value * this.#height);

          this.#ctx.fillStyle = 'white';
          this.#ctx.fillRect(x, y, width, 1)
        });
        break;
      }
      case 'slider': {
        const [min, max] = this.range;
        const zeroNorm = Math.max(0, Math.min(1, (0 - min) / (max - min)));
        const yZero = this.#height - (zeroNorm * this.#height)

        this.#rawValue.forEach((value, index) => {
          const x = index * width;
          const y = this.#height - (value * this.#height);

          this.#ctx.fillStyle = 'rgba(244, 180, 62, 0.6)';
          this.#ctx.fillRect(x + 1, y, width - 1, yZero - y);
          this.#ctx.fillStyle = 'white';
          this.#ctx.fillRect(x + 1, y, width - 1, 1);
        });
        break;
      }
    }
  }

  #triggerChange() {
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.#value },
    });

    this.dispatchEvent(changeEvent);
  }

  #triggerInput(index, value) {
    const changeEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { index, value },
    });

    this.dispatchEvent(changeEvent);
  }
}

if (customElements.get('sc-table') === undefined) {
  customElements.define('sc-table', ScTable);
}

export default ScTable;
