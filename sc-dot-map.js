import { LitElement, html, svg, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { repeat } from 'lit-html/directives/repeat';
import { theme } from './styles.js';
import './sc-position-surface';

class ScDotMap extends LitElement {
  static get properties() {
    return {
      width: {
        type: Number,
        reflect: true,
      },
      height: {
        type: Number,
        reflect: true,
      },
      xRange: {
        type: Array,
        attribute: 'x-range',
        reflect: true,
      },
      yRange: {
        type: Array,
        attribute: 'y-range',
        reflect: true,
      },
      // invert: {
      //   type: Boolean,
      // },
      dots: {
        type: Array,
        hasChanged(newVal, oldVal) { return true },
      },
      dotsColor: {
        type: String,
        attribute: 'dots-color'
      },
      dotsRadiusAbs: {
        type: Number,
        attribute: 'dots-radius-abs'
      },
      dotsRadiusRel: {
        type: Number,
        attribute: 'dots-radius-rel'
      },
      dotsOpacity: {
        type: Number,
        attribute: 'dots-opacity'
      },

      backgroundColor: {
        type: String,
        attribute: 'background-color',
      },
      backgroundOpacity: {
        type: Number,
        attribute: 'background-opacity',
      },
      backgroundImage: {
        type: String,
        attribute: 'background-image',
      },

      captureEvents: {
        type: Boolean,
        attribute: 'capture-events',
      },
    }
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
      }

      :host > div {
        position: relative;
      }

      sc-position-surface {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }

      svg {
        position: relative;
      }
    `;
  }

  constructor() {
    super();

    this.dots = [];
    this.dotsColor = theme['--color-secondary-2'];
    this.dotsRadiusDefault = 5;
    this.dotsRadiusAbs = null;
    this.dotsRadiusRel = null;
    this.dotsOpacity = 1;

    this.xRange = [0, 1];
    this.yRange = [0, 1];
    this.width = 300;
    this.height = 300;

    this.backgroundColor = theme['--color-primary-1'];
    this.backgroundOpacity = 1;

    this._dirty = false;
  }

  connectedCallback() {
    this._dirty = true;
    super.connectedCallback();
  }

  attributeChangedCallback(name, oldval, newval) {
    this._dirty = true;
    super.attributeChangedCallback(name, oldval, newval);
  }

  render() {
    if (this._dirty) {
      const orientation = this.width > this.height ? 'landscape' : 'portrait';
      const containerSize = orientation === 'portrait' ? this.width : this.height;
      const xDelta = this.xRange[1] - this.xRange[0];
      const yDelta = this.yRange[1] - this.yRange[0];
      const deltaRange = yDelta > xDelta ? yDelta : xDelta;

      this.svgWidth = containerSize / deltaRange * xDelta;
      this.svgHeight = containerSize / deltaRange * yDelta;
      this.containerSize = containerSize;
      this.deltaRange = deltaRange;

      const valToPxRatio = containerSize / deltaRange;

      this.x2px = (val) => {
        return valToPxRatio * (val - this.xRange[0]);
      }

      this.y2px = (val) => {
        return valToPxRatio * (val - this.yRange[0]);
      }

      this.radius2px = (val) => {
        return valToPxRatio * val;
      }
    }

    let dotsRadius = this.dotsRadiusDefault;

    if (this.dotsRadiusAbs) {
      dotsRadius = this.dotsRadiusAbs
    } else if (this.dotsRadiusRel) {
      dotsRadius = this.radius2px(this.dotsRadiusRel);
    }

    return html`
      <div
        style="width: ${this.width}px; height: ${this.height}px;">
        ${this.captureEvents
          ? html`
            <sc-position-surface
              width="${this.svgWidth}"
              height="${this.svgHeight}"
              x-range="${JSON.stringify(this.xRange)}"
              y-range="${JSON.stringify(this.yRange)}"
              @input="${this.updatePositions}"
              style="
                left: ${(this.width - this.svgWidth) / 2}px;
                top: ${(this.height - this.svgHeight) / 2}px;"
            ></sc-position-surface>
          `
          : ''
        }
        <svg
          viewBox="0 0 ${this.svgWidth} ${this.svgHeight}"
          style="width: ${this.svgWidth}px;
            height: ${this.svgHeight}px;
            left: ${(this.width - this.svgWidth) / 2}px;
            top: ${(this.height - this.svgHeight) / 2}px;"
        >
          <!-- background -->
          <rect
            x="0"
            y="0"
            width="${this.svgWidth}"
            height="${this.svgHeight}"
            fill="${this.backgroundColor}"
            fill-opacity="${this.backgroundOpacity}"
          ></rect>

          <!-- dost -->
          ${repeat(this.dots, (d) => `${d.x}-${d.y}`, (d => {
            return svg`<circle
              r="${dotsRadius}"
              fill="${d.color || this.dotsColor}"
              cx="${this.x2px(d.x)}"
              cy="${this.y2px(d.y)}"
              style="pointer-event: none; fill-opacity: ${this.dotsOpacity}"
            ></circle>`
          }))}
        </svg>
      </div>
    `;
  }

  updatePositions(e) {
    this.dots = e.detail;
    this.requestUpdate();
  }
}

customElements.define('sc-dot-map', ScDotMap);
