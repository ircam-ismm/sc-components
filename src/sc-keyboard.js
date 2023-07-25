import { html, svg, css } from 'lit';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';
import { mtof } from '@ircam/sc-utils';

import ScElement from './ScElement.js';

const whiteKeys = [0, 2, 4, 5, 7, 9, 11];
const blackKeys = [1, 3, 6, 8, 10];
const noteNames = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

class ScKeyboard extends ScElement {
  static properties = {
    offset: {
      type: Number,
      reflect: true,
    },
    range: {
      type: Number,
      reflect: true,
    },
    mode: {
      type: String,
      reflect: true,
    },
    inputMode: {
      type: String,
      reflect: true,
      attribute: 'input-mode',
    }
  }

  static styles = css`
    :host {
      display: inline-block;
      width: 300px;
      height: 80px;
      background-color: white;

      --sc-keyboard-active-key: var(--sc-color-secondary-2);
    }

    svg {
      width: 100%;
      height: 100%;
    }

    rect {
      stroke: black;
      shape-rendering: crispedges;
    }

    rect.white {
      fill: white;
    }

    rect.black {
      fill: black;
    }

    rect.active {
      fill: var(--sc-keyboard-active-key);
    }
  `;

  get offset() {
    return this._offset;
  }

  set offset(value) {
    if (value < 0) {
      console.warn('sc-keyboard: offset should be >= 0');
      return;
    }

    this._offset = value;
    this.requestUpdate();
  }

  get range() {
    return this._range;
  }

  set range(value) {
    if (value <= 0) {
      console.warn('sc-keyboard: range should be > 0');
      return;
    }

    this._range = value;
    this.requestUpdate();
  }

  get inputMode() {
    return this._inputMode;
  }

  set inputMode(value) {
    if (value !== 'reactive' && value !== 'stateful') {
      console.warn('sc-keyboard: input-mode should be either "reactive" or "statefull"');
      return;
    }

    this._inputMode = value;
    // clear any active notes
    this._triggeredKeys.forEach($prevKey => {
      this._triggerNoteOff($prevKey);
    });
    // no need to request update, class are added / removed manually
  }

  get mode() {
    return this._mode;
  }

  set mode(value) {
    if (value !== 'monophonic' && value !== 'polyphonic') {
      console.warn('sc-keyboard: input-mode should be either "monophonic" or "polyphonic"');
      return;
    }

    this._mode = value;
    // clear any active notes
    this._triggeredKeys.forEach($prevKey => {
      this._triggerNoteOff($prevKey);
    });
    // no need to request update, class are added / removed manually
  }

  constructor() {
    super();

    this._width = 300;
    this._height = 80;
    this._triggeredKeys = new Set();
    this._keyNoteOnEventMap = new Map();

    this.offset = 48;
    this.range = 24;
    // for now polyphonic mode only works when input-mode is stateful
    // @todo - properly handle touch events to fix that
    this.mode = 'monophonic';
    this.inputMode = 'reactive'; // stateful
  }

  render() {
    super.render();

    let start = this.offset;
    let end = start + this.range;

    // define number of white key displayed
    let numWhiteKeys = 0;

    for (let i = start; i < end; i++) {
      if (whiteKeys.includes(i % 12)) {
        numWhiteKeys += 1;
      }
    }

    const width = this._width;
    const height = this._height;
    const keyWidth = width / numWhiteKeys;
    const blackKeyRatio = 0.7;

    let whiteKeyRects = [];
    let blackKeyRects = [];
    let prevIsWhiteKey = null;
    // if first note is black, we only have half of it
    let pos = whiteKeys.includes(start % 12) ? 0 : -(blackKeyRatio / 2);

    for (let i = start; i < end; i++) {
      const isWhiteKey = whiteKeys.includes(i % 12)

      if (i > start) {
        if (isWhiteKey && prevIsWhiteKey) {
          pos += 1;
        } else if (!isWhiteKey && prevIsWhiteKey) {
          pos += (1 - (blackKeyRatio / 2));
        } else if (isWhiteKey && !prevIsWhiteKey) {
          pos += (blackKeyRatio / 2);
        }
      }

      prevIsWhiteKey = isWhiteKey;

      if (isWhiteKey) {
        whiteKeyRects.push(svg`
          <rect
            data-midi-note=${i}
            class="white"
            x=${pos * keyWidth}
            y=0
            width=${keyWidth}
            height=${height}
          ></rect>

        `);
      } else {
        blackKeyRects.push(svg`
          <rect
            data-midi-note=${i}
            class="black"
            x=${(pos * keyWidth)}
            y=0
            width=${keyWidth * 0.7}
            height=${height * 0.65}
          ></rect>
        `);
      }
    }

    return html`
      <svg
        @mousedown=${this._onMouseDown}
        @mouseup=${this._onMouseUp}
        @contextmenu="${this._preventContextMenu}"
      >
        ${whiteKeyRects}
        ${blackKeyRects}
      </svg>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    this._resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      this._width = width;
      this._height = height;
      this.requestUpdate();
    });

    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  _onMouseDown(e) {
    e.stopPropagation();

    const $key = e.target;

    switch (this.inputMode) {
      case 'reactive': {
        this._triggerNoteOn(e, $key);
        break;
      }
      case 'stateful': {
        switch (this.mode) {
          case 'monophonic': {
            const isActive = this._triggeredKeys.has($key);
            // deactive all active keys
            this._triggeredKeys.forEach($prevKey => {
              this._triggerNoteOff($prevKey);
            });
            // if the key was not active, activate it
            if (!isActive) {
              this._triggerNoteOn(e, $key);
            }
            break;
          }
          case 'polyphonic': {
            if (this._triggeredKeys.has($key)) {
              this._triggerNoteOff($key);
            } else {
              this._triggerNoteOn(e, $key);
            }
            break;
          }
        }
        break;
      }
    }
  }

  _onMouseUp(e) {
    e.stopPropagation();

    // in stateful mode, you need a new mouse down to deactivate the key
    if (this.inputMode === 'stateful') {
      return;
    }

    // for now "input-mode=reactive" only works has if "mode=monophonic"
    // @todo - implement "reactive" mode for multitouch devices
    this._triggeredKeys.forEach($prevKey => {
      this._triggerNoteOff($prevKey);
    });
  }

  _triggerNoteOn(e, $key) {
    $key.classList.add('active');
    this._triggeredKeys.add($key);
    // get midi note
    const midiNote = parseInt($key.dataset.midiNote);
    const name = noteNames[midiNote % 12];
    // use y position as velocity
    const { top, height } = $key.getBoundingClientRect();
    const normY = (height - (e.clientY - top)) / height;
    const velocity = Math.round(normY * 127);
    // compute db and lin (?)
    // compute frequency
    const frequency = mtof(midiNote);

    // store for reuse in note off
    const eventInfos = { midiNote, velocity, frequency };
    this._keyNoteOnEventMap.set($key, eventInfos);

    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: {
        type: 'note-on',
        ...eventInfos
      }},
    });

    this.dispatchEvent(event);
    this.requestUpdate();
  }

  _triggerNoteOff($key) {
    $key.classList.remove('active');
    this._triggeredKeys.delete($key);

    const eventInfos = this._keyNoteOnEventMap.get($key);
    this._keyNoteOnEventMap.delete($key);

    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: {
        type: 'note-off',
        ...eventInfos
      }},
    });

    this.dispatchEvent(event);
  }
}

if (customElements.get('sc-keyboard') === undefined) {
  customElements.define('sc-keyboard', ScKeyboard);
}

export default ScKeyboard;

