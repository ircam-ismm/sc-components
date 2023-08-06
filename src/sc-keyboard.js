import { html, svg, css } from 'lit';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';
import { mtof } from '@ircam/sc-utils';

import ScElement from './ScElement.js';
import midiControlled from './mixins/midi-controlled.js';
import KeyboardController from './controllers/keyboard-controller.js';

const whiteKeys = [0, 2, 4, 5, 7, 9, 11];
const blackKeys = [1, 3, 6, 8, 10];
const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

class ScKeyboardBase extends ScElement {
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
    },
    disabled: {
      type: Boolean,
      reflect: true,
    }
  }

  static styles = css`
    :host {
      display: inline-block;
      width: 300px;
      height: 80px;
      background-color: white;
      border-top: 1px solid var(--sc-color-primary-3);

      --sc-keyboard-active-key: var(--sc-color-secondary-2);
    }

    :host([hidden]) {
      display: none
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border-top: 1px solid var(--sc-color-primary-4);
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
    // clear current state
    this._clear();
    this.requestUpdate();
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
    // clear current state
    this._clear();
    this.requestUpdate();
  }

  // midi controlled interface
  get midiType() {
    return 'instrument';
  }

  set midiValue(val) {
    const [messageType, pitch, velocity] = val;
    // @todo - review we should not have to do that, all this could simplified
    const $key = this.shadowRoot.querySelector(`[data-midi-note="${pitch}"]`);

    if (!$key) {
      return;
    }

    if (messageType === 128) { // note-off code
      this._handleKeyRelease(pitch, 0);
    } else if (messageType === 144) { // note-on code
      this._handleKeyPress(pitch, velocity);
    }
  }

  get midiValue() {
    // @todo - define what we should do here
    return null;
  }

  constructor() {
    super();

    this._width = 300;
    this._height = 80;
    this._currentNotes = new Map(); // Map<midiNote, velocity>

    this.offset = 48;
    this.range = 24;
    // for now polyphonic mode only works when input-mode is stateful
    // @todo - properly handle touch events to fix that
    this.mode = 'monophonic';
    this.inputMode = 'reactive'; // stateful

    this.disabled = false;

    this._keyboardOctava = null;
    // we can use use the code position in the array to compute the midi note
    this._keyboardKeys = [
      'KeyA', // C
      'KeyW', // C#
      'KeyS', // D
      'KeyE', // D#
      'KeyD', // E
      'KeyF', // F
      'KeyT', // F#
      'KeyG', // G
      'KeyY', // G#
      'KeyH', // A
      'KeyU', // A#
      'KeyJ', // B
      'KeyK', // C
    ];
    this._keyboard = new KeyboardController(this, {
      filterCodes: [
        ...this._keyboardKeys,
        'ArrowUp', 'ArrowRight', 'ArrowBottom', 'ArrowLeft',
      ],
      callback: this._onKeyboardEvent.bind(this),
      deduplicateEvents: true,
    });
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
            class="white ${this._currentNotes.has(i) ? 'active' : ''}"
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
            class="black ${this._currentNotes.has(i) ? 'active' : ''}"
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
        @mousedown=${this._onPointerDown}
        @touchstart=${this._onPointerDown}
        @mouseup=${this._onPointerUp}
        @touchend=${this._onPointerUp}
      >
        ${whiteKeyRects}
        ${blackKeyRects}
      </svg>
    `
  }

  updated(changedProperties) {
    if (changedProperties.has('disabled')) {
      const tabindex = this.disabled ? -1 : this._tabindex;
      this.setAttribute('tabindex', tabindex);

      if (this.disabled) { this.blur(); }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // @note - this is important if the compoent is e.g. embedded in another component
    this._tabindex = this.getAttribute('tabindex') || 0;

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

  _onKeyboardEvent(e) {
    // find closest octava in range:
    // midiNote 0 -> octava 0
    // midiNote 12 -> octava 1
    // etc.
    if (this._keyboardOctava === null) {
      let octava = 0;

      while (true) {
        const note = octava * 12;

        if (note >= this.offset) {
          this._keyboardOctava = octava;
          break;
        }

        // don't run forever
        if (note > 127) {
          break;
        }

        octava += 1;
      }
    }

    // handle control keys
    if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
      if (e.type === 'keydown') {
        this._keyboardOctava += 1;
      }

      return;
    }

    if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
      if (e.type === 'keydown') {
        this._keyboardOctava -= 1;
      }

      return;
    }

    // handle "virtual" keyboard keys
    const codeIndex = this._keyboardKeys.indexOf(e.code);
    const midiNote = this._keyboardOctava * 12 + codeIndex;

    if (e.type === 'keydown') {
      this._handleKeyPress(midiNote, 127);
    } else {
      this._handleKeyRelease(midiNote, 0);
    }
  }

  _onPointerDown(e) {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    const $key = e.target;
    const midiNote = parseInt($key.dataset.midiNote);
    // use y position as velocity
    const { top, height } = $key.getBoundingClientRect();
    const normY = (height - (e.clientY - top)) / height;
    const velocity = Math.round(normY * 127);

    this._handleKeyPress(midiNote, velocity);
  }

  _onPointerUp(e) {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    const $key = e.target;
    const midiNote = parseInt($key.dataset.midiNote);

    this._handleKeyRelease(midiNote, 0);
  }

  _clear() {
    for (let [midiNote, _velocity] of this._currentNotes.entries()) {
      this._triggerNoteOff(midiNote, 0);
    }

    this._currentNotes.clear();
  }

  // handle logic when a key is pressed for all interfaces (mouse keyboard, midi)
  _handleKeyPress(midiNote, velocity) {
    switch (this.inputMode) {
      case 'reactive': {
        // clear all previous note on when monophonic
        if (this.mode === 'monophonic') {
          this._clear();
        }

        this._triggerNoteOn(midiNote, velocity);
        break;
      }
      case 'stateful': {
        switch (this.mode) {
          case 'monophonic': {
            // we activate the key only if the key was inactive
            const triggerNoteOn = !this._currentNotes.has(midiNote);
            // deactive all active keys
            this._clear();

            if (triggerNoteOn) {
              this._triggerNoteOn(midiNote, velocity);
            }
            break;
          }
          case 'polyphonic': {
            if (this._currentNotes.has(midiNote)) {
              this._triggerNoteOff(midiNote, 0);
            } else {
              this._triggerNoteOn(midiNote, velocity);
            }
            break;
          }
        }
        break;
      }
    }
  }

  // handle logic when a key is released for all interfaces (mouse keyboard, midi)
  _handleKeyRelease(midiNote, velocity) {
    // in stateful mode, you need a new mouse down to deactivate the key
    if (this.inputMode === 'stateful') {
      return;
    }

    // in reactive mode, we just trigger the note-off on the key, works for
    // both monophonic and polyphonic modes.
    this._triggerNoteOff(midiNote, velocity);
  }

  _triggerNoteOn(midiNote, velocity) {
    const name = noteNames[midiNote % 12];
    const frequency = mtof(midiNote);

    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: {
        type: 'note-on',
        midiNote,
        velocity,
        name,
        frequency,
      }},
    });

    this.dispatchEvent(event);

    this._currentNotes.set(midiNote, velocity);
    this.requestUpdate();
  }

  _triggerNoteOff(midiNote, velocity) {
    const name = noteNames[midiNote % 12];
    const frequency = mtof(midiNote);

    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: {
        type: 'note-off',
        midiNote,
        velocity,
        name,
        frequency,
      }},
    });

    this.dispatchEvent(event);

    this._currentNotes.delete(midiNote);
    this.requestUpdate();
  }
}

const ScKeyboard = midiControlled('ScKeyboard', ScKeyboardBase);

if (customElements.get('sc-keyboard') === undefined) {
  customElements.define('sc-keyboard', ScKeyboard);
}

export default ScKeyboard;

