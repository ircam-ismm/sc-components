import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { isPlainObject } from '@ircam/sc-utils';
import deepEqual from 'deep-equal';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';
import './sc-button.js';

let itemId = 0;

/**
 * If object check that we have the same key value pairs even in different order
 * If Array check that we have the same values even in different order
 */
function isSameOptions(oldOptions, newOptions) {
  if (
    (isPlainObject(newOptions) && deepEqual(newOptions, oldOptions))
    || (Array.isArray(newOptions) && newOptions.slice(0).sort().join(',') === oldOptions.slice(0).sort().join(','))
  ) {
    return true;
  }

  return false;
}

class ScTab extends ScElement {
  static properties = {
    options: {
      type: Array,
    },
    value: {
      type: String,
      reflect: true,
    },
    orientation: {
      type: String,
      reflect: true,
    },
    sortable: {
      type: Boolean,
      reflect: true,
    },
  }

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-1);
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #ffffff;
      overflow: auto;
      border: 1px dotted var(--sc-color-primary-3);
      position: relative;

      --sc-tab-selected: var(--sc-color-secondary-1);
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible), :host(:focus-within) {
      outline: none;
      border: 1px solid var(--sc-color-primary-3);
    }

    :host([orientation="horizontal"]) {
      height: 30px;
      width: 400px;
    }

    :host([orientation="vertical"]) {
      width: 120px;
      height: auto;
      flex-direction: column;
      justify-content: space-between;
    }

    :host([orientation="vertical"]) sc-button {
      width: 100%;
    }

    sc-button {
      border-radius: 0;
      --sc-button-selected: var(--sc-tab-selected);
      height: 100%;
      font-size: inherit;
      border: none;
    }

    :host([orientation="horizontal"]) sc-button:not(:first-child) {
      border-left: 1px solid var(--sc-color-primary-3);
    }

    :host([orientation="vertical"]) sc-button:not(:first-child) {
      border-top: 1px solid var(--sc-color-primary-3);
    }
  `;

  #draggedElement = null;
  #clonedElement = null;
  #marker = null;
  #buttons = null;
  #storageKey = null;

  get options() {
    return this._options;
  }

  set options(value) {
    if (!Array.isArray(value) && !isPlainObject(value)) {
      throw new TypeError(`Cannot set 'options' on 'sc-tab': options should be either an array or an object`);
    }

    if (isSameOptions(this._options, value)) {
      return;
    }

    this._options = value;

    localStorage.removeItem(this.#storageKey); // invalidate storage
    this.requestUpdate();
  }

  constructor() {
    super();

    this._options = [];
    this.value = null;
    // this.disabled = false;
    this.orientation = 'horizontal';
    this.sortable = false;

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);

    this._keyboard = new KeyboardController(this, {
      filterCodes: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Space', 'Enter'],
      callback: this._onKeyboardEvent.bind(this),
      deduplicateEvents: true,
    });
  }

  render() {
    const isObject = isPlainObject(this.options);

    if (!isObject && !Array.isArray(this.options)) {
      throw new Error(`Cannot render 'sc-select': Invalid 'options' attribute, must be an array or an object`);
    }

    return repeat(Object.entries(this.options), () => `sc-tab-${itemId++}`, ([key, value]) => {
      return html`
        <sc-button
          .key=${key}
          .value=${value}
          disable-keyboard
          ?selected=${value === this.value}
          @input="${this._onInput}"
          @focus=${e => e.preventDefault()}
          tabindex="-1"

          @mousedown=${this._onMouseDown}
        >${isObject ? key : value}</sc-button>
      `;
    });
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', 0);
    }

    // check local storage
    this.#storageKey = `sc-separator:${this.id || this._scId}`;
    let stored = JSON.parse(localStorage.getItem(this.#storageKey));
    // check if we have the same item in this.options and inside store
    if (isSameOptions(this.options, stored)) {
      this._options = stored;
      this.requestUpdate();
    } else {
      localStorage.removeItem(this.#storageKey); // store is invalid, delete it
    }
  }

  _onKeyboardEvent(e) {
    if (e.type === 'keydown') {
      let index = this.options.indexOf(this.value);

      if (e.code === 'ArrowDown' || e.code === 'ArrowRight' || e.code === 'Space' || e.code === 'Enter') {
        index += 1;
      } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
        index -= 1;
      }

      if (index < 0) {
        index = this.options.length - 1;
      } else if (index >= this.options.length) {
        index = 0;
      }

      // @important: do not remove, otherwize we loose the focus somehow
      // the prevent default on input is not enought
      this.focus();

      this.value = this.options[index];
      this._dispatchEvent();
    }
  }

  _onInput(e) {
    e.stopPropagation(); // do not propagate button input event

    this.value = e.detail.value;
    this._dispatchEvent();

    if (!this.sortable) {
      return;
    }

    this.#draggedElement = e.currentTarget;

    const { left, top, width, height } = this.getBoundingClientRect();
    const buttons = Array.from(this.shadowRoot.querySelectorAll('sc-button'));
    this.#buttons = buttons.map(el => {
      const pos = el.getBoundingClientRect();
      const rel = {
        left: pos.left - left,
        top: pos.top - top,
      }
      return { pos, rel };
    });

    if (this.orientation === 'horizontal') {
      this.#buttons.push({
        pos: { left: left + width, top },
        rel: { left: width - 2, top: 0 },
      });
    } else {
      this.#buttons.push({
        pos: { left, top: top + height },
        rel: { left: 0, top: height - 2 },
      });
    }

    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
  }

  _onMouseMove(e) {
    e.preventDefault();

    if (this.#clonedElement === null) {
      this.#clonedElement = this.#draggedElement.cloneNode();
      this.#clonedElement.style.position = 'absolute';
      this.#clonedElement.style.opacity = 0.7;
      this.#clonedElement.selected = false;
      document.body.appendChild(this.#clonedElement);

      // create marker
      const { height, width } = this.getBoundingClientRect();
      this.#marker = document.createElement('div');
      this.#marker.style.position = 'absolute';
      this.#marker.style.width = this.orientation === 'horizontal' ? `1px` : `${width}px`;
      this.#marker.style.height = this.orientation === 'horizontal' ? `${height}px` : `1px`;
      this.#marker.style.backgroundColor = 'white';
      this.shadowRoot.appendChild(this.#marker);
    };

    this.#clonedElement.style.top = `${e.clientY - 4}px`;
    this.#clonedElement.style.left = `${e.clientX - 4}px`;

    let distance = +Infinity;
    let closest = null;

    this.#buttons.forEach((infos) => {
      const dist = Math.sqrt((e.clientX - infos.pos.left) ** 2 + (e.clientY - infos.pos.top) ** 2);
      if (dist < distance) {
        distance = dist;
        closest = infos;
      }
    });

    this.#marker.style.top = `${closest.rel.top - 1}px`;
    this.#marker.style.left = `${closest.rel.left - 1}px`;
    this.#marker.infos = closest;
  }

  _onMouseUp(e) {
    e.preventDefault();

    if (this.#clonedElement) {
      // update inner list
      const buttons = Array.from(this.shadowRoot.querySelectorAll('sc-button'));
      const currentIndex = buttons.findIndex(b => b.value === this.#draggedElement.value);
      let targetIndex = this.#buttons.indexOf(this.#marker.infos);
      // before and after current position is same position target position
      if (currentIndex < targetIndex) {
        targetIndex = targetIndex - 1;
      }

      if (isPlainObject(this.options)) {
        // recreate the options object with keys in the right order
        const result = {};
        const keys = Object.keys(this.options);
        keys.splice(currentIndex, 1);
        keys.splice(targetIndex, 0, this.#draggedElement.key);
        keys.forEach(key => result[key] = this.options[key]);
        // assign to inner options, so that the change is not ignored in setter
        this._options = result;
      } else {
        this.options.splice(currentIndex, 1);
        this.options.splice(targetIndex, 0, this.#draggedElement.value);
      }

      this.#clonedElement.remove();
      this.#clonedElement = null;

      this.#marker.remove();
      this.#marker = null;

      localStorage.setItem(this.#storageKey, JSON.stringify(this.options));
      this.requestUpdate();
    }

    this.#draggedElement = null;

    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
  }

  _dispatchEvent() {
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
      },
    });

    this.dispatchEvent(changeEvent);
  }
}

if (customElements.get('sc-tab') === undefined) {
  customElements.define('sc-tab', ScTab);
}

export default ScTab;
