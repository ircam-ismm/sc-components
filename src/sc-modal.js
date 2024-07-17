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
    icon: {
      type: String,
      reflect: true,
    },
    title: {
      type: String,
      reflect: true,
    },
    bindToElement: {
      type: String,
      reflect: true,
      attribute: 'bind-to-element',
    },
    movable: {
      type: Boolean,
      reflect: true,
    },
    resizable: {
      type: Boolean,
      reflect: true,
    },

  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      position: relative;
      width: 30px;
      height: 30px;

      --sc-modal-width: auto;
      --sc-modal-height: auto;
      /* relative to host position */
      --sc-modal-position-top: 0;
      --sc-modal-position-bottom: auto;
      --sc-modal-position-left: 100%;
      --sc-modal-position-right: auto;
    }

    :host > sc-icon {
      display: block;
      width: 100%;
      height: 100%;
    }

    .modal {
      position: absolute;
      top: var(--sc-modal-position-top);
      bottom: var(--sc-modal-position-bottom);
      left: var(--sc-modal-position-left);
      right: var(--sc-modal-position-right);
      z-index: 1000;
      width: var(--sc-modal-width);
      height: var(--sc-modal-height);
      box-sizing: border-box;
      border-radius: 4px;
      background-color: var(--sc-color-primary-1);
      border: 1px solid var(--sc-color-primary-3);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
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
      padding: 4px 6px;
      background-color: transparent;
      border: none;
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

  get active() {
    return this._active;
  }

  set active(value) {
    if (this._active === value) {
      return;
    }

    if (value === false) {
      this._updateModalPosition();
    }

    const old = this._active;
    this._active = value;
    this.requestUpdate('active', old);
  }

  constructor() {
    super();

    this._active = false;

    this.icon = 'plus';
    this.boundTo = 'body';
    this.title = 'modal window';
    this.resizable = false;
    this.movable = false;

    this._modalPosition = null;
    this._initialPosition = null;
    this._startModalPosition = null;
    this._startMousePosition = null;
    this._btnRect = null;
    this._modalRect = null;
    this._bindRect = null;

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onModalMouseDown = this._onModalMouseDown.bind(this);
  }

  render() {
    return html`
      <sc-icon
        type="info"
        type=${this.icon}
        title="${this.active ? 'close ' : 'open '} ${this.title}"
        ?active=${this.active}
        @input=${e => this.active = !this.active}
      ></sc-icon>
      ${this.active
        ? html`
          <div
            class="modal"
            style="
              ${this._modalPosition ? `
                left: ${this._modalPosition.left}px;
                top: ${this._modalPosition.top}px;
              ` : nothing}
              resize: ${this.resizable ? 'both' : 'none'}
            "
          >
            <header @mousedown=${this._onHeaderMouseDown}>
              <sc-text>${this.title}</sc-text>
              <sc-icon
                class="close-btn"
                type="close"
                @input=${e => this.active = false}
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

  updated() {
    super.updated();

    if (this.active && this._modalPosition === null) {
      this._updateModalPosition();
      this._initialPosition = Object.assign({}, this._modalPosition);
    }
  }

  _updateModalPosition() {
    const $modal = this.shadowRoot.querySelector('.modal');
    const styles = window.getComputedStyle($modal);
    const left = parseInt(styles.getPropertyValue('left'));
    const top = parseInt(styles.getPropertyValue('top'));
    this._modalPosition = { left, top };
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

  _onHeaderMouseDown(e) {
    if (e.target.classList.contains('close-btn')) {
      return;
    }

    if (!this.movable) {
      return;
    }

    const $modal = this.shadowRoot.querySelector('.modal');
    const styles = window.getComputedStyle($modal);
    const left = parseInt(styles.getPropertyValue('left'));
    const top = parseInt(styles.getPropertyValue('top'));

    this._startModalPosition = { left, top };
    this._startMousePosition = { clientX: e.clientX, clientY: e.clientY };

    if (this.bindToElement !== null) {
      const $el = document.querySelector(this.bindToElement);

      if (!$el) {
        console.warn(`[sc-modal] Could not find selector "${this.bindToElement}" to bind the modal position`);
      } else {
        this._bindRect = $el.getBoundingClientRect();
        this._btnRect = this.getBoundingClientRect();
        this._modalRect = $modal.getBoundingClientRect();
      }
    }

    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
  }

  _onMouseMove(e) {
    e.preventDefault();

    const $modal = this.shadowRoot.querySelector('.modal');
    let { left, top } = this._startModalPosition;
    let diffX = e.clientX - this._startMousePosition.clientX;
    let diffY = e.clientY - this._startMousePosition.clientY;

    left += diffX;
    top += diffY;

    //
    if (this._bindRect) {
      // bind left
      left = Math.max(this._bindRect.left - this._btnRect.left, left);
      // bind right
      left = Math.min(
        this._bindRect.left + this._bindRect.width - this._modalRect.width - this._btnRect.left,
        left
      );
      // bind top
      top = Math.max(this._bindRect.top - this._btnRect.top, top);
      // bind bottom
      top = Math.min(
        this._bindRect.top + this._bindRect.height - this._modalRect.height - this._btnRect.top,
        top
      );
    }

    // sticky to initial position
    if (Math.abs(left - this._initialPosition.left) < 5) {
      left = this._initialPosition.left;
    }

    if (Math.abs(top - this._initialPosition.top) < 5) {
      top = this._initialPosition.top;
    }

    $modal.style.left = `${left}px`;
    $modal.style.top = `${top}px`;
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
