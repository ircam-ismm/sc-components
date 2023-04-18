import { html, css } from 'lit';
import ScElement from './ScElement.js';

function getTime() {
  if (window.performance) {
    return window.performance.now();
  } else {
    return Date.now();
  }
}

class ScSpeedSurface extends ScElement {
  static get properties() {
    return {
      width: {
        type: Number,
      },
      height: {
        type: Number,
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

    this.width = 200;
    this.height = 200;

    this.pointerId = null;
    this.lastPointer = null;
    this.lastTime = null;

    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.propagateValues = this.propagateValues.bind(this);
    this.rafId = null;
  }

  render() {
    return html`
      <div
        style="
          width: ${this.width}px;
          height: ${this.height}px;
        "
        @mousedown="${this.mouseDown}"
        @touchstart="${{
          handleEvent: this.touchStart,
          passive: false,
        }}"
        @contextmenu="${this._preventContextMenu}"
      ></div>
    `;
  }

  mouseDown(e) {
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);

    this._requestUserSelectNoneOnBody();
    this.pointerId = 'mouse';

    this.lastTime = getTime();
    this.lastPointer = e;
  }

  mouseMove(e) {
    this.requestPropagateValues(e);
  }

  mouseUp(e) {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);

    this._cancelUserSelectNoneOnBody();
    this.requestPropagateValues(e);
    // we want to have { dx: 0, dy: 0 } on mouse up,
    // with 20ms, we should be in the next requestAnimationFrame
    setTimeout(() => {
      this.pointerId = null;
      this.requestPropagateValues(e);
    }, 20);
  }

  // @eventOptions({ passive: false })
  touchStart(e) {
    e.preventDefault(); // prevent scrolling

    if (this.pointerId === null) {
      const touch = e.changedTouches[0];
      this.pointerId = touch.identifier;

      window.addEventListener('touchmove', this.touchMove, { passive: false });
      window.addEventListener('touchend', this.touchEnd);
      window.addEventListener('touchcancel', this.touchEnd);

      this._requestUserSelectNoneOnBody();

      this.lastTime = getTime();
      this.lastPointer = touch;
    }
  }

  touchMove(e) {
    e.preventDefault(); // prevent scrolling

    for (let touch of e.changedTouches) {
      if (touch.identifier === this.pointerId) {
        this.requestPropagateValues(touch);
      }
    }
  }

  touchEnd(e) {
    for (let touch of e.changedTouches) {
      if (touch.identifier === this.pointerId) {
        window.removeEventListener('touchmove', this.touchMove);
        window.removeEventListener('touchend', this.touchEnd);
        window.removeEventListener('touchcancel', this.touchEnd);

        this._cancelUserSelectNoneOnBody();
        this.requestPropagateValues(touch);
        // we want to have { dx: 0, dy: 0 } on mouse up,
        // with 20ms, we should be in the next requestAnimationFrame
        setTimeout(() => {
          this.pointerId = null;
          this.requestPropagateValues(touch);
        }, 20);
      }
    }
  }

  requestPropagateValues(e) {
    window.cancelAnimationFrame(this.rafId);
    this.rafId = window.requestAnimationFrame(() => this.propagateValues(e));
  }

  // return speed in px / ms
  propagateValues(e) {
    const lastX = this.lastPointer.screenX;
    const lastY = this.lastPointer.screenY;
    const x = e.screenX;
    const y = e.screenY;

    const now = getTime();
    const dt = (this.lastTime - now);

    const dx = (x - lastX) / dt;
    const dy = (y - lastY) / dt;

    this.lastTime = now;
    this.lastPointer = e;
    // propagate outside the shadow dom boudaries
    // cf. https://lit-element.polymer-project.org/guide/events#custom-events
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { dx, dy, pointerId: this.pointerId },
    });

    this.dispatchEvent(event);
  }
}

if (customElements.get('sc-speed-surface') === undefined) {
  customElements.define('sc-speed-surface', ScSpeedSurface);
}

export default ScSpeedSurface;
