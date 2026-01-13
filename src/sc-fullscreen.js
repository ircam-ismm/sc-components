import { html, css } from 'lit';
import { isString } from '@ircam/sc-utils';

import ScElement from './ScElement.js';
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

    this.element = document.documentElement;
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
      let el;

      if (this.element instanceof Element) {
        el = this.element;
      } else if (isString(this.element)) {
        el = document.querySelector(this.element);
      }

      // fallback to fullscreen
      if (!el) {
        el = document.documentElement;
      }

      el.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

if (customElements.get('sc-fullscreen') === undefined) {
  customElements.define('sc-fullscreen', ScFullscreen);
}

export default ScFullscreen;



