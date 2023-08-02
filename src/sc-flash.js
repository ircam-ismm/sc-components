import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';
import { theme } from './styles.js';

class ScFlash extends ScElement {
  static properties = {
    duration: {
      type: Number,
      reflect: true,
    },
    active: {
      type: Number,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 100px;
      height: 30px;
      background-color: var(--sc-color-primary-1);
      border: 1px solid var(--sc-color-primary-3);

      --sc-flash-active: var(--sc-color-secondary-3);
    }

    div {
      width: 100%;
      height: 100%;
    }

    div.active {
      background-color: var(--sc-flash-active);
    }
  `;

  constructor() {
    super();

    this.duration = 0.05;
    this.active = false;
    this._timeoutId = null;
  }

  render() {
    if (this.active) {
      clearTimeout(this._timeoutId);
      this._timeoutId = setTimeout(() => this.active = false, this.duration * 1000);
    }

    return html`<div class="${this.active ? 'active' : ''}"></div>`
  }
}

if (customElements.get('sc-flash') === undefined) {
  customElements.define('sc-flash', ScFlash);
}

export default ScFlash;
