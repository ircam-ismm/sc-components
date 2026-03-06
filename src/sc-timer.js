import { html, css, nothing } from 'lit';
import { getTime } from '@ircam/sc-utils';

import ScElement from './ScElement.js';

class ScTimer extends ScElement {
  static properties = {
    duration: {
      type: Number,
    },
    active: {
      type: Boolean,
    },
    loop: {
      type: Boolean,
    },
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      width: 30px;
      height: 30px;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      padding: 4px;

      --sc-timer-background-fill-color: var(--sc-color-primary-2);
      --sc-timer-background-stroke-color: transparent;
      --sc-timer-foreground-fill-color: var(--sc-color-secondary-1);
      --sc-timer-foreground-stroke-color: transparent;
    }

    canvas {
      width: 100%;
      height: 100%;
    }
  `;

  #width = null;
  #height = null;
  #resizeObserver = null;
  #computedStyles = null;
  #canvas = null;
  #ctx = null;
  #startTime = null;
  #rafId = null;
  #active = false;

  set active(value) {
    this.#active = value;

    if (this.#active) {
      this.#startTime = getTime();
      this.#rafId = requestAnimationFrame(this.#renderTimer);
    } else {
      this.#startTime = null;
      cancelAnimationFrame(this.#rafId);
    }
  }

  get active() {
    return this.#active;
  }

  constructor() {
    super();

    this.duration = 1;
    this.loop = false;
  }

  render() {
    return html`<canvas></canvas>`;
  }

  firstUpdated() {
    super.firstUpdated();

    this.#canvas = this.shadowRoot.querySelector('canvas');
    this.#ctx = this.#canvas.getContext('2d');
  }

  connectedCallback() {
    super.connectedCallback();

    this.#resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      this.#width = width * window.devicePixelRatio;
      this.#height = height * window.devicePixelRatio;
      this.#canvas.width = this.#width;
      this.#canvas.height = this.#height;

      // A live CSSStyleProperties object, which updates automatically when the element's styles are changed.
      this.#computedStyles = getComputedStyle(this);
    });

    this.#resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.#resizeObserver.disconnect();

    super.disconnectedCallback();
  }

  #renderTimer = () => {
    // make sure we don't crash at init, due to order of execution
    // i.e. active is set when element is created
    if (!this.#canvas || !this.#width) {
      this.#rafId = requestAnimationFrame(this.#renderTimer);
      return;
    }

    // DOM rendered but no styles yet
    const bgFillColor = this.#computedStyles.getPropertyValue('--sc-timer-background-fill-color');
    const bgStrokeColor = this.#computedStyles.getPropertyValue('--sc-timer-background-stroke-color');
    const fgFillColor = this.#computedStyles.getPropertyValue('--sc-timer-foreground-fill-color');
    const fgStrokeColor = this.#computedStyles.getPropertyValue('--sc-timer-foreground-stroke-color');

    const radius = this.#width / 2;
    const now = getTime();
    const elapsed = now - this.#startTime;
    let ended = false;
    let ratio = elapsed / this.duration;

    if (!this.loop) {
      if (ratio > 1) {
        ended = true;
      }

      ratio = Math.max(0, Math.min(1, ratio));
    } else {
      ratio = ratio % 1;
    }

    const angle = ratio * Math.PI * 2;

    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    this.#ctx.save();

    this.#ctx.translate(this.#width / 2, this.#height / 2);
    this.#ctx.rotate(- Math.PI / 2);

    // bg
    this.#ctx.fillStyle = bgFillColor;
    this.#ctx.strokeStyle = bgStrokeColor;
    this.#ctx.beginPath();
    this.#ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    this.#ctx.closePath();
    this.#ctx.fill();
    this.#ctx.stroke();
    // foreground

    this.#ctx.fillStyle = fgFillColor;
    this.#ctx.strokeStyle = fgStrokeColor;
    this.#ctx.beginPath();
    this.#ctx.moveTo(0, 0);
    this.#ctx.lineTo(radius, 0);
    this.#ctx.arc(0, 0, radius, 0, angle);
    this.#ctx.closePath();
    this.#ctx.fill();
    this.#ctx.stroke();

    this.#ctx.restore();

    if (!ended) {
      this.#rafId = requestAnimationFrame(this.#renderTimer);
    }
  }
}

if (!customElements.get('sc-timer')) {
  customElements.define('sc-timer', ScTimer);
}
