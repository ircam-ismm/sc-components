import { html, svg, css } from 'lit-element';
import { theme } from './styles.js';
import ScElement from './ScElement.js';

class ScToggle extends ScElement {
  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      columns: { type: Number },
      rows: { type: Number },
      // @note: bad name...
      cellValues: { type: Array },
      value: { type: Array },
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
        border: 1px solid ${theme['--color-primary-2']};
      }
    `;
  }

  set rows(value) {
    this._rows = value;


  }

  get rows() {
    return this._rows;
  }

  set columns(value) {
    this._columns = value;


  }

  get columns() {
    return this._columns;
  }

  constructor() {
    super();

    this.width = 300;
    this.height = 150;
    this.value = [];

    this.columns = 8;
    this.rows = 4;
    this.cellValues = [0, 1];
  }

  render() {
    return svg`
      <svg>
        ${values}
      </svg>
    `;
  }
}
