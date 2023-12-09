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

    this._resize = this._resize.bind(this);
  }

  render() {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('mousedown', this._resize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('mousedown', this._resize);
  }

  _resize(e) {
    this._requestUserSelectNoneOnBody();

    const { width, height, left, top } = e.currentTarget.parentElement.getBoundingClientRect();
    const $prev = e.currentTarget.previousElementSibling;
    const $next = e.currentTarget.nextElementSibling;

    document.body.style.userSelect = 'none';
    document.body.style.cursor = this.direction === 'row' ? 'ns-resize' : 'ex-resize';

    const resize = e => {
      switch (this.direction) {
        case 'row': {
          const relX = e.clientX - left;
          const ratio = Math.max(0.02, Math.min(0.98, relX / width));
          $prev.style.width = `${ratio * 100}%`;
          $next.style.width = `${(1 - ratio) * 100}%`;
          break;
        }
        case 'column': {
          const relY = e.clientY - top;
          const ratio = Math.max(0.02, Math.min(0.98, relY / height));
          $prev.style.height = `${ratio * 100}%`;
          $next.style.height = `${(1 - ratio) * 100}%`;
          break;
        }
        default: {
          console.warn('sc-seprator: Unknonw direction: ', this.direction);
          break;
        }
      }
    }

    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', () => {
      this._cancelUserSelectNoneOnBody();
      document.body.style.cursor = 'auto';

      window.removeEventListener('mousemove', resize);
    });
  }
}

if (customElements.get('sc-separator') === undefined) {
  customElements.define('sc-separator', ScSeparator);
}

export default ScSeparator;
