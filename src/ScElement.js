import { LitElement, css } from 'lit';

// dynamically insert global stylesheet w/ sc-components variables
import './styles.js';

let id = 0;

const userSelectNoneOnBodyRegister = new Set();

export function requestUserSelectNoneOnBody(id) {
  if (userSelectNoneOnBodyRegister.size === 0) {
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.webkitTouchCallout = 'none';
  }

  userSelectNoneOnBodyRegister.add(id);
}

export function cancelUserSelectNoneOnBody(id) {
  userSelectNoneOnBodyRegister.delete(id);

  if (userSelectNoneOnBodyRegister.size === 0) {
    document.body.style.userSelect = 'auto';
    document.body.style.webkitUserSelect = 'auto';
    document.body.style.webkitTouchCallout = 'auto';
  }
}

/**
 * all element should extend this class to handle global things such as
 * userSelect, ids, etc.
 */
class ScElement extends LitElement {
  constructor() {
    super();

    this._scId = `${this.tagName.toLowerCase()}-${id++}`;

    this._preventContextMenu = this._preventContextMenu.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    if (!('SC_DEBUG' in window) || window.SC_DEBUG !== true) {
      this.addEventListener('contextmenu', this._preventContextMenu);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('contextmenu', this._preventContextMenu);
  }

  _preventContextMenu(e) {
    e.preventDefault();
  }

  /* protected method */
  _requestUserSelectNoneOnBody() {
    requestUserSelectNoneOnBody(this._scId);
  }

  /* protected method */
  _cancelUserSelectNoneOnBody() {
    cancelUserSelectNoneOnBody(this._scId);
  }
}

export default ScElement;
