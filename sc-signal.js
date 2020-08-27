import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import ScElement from './ScElement.js';
import { theme, fontFamily } from './styles.js';

class ScSignal extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      duration: {
        type: Number,
      },
      min: {
        type: Number,
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
      displayMinMax: {
        type: Boolean,
        attribute: 'display-min-max',
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
        background-color: white;
        line-height: 0;
        outline: 1px solid ${theme['--color-primary-2']};
        position: relative;
      }

      canvas {
        margin: 0;
      }

      .min, .max {
        display: block;
        width: 50px;
        height: 14px;
        line-height: 14px;
        font-size: 10px;
        font-family: ${fontFamily};
        position: absolute;
        right: 0px;
        text-align: right;
        padding-right: 2px;
        color: ${theme['--color-primary-0']};;
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

    if (this.displayMinMax) {
      let changed = false;

      for (let i = 0; i < frame.data.length; i++) {
        if (frame.data[i] > this._maxValue) {
          this._maxValue = frame.data[i];
          changed = true;
        }

        if (frame.data[i] < this._minValue) {
          this._minValue = frame.data[i];
          changed = true;
        }
      }

      if (changed) {
        this.requestUpdate();
      }
    }
  }

  constructor() {
    super();

    this.width = 300;
    this.height = 150;
    this.duration = 1;
    this.colors = ['#4682B4', '#ffa500', '#00e600', '#ff0000', '#800080', '#224153'];
    this.displayMinMax = false;

    this.min = -1;
    this.max = 1;

    this._frameStack = [];
    this._pixelIndex = null;

    this._dirty = true;
    this._maxValue = -Infinity;
    this._minValue = +Infinity;

    this._renderSignal = this._renderSignal.bind(this);
  }

  render() {
    return html`
      <div
        @contextmenu="${this._preventContextMenu}"
      >
        <canvas
          style="
            width: ${this.width}px;
            height: ${this.height}px;
          "
        ></canvas>
        ${this.displayMinMax
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
    const scale = window.devicePixelRatio;

    this.canvas = this.shadowRoot.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.cachedCanvas = document.createElement('canvas');
    this.cachedCtx = this.cachedCanvas.getContext('2d');

    // debug cached canvas
    // this.cachedCanvas.style.position = 'absolute';
    // this.cachedCanvas.style.top = 0;
    // this.cachedCanvas.style.right = 0;
    // this.cachedCanvas.style.outline = '1px solid red';
    // document.body.appendChild(this.cachedCanvas);

    super.firstUpdated();
  }

  connectedCallback() {
    this._frameStack.length = 0;
    this._pixelIndex = null;

    super.connectedCallback();

    this.rAFId = window.requestAnimationFrame(this._renderSignal);
  }

  update(changedProperties) {
    this._dirty = true;
    super.update(changedProperties);
  }

  disconnectedCallback() {
    window.cancelAnimationFrame(this.rAFId);

    this._frameStack.length = 0;
    this.ctx.clearRect(0, 0, this._logicalWidth, this._logicalHeight);
    this.cachedCtx.clearRect(0, 0, this._logicalWidth, this._logicalHeight);

    super.disconnectedCallback();
  }

  _renderSignal() {

    if (this._dirty) {
      // @todo - fix weird behavior when updating `width`
      const scale = window.devicePixelRatio;
      this._logicalWidth = this.width * scale;
      this._logicalHeight = this.height * scale;

      this.canvas.width = this._logicalWidth;
      this.canvas.height = this._logicalHeight;
      this.cachedCanvas.width = this._logicalWidth;
      this.cachedCanvas.height = this._logicalHeight;

      // create y scale (should be called on height, min or max change)
      const min = this.min;
      const max = this.max;
      const height = this._logicalHeight;

      const a = (0 - height) / (max - min);
      const b = height - (a * min);

      this._getYPosition = (x) => a * x + b;

      this._frameStack.length = 0;
      this._pixelIndex = null;
      this.ctx.clearRect(0, 0, this._logicalWidth, this._logicalHeight);
      this.cachedCtx.clearRect(0, 0, this._logicalWidth, this._logicalHeight);

      this._dirty = false;
    }

    const frameStackSize = this._frameStack.length;

    if (frameStackSize > 0) {
      let shiftCanvasPixels = 0;
      let abort = false;
      const pixelDuration = this.duration / this.width;

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
          if (this.lastFrame) {
            const width = this._logicalWidth;
            const height = this._logicalHeight;
            const lastFramePixel = width - shiftCanvasPixels;

            // shift canvas from `shiftCanvasPixels`
            this.ctx.clearRect(0, 0, width, height);
            this.ctx.drawImage(this.cachedCanvas,
              shiftCanvasPixels, 0, lastFramePixel, height,
              0, 0, lastFramePixel, height
            );

            this.ctx.lineWidth = this.lineWidth;
            this.ctx.lineCap = 'round';

            for (let i = 0; i < frame.data.length; i++) {
              this.ctx.strokeStyle = this.colors[i];
              // draw line between lastFrame (width - shiftCanvasPixels, y)
              // and currentFrame (width, y)
              const lastY = this._getYPosition(this.lastFrame.data[i]);
              const currentY = this._getYPosition(frame.data[i]);

              this.ctx.beginPath();
              this.ctx.moveTo(lastFramePixel, lastY);
              this.ctx.lineTo(width, currentY);
              this.ctx.stroke();
            }

            // save currentState into cache
            this.cachedCtx.clearRect(0, 0, width, height);
            this.cachedCtx.drawImage(this.canvas, 0, 0, width, height);
          }

          this.lastFrame = frame;
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

customElements.define('sc-signal', ScSignal);
