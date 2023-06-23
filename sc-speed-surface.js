import { html, css } from 'lit';
import { getTime } from '@ircam/sc-gettime';
import ScElement from './ScElement.js';

/**
 * Propagate mouse speed in px / ms
 */
class ScSpeedSurface extends ScElement {
  static styles = css`
    :host {
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    div {
      width: 100%;
      height: 100%;
    }
  `;

  constructor() {
    super();

    this._pointerId = null;
    this._lastPointer = null;
    this._lastTime = null;

    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);

    this._touchStart = this._touchStart.bind(this);
    this._touchMove = this._touchMove.bind(this);
    this._touchEnd = this._touchEnd.bind(this);

    this._propagateValues = this._propagateValues.bind(this);
    this._rafId = null;
  }

  render() {
    return html`
      <div
        @mousedown="${this._mouseDown}"
        @touchstart="${{
          handleEvent: this._touchStart,
          passive: false,
        }}"
        @contextmenu="${this._preventContextMenu}"
      ></div>
    `;
  }

  _mouseDown(e) {
    window.addEventListener('mousemove', this._mouseMove);
    window.addEventListener('mouseup', this._mouseUp);

    this._requestUserSelectNoneOnBody();
    this._pointerId = 'mouse';

    this._lastTime = getTime();
    this._lastPointer = e;
  }

  _mouseMove(e) {
    this._requestPropagateValues(e);
  }

  _mouseUp(e) {
    window.removeEventListener('mousemove', this._mouseMove);
    window.removeEventListener('mouseup', this._mouseUp);

    this._cancelUserSelectNoneOnBody();
    this._requestPropagateValues(e);
    // we want to have { dx: 0, dy: 0 } on mouse up,
    // with 20ms, we should be in the next requestAnimationFrame
    setTimeout(() => {
      this._pointerId = null;
      this._requestPropagateValues(e);
    }, 20);
  }

  _touchStart(e) {
    e.preventDefault(); // prevent scrolling

    if (this._pointerId === null) {
      const touch = e.changedTouches[0];
      this._pointerId = touch.identifier;

      window.addEventListener('touchmove', this._touchMove, { passive: false });
      window.addEventListener('touchend', this._touchEnd);
      window.addEventListener('touchcancel', this._touchEnd);

      this._requestUserSelectNoneOnBody();

      this._lastTime = getTime();
      this._lastPointer = touch;
    }
  }

  _touchMove(e) {
    e.preventDefault(); // prevent scrolling

    for (let touch of e.changedTouches) {
      if (touch.identifier === this._pointerId) {
        this._requestPropagateValues(touch);
      }
    }
  }

  _touchEnd(e) {
    for (let touch of e.changedTouches) {
      if (touch.identifier === this._pointerId) {
        window.removeEventListener('touchmove', this._touchMove);
        window.removeEventListener('touchend', this._touchEnd);
        window.removeEventListener('touchcancel', this._touchEnd);

        this._cancelUserSelectNoneOnBody();
        this._requestPropagateValues(touch);
        // we want to have { dx: 0, dy: 0 } on mouse up,
        // with 20ms, we should be in the next requestAnimationFrame
        setTimeout(() => {
          this._pointerId = null;
          this._requestPropagateValues(touch);
        }, 20);
      }
    }
  }

  _requestPropagateValues(e) {
    window.cancelAnimationFrame(this._rafId);
    this._rafId = window.requestAnimationFrame(() => this._propagateValues(e));
  }

  _propagateValues(e) {
    const lastX = this._lastPointer.screenX;
    const lastY = this._lastPointer.screenY;
    const x = e.screenX;
    const y = e.screenY;

    const now = getTime();
    const dt = (this._lastTime - now) * 1000; // ms

    const dx = (x - lastX) / dt;
    const dy = (y - lastY) / dt;

    this._lastTime = now;
    this._lastPointer = e;
    // propagate outside the shadow DOM boundaries
    // cf. https://lit-element.polymer-project.org/guide/events#custom-events
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { dx, dy, pointerId: this._pointerId },
    });

    this.dispatchEvent(event);
  }
}

if (customElements.get('sc-speed-surface') === undefined) {
  customElements.define('sc-speed-surface', ScSpeedSurface);
}

export default ScSpeedSurface;
