import { html, svg, css } from 'lit';
import { theme } from './styles.js';
import ScElement from './ScElement.js';

/**
 * Dsiplay matrix, the data should follow a row-first convention with the 0 index
 * deing displayed at the bottom of the matrix
 * ```
 * [
 *    [0, 0, 0, 1],`
 *    [0, 1, 0, 0],`
 *    // ...
 * ]
 */
class ScMatrix extends ScElement {
  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      columns: { type: Number },
      rows: { type: Number },
      // @note - `cellValues` is bad name..., `entries` better ?
      // @todo - updates values when updated
      entries: { type: Array },
      value: { type: Array },
      reset: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        user-select: none;
        font-size: 0 !important;
      }

      svg {
        box-sizing: border-box;
        background-color: ${theme['--color-primary-1']};
        border: 1px solid ${theme['--color-primary-2']};
      }
    `;
  }

  set rows(value) {
    this._rows = value;
    this._resizeMatrix();
  }

  get rows() {
    return this._rows;
  }

  set columns(value) {
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
    // we actually don't care of the value
    this._value.forEach(row => {
      for (let i = 0; i < row.length; i++) {
        row[i] = this._entries[0];
      }
    });

    this._emitChange();
    this.requestUpdate();
  }

  get reset() {
    return undefined;
  }

  set entries(entries) {
    this._entries = entries;

    // check existing values against new entries
    for (let y = 0; y < this._value.length; y++) {
      const row = this._value[y];

      for (let x = 0; x < row.length; x++) {
        const currentValue = row[x];
        // find closest entry
        if (this._entries.indexOf(currentValue) === -1) {
          // @note on`reduce` - by default accumulator (here `a`) is the first
          // element of the array
          const closest = this.entries.reduce((a, b) => {
            return Math.abs(b - currentValue) < Math.abs(a - currentValue) ? b : a;
          });

          this._value[y][x] = closest;
        }
      }
    }

    this._emitChange();
    this.requestUpdate();
  }

  get entries() {
    return this._entries;
  }

  constructor() {
    super();

    this.width = 300;
    this.height = 150;
    this._value = [];

    this._entries = [0, 1];

    this.columns = 8;
    this.rows = 4;
  }

  render() {
    const cellWidth = this.width / this.columns;
    const cellHeight = this.height / this.rows;

    const minValue = this._entries[0];
    const maxValue = this._entries[this._entries.length - 1];

    return html`
      <svg
        style="width: ${this.width}px; height: ${this.height}px;"
        @contextmenu="${this._preventContextMenu}"
      >
        ${this.value.map((row, rowIndex) => {
          const y = cellHeight * rowIndex;

          return row.map((value, columnIndex) => {
            const x = cellWidth * columnIndex;
            const opacity = (value - minValue) / (maxValue - minValue);

            return svg`
              <rect
                stroke="#787878"
                fill="#ffffff"
                fill-opacity="${opacity}"
                width="${cellWidth}"
                height="${cellHeight}"
                x="${x}"
                y="${y}"
                data-row-index="${rowIndex}"
                data-column-index="${columnIndex}"
                @mousedown="${this._updateCell}"
              ></rect>
            `;
          });
        })}
      </svg>
    `;
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
            row[x] = this._entries[0];
          }
        });
      } else {
        // new row
        const row = new Array(this.columns).fill(this._entries[0]);
        value[y] = row;
      }
    }

    this.requestUpdate();
  }

  _updateCell(e) {
    const { rowIndex, columnIndex } = e.target.dataset;
    const currentIndex = this._entries.indexOf(this.value[rowIndex][columnIndex]);
    // handle situations where _entries as changed in between two interactions
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % this._entries.length;

    this.value[rowIndex][columnIndex] = this._entries[nextIndex];

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
