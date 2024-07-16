import { html, css, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';

import './sc-icon.js';

class ScModal extends ScElement {
  static properties = {
    active: {
      type: Boolean,
      reflect: true,
    },
    title: {
      type: String,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 30px;
      height: 30px;
      position: relative;
    }

    .modal {
      position: absolute;
      z-index: 1000;
      width: auto;
      height: auto;
      box-sizing: border-box;
      border-radius: 4px;
      background-color: var(--sc-color-primary-1);
      border: 1px solid var(--sc-color-primary-3);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
      resize: both;
      overflow: scroll;
    }

    .modal.focused {
      border: 1px solid var(--sc-color-primary-4);
      z-index: 1001;
    }

    .modal header {
      display: flex;
      justify-content: space-between;
      background-color: var(--sc-color-primary-2);
      text-align: left;
      height: 24px;
      border-bottom: 1px solid var(--sc-color-primary-3);
    }

    .modal header sc-text {
      height: 24px;
      padding: 2px 6px;
      background-color: transparent;
    }

    .modal header sc-icon {
      height: 24px;
      width: 24px;
    }

    .modal section {
      display: block;
      padding: 4px;
    }
  `;

  constructor() {
    super();

    this.active = false;

    this._initModalPosition = { left: 30, top: 0 };
    this._startModalPosition = null;
    this._startMousePosition = null;

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onModalMouseDown = this._onModalMouseDown.bind(this);
  }

  render() {
    return html`
      <sc-icon
        title=${this.title}
        ?active=${this.active}
        @input=${e => this._setActive(!this.active)}
      ></sc-icon>
      ${this.active
        ? html`
          <div
            class="modal"
            style="
              left: ${this._initModalPosition.left}px;
              top: ${this._initModalPosition.top}px;
            "
          >
            <header @mousedown=${this._onMouseDown}>
              <sc-text>${this.title}</sc-text>
              <sc-icon
                class="close-btn"
                type="close"
                @input=${e => this._setActive(false)}
              ></sc-icon>
            </header>
            <section>
              <slot></slot>
            </section>
          </div>
        `
        : nothing
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('mousedown', this._onModalMouseDown);
  }

  disconnectedCallback() {
    super.connectedCallback();
    window.removeEventListener('mousedown', this._onModalMouseDown);
  }

  _setActive(value) {
    if (value === false) {
      const $modal = this.shadowRoot.querySelector('.modal');
      const styles = window.getComputedStyle($modal);
      const left = parseInt(styles.getPropertyValue('left'));
      const top = parseInt(styles.getPropertyValue('top'));
      this._initModalPosition = { left, top };
    }

    this.active = value;
  }

  _onModalMouseDown(e) {
    if (this.active) {
      const $modal = this.shadowRoot.querySelector('.modal');

      if (this.contains(e.target)) {
        $modal.classList.add('focused');
      } else {
        $modal.classList.remove('focused');
      }
    }
  }

  _onMouseDown(e) {
    if (e.target.classList.contains('close-btn')) {
      return;
    }

    e.preventDefault();

    const $modal = this.shadowRoot.querySelector('.modal');
    const styles = window.getComputedStyle($modal);
    const left = parseInt(styles.getPropertyValue('left'));
    const top = parseInt(styles.getPropertyValue('top'));

    this._startModalPosition = { left, top };
    this._startMousePosition = { clientX: e.clientX, clientY: e.clientY };

    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
  }

  _onMouseMove(e) {
    e.preventDefault();

    const $modal = this.shadowRoot.querySelector('.modal');
    const { left, top } = this._startModalPosition;
    let diffX = e.clientX - this._startMousePosition.clientX;
    let diffY = e.clientY - this._startMousePosition.clientY;

    // sticky behavior
    // if (Math.abs(diffX) < 6) { diffX = 0; }
    // if (Math.abs(diffY) < 6) { diffY = 0; }

    $modal.style.left = `${left + diffX}px`;
    $modal.style.top = `${top + diffY}px`;
  }

  _onMouseUp(e) {
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
  }
}

if (customElements.get('sc-modal') === undefined) {
  customElements.define('sc-modal', ScModal);
}

export default ScModal;
