/*
all element should extend this class to handle global things such as
userSelect, ids, etc.
*/
import { LitElement, css } from 'lit';
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
    }

    userSelectNoneOnBodyRegister.add(this._scId);
  }

  _cancelUserSelectNoneOnBody() {
    userSelectNoneOnBodyRegister.delete(this._scId);

    if (userSelectNoneOnBodyRegister.size === 0) {
      document.body.style.userSelect = 'auto';
    }
  }
}

export default ScElement;
