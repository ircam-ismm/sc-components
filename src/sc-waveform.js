import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';


class ScWaveform extends ScElement {
  #width = null;
  #height = null;
  #resizeObserver = null;

  static properties = {
    selection: {
      type: Boolean,
      reflect: true,
    },
    cursor: {
      type: Boolean,
      reflect: true,
    },
    buffer: {
      type: AudioBuffer,
    },
    cursorPosition: {
      type: Number,
      attribute: 'cursor-position',
    },
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        width: 300px;
        height: 150px;
        box-sizing: border-box;
        color: var(--sc-color-primary-1);
        position: relative;
        border: 1px solid var(--sc-color-primary-2);

        --sc-waveform-color: white;
        --sc-waveform-cursor-color: red;
      }

      svg {
        box-sizing: border-box;
        margin: 0;
        width: 100%;
        height: 100%;
        background-color: var(--sc-color-primary-1);
      }

      path {
        opacity: 1;
        fill: none;
      }

      path.waveform {
        stroke: var(--sc-waveform-color);
      }

      path.cursor {
        stroke: var(--sc-waveform-cursor-color);
      }

      .selection {
        fill: white;
        opacity: 0.4;
      }

      .handle {
        stroke: goldenrod;
        cursor: ew-resize;
        stroke-width: 2px;
      }

      .handle:hover {
        stroke-width: 4px;
      }
    `;
  }

  constructor() {
    super();

    this.buffer = null;
    this.cursor = false;
    this.selection = false;
    this.cursorPosition = 0;

    this.selectionStart = 0;
    this.selectionEnd = 0;
    this.selectionWidth = 0;
    this.selectionStartOffset = 0;
    this.selectionEndOffset = 0;

    this.activePointers = new Map();
    this.pointerIds = []; // we want to keep the order of appearance consistent
  }

  connectedCallback() {
    super.connectedCallback();

    this.#resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      this.#width = width;
      this.#height = height;
      this.#updateWaveform();
      this.#updateCursor();
      this.requestUpdate();
    });

    this.#resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.#resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  update(changedProperties) {
    if (changedProperties.has('buffer') && this.buffer) {
      // average all channels and normalize array
      let maxVal = 0;
      const avgBuffer = [];

      if (this.buffer.numberOfChannels > 1) {
        const chan1 = this.buffer.getChannelData(0);
        const chan2 = this.buffer.getChannelData(1);
        for (let i = 0; i < chan1.length; i++) {
          const val1 = chan1[i];
          const val2 = chan2[i];
          const avg = (val1 + val2) / 2;
          if (maxVal < Math.abs(avg)) {
            maxVal = Math.abs(avg);
          }
          avgBuffer.push(avg);
        }
      } else {
        const chan1 = this.buffer.getChannelData(0);
        for (let i = 0; i < chan1.length; i++) {
          const val = chan1[i];
          if (maxVal < Math.abs(val)) {
            maxVal = Math.abs(val);
          }
          avgBuffer.push(val);
        }
      }

      this.bufferData = avgBuffer.map(val => {
        if (maxVal > 0) {
          return val / maxVal;
        } else {
          return val;
        }
      });

      this.#updateWaveform();
      this.#updateCursor();
    }

    if (changedProperties.has('cursorPosition')) {
      this.#updateCursor();
    }

    super.update(changedProperties);
  }

  render() {
    // wait for first ResizeObserver call
    if (this.#width === null) {
      return nothing;
    }

    return html`
      <svg
        viewBox="0 -1 ${this.#width} 2"
        preserveAspectRatio="none"
        @mousedown="${this.selection ? this.#mouseDown : null}"
        @touchstart="${this.selection ? this.#touchStart : null}"
      >
        <path
          class="waveform"
          shape-rendering="crispEdges";
          vector-effect="non-scaling-stroke"
          d="${this.waveformPath}"
        />
        ${this.cursor
        ? svg`
          <path
            class="cursor"
            shape-rendering="crispEdges";
            vector-effect="non-scaling-stroke"
            d="${this.cursorPath}"
          ></path>
        `
        : nothing
        }
        ${this.selection && this.selectionWidth > 0
          ? svg`
            <rect
              class="selection"
              y="-1"
              height="2"
              x="${this.selectionStart}"
              width="${this.selectionWidth}"
            ></rect>
            <line
              class="handle"
              x1="${this.selectionStart}"
              y1="-1"
              x2="${this.selectionStart}"
              y2="1"
              @mousedown="${this.#leftHandleMouseDown}"
              @touchstart="${this.#leftHandleTouchStart}"
            ></line>
            <line
              class="handle"
              x1="${this.selectionEnd}"
              y1="-1"
              x2="${this.selectionEnd}"
              y2="1"
              @mousedown="${this.#rightHandleMouseDown}"
              @touchstart="${this.#rightHandleTouchStart}"
            ></line>
          `
          : nothing
        }
      </svg>
    `;
  }

  #mouseDown = e => {
    this.rect = this.getBoundingClientRect();
    this.mouseDownX = e.clientX - this.rect.left;
    this.clickedSelection = (this.mouseDownX < this.selectionEnd) && (this.mouseDownX > this.selectionStart);
    window.addEventListener('mousemove', this.#mouseMove);
    window.addEventListener('mouseup', this.#mouseUp);
  }

  #mouseMove = e => {
    e.preventDefault(); // Prevent selection
    if (!this.clickedSelection) {
      const mouseMoveX = Math.max(0, Math.min(e.clientX - this.rect.left, this.#width));
      this.selectionStart = Math.min(this.mouseDownX, mouseMoveX);
      this.selectionEnd = Math.max(this.mouseDownX, mouseMoveX);
      this.selectionWidth = this.selectionEnd - this.selectionStart;
    } else {
      const mouseDisplacement = (e.clientX - this.rect.left) - this.mouseDownX;
      this.selectionStart = this.selectionStartOffset + mouseDisplacement;
      this.selectionStart = Math.min(Math.max(0, this.selectionStart), this.#width - this.selectionWidth);
      this.selectionEnd = this.selectionStart + this.selectionWidth;
    }

    this.#dispatchInputEvent();
    this.requestUpdate();
  }

  #mouseUp = e => {
    this.selectionStartOffset = this.selectionStart;
    this.selectionEndOffset = this.selectionEnd;
    window.removeEventListener('mousemove', this.#mouseMove);
    window.removeEventListener('mouseup', this.#mouseUp);

    this.#dispatchChangeEvent();
  }

  #leftHandleMouseDown = e => {
    e.stopPropagation();

    this.rect = this.getBoundingClientRect();
    this.mouseDownX = e.clientX - this.rect.left;
    window.addEventListener('mousemove', this.#leftHandleMouseMove);
    window.addEventListener('mouseup', this.#leftHandleMouseUp);
  }

  #leftHandleMouseMove = e => {
    const mouseDisplacement = (e.clientX - this.rect.left) - this.mouseDownX;
    this.selectionStart = this.selectionStartOffset + mouseDisplacement;
    this.selectionStart = Math.min(this.selectionEnd, Math.max(this.selectionStart, 0));
    this.selectionWidth = this.selectionEnd - this.selectionStart;

    this.#dispatchInputEvent();
    this.requestUpdate();
  }

  #leftHandleMouseUp = e => {
    this.selectionStartOffset = this.selectionStart;
    window.removeEventListener('mousemove', this.#leftHandleMouseMove);
    window.removeEventListener('mouseup', this.#leftHandleMouseUp);

    this.#dispatchChangeEvent();
  }

  #rightHandleMouseDown = e => {
    e.stopPropagation();
    this.rect = this.getBoundingClientRect();
    this.mouseDownX = e.clientX - this.rect.left;
    window.addEventListener('mousemove', this.#rightHandleMouseMove);
    window.addEventListener('mouseup', this.#rightHandleMouseUp);
  }

  #rightHandleMouseMove = e => {
    const mouseDisplacement = (e.clientX - this.rect.left) - this.mouseDownX;
    this.selectionEnd = this.selectionEndOffset + mouseDisplacement;
    this.selectionEnd = Math.max(this.selectionStart, Math.min(this.selectionEnd, this.#width));
    this.selectionWidth = this.selectionEnd - this.selectionStart;

    this.#dispatchInputEvent();
    this.requestUpdate();
  }

  #rightHandleMouseUp = e => {
    this.selectionEndOffset = this.selectionEnd;
    window.removeEventListener('mousemove', this.#rightHandleMouseMove);
    window.removeEventListener('mouseup', this.#rightHandleMouseUp);

    this.#dispatchChangeEvent();
  }

  #touchStart = e => {
    e.preventDefault();

    if (this.pointerIds.length === 0) {
      window.addEventListener('touchmove', this.#touchMove, { passive: false });
      window.addEventListener('touchend', this.#touchEnd);
      window.addEventListener('touchcancel', this.#touchEnd);
    }

    this.rect = this.getBoundingClientRect();
    for (let touch of e.changedTouches) {
      this.touchDownX = touch.clientX - this.rect.left;
      this.touchedSelection = (this.touchDownX < this.selectionEnd) && (this.touchDownX > this.selectionStart);
      const id = touch.identifier;
      this.pointerIds.push(id);
      this.activePointers.set(id, touch);
    }
  }

  #touchMove = e => {
    e.preventDefault();

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      if (this.pointerIds.indexOf(id) !== -1) {
        if (!this.touchedSelection) {
          const touchMoveX = Math.max(0, Math.min(touch.clientX - this.rect.left, this.#width));
          this.selectionStart = Math.min(this.touchDownX, touchMoveX);
          this.selectionEnd = Math.max(this.touchDownX, touchMoveX);
          this.selectionWidth = this.selectionEnd - this.selectionStart;
        } else {
          const touchDisplacement = (touch.clientX - this.rect.left) - this.touchDownX;
          this.selectionStart = this.selectionStartOffset + touchDisplacement;
          this.selectionStart = Math.min(Math.max(0, this.selectionStart), this.#width - this.selectionWidth);
          this.selectionEnd = this.selectionStart + this.selectionWidth;
        }

        this.#dispatchInputEvent();
        this.requestUpdate();
      }
    }
  }

  #touchEnd = e => {
    for (let touch of e.changedTouches) {
      const pointerId = touch.identifier;
      const index = this.pointerIds.indexOf(pointerId);
      if (index !== -1) {
        this.pointerIds.splice(index, 1);
        this.activePointers.delete(pointerId);
      }
    }


    if (this.pointerIds.length === 0) {
      this.selectionStartOffset = this.selectionStart;
      this.selectionEndOffset = this.selectionEnd;

      window.removeEventListener('touchmove', this.#touchMove);
      window.removeEventListener('touchend', this.#touchEnd);
      window.removeEventListener('touchcancel', this.#touchEnd);
    }

    this.#dispatchChangeEvent();
  }

  #leftHandleTouchStart = e => {
    e.stopPropagation();

    if (this.pointerIds.length === 0) {
      window.addEventListener('touchmove', this.#leftHandleTouchMove, { passive: false });
      window.addEventListener('touchend', this.#leftHandleTouchEnd);
      window.addEventListener('touchcancel', this.#leftHandleTouchEnd);
    }

    this.rect = this.getBoundingClientRect();
    for (let touch of e.changedTouches) {
      this.touchDownX = touch.clientX - this.rect.left;
      const id = touch.identifier;
      this.pointerIds.push(id);
      this.activePointers.set(id, touch);
    }
  }

  #leftHandleTouchMove = e => {
    e.preventDefault();

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      if (this.pointerIds.indexOf(id) !== -1) {
        const touchDisplacement = (touch.clientX - this.rect.left) - this.touchDownX;
        this.selectionStart = this.selectionStartOffset + touchDisplacement;
        this.selectionStart = Math.min(this.selectionEnd, Math.max(this.selectionStart, 0));
        this.selectionWidth = this.selectionEnd - this.selectionStart;

        this.#dispatchInputEvent();
        this.requestUpdate();
      }
    }
  }

  #leftHandleTouchEnd = e => {
    for (let touch of e.changedTouches) {
      const pointerId = touch.identifier;
      const index = this.pointerIds.indexOf(pointerId);
      if (index !== -1) {
        this.pointerIds.splice(index, 1);
        this.activePointers.delete(pointerId);
      }
    }

    if (this.pointerIds.length === 0) {
      this.selectionStartOffset = this.selectionStart;
      this.selectionEndOffset = this.selectionEnd;

      window.removeEventListener('touchmove', this.#leftHandleTouchMove);
      window.removeEventListener('touchend', this.#leftHandleTouchEnd);
      window.removeEventListener('touchcancel', this.#leftHandleTouchEnd);
    }
  }

  #rightHandleTouchStart = e => {
    e.stopPropagation();

    if (this.pointerIds.length === 0) {
      window.addEventListener('touchmove', this.#rightHandleTouchMove, { passive: false });
      window.addEventListener('touchend', this.#rightHandleTouchEnd);
      window.addEventListener('touchcancel', this.#rightHandleTouchEnd);
    }

    this.rect = this.getBoundingClientRect();
    for (let touch of e.changedTouches) {
      this.touchDownX = touch.clientX - this.rect.left;
      const id = touch.identifier;
      this.pointerIds.push(id);
      this.activePointers.set(id, touch);
    }
  }

  #rightHandleTouchMove = e => {
    e.preventDefault();

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      if (this.pointerIds.indexOf(id) !== -1) {
        const touchDisplacement = (touch.clientX - this.rect.left) - this.touchDownX;
        this.selectionEnd = this.selectionEndOffset + touchDisplacement;
        this.selectionEnd = Math.max(this.selectionStart, Math.min(this.selectionEnd, this.#width));
        this.selectionWidth = this.selectionEnd - this.selectionStart;

        this.#dispatchInputEvent();
        this.requestUpdate();
      }
    }
  }

  #rightHandleTouchEnd = e => {
    for (let touch of e.changedTouches) {
      const pointerId = touch.identifier;
      const index = this.pointerIds.indexOf(pointerId);
      if (index !== -1) {
        this.pointerIds.splice(index, 1);
        this.activePointers.delete(pointerId);
      }
    }

    if (this.pointerIds.length === 0) {
      this.selectionStartOffset = this.selectionStart;
      this.selectionEndOffset = this.selectionEnd;

      window.removeEventListener('touchmove', this.#rightHandleTouchMove);
      window.removeEventListener('touchend', this.#rightHandleTouchEnd);
      window.removeEventListener('touchcancel', this.#rightHandleTouchEnd);
    }
  }

  #dispatchInputEvent() {
    const selectionStart = this.buffer.duration * this.selectionStart / this.#width;
    const selectionEnd = this.buffer.duration * this.selectionEnd / this.#width;

    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: { selectionStart, selectionEnd } }
    });

    this.dispatchEvent(event);
  }

  #dispatchChangeEvent() {
    const selectionStart = this.buffer.duration * this.selectionStart / this.#width;
    const selectionEnd = this.buffer.duration * this.selectionEnd / this.#width;

    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: { selectionStart, selectionEnd } },
    });

    this.dispatchEvent(event);
  }

  #updateWaveform() {
    if (!(this.buffer instanceof AudioBuffer)) {
      this.waveformPath = '';
      return;
    }

    const idxStep = this.buffer.length / this.#width;
    const waveformLimits = [];

    for (let i = 0; i < this.buffer.length; i += idxStep) {
      const sliceStart = Math.floor(i);
      let sliceData = this.bufferData.slice(sliceStart, sliceStart + idxStep);

      let min = 1;
      let max = -1;

      // get min/max of average
      for (let j = 0; j < sliceData.length; j++) {
        const val = sliceData[j];

        if (val < min) {
          min = val;
        }

        if (val > max) {
          max = val;
        }
      }

      waveformLimits.push([min, max]);
    }

    let path = waveformLimits.map((data, index) => {
      const x = index;
      // adapt to svg coordinates system
      let y1 = data[0] * -1;
      let y2 = data[1] * -1;

      return `${x},${y1}L${x},${y2}`;
    });

    path = 'M' + path.join('L');
    this.waveformPath = path;
  }

  #updateCursor() {
    if (!(this.buffer instanceof AudioBuffer)) {
      this.waveformPath = '';
      return;
    }

    const cursorIdx = Math.floor(this.cursorPosition/this.buffer.duration * this.#width);
    this.cursorPath = `M ${cursorIdx}, -1 L ${cursorIdx}, ${1}`;
  }
}

if (customElements.get('sc-waveform') === undefined) {
  customElements.define('sc-waveform', ScWaveform);
}

export default ScWaveform;
