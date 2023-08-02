import { LitElement, html, svg, css, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { theme } from './styles.js';

import './sc-position-surface.js';

class ScDots extends LitElement {
  static properties = {
    value: {
      type: Array,
      attribute: false,
      hasChanged(newVal, oldVal) { return true },
    },
    xRange: {
      type: Array,
      attribute: 'x-range',
    },
    yRange: {
      type: Array,
      attribute: 'y-range',
    },
    radius: { // in pixels, takes precedence over radiusRel)
      type: Number,
      attribute: 'radius',
      reflect: true,
    },
    radiusRelative: { // according to ranges
      type: Number,
      attribute: 'radius-relative',
      reflect: true,
    },
    // as an input interface
    captureEvents: {
      type: Boolean,
      attribute: 'capture-events',
    },
    persistEvents: {
      type: Boolean,
      attribute: 'persist-events',
    },
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        line-height: 0;
        vertical-align: top;
        width: 300px;
        height: 300px;

        --sc-dots-opacity: 1;
        --sc-dots-color: var(--sc-color-secondary-2);
        --sc-dots-background-color: var(--sc-color-primary-1);
        --sc-dots-background-image: none;
      }

      :host([hidden]) {
        display: none
      }

      :host(.debug) {
        outline: 1px solid yellow;
      }

      :host(.debug) sc-position-surface {
        outline: 1px dashed blue;
      }

      :host(.debug) svg {
        outline: 1px dotted red;
      }

      sc-position-surface {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }

      svg {
        position: relative;
        background-color: var(--sc-dots-background-color);
        background-image: var(--sc-dots-background-image);
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;
      }

      circle {
        pointer-event: none;
        fill-opacity: var(--sc-dots-opacity);
        fill: var(--sc-dots-color);
      }
    `;
  }

  constructor() {
    super();

    this.value = [];
    this.xRange = [0, 1];
    this.yRange = [0, 1];

    this.radius = null;
    this.radiusRelative = null;

    this.captureEvents = false;
    this.persistEvents = false;

    this._defaultRadius = 5;
    this._resizeObserver = null;
    this._x2px = null;
    this._y2px = null;
    this._radius2px = null;
    this._width = null;
    this._height = null;
    this._svgWidth = null;
    this._svgHeight = null;
  }

  update(changedProperties) {
    if (changedProperties.has('xRange') || changedProperties.has('yRange')) {
      this._updateScales();
    }

    super.update(changedProperties);
  }

  render() {
    let radius = this._defaultRadius;

    if (this.radius) {
      radius = this.radius
    } else if (this.radiusRelative) {
      radius = this._radius2px(this.radiusRelative);
    }

    return html`
      ${this.captureEvents
        ? html`
          <sc-position-surface
            style="
              width: ${this._svgWidth}px;
              height: ${this._svgHeight}px;
              left: ${(this._width - this._svgWidth) / 2}px;
              top: ${(this._height - this._svgHeight) / 2}px;
            "
            x-range="${JSON.stringify(this.xRange)}"
            y-range="${JSON.stringify(this.yRange)}"
            @input="${this._updatePositions}"
          ></sc-position-surface>
        `
        : ''
      }
      <svg
        style="
          width: ${this._svgWidth}px;
          height: ${this._svgHeight}px;
          left: ${(this._width - this._svgWidth) / 2}px;
          top: ${(this._height - this._svgHeight) / 2}px;
        "
        viewBox="0 0 ${this._svgWidth} ${this._svgHeight}"
      >
        ${repeat(this.value, d => `${d.x}-${d.y}`, d => {
          return svg`<circle
            r="${radius}"
            cx="${this._x2px(d.x)}"
            cy="${this._y2px(d.y)}"
            style="${d.color ? `fill: ${d.color}` : ''}"
          ></circle>`
        })}
      </svg>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this._resizeObserver = new ResizeObserver(entries => this._updateScales());
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  _updateScales() {
    const { width, height } = this.getBoundingClientRect();
    const xDelta = Math.abs(this.xRange[1] - this.xRange[0]);
    const yDelta = Math.abs(this.yRange[1] - this.yRange[0]);

    // define which side is th limiting one
    const deltaRatio = xDelta / yDelta;
    const pxRatio = width / height;

    let limitingSize;
    let limitingDelta;

    if (deltaRatio > pxRatio) {
      limitingSize = width;
      limitingDelta = xDelta;
    } else {
      limitingSize = height;
      limitingDelta = yDelta;
    }

    // define svg size
    this._svgWidth = limitingSize / limitingDelta * xDelta;
    this._svgHeight = limitingSize / limitingDelta * yDelta;
    this._width = width;
    this._height = height;

    {
      const a = this._svgWidth / (this.xRange[1] - this.xRange[0]);
      const b = - (this.xRange[0] * a);
      this._x2px = x => a * x + b;
    }

    {
      const a = this._svgHeight / (this.yRange[1] - this.yRange[0]);
      const b = - (this.yRange[0] * a);
      this._y2px = y => a * y + b;
    }

    // for radius as we don't want any offset, we just pick the slope of one of the others
    {
      const a = Math.abs(this._svgHeight / (this.yRange[1] - this.yRange[0]));
      this._radius2px = r => a * r;
    }

    this.requestUpdate();
  }

  _updatePositions(e) {
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

if (customElements.get('sc-dots') === undefined) {
  customElements.define('sc-dots', ScDots);
}

export default ScDots;
