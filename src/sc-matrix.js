import { html, svg, css, nothing } from 'lit';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';

import ScElement from './ScElement.js';
import KeyboardController from './controllers/keyboard-controller.js';

/**
 * Given data follows a row-first convention with the 0 index
 * being displayed at the top of the matrix
 * ```
 * [
 *    [0, 0, 0, 1],`
 *    [0, 1, 0, 0],`
 *    // ...
 * ]
 */
class ScMatrix extends ScElement {
  static properties = {
    columns: {
      type: Number,
      reflect: true,
    },
    rows: {
      type: Number,
      reflect: true,
    },
    // @todo - updates values when updated
    states: {
      type: Array,
    },
    value: {
      type: Array,
    },
    // @todo - document live directive
    reset: {
      type: Boolean,
      reflect: true,
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      width: 300px;
      height: 150px;
      vertical-align: top;
      display: inline-block;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);

      --sc-matrix-cell-color: #ffffff;
      --sc-matrix-cell-border: var(--sc-color-primary-4);
    }

    :host([hidden]) {
      display: none
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    rect {
      fill: var(--sc-matrix-cell-color);
      shape-rendering: crispedges;
    }

    line {
      stroke: var(--sc-matrix-cell-border);
      shape-rendering: crispedges;
    }

    rect.keyboard-nav-cell {
      fill: var(--sc-color-secondary-5);
      shape-rendering: crispedges;
      pointer-events: none;
    }
  `;

  set rows(value) {
    if (value < 1) {
      console.warn('sc-matrix: Invalid value for rows, should be >= 1');
      return;
    }

    this._rows = value;
    this._resizeMatrix();
  }

  get rows() {
    return this._rows;
  }

  set columns(value) {
    if (value < 1) {
      console.warn('sc-matrix: Invalid value for columns, should be >= 1');
      return;
    }

    this._columns = value;
    this._resizeMatrix();
  }

  get columns() {
    return this._columns;
  }

  set value(value) {
    this._value = value;
    // if we replace the internal data matrix with an external one, we want
    // to keep the matrix description consistent
    this._rows = this._value.length;
    this._columns = this._value[0].length;
    // `requestUpdate` because in many cases `value` might be the same instance
    this.requestUpdate();
  }

  get value() {
    return this._value;
  }

  set reset(value) {
    this._reset();
  }

  get reset() {
    return undefined;
  }

  set states(states) {
    this._states = states;

    // check existing values against new states
    for (let y = 0; y < this._value.length; y++) {
      const row = this._value[y];

      for (let x = 0; x < row.length; x++) {
        const currentValue = row[x];
        // find closest entry
        if (this._states.indexOf(currentValue) === -1) {
          // @note on`reduce` - by default accumulator (here `a`) is the first
          // element of the array
          const closest = this.states.reduce((a, b) => {
            return Math.abs(b - currentValue) < Math.abs(a - currentValue) ? b : a;
          });

          this._value[y][x] = closest;
        }
      }
    }

    this._emitChange();
    this.requestUpdate();
  }

  get states() {
    return this._states;
  }

  constructor() {
    super();

    this._value = [];
    this._states = [0, 1];
    this._width = 300; // these are the default from css
    this._height = 200;
    this._resizeObserver = null;

    this.columns = 8;
    this.rows = 4;
    this.disabled = false;

    // for keyboard controlled selection of cells
    this._keyboardHighlightCell = null;
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);

    this.keyboard = new KeyboardController(this, {
      filterCodes: [
        'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft',
        'Space', 'Enter', 'Escape', 'Backspace',
      ],
      callback: this._onKeyboardEvent.bind(this),
      deduplicateEvents: true,
    });
  }

  render() {
    // @note - For some reason setting the viewbox dynamically doesn't work.
    // Also the outline of each cell would be scaled too, which is not what we
    // want. Then we rely on the real element size in pixels.
    //
    // Relying on rect stroke or outline does not give a clean result neither
    // so we manually draw the lines.

    const cellWidth = this._width / this.columns;
    const cellHeight = this._height / this.rows;

    const minValue = this._states[0];
    const maxValue = this._states[this._states.length - 1];

    // testing
    let highligthCell = null;

    if (this._keyboardHighlightCell !== null) {
      highligthCell = svg`
        <rect
          class="keyboard-nav-cell"
          width=${cellWidth}
          height=${cellHeight}
          x=${this._keyboardHighlightCell.x * cellWidth}
          y=${this._keyboardHighlightCell.y * cellHeight}
          opacity="0.4"
        ></rect>
      `;
    }

    // prevent default to prevent focus when disabled
    return html`
      <svg
        @mousedown=${e => e.preventDefault()}
        @touchstart=${e => e.preventDefault()}
      >
        <g>
          ${this.value.map((row, rowIndex) => {
            const y = rowIndex * cellHeight;

            return row.map((value, columnIndex) => {
              const x = columnIndex * cellWidth;
              const opacity = (value - minValue) / (maxValue - minValue);

              return svg`
                <rect
                  width=${cellWidth}
                  height=${cellHeight}
                  x=${x}
                  y=${y}
                  style="fill-opacity: ${opacity}"
                  data-row-index=${rowIndex}
                  data-column-index=${columnIndex}
                  @mousedown=${this._onCellEvent}
                  @touchend=${this._onCellEvent}
                ></rect>
              `;
            });
          })}
        </g>
        <!-- keyboard controlled highligth cell -->
        ${highligthCell
          ? svg`<g>${highligthCell}</g>`
          : nothing
        }
        <g>
          <!-- horizontal lines -->
          ${map(range(1, this.value.length), i => {
            const y = i * cellHeight;
            return svg`<line x1="0" y1=${y} x2=${this._width} y2=${y}></line>`;
          })}

          <!-- vertical lines -->
          ${map(range(1, this.value[0].length), i => {
            const x = i * cellWidth;
            return svg`<line x1=${x} y1="0" x2=${x} y2=${this._height}></line>`;
          })}
        <g>
      </svg>
    `;
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
      const $svg = this.shadowRoot.querySelector('svg');
      const { width, height } = $svg.getBoundingClientRect();
      this._width = width;
      this._height = height;
      this.requestUpdate();
    });

    this._resizeObserver.observe(this);

    this.addEventListener('focus', this._onFocus);
    this.addEventListener('blur', this._onBlur);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();

    this.removeEventListener('focus', this._onFocus);
    this.removeEventListener('blur', this._onBlur);

    super.disconnectedCallback();
  }

  _resizeMatrix() {
    const value = this.value;

    // remove additionnal rows
    for (let y = value.length - 1; y >= this.rows; y--) {
      value.splice(y, 1);
    }

    // remove additionnal columns
    value.forEach(row => {
      for (let x = row.length - 1; x >= this.columns; x--) {
        row.splice(x, 1);
      }
    });

    // add new rows and columns
    const currentNumRows = value.length;

    for (let y = 0; y < this.rows; y++) {
      if (y < currentNumRows) {

        // check _rows
        value.forEach(row => {
          for (let x = row.length; x < this.columns; x++) {
            row[x] = this._states[0];
          }
        });
      } else {
        // new row
        const row = new Array(this.columns).fill(this._states[0]);
        value[y] = row;
      }
    }

    this.requestUpdate();
  }

  _onFocus() {
    this._keyboardHighlightCell = null;
    this.requestUpdate();
  }

  _onBlur() {
    this._keyboardHighlightCell = null;
    this.requestUpdate();
  }

  _onKeyboardEvent(e) {
    if (e.type === 'keydown') {
      // first interaction always init the cell
      if (this._keyboardHighlightCell === null) {
        this._keyboardHighlightCell = { x: 0, y: this.rows - 1 };
      } else {
        switch (e.code) {
          case 'ArrowUp': {
            this._keyboardHighlightCell.y -= 1;
            break;
          }
          case 'ArrowRight': {
            this._keyboardHighlightCell.x += 1;
            break;
          }
          case 'ArrowDown': {
            this._keyboardHighlightCell.y += 1;
            break;
          }
          case 'ArrowLeft': {
            this._keyboardHighlightCell.x -= 1;
            break;
          }
          case 'Space':
          case 'Enter': {
            const rowIndex = this._keyboardHighlightCell.y;
            const columnIndex = this._keyboardHighlightCell.x;
            this._updateCell(rowIndex, columnIndex);
            break;
          }
          case 'Escape':
          case 'Backspace': {
            this._reset();
            break;
          }
        }
      }

      // wrap around
      if (this._keyboardHighlightCell.y < 0) {
        this._keyboardHighlightCell.y = this.rows - 1;
      }
      if (this._keyboardHighlightCell.y >= this.rows) {
        this._keyboardHighlightCell.y = 0;
      }
      if (this._keyboardHighlightCell.x < 0) {
        this._keyboardHighlightCell.x = this.columns - 1;
      }
      if (this._keyboardHighlightCell.x >= this.columns) {
        this._keyboardHighlightCell.x = 0;
      }

      this.requestUpdate();
    }
  }

  _reset() {
    this._value.forEach(row => {
      for (let i = 0; i < row.length; i++) {
        row[i] = this._states[0];
      }
    });

    this.requestUpdate();
    this._emitChange();
  }

  _onCellEvent(e) {
    e.preventDefault(); // important to prevent focus when disabled
    if (this.disabled) { return; }

    this.focus();

    const { rowIndex, columnIndex } = e.target.dataset;
    this._updateCell(rowIndex, columnIndex);
  }

  _updateCell(rowIndex, columnIndex) {
    const currentIndex = this._states.indexOf(this.value[rowIndex][columnIndex]);
    // handle situations where _states as changed in between two interactions
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % this._states.length;

    this.value[rowIndex][columnIndex] = this._states[nextIndex];

    this._emitChange();
    this.requestUpdate();
  }

  _emitChange() {
    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);
  }
}

if (customElements.get('sc-matrix') === undefined) {
  customElements.define('sc-matrix', ScMatrix);
}

export default ScMatrix;
