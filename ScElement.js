/*
all element should extend this class to handle global things such as
userSelect, ids, etc.
*/
import { LitElement, css } from 'lit';
// dynamically insert global stylesheet w/ sc-components variables
import './styles.js';

// extending lit-element examples :
// https://github.com/Polymer/lit-element/issues/450

let id = 0;

const userSelectNoneOnBodyRegister = new Set();

class ScElement extends LitElement {
  constructor() {
    super();

    this._scId = `${this.constructor.name.toLowerCase()}-${id++}`;
  }

  _preventContextMenu(e) {
    e.preventDefault();
  }

  _requestUserSelectNoneOnBody() {
    if (userSelectNoneOnBodyRegister.size === 0) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }

    userSelectNoneOnBodyRegister.add(this._scId);
  }

  _cancelUserSelectNoneOnBody() {
    userSelectNoneOnBodyRegister.delete(this._scId);

    if (userSelectNoneOnBodyRegister.size === 0) {
      document.body.style.userSelect = 'auto';
      document.body.style.webkitUserSelect = 'auto';
    }
  }
}

export default ScElement;
