import { html, css } from 'lit';
import ScElement from './ScElement.js';

class ScPositionSurface extends ScElement {
  static properties = {
    xRange: {
      type: Array,
      attribute: 'x-range',
    },
    yRange: {
      type: Array,
      attribute: 'y-range',
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
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

    this.xRange = [0, 1];
    this.yRange = [0, 1];

    this._activePointers = new Map();
    this._pointerIds = []; // we want to keep the order of appearance consistant

    // @note: passive: false in event listener declaration lose the binding
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
    this._touchStart = this._touchStart.bind(this);
    this._touchMove = this._touchMove.bind(this);
    this._touchEnd = this._touchEnd.bind(this);

    this._propagateValues = this._propagateValues.bind(this);
    this._resizeObserver = null;
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
    `
  }

  connectedCallback() {
    super.connectedCallback();

    this._resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      const xDelta = this.xRange[1] - this.xRange[0];
      const yDelta = this.yRange[1] - this.yRange[0];

      this._px2x = px => px / width * xDelta + this.xRange[0];
      this._px2y = px => px / height * yDelta + this.yRange[0];
    });

    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  _mouseDown(e) {
    window.addEventListener('mousemove', this._mouseMove, { passive: false });
    window.addEventListener('mouseup', this._mouseUp);

    this._pointerIds.push('mouse');
    this._activePointers.set('mouse', e);

    this._requestUserSelectNoneOnBody();

    this._requestPropagateValues(e);
  }

  _mouseMove(e) {
    this._activePointers.set('mouse', e);
    this._requestPropagateValues(e);
  }

  _mouseUp(e) {
    window.removeEventListener('mousemove', this._mouseMove);
    window.removeEventListener('mouseup', this._mouseUp);

    this._pointerIds.splice(this._pointerIds.indexOf('mouse'));
    this._activePointers.delete('mouse');

    this._cancelUserSelectNoneOnBody();

    // propagate outside the shadow dom boudaries
    // cf. https://lit-element.polymer-project.org/guide/events#custom-events
    const event = new CustomEvent('pointerend', {
      bubbles: true,
      composed: true,
      detail: { pointerId: 'mouse' },
    });

    this.dispatchEvent(event);

    this._requestPropagateValues(e);
  }

  _touchStart(e) {
    e.preventDefault(); // iOS needs that to prevent scrolling

    if (this._pointerIds.length === 0) {
      window.addEventListener('touchmove', this._touchMove, { passive: false });
      window.addEventListener('touchend', this._touchEnd);
      window.addEventListener('touchcancel', this._touchEnd);

      this._requestUserSelectNoneOnBody();
    }

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      this._pointerIds.push(id);
      this._activePointers.set(id, touch);
    }

    this._requestPropagateValues(e);
  }

  _touchMove(e) {
    e.preventDefault(); // prevent scrolling

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      // only consider touches that started in the area
      if (this._pointerIds.indexOf(id) !== -1) {
        this._activePointers.set(id, touch);
      }
    }

    this._requestPropagateValues(e);
  }

  _touchEnd(e) {
    for (let touch of e.changedTouches) {
      const pointerId = touch.identifier;
      const index = this._pointerIds.indexOf(pointerId);
      // only consider tracked touches
      if (index !== -1) {
        this._pointerIds.splice(index, 1);
        this._activePointers.delete(pointerId);

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
    if (this._pointerIds.length === 0) {
      window.removeEventListener('touchmove', this._touchMove);
      window.removeEventListener('touchend', this._touchEnd);
      window.removeEventListener('touchcancel', this._touchEnd);

      this._cancelUserSelectNoneOnBody(e);
    }

    this._requestPropagateValues(e);
  }

  _requestPropagateValues(e) {
    window.cancelAnimationFrame(this._rafId);
    this._rafId = window.requestAnimationFrame(() => this._propagateValues(e));
  }

  _propagateValues(e) {
    const rect = this.getBoundingClientRect();

    const values = this._pointerIds.map(pointerId => {
      const event = this._activePointers.get(pointerId);
      // this seems quite robust
      // https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/18053642#18053642
      const x = event.clientX - rect.left;
      const scaledX = this._px2x(x);
      const y = event.clientY - rect.top;
      const scaledY = this._px2y(y);

      return { x: scaledX, y: scaledY, pointerId };
    });

    // propagate outside the shadow DOM boundaries
    // cf. https://lit-element.polymer-project.org/guide/events#custom-events
    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: values },
    });

    this.dispatchEvent(event);
  }
}

if (customElements.get('sc-position-surface') === undefined) {
  customElements.define('sc-position-surface', ScPositionSurface);
}

export default ScPositionSurface;
