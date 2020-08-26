import { html, css } from 'lit-element';
import ScElement from './ScElement.js';

class ScPositionSurface extends ScElement {
  static get properties() {
    return {
      xRange: {
        type: Array,
        attribute: 'x-range',
      },
      yRange: {
        type: Array,
        attribute: 'y-range',
      },
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      clamp: {
        type: Boolean,
        attribute: 'clamp',
      },
    }
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
      };
    `;
  }

  constructor() {
    super();

    this.xRange = [0, 1];
    this.yRange = [0, 1];
    this.clampPositions = false;

    this.activePointers = new Map();
    this.pointerIds = []; // we want to keep the order of appearance consistant

    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.propagateValues = this.propagateValues.bind(this);
    this.rafId = null;
  }

  /**
   * this is ok as the surface is not rendered often
   */
  performUpdate() {
    const xDelta = this.xRange[1] - this.xRange[0];
    const yDelta = this.yRange[1] - this.yRange[0];

    this.px2x = (px) => {
      let val = px / this.width * xDelta + this.xRange[0];

      if (this.clampPositions) {
        val = Math.min(this.xRange[1], Math.max(this.xRange[0], val));
      }

      return val;
    }

    this.px2y = (px) => {
      let val = px / this.height * yDelta + this.yRange[0];

      if (this.clampPositions) {
        val = Math.min(this.yRange[1], Math.max(this.yRange[0], val));
      }

      return val;
    }

    super.performUpdate();
  }

  render() {
    return html`
      <div
        style="width: ${this.width}px; height: ${this.height}px;"

        @mousedown="${this.mouseDown}"
        @touchstart="${{
          handleEvent: this.touchStart,
          passive: false,
        }}}"

        @contextmenu="${this._preventContextMenu}"
      ></div>
    `
  }

  mouseDown(e) {
    window.addEventListener('mousemove', this.mouseMove, { passive: false });
    window.addEventListener('mouseup', this.mouseUp);

    this.pointerIds.push('mouse');
    this.activePointers.set('mouse', e);

    this._requestUserSelectNoneOnBody();

    this.requestPropagateValues(e);
  }

  mouseMove(e) {
    this.activePointers.set('mouse', e);
    this.requestPropagateValues(e);
  }

  mouseUp(e) {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);

    this.pointerIds.splice(this.pointerIds.indexOf('mouse'));
    this.activePointers.delete('mouse');

    this._cancelUserSelectNoneOnBody();

    // propagate outside the shadow dom boudaries
    // cf. https://lit-element.polymer-project.org/guide/events#custom-events
    const event = new CustomEvent('pointerend', {
      bubbles: true,
      composed: true,
      detail: { pointerId: 'mouse' },
    });

    this.dispatchEvent(event);

    this.requestPropagateValues(e);
  }

  touchStart(e) {
    e.preventDefault(); // iOS needs that to prevent scrolling

    if (this.pointerIds.length === 0) {
      window.addEventListener('touchmove', this.touchMove, { passive: false });
      window.addEventListener('touchend', this.touchEnd);
      window.addEventListener('touchcancel', this.touchEnd);

      this._requestUserSelectNoneOnBody();
    }

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      this.pointerIds.push(id);
      this.activePointers.set(id, touch);
    }

    this.requestPropagateValues(e);
  }

  touchMove(e) {
    e.preventDefault(); // prevent scrolling

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      // only consider touches that started in the area
      if (this.pointerIds.indexOf(id) !== -1) {
        this.activePointers.set(id, touch);
      }
    }

    this.requestPropagateValues(e);
  }

  touchEnd(e) {
    for (let touch of e.changedTouches) {
      const pointerId = touch.identifier;
      const index = this.pointerIds.indexOf(pointerId);
      // only consider tracked touches
      if (index !== -1) {
        this.pointerIds.splice(index, 1);
        this.activePointers.delete(pointerId);

        // propagate outside the shadow dom boudaries
        // cf. https://lit-element.polymer-project.org/guide/events#custom-events
        const event = new CustomEvent('pointerend', {
          bubbles: true,
          composed: true,
          detail: { pointerId },
        });

        this.dispatchEvent(event);
      }
    }

    // if that's the last tracked event remove listeners
    if (this.pointerIds.length === 0) {
      window.removeEventListener('touchmove', this.touchMove);
      window.removeEventListener('touchend', this.touchEnd);
      window.removeEventListener('touchcancel', this.touchEnd);

      this._cancelUserSelectNoneOnBody(e);
    }

    this.requestPropagateValues(e);
  }

  requestPropagateValues(e) {
    window.cancelAnimationFrame(this.rafId);
    this.rafId = window.requestAnimationFrame(() => this.propagateValues(e));
  }

  propagateValues(e) {
    const rect = this.getBoundingClientRect();

    const values = this.pointerIds.map(pointerId => {
      const event = this.activePointers.get(pointerId);
      // this seems quite robust
      // https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/18053642#18053642
      const x = event.clientX - rect.left;
      const scaledX = this.px2x(x);
      const y = event.clientY - rect.top;
      const scaledY = this.px2y(y);

      return { x: scaledX, y: scaledY, pointerId };
    });

    // propagate outside the shadow dom boudaries
    // cf. https://lit-element.polymer-project.org/guide/events#custom-events
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: values },
    });

    this.dispatchEvent(event);
  }
}

customElements.define('sc-position-surface', ScPositionSurface);
