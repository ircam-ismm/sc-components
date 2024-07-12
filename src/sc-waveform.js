import { html, css, svg, nothing } from 'lit';
import ScElement from './ScElement.js';


class ScWaveform extends ScElement {
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
        backgroundColor: var(--sc-color-primary-1);
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

    this._width = null;
    this._height = null;
    this._resizeObserver = null;

    this._mouseDown = this._mouseDown.bind(this);
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);

    this._leftHandleMouseDown = this._leftHandleMouseDown.bind(this);
    this._leftHandleMouseMove = this._leftHandleMouseMove.bind(this);
    this._leftHandleMouseUp = this._leftHandleMouseUp.bind(this);
    this._rightHandleMouseDown = this._rightHandleMouseDown.bind(this);
    this._rightHandleMouseMove = this._rightHandleMouseMove.bind(this);
    this._rightHandleMouseUp = this._rightHandleMouseUp.bind(this);

    this.activePointers = new Map();
    this.pointerIds = []; // we want to keep the order of appearance consistant

    this._touchStart = this._touchStart.bind(this);
    this._touchMove = this._touchMove.bind(this);
    this._touchEnd = this._touchEnd.bind(this);

    this._leftHandleTouchStart = this._leftHandleTouchStart.bind(this);
    this._leftHandleTouchMove = this._leftHandleTouchMove.bind(this);
    this._leftHandleTouchEnd = this._leftHandleTouchEnd.bind(this);
    this._rightHandleTouchStart = this._rightHandleTouchStart.bind(this);
    this._rightHandleTouchMove = this._rightHandleTouchMove.bind(this);
    this._rightHandleTouchEnd = this._rightHandleTouchEnd.bind(this);

  }

  connectedCallback() {
    super.connectedCallback();

    this._resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      this._width = width;
      this._height = height;
      this._updateWaveform();
      this._updateCursor();
      this.requestUpdate();
    });

    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
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

      this._updateWaveform();
      this._updateCursor();
    }
    
    if (changedProperties.has('cursorPosition')) {
      this._updateCursor();
    }

    super.update(changedProperties);
  }

  render() {
    // wait for first ResizeObserver call
    if (this._width === null) {
      return nothing;
    }

    return html`
      <svg
        viewBox="0 -1 ${this._width} 2"
        preserveAspectRatio="none"
        @mousedown="${this.selection ? this._mouseDown : null}"
        @touchstart="${this.selection ? this._touchStart : null}"
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
              @mousedown="${this._leftHandleMouseDown}"
              @touchstart="${this._leftHandleTouchStart}"
            ></line>
            <line
              class="handle"
              x1="${this.selectionEnd}"
              y1="-1"
              x2="${this.selectionEnd}"
              y2="1"
              @mousedown="${this._rightHandleMouseDown}"
              @touchstart="${this._rightHandleTouchStart}"
            ></line>
          `
          : nothing 
        }
      <svg>
    `
  }

  _mouseDown(e) {
    this.rect = this.getBoundingClientRect();
    this.mouseDownX = e.clientX - this.rect.left;
    this.clickedSelection = (this.mouseDownX < this.selectionEnd) && (this.mouseDownX > this.selectionStart);
    window.addEventListener('mousemove', this._mouseMove);
    window.addEventListener('mouseup', this._mouseUp);
  }

  _mouseMove(e) {
    e.preventDefault(); // Prevent selection
    if (!this.clickedSelection) {
      const mouseMoveX = Math.max(0, Math.min(e.clientX - this.rect.left, this._width));
      this.selectionStart = Math.min(this.mouseDownX, mouseMoveX);
      this.selectionEnd = Math.max(this.mouseDownX, mouseMoveX);
      this.selectionWidth = this.selectionEnd - this.selectionStart;
    } else {
      const mouseDisplacement = (e.clientX - this.rect.left) - this.mouseDownX;
      this.selectionStart = this.selectionStartOffset + mouseDisplacement;
      this.selectionStart = Math.min(Math.max(0, this.selectionStart), this._width - this.selectionWidth);
      this.selectionEnd = this.selectionStart + this.selectionWidth;
    }
  
    this._dispatchInputEvent();
    this.requestUpdate();
  }

  _mouseUp(e) {
    this.selectionStartOffset = this.selectionStart;
    this.selectionEndOffset = this.selectionEnd;
    window.removeEventListener('mousemove', this._mouseMove);
    window.removeEventListener('mouseup', this._mouseUp);

    this._dispatchChangeEvent();
  }

  _leftHandleMouseDown(e) {
    e.stopPropagation();
    this.rect = this.getBoundingClientRect();
    this.mouseDownX = e.clientX - this.rect.left;
    window.addEventListener('mousemove', this._leftHandleMouseMove);
    window.addEventListener('mouseup', this._leftHandleMouseUp);
  }

  _leftHandleMouseMove(e) {
    const mouseDisplacement = (e.clientX - this.rect.left) - this.mouseDownX;
    this.selectionStart = this.selectionStartOffset + mouseDisplacement;
    this.selectionStart = Math.min(this.selectionEnd, Math.max(this.selectionStart, 0));
    this.selectionWidth = this.selectionEnd - this.selectionStart;

    this._dispatchInputEvent();
    this.requestUpdate();
  }

  _leftHandleMouseUp(e) {
    this.selectionStartOffset = this.selectionStart;
    window.removeEventListener('mousemove', this._leftHandleMouseMove);
    window.removeEventListener('mouseup', this._leftHandleMouseUp);

    this._dispatchChangeEvent();
  }

  _rightHandleMouseDown(e) {
    e.stopPropagation();
    this.rect = this.getBoundingClientRect();
    this.mouseDownX = e.clientX - this.rect.left;
    window.addEventListener('mousemove', this._rightHandleMouseMove);
    window.addEventListener('mouseup', this._rightHandleMouseUp);
  }

  _rightHandleMouseMove(e) {
    const mouseDisplacement = (e.clientX - this.rect.left) - this.mouseDownX;
    this.selectionEnd = this.selectionEndOffset + mouseDisplacement;
    this.selectionEnd = Math.max(this.selectionStart, Math.min(this.selectionEnd, this._width));
    this.selectionWidth = this.selectionEnd - this.selectionStart;

    this._dispatchInputEvent();
    this.requestUpdate();
  }

  _rightHandleMouseUp(e) {
    this.selectionEndOffset = this.selectionEnd;
    window.removeEventListener('mousemove', this._rightHandleMouseMove);
    window.removeEventListener('mouseup', this._rightHandleMouseUp);

    this._dispatchChangeEvent();
  }

  _touchStart(e) {
    e.preventDefault();

    if (this.pointerIds.length === 0) {
      window.addEventListener('touchmove', this._touchMove, { passive: false });
      window.addEventListener('touchend', this._touchEnd);
      window.addEventListener('touchcancel', this._touchEnd);
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

  _touchMove(e) {
    e.preventDefault();

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      if (this.pointerIds.indexOf(id) !== -1) {
        if (!this.touchedSelection) {
          const touchMoveX = Math.max(0, Math.min(touch.clientX - this.rect.left, this._width));
          this.selectionStart = Math.min(this.touchDownX, touchMoveX);
          this.selectionEnd = Math.max(this.touchDownX, touchMoveX);
          this.selectionWidth = this.selectionEnd - this.selectionStart;
        } else {
          const touchDisplacement = (touch.clientX - this.rect.left) - this.touchDownX;
          this.selectionStart = this.selectionStartOffset + touchDisplacement;
          this.selectionStart = Math.min(Math.max(0, this.selectionStart), this._width - this.selectionWidth);
          this.selectionEnd = this.selectionStart + this.selectionWidth;
        }

        this._dispatchInputEvent();
        this.requestUpdate();
      }
    }
  }

  _touchEnd(e) {
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

      window.removeEventListener('touchmove', this._touchMove);
      window.removeEventListener('touchend', this._touchEnd);
      window.removeEventListener('touchcancel', this._touchEnd);
    }

    this._dispatchChangeEvent();
  }

  _leftHandleTouchStart(e) {
    e.stopPropagation();

    if (this.pointerIds.length === 0) {
      window.addEventListener('touchmove', this._leftHandleTouchMove, { passive: false });
      window.addEventListener('touchend', this._leftHandleTouchEnd);
      window.addEventListener('touchcancel', this._leftHandleTouchEnd);
    }

    this.rect = this.getBoundingClientRect();
    for (let touch of e.changedTouches) {
      this.touchDownX = touch.clientX - this.rect.left;
      const id = touch.identifier;
      this.pointerIds.push(id);
      this.activePointers.set(id, touch);
    }
  }

  _leftHandleTouchMove(e) {
    e.preventDefault(); 

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      if (this.pointerIds.indexOf(id) !== -1) {
        const touchDisplacement = (touch.clientX - this.rect.left) - this.touchDownX;
        this.selectionStart = this.selectionStartOffset + touchDisplacement;
        this.selectionStart = Math.min(this.selectionEnd, Math.max(this.selectionStart, 0));
        this.selectionWidth = this.selectionEnd - this.selectionStart;

        this._dispatchInputEvent();
        this.requestUpdate();
      }
    }
  }

  _leftHandleTouchEnd(e) {
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

      window.removeEventListener('touchmove', this._leftHandleTouchMove);
      window.removeEventListener('touchend', this._leftHandleTouchEnd);
      window.removeEventListener('touchcancel', this._leftHandleTouchEnd);
    }
  }

  _rightHandleTouchStart(e) {
    e.stopPropagation();

    if (this.pointerIds.length === 0) {
      window.addEventListener('touchmove', this._rightHandleTouchMove, { passive: false });
      window.addEventListener('touchend', this._rightHandleTouchEnd);
      window.addEventListener('touchcancel', this._rightHandleTouchEnd);
    }

    this.rect = this.getBoundingClientRect();
    for (let touch of e.changedTouches) {
      this.touchDownX = touch.clientX - this.rect.left;
      const id = touch.identifier;
      this.pointerIds.push(id);
      this.activePointers.set(id, touch);
    }
  }

  _rightHandleTouchMove(e) {
    e.preventDefault();

    for (let touch of e.changedTouches) {
      const id = touch.identifier;
      if (this.pointerIds.indexOf(id) !== -1) {
        const touchDisplacement = (touch.clientX - this.rect.left) - this.touchDownX;
        this.selectionEnd = this.selectionEndOffset + touchDisplacement;
        this.selectionEnd = Math.max(this.selectionStart, Math.min(this.selectionEnd, this._width));
        this.selectionWidth = this.selectionEnd - this.selectionStart;

        this._dispatchInputEvent();
        this.requestUpdate();
      }
    }
  }

  _rightHandleTouchEnd(e) {
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

      window.removeEventListener('touchmove', this._rightHandleTouchMove);
      window.removeEventListener('touchend', this._rightHandleTouchEnd);
      window.removeEventListener('touchcancel', this._rightHandleTouchEnd);
    }
  }

  _dispatchInputEvent() {
    const selectionStart = this.buffer.duration * this.selectionStart / this._width;
    const selectionEnd = this.buffer.duration * this.selectionEnd / this._width;

    const event = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: { selectionStart, selectionEnd } }
    });

    this.dispatchEvent(event);
  }

  _dispatchChangeEvent() {
    const selectionStart = this.buffer.duration * this.selectionStart / this._width;
    const selectionEnd = this.buffer.duration * this.selectionEnd / this._width;

    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: { selectionStart, selectionEnd } },
    });

    this.dispatchEvent(event);
  }

  _updateWaveform() {
    if (!(this.buffer instanceof AudioBuffer)) {
      this.waveformPath = '';
      return;
    }

    const idxStep = this.buffer.length / this._width;
    const waveformLimits = [];

    for (let i = 0; i < this.buffer.length; i += idxStep) {
      const sliceStart = Math.floor(i);
      let sliceData = this.bufferData.slice(sliceStart, sliceStart + idxStep);

      let min = 1;
      let max = -1;

      //get min/max of average
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
      let y1 = data[0];
      let y2 = data[1];
      // return `${x},${ZERO}L${x},${y1}L${x},${y2}L${x},${ZERO}`;
      return `${x},${y1}L${x},${y2}`;
    });

    path = 'M' + path.join('L');
    this.waveformPath = path;
  }

  _updateCursor() {
    if (!(this.buffer instanceof AudioBuffer)) {
      this.waveformPath = '';
      return;
    }
    
    const cursorIdx = Math.floor(this.cursorPosition/this.buffer.duration * this._width);
    this.cursorPath = `M ${cursorIdx}, -1 L ${cursorIdx}, ${1}`;
  }
}

if (customElements.get('sc-waveform') === undefined) {
  customElements.define('sc-waveform', ScWaveform);
}

export default ScWaveform;
