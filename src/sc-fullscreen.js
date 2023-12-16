import { html, css, svg, nothing } from 'lit';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';
import './sc-icon.js';

class ScFullscreen extends ScElement {
  static properties = {
    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-2);
    }

    :host([hidden]) {
      display: none;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    sc-icon {
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
    }
  `;

  constructor() {
    super();

    this.disabled = false;
  }

  render() {
    return html`
      <sc-icon
        ?disabled=${this.disabled}
        type="fullscreen"
        @release=${this._toggleFullScreen}
      ></sc-icon>
    `;
  }

  _toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

if (customElements.get('sc-fullscreen') === undefined) {
  console.log('define sc-fullscreen');
  customElements.define('sc-fullscreen', ScFullscreen);
}

export default ScFullscreen;



