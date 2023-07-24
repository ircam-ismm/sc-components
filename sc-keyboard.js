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
    // @todo - monophonic / polyphonic
    // mode: {
    //   type: String,
    //   reflect: true,
    // },
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
    }

    svg {
      width: 100%;
      height: 100%;
    }

    rect.white {
      fill: white;
      stroke: black;
    }

    rect.black {
      fill: black;
      stroke: black;
    }

    rect.active {
      fill: var(--sc-color-secondary-2);
    }
  `;

  constructor() {
    super();

    this.offset = 48;
    // range is included, if we ask for two octaves, we want 2 full octaves: 25 notes
    this.range = 24;
    // @todo - handle touch events and polyphonic
    // this.mode = 'monophonic'; // polyphonic
    this.inputMode = 'reactive'; // statefull

    this._triggeredKeys = [];
    this._keyNoteOnEventMap = new Map();
  }

  render() {
    super.render();

    // clamp offset to lower white key
    let start = this.offset;
    // range is fully included: if we for two 2 octaves, we have 25 notes
    let end = start + this.range + 1;

    // define number of white key displayed
    let numWhiteKeys = 0;

    for (let i = start; i < end; i++) {
      if (whiteKeys.includes(i % 12)) {
        numWhiteKeys += 1;
      }
    }

    const { width, height } = this.getBoundingClientRect()
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

  _onMouseDown(e) {
    e.stopPropagation();

    const $key = e.target;

    switch (this.inputMode) {
      case 'reactive': {
        // with mouse we are sure we had a mouseup before a new mousedown
        this._triggeredKeys.push($key)
        this._triggerNoteOn(e, $key);

        break;
      }
      case 'statefull': {
        const $prevKey = this._triggeredKeys.shift();

        if ($prevKey) {
          this._triggerNoteOff(e, $prevKey);
        }

        if ($prevKey !== $key) {
          this._triggeredKeys.push($key)
          this._triggerNoteOn(e, $key);
        }

        break;
      }
    }
  }

  _onMouseUp(e) {
    e.stopPropagation();

    // in statefull mode, you need a new mouse down to deactivate the key
    if (this.inputMode === 'statefull') {
      return;
    }

    const $currentKey = this._triggeredKeys.shift();
    this._triggerNoteOff(e, $currentKey)
  }

  _triggerNoteOn(e, $key) {
    $key.classList.add('active');
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

  _triggerNoteOff(e, $key) {
    $key.classList.remove('active');

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

