import { css, html, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';

class ScProgressBar extends ScElement {
  static get properties() {
    return {
      getTimeFunction: {},
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

      rect.foreground {}

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

    this.getTimeFunction = () => Date.now() / 1000;
    this.width = 400;
    this.height = 50;
    this.min = 0;
    this.max = 1;
    this.displayNumber = false;
  }

  render() {
    const now = this.getTimeFunction();
    let norm = 0;

    if (Number.isFinite(now)) {
      norm = (now - this.min) / (this.max - this.min);
    };

    norm = Math.min(Math.max(norm, 0), 1);

    const height = this.displayNumber ? this.height - 30 - 2 : this.height - 2;
    const width = this.width - 2;

    return html`
      <div style="width: ${this.width}px; height: ${this.height}px">
        <svg
          style="width: ${width}px; height: ${height}px"
          viewport="0 0 ${width} ${height}"
        >
          <rect class="background" width="${width}" height="${height}"></rect>
          <rect class="foreground" width="${norm * width}" height="${height}" fill="${theme['--color-primary-4']}"></rect>
        </svg>
        ${this.displayNumber ?
          html`
            <sc-number
              width="${width}"
              min="0"
              value="${now}"
            ></sc-number>
          ` : nothing }
      </div>
    `;
  }

  _render() {
    this.requestUpdate();
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
