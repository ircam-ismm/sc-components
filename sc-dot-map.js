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
      },
      height: {
        type: Number,
      },
      xRange: {
        type: Array,
        attribute: 'x-range',
      },
      yRange: {
        type: Array,
        attribute: 'y-range',
      },
      value: {
        type: Array,
        hasChanged(newVal, oldVal) { return true },
      },
      maxSize: {
        type: Number,
        attribute: 'max-size',
      },
      color: {
        type: String,
        attribute: 'color'
      },
      radius: { // in pixels (precedence over radiusRel)
        type: Number,
        attribute: 'radius'
      },
      radiusRel: { // according to ranges
        type: Number,
        attribute: 'radius-rel'
      },
      opacity: {
        type: Number,
        attribute: 'opacity'
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
      persistEvents: {
        type: Boolean,
        attribute: 'persist-events',
      },
    }
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        line-height: 0;
        vertical-align: top;
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

    this.value = [];
    this.color = theme['--color-secondary-2'];
    this.defaultRadius = 5;
    this.radius = null;
    this.radiusRel = null;
    this.opacity = 1;

    this.maxSize = +Infinity;

    this.xRange = [0, 1];
    this.yRange = [0, 1];
    this.width = 300;
    this.height = 300;

    this.captureEvents = false;
    this.persistEvents = false;

    // can be overriden to 'none'
    this.backgroundColor = theme['--color-primary-1'];
    this.backgroundOpacity = 1;
    this.backgroundImage = '';

    this._dirty = false;
  }

  connectedCallback() {
    this._dirty = true;
    super.connectedCallback();
  }

  update(changedProperties) {
    if (
      changedProperties.has('width')  ||
      changedProperties.has('height') ||
      changedProperties.has('xRange') ||
      changedProperties.has('yRange')
    ) {
      this._dirty = true;
    }

    super.update(changedProperties);
  }

  render() {
    if (this._dirty) {
      const xDelta = Math.abs(this.xRange[1] - this.xRange[0]);
      const yDelta = Math.abs(this.yRange[1] - this.yRange[0]);

      // define which side is th limiting one
      const deltaRatio = xDelta / yDelta;
      const pxRatio = this.width / this.height;

      let limitingSize;
      let limitingDelta;

      if (deltaRatio > pxRatio) {
        limitingSize = this.width;
        limitingDelta = xDelta;
      } else {
        limitingSize = this.height;
        limitingDelta = yDelta;
      }

      // define svg size
      this.svgWidth = limitingSize / limitingDelta * xDelta;
      this.svgHeight = limitingSize / limitingDelta * yDelta;

      // x2px and y2px should share the same slope (a), only offset (b) should differ
      {
        const a = this.svgWidth / (this.xRange[1] - this.xRange[0]);
        const b = - (this.xRange[0] * a);
        this.x2px = x => a * x + b;
      }

      {
        const a = this.svgHeight / (this.yRange[1] - this.yRange[0]);
        const b = - (this.yRange[0] * a);
        this.y2px = y => a * y + b;
      }

      // for radius as we don't want any offset, we just pick the slope of one of the others
      {
        const a = Math.abs(this.svgHeight / (this.yRange[1] - this.yRange[0]));
        this.radius2px = r => a * r;
      }

      this._dirty = false;
    }

    let dotsRadius = this.defaultRadius;

    if (this.radius) {
      dotsRadius = this.radius
    } else if (this.radiusRel) {
      dotsRadius = this.radius2px(this.radiusRel);
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
        <div
          style="
            width: ${this.svgWidth}px;
            height: ${this.svgHeight}px;
            position: absolute;
            left: ${(this.width - this.svgWidth) / 2}px;
            top: ${(this.height - this.svgHeight) / 2}px;
            background-color: ${this.backgroundColor};
            background-image: ${this.backgroundImage !== '' ? `url(${this.backgroundImage})`: 'none'};
            background-size: contain;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            opacity: ${this.backgroundOpacity};
          "
        ></div>
        <svg
          style="
            width: ${this.svgWidth}px;
            height: ${this.svgHeight}px;
            left: ${(this.width - this.svgWidth) / 2}px;
            top: ${(this.height - this.svgHeight) / 2}px;
          "
          viewBox="0 0 ${this.svgWidth} ${this.svgHeight}"
        >

          <!-- dost -->
          ${repeat(this.value, d => `${d.x}-${d.y}`, d => {
            return svg`<circle
              r="${dotsRadius}"
              fill="${d.color || this.color}"
              cx="${this.x2px(d.x)}"
              cy="${this.y2px(d.y)}"
              style="pointer-event: none; fill-opacity: ${this.opacity}"
            ></circle>`
          })}
        </svg>

      </div>
    `;
  }

  updatePositions(e) {
    e.stopPropagation();

    // ignore mouseup and touchend events
    if (this.persistEvents && e.detail.value.length === 0) {
        return;
    }

    // remove the pointerId from origin event
    const value = e.detail.value.map(pointer => {
      // keep in boundaries
      const minX = Math.min(this.xRange[0], this.xRange[1]);
      const maxX = Math.max(this.xRange[0], this.xRange[1]);
      const minY = Math.min(this.yRange[0], this.yRange[1]);
      const maxY = Math.max(this.yRange[0], this.yRange[1]);
      const x = Math.min(maxX, Math.max(minX, pointer.x));
      const y = Math.min(maxY, Math.max(minY, pointer.y));

      return { x, y };
    });

    if (value > this.maxSize) {
      value.splice(this.maxSize);
    }

    this.value = value;

    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);
    this.requestUpdate();
  }
}

customElements.define('sc-dot-map', ScDotMap);

export default ScDotMap;
