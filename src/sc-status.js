import { html, css, svg, nothing } from 'lit';

import ScElement from './ScElement.js';

class ScStatus extends ScElement {
  static properties = {
    active: {
      type: Boolean,
      reflect: true,
    },
  }

  static styles = css`
    :host {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-1);
      font-size: 0;
      line-height: 0;

      --sc-status-color-inactive: var(--sc-color-secondary-3);
      --sc-status-color-active: var(--sc-color-secondary-4);
    }

    svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 8px solid transparent;
    }

    circle {
      fill: var(--sc-status-color-inactive);
    }

    :host([active]) circle {
      fill: var(--sc-status-color-active);
    }
  `

  constructor() {
    super();

    this.active = false;
  }

  render() {
    return html`
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
    `;
  }
}

if (customElements.get('sc-status') === undefined) {
  customElements.define('sc-status', ScStatus);
}

export default ScStatus;
