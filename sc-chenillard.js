import { css, html, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';
import { getTime } from '@ircam/sc-gettime';

class ScChenillard extends ScElement {
  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      size: { type: Number }, // handler size
    }
  }
  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
        font-size: 0;
      }

      :host > div {
        box-sizing: border-box;
        background-color: rgb(106, 106, 105);
        border: 1px solid rgb(106, 106, 105);
        border-radius: 2px;
        position: relative
      }

      rect.foreground {
        fill: ${theme['--color-primary-4']};
      }

      rect.background {
        fill: ${theme['--color-primary-1']};
      }

      sc-number {
        position: absolute;
        bottom: 0;
        left: 0
      }
    `;
  }

  constructor() {
    super();

    this.getProgressFunction = getTime;
    this.width = 400;
    this.height = 30;
    this.size = 0.1; // size of the moving part

    this._progress;
  }

  render() {
    const size = this.size;
    const amplitude = 1 - size;
    const handlerWidth = this.width * this.size;

    const height = this.height - 2;
    const width = this.width - 2;

    // progress 0 is on the left
    // progress 1 is on the right
    const posX = Math.round(this._progress * (width - handlerWidth));

    // const pos = (this._progress % 2) * amplitude; // [0-2]
    // let progressWidth;
    // if (pos < amplitude) {
    //   progressWidth = Math.round(pos * width); // [0-2]*width
    // } else {
    //   progressWidth = Math.round(Math.abs((2 * amplitude) - pos) * width); //[0-2]*width
    // }

    // const progressWidthStart = (progressWidth - chenillardWidth) - (1 - chenillardWidth); //[0-2]W - 0.2W
    // console.log(progressWidthStart);

    return html`
      <div style="width: ${this.width}px; height: ${this.height}px">
        <svg
          style="width: ${width}px; height: ${height}px"
          viewport="0 0 ${width} ${height}"
        >
          <rect class="background" width="${width}" height="${height}"></rect>
          <rect class="foreground" x="${posX}" width="${handlerWidth}" height="${height}"></rect>
        </svg>
      </div>
    `;
  }

  _render() {
    const progress = this.getProgressFunction();

    if (Number.isFinite(progress)) {
      if (progress !== this._progress) {
        this._progress = progress;
        this.requestUpdate();
      }
    }

    this._rafId = requestAnimationFrame(() => this._render());
  }

  connectedCallback() {
    super.connectedCallback();
    this._render();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._timeoutInterval);
    super.disconnectedCallback();
  }

}

if (customElements.get('sc-chenillard') === undefined) {
  customElements.define('sc-chenillard', ScChenillard);
}
