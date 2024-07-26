import { html, svg, css, nothing } from 'lit';

import ScElement from './ScElement.js';

class ScSeparator extends ScElement {
  static properties = {
    direction: {
      type: String,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      --sc-separator-line-color: var(--sc-color-primary-4);
      --sc-separator-handle-color: var(--sc-color-primary-5);
    }

    :host([direction="row"]) {
      width: 1px;
      height: 100%;
      background-color: var(--sc-separator-line-color);
      position: relative;
    }

    :host([direction="row"])::before {
      content: '';
      display: block;
      width: 5px;
      height: 100%;
      cursor: ew-resize;
      position: absolute;
      top: 0;
      left: -2px;
      z-index: 10;
    }

    :host([direction="row"])::after {
      content: '';
      position: absolute;
      top: 50%;
      height: 30px;
      margin-top: -15px;
      width: 3px;
      margin-left: -1px;
      background-color: var(--sc-separator-handle-color);
      opacity: 0.6;
    }

    :host([direction="column"]) {
      height: 1px;
      width: 100%;
      background-color: var(--sc-separator-line-color);
      position: relative;
    }

    :host([direction="column"])::before {
      content: '';
      display: block;
      width: 100%;
      height: 5px;
      cursor: ns-resize;
      position: absolute;
      top: -2px;
      left: 0;
      z-index: 10;
    }

    :host([direction="column"])::after {
      content: '';
      position: absolute;
      left: 50%;
      width: 30px;
      margin-left: -15px;
      height: 3px;
      margin-top: -1px;
      background-color: var(--sc-separator-handle-color);
      opacity: 0.6;
    }
  `;

  constructor() {
    super();

    this.direction = 'row';

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._resize = this._resize.bind(this);
    this._mouseDown = false;

    this._ratio = null;
    this._$host = null;
    this._$prev = null;
    this._$next = null;
    this._parentBoundingClientRect = null;
    this._storageKey = null;
  }

  render() {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    // handle case where component is at top level of web component content
    this._$host = this.parentElement !== null ? this.parentElement : this.parentNode.host;
    this._$prev = this.previousElementSibling;
    this._$next = this.nextElementSibling;
    this._parentBoundingClientRect = this._$host.getBoundingClientRect();
    this._storageKey = `sc-separator:${this.id || this._scId}`;

    this._loadFromLocalStorage();
    this.addEventListener('mousedown', this._onMouseDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('mousedown', this._onMouseDown);

    if (this._mouseDown) {
      this._onMouseUp();
    }
  }

  _onMouseDown(e) {
    this._mouseDown = true;
    this._requestUserSelectNoneOnBody();

    document.body.style.userSelect = 'none';
    document.body.style.cursor = this.direction === 'row' ? 'ew-resize' : 'ns-resize';

    this._parentBoundingClientRect = this._$host.getBoundingClientRect();

    window.addEventListener('mousemove', this._resize);
    window.addEventListener('mouseup', this._onMouseUp);
  }

  _onMouseUp() {
    this._cancelUserSelectNoneOnBody();
    document.body.style.cursor = 'auto';

    window.removeEventListener('mousemove', this._resize);
    window.removeEventListener('mouseup', this._onMouseUp);

    this._persistToLocalStorage();
    this._mouseDown = false;
  }

  _resize(e) {
    const { width, height, left, top } = this._parentBoundingClientRect;

    switch (this.direction) {
      case 'row': {
        const relX = e.clientX - left;
        this._ratio = Math.max(0.02, Math.min(0.98, relX / width));
        break;
      }
      case 'column': {
        const relY = e.clientY - top;
        this._ratio = Math.max(0.02, Math.min(0.98, relY / height));
        break;
      }
      default: {
        console.warn('sc-seprator: Unknonw direction: ', this.direction);
        break;
      }
    }

    this._applyRatio();
  }

  _applyRatio() {
    switch (this.direction) {
      case 'row': {
        this._$prev.style.width = `${this._ratio * 100}%`;
        this._$next.style.width = `${(1 - this._ratio) * 100}%`;
        break;
      }
      case 'column': {
        this._$prev.style.height = `${this._ratio * 100}%`;
        this._$next.style.height = `${(1 - this._ratio) * 100}%`;
        break;
      }
      default: {
        console.warn('sc-seprator: Unknonw direction: ', this.direction);
        break;
      }
    }
  }

  _loadFromLocalStorage() {
    this._ratio = localStorage.getItem(this._storageKey);

    if (this._ratio !== null) {
      this._applyRatio();
    }
  }

  _persistToLocalStorage() {
    localStorage.setItem(this._storageKey, this._ratio);
  }
}

if (customElements.get('sc-separator') === undefined) {
  customElements.define('sc-separator', ScSeparator);
}

export default ScSeparator;
