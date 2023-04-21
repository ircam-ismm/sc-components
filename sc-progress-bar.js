import { css, html, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';
import { getTime } from '@ircam/sc-gettime';

class ScProgressBar extends ScElement {
  static get properties() {
    return {
      getProgressFunction: {},
      width: { type: Number },
      height: { type: Number },
      min: { type: Number },
      max: { type: Number },
      displayNumber: { type: Boolean },
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

      div {
        vertical-align: middle;
        text-align: center;
        box-sizing: border-box;
        background-color: rgb(106, 106, 105);
        border: 1px solid rgb(106, 106, 105);
        color: white;
        font-family: Consolas, monaco, monospace;
        border-radius: 2px;
        line-height: 16px;
        resize: none;
      }

      rect.foreground {
        fill: ${theme['--color-primary-4']};
      }

      rect.background {
        fill: ${theme['--color-primary-1']};
      }

      sc-number {
        position: relative;
        top: -3px;
      }
    `;
  }

  constructor() {
    super();

    this.getProgressFunction = getTime;
    this.width = 400;
    this.height = 50;
    this.min = 0;
    this.max = 1;
    this.displayNumber = false;

    this._clamped = 0;
    this._norm = 0;
  }

  render() {
    const numberHeight = 20;
    const height = this.displayNumber ? this.height - numberHeight - 2 : this.height - 2;
    const width = this.width - 2;
    const progressWidth = Math.round(this._norm * width);

    return html`
      <div style="width: ${this.width}px; height: ${this.height}px">
        <svg
          style="width: ${width}px; height: ${height}px"
          viewport="0 0 ${width} ${height}"
        >
          <rect class="background" width="${width}" height="${height}"></rect>
          <rect class="foreground" width="${progressWidth}" height="${height}"></rect>
        </svg>
        ${this.displayNumber ?
          html`
            <sc-number
              width="${width}"
              height="${numberHeight}"
              min="0"
              value="${this._clamped}"
            ></sc-number>
          ` : nothing }
      </div>
    `;
  }

  _render() {
    const progress = this.getProgressFunction();

    if (Number.isFinite(progress)) {
      const clamped = Math.min(Math.max(progress, this.min), this.max);

      let norm = 0;

      if (Number.isFinite(clamped)) {
        norm = (clamped - this.min) / (this.max - this.min);
      };

      if (norm !== this._norm) {
        this._clamped = clamped;
        this._norm = norm;
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

if (customElements.get('sc-progress-bar') === undefined) {
  customElements.define('sc-progress-bar', ScProgressBar);
}
