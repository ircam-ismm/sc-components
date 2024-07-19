import { render, html, css, nothing } from 'lit';
import ScElement from './ScElement.js';

/**
 * @todo
 * - share same handlers for all zones
 * -
 */

class ScIOZone extends ScElement {
  #touchId = null;

  static properties = {
    active: {
      type: Boolean,
      reflect: true,
    },
    value: {
      type: Object,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      width: 100px;
      height: 100px;
      background-color: var(--sc-color-secondary-3);
    }

    :host([active]) {
      background-color: var(--sc-color-secondary-4);
    }

    div {
      width: 100%;
      height: 100%;
    }
  `;

  constructor() {
    super();

    this.active = false;
    this.value = 0;

    this._mountMouseEvents = this._mountMouseEvents.bind(this);
    this._unmountMouseEvents = this._unmountMouseEvents.bind(this);
    this._checkMousePosition = this._checkMousePosition.bind(this);

    this._mountTouchEvents = this._mountTouchEvents.bind(this);
    this._unmountTouchEvent = this._unmountTouchEvent.bind(this);
    this._checkTouchPosition = this._checkTouchPosition.bind(this);
  }

  render() {
    return nothing;
  }

  connectedCallback() {
    super.connectedCallback();

    document.body.addEventListener('mousedown', this._mountMouseEvents);
    document.body.addEventListener('touchstart', this._mountTouchEvents);
  }

  disconnectedCallback() {
    super.connectedCallback();

    this._unmountMouseEvents();
    this._unmountTouchEvent();

    document.body.addEventListener('mousedown', this._mountMouseEvents);
    document.body.addEventListener('touchstart', this._mountTouchEvents);
  }

  _mountMouseEvents(e) {
    document.body.addEventListener('mousemove', this._checkMousePosition);
    document.body.addEventListener('mouseup', this._unmountMouseEvents);

    this._checkMousePosition(e);
  }

  _unmountMouseEvents(e) {
    if (this.active) {
      this.active = false;
      this._triggerChange();
    }

    document.body.removeEventListener('mousemove', this._checkMousePosition);
    document.body.removeEventListener('mouseup', this._unmountMouseEvents);
  }

  _checkMousePosition(e) {
    const els = document.elementsFromPoint(e.x, e.y);
    const inZone = els.includes(this);

    if (inZone && !this.active) {
      this.active = true;
      this._triggerChange();
    } else if (!inZone && this.active) {
      this.active = false;
      this._triggerChange();
    }
  }

  _mountTouchEvents(e) {
    document.body.addEventListener('touchmove', this._checkTouchPosition);
    document.body.addEventListener('touchend', this._unmountTouchEvent);

    this._checkTouchPosition(e);
  }

  _unmountTouchEvent(e) {
    if (this.active) {
      for (let touch of e.changedTouches) {
        if (this.#touchId === touch.identifier) {
          this.active = false;
          this.#touchId = null;
          this._triggerChange();
        }
      }
    }

    document.body.removeEventListener('mousemove', this._checkTouchPosition);
    document.body.removeEventListener('mouseup', this._unmountTouchEvent);
  }

  _checkTouchPosition(e) {
    for (let touch of e.changedTouches) {
      const els = document.elementsFromPoint(touch.clientX, touch.clientY);
      const inZone = els.includes(this);

      if (inZone && !this.active) {
        this.active = true;
        this.#touchId = touch.identifier;
        this._triggerChange();
      } else if (this.active && this.#touchId === touch.identifier && !inZone) {
        this.active = false;
        this.#touchId = null;
        this._triggerChange();
      }
    }
  }

  _triggerChange() {
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        active: this.active,
      },
    });

    this.dispatchEvent(changeEvent);
  }
}

if (customElements.get('sc-io-zone') === undefined) {
  customElements.define('sc-io-zone', ScIOZone);
}
