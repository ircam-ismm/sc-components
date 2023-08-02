import { html, css, nothing } from 'lit';
import ScElement from './ScElement.js';

class ScSignal extends ScElement {
  static properties = {
    duration: {
      type: Number,
      reflect: true,
    },
    min: {
      type: Number,
      reflect: true,
    },
    max: {
      type: Number,
      reflect: true,
    },
    colors: {
      type: Array,
    },
    lineWidth: {
      type: Number,
      reflect: true,
      attribute: 'line-width',
    },
    minMax: {
      type: Boolean,
      attribute: 'min-max',
      reflect: true,
    },

    // private reactive properties
    _maxValue: {
      type: Number,
      state: true,
    },
    _minValue: {
      type: Number,
      state: true,
    },
  };

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        width: 300px;
        height: 150px;
        box-sizing: border-box;
        background-color: white;
        color: var(--sc-color-primary-1);
        position: relative;
        border: 1px solid var(--sc-color-primary-2);
      }

      :host > div {
        width: 100%;
        height: 100%;
      }

      canvas {
        box-sizing: border-box;
        margin: 0;
        width: 100%;
        height: 100%;
      }

      .min, .max {
        display: block;
        width: 100%;
        height: 14px;
        line-height: 14px;
        font-size: 10px;
        font-family: var(--sc-font-family);
        position: absolute;
        right: 0px;
        text-align: right;
        padding-right: 2px;
        color: inherit;
      }

      .min {
        bottom: 0px;
      }

      .max {
        top: 0px;
      }
    `;
  }

  set value(frame) {
    frame.data = Array.isArray(frame.data) ? frame.data : [frame.data];
    // need to copy values at some point
    this._frameStack.push(frame);

    if (this.minMax) {
      for (let i = 0; i < frame.data.length; i++) {
        if (frame.data[i] > this._maxValue) {
          this._maxValue = frame.data[i];
        }

        if (frame.data[i] < this._minValue) {
          this._minValue = frame.data[i];
        }
      }
    }
  }

  update(changedProperties) {
    if (changedProperties.has('duration')
      || changedProperties.has('min')
      || changedProperties.has('max')
    ) {
      this._resetCanvas();
    }

    super.update(changedProperties);
  }

  constructor() {
    super();

    this.duration = 1;
    this.colors = ['#4682B4', '#ffa500', '#00e600', '#ff0000', '#800080', '#224153'];
    this.lineWidth = 1;
    this.minMax = false;

    this.min = -1;
    this.max = 1;

    this._maxValue = -Infinity;
    this._minValue = +Infinity;

    this._frameStack = [];
    this._pixelIndex = null;
    this._lastFrame = null;

    this._canvas = null;
    this._ctx = null;
    this._cachedCanvas = null;
    this._cachedCtx = null;
    this._getYPosition = null;
    // accroding to window.devicePixelRatio
    this._logicalWidth = null;
    this._logicalHeight = null;

    this._renderSignal = this._renderSignal.bind(this);
  }

  /**
   * @note: Initialization order
   * - connectedCallback()
   * - render()
   * - firstUpdated();
   * -> ResizeObserver callback is called after `firstUpdated()`
   */

  render() {
    return html`
      <div @contextmenu="${this._preventContextMenu}">
        <canvas></canvas>
        ${this.minMax
          ? html`
            <span class="max">${this._maxValue.toFixed(3)}</span>
            <span class="min">${this._minValue.toFixed(3)}</span>
            `
          : nothing
        }
      </div>
    `;
  }

  firstUpdated() {
    super.firstUpdated();

    this._canvas = this.shadowRoot.querySelector('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._cachedCanvas = document.createElement('canvas');
    this._cachedCtx = this._cachedCanvas.getContext('2d');

    // debug cached canvas
    // this._cachedCanvas.style.position = 'absolute';
    // this._cachedCanvas.style.top = 0;
    // this._cachedCanvas.style.right = 0;
    // this._cachedCanvas.style.outline = '1px solid red';
    // document.body.appendChild(this._cachedCanvas);
  }

  connectedCallback() {
    super.connectedCallback();

    this._frameStack.length = 0;
    this._pixelIndex = null;

    this._resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      this._logicalWidth = width * window.devicePixelRatio;
      this._logicalHeight = height * window.devicePixelRatio;

      this._canvas.width = this._logicalWidth;
      this._canvas.height = this._logicalHeight;
      this._cachedCanvas.width = this._logicalWidth;
      this._cachedCanvas.height = this._logicalHeight;

      this._resetCanvas();
    });

    this._resizeObserver.observe(this);

    this.rAFId = window.requestAnimationFrame(this._renderSignal);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();

    window.cancelAnimationFrame(this.rAFId);
    this._resetCanvas();

    super.disconnectedCallback();
  }

  _resetCanvas() {
    // can be called before `firstUpdated`
    if (this._ctx && this._cachedCtx) {
      const a = (0 - this._logicalHeight) / (this.max - this.min);
      const b = this._logicalHeight - (a * this.min);

      this._getYPosition = (x) => a * x + b;

      this._lastFrame = null;
      this._frameStack.length = 0;
      this._pixelIndex = null;

      this._ctx.clearRect(0, 0, this._logicalWidth, this._logicalHeight);
      this._cachedCtx.clearRect(0, 0, this._logicalWidth, this._logicalHeight);
    }
  }

  _renderSignal() {
    const frameStackSize = this._frameStack.length;

    if (frameStackSize > 0) {
      let shiftCanvasPixels = 0;
      let abort = false;
      const pixelDuration = this.duration / this._logicalWidth;

      if (this._pixelIndex === null) {
        this._pixelIndex = Math.floor(this._frameStack[0].time / pixelDuration);
      }

      // while we have some frames to display, we go through pixels and display
      while (this._frameStack.length > 0) {
        shiftCanvasPixels += 1;

        const pixelStartTime = this._pixelIndex * pixelDuration;
        const pixelStopTime = (this._pixelIndex + 1) * pixelDuration;
        // console.log(pixelStartTime, pixelStopTime, this._pixelIndex);
        let candidateIndex = null;

        // find candidates for display in current pixel
        for (let i = 0; i < this._frameStack.length; i++) {
          const frame = this._frameStack[i];
          const frameTime = frame.time;

          // ignore old pixel
          if (frameTime < pixelStartTime) {
            // if last frame in stack, abort and wait for new frames
            if (i + 1 === this._frameStack.length) {
              // console.log('im there', frameTime, pixelStartTime, this._frameStack.length, i);
              this._frameStack.length = 0;
              abort = true;
            }
          // we take the last frame we find in the pixel time interval
          } else if (frameTime >= pixelStartTime && frameTime < pixelStopTime) {
            candidateIndex = i;
          }
        }

        // we abort before incrementing this._pixelIndex,
        // as we want to recheck the same pixel with new data later
        if (abort) {
          break;
        }

        // @note - there is probably room for optimizations here as
        // we store and retrieve the comlete canvas at each pixel. This could
        // probably be batched in some way.
        if (candidateIndex !== null) {
          const frame = this._frameStack[candidateIndex];
          // draw line since last frame
          if (this._lastFrame) {
            const width = this._logicalWidth;
            const height = this._logicalHeight;
            const lastFramePixel = width - shiftCanvasPixels;

            // shift canvas from `shiftCanvasPixels`
            this._ctx.clearRect(0, 0, width, height);
            this._ctx.drawImage(this._cachedCanvas,
              shiftCanvasPixels, 0, lastFramePixel, height,
              0, 0, lastFramePixel, height
            );

            this._ctx.lineWidth = this.lineWidth;
            this._ctx.lineCap = 'round';

            for (let i = 0; i < frame.data.length; i++) {
              this._ctx.strokeStyle = this.colors[i];
              // draw line between lastFrame (width - shiftCanvasPixels, y)
              // and currentFrame (width, y)
              const lastY = this._getYPosition(this._lastFrame.data[i]);
              const currentY = this._getYPosition(frame.data[i]);

              this._ctx.beginPath();
              this._ctx.moveTo(lastFramePixel, lastY);
              this._ctx.lineTo(width, currentY);
              this._ctx.stroke();
            }

            // save currentState into cache
            this._cachedCtx.clearRect(0, 0, width, height);
            this._cachedCtx.drawImage(this._canvas, 0, 0, width, height);
          }

          this._lastFrame = frame;
          shiftCanvasPixels = 0;

          // remove frames from stack including rendered candidate
          this._frameStack.splice(0, candidateIndex + 1);
        }

        this._pixelIndex += 1;
      } // end while
    } // end if

    this.rAFId = window.requestAnimationFrame(this._renderSignal);
  }
}

if (customElements.get('sc-signal') === undefined) {
  customElements.define('sc-signal', ScSignal);
}

export default ScSignal;
