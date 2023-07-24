import { html, svg, css } from 'lit';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';
import ScElement from './ScElement.js';

// C is n % 12

const octava = 12;

const whiteKeys = [0, 2, 4, 5, 7, 9, 11];
const blackKeys = [1, 3, 6, 8, 10];
const noteNames = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

class ScKeyboard extends ScElement {
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
  `

  constructor() {
    super();

    this.offset = 36;
    this.range = 24;

    // polyphonic / monophonic
    // presits / reactive

    this._mouseDownElementTriggered = null;
  }

  render() {
    super.render();

    // clamp offset to lower white key
    let start = whiteKeys.includes(this.offset % 12) ? this.offset : this.offset - 1;
    // clamp offset + range to upper white key
    let end = start + this.range;
    end = whiteKeys.includes(end % 12) ? end : end + 1;

    // define number of white key displayed
    let numWhiteKeys = 0;


    for (let i = start; i < end + 1; i++) {
      if (whiteKeys.includes(i % 12)) {
        numWhiteKeys += 1;
      }
    }

    const { width, height } = this.getBoundingClientRect()
    const keyWidth = width / numWhiteKeys;
    let pos = 0;

    let whiteKeyRects = [];
    let blackKeyRects = [];

    for (let i = start; i < end + 1; i++) {
      let offsetKey = i - start;

      if (i > start) {
        const currentIsWhiteKey = whiteKeys.includes(offsetKey % 12);
        const prevIsWhiteKey = whiteKeys.includes((offsetKey - 1) % 12);

        if (currentIsWhiteKey && prevIsWhiteKey) {
          pos += 1;
        } else if (!currentIsWhiteKey && prevIsWhiteKey) {
          pos += 0.65;
        } else if (currentIsWhiteKey && !prevIsWhiteKey) {
          pos += 0.35;
        }
      }

      if (whiteKeys.includes(i % 12)) {
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
      >
        ${whiteKeyRects}
        ${blackKeyRects}
      </svg>
    `
  }

  _onMouseDown(e) {
    e.stopPropagation();

    const $key = e.target;
    const midiKey = parseInt($key.dataset.midiNote);

    // compute freq

    // use y position as velocity
    const { top, height } = $key.getBoundingClientRect();
    const normY = (height - (e.clientY - top)) / height;
    const velocity = Math.round(normY * 127);

    // compute db and lin

    console.log(midiKey, velocity);

    // e = Mouse click event.
    // var rect = e.target.getBoundingClientRect();
    // var x = e.clientX - rect.left; //x position within the element.
    // var y = e.clientY - rect.top;  //y position within the element.
    // console.log("Left? : " + x + " ; Top? : " + y + ".");

    // feedback on key
    $key.classList.add('active');
    $key.style.fillOpacity = 0.5 + normY * 0.5;

    // propagate infos

    this._mouseDownElementTriggered = $key;

  }

  _onMouseUp(e) {
    e.stopPropagation();

    // de-active elements from touch start
    if (this._mouseDownElementTriggered !== null) {
      this._mouseDownElementTriggered.classList.remove('active');
      this._mouseDownElementTriggered.style.fillOpacity = 1;
      this._mouseDownElementTriggered = null;
    }
  }
}

if (customElements.get('sc-keyboard') === undefined) {
  customElements.define('sc-keyboard', ScKeyboard);
}

export default ScKeyboard;

