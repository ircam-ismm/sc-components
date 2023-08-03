import { html, css, nothing } from 'lit';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/keymap/sublime.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/comment/comment.js';
// performatted css (cf. .bin/prepare-code-mirror)
import cmStyles from '../vendors/codemirror-css.js';
import monokaiTheme from '../vendors/theme-monokai-css.js';
import addonDialog from '../vendors/addon-dialog-css.js';

import ScElement from './ScElement.js';
import './sc-icon.js';

CodeMirror.commands.save = function(cm) {
  cm._scComponent._save();
};


class ScEditor extends ScElement {
  static properties = {
    value: {
      type: String,
    },
    saveButton: {
      type: Boolean,
      reflect: true,
      attribute: 'save-button',
    },
    dirty: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: boder-box;
      width: 300px;
      height: 200px;
      border-left: 2px solid var(--sc-color-primary-3);
      position: relative;
      font-size: var(--sc-font-size);
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border-left: 2px solid var(--sc-color-primary-4);
    }

    :host([dirty]) {
      border-left: 2px solid var(--sc-color-secondary-3);
    }

    .container {
      width: 100%;
      height: 100%;
    }

    /* highlight focused editor */
    .CodeMirror { opacity: 0.9; }
    .CodeMirror.CodeMirror-focused { opacity: 1; }
    /* code mirror styles */
    ${cmStyles}
    ${monokaiTheme}
    ${addonDialog}

    sc-icon {
      position: absolute;
      bottom: 2px;
      right: 2px;
    }
  `;

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value !== null ? value : '';

    if (this._codeMirror) {
      const pos = this._codeMirror.getCursor();
      this._codeMirror.setValue(this._value);
      this._codeMirror.setCursor(pos);
      this._cleanDoc();
      setTimeout(() => this._codeMirror.refresh(), 1);
    }
  }

  constructor() {
    super();

    this.value = ``;
    this.saveButton = false;
    this.dirty = false;
  }

  /**
   * @note: Initialization order
   * - connectedCallback()
   * - render()
   * - firstUpdated();
   * -> ResizeObserver callback is called after `firstUpdated()`
   */

  render() {
    return html`
      <div @keydown="${this._onKeydown}" class="container"></div>
      ${this.dirty && this.saveButton
        ? html`<sc-icon type="save" @input=${this._save}></sc-icon>`
        : nothing
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this._resizeObserver = new ResizeObserver(entries => {
      const $container = this.shadowRoot.querySelector('.container');
      const { width, height } = $container.getBoundingClientRect();

      this._codeMirror.setSize(width, height);
    });

    // we observe th ewhole element as the shadowRoot does not exists yet
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated() {
    const $container = this.shadowRoot.querySelector('.container');

    this._codeMirror = CodeMirror($container, {
      value: this.value,
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      tabSize: 2,
      keyMap: 'sublime',
    });

    // monkey patch component in _codeMirror to propagate _save from keyboard
    this._codeMirror._scComponent = this;

    // replace tabs with 2 spaces
    this._codeMirror.setOption('extraKeys', {
      Tab: function(cm) {
        let spaces = '';
        for (let i = 0; i < cm.getOption('indentUnit'); i++) {
          spaces += ' ';
        }

        cm.replaceSelection(spaces);
      }
    });

    // track if document is clean
    this._codeMirror.on('change', () => {
      if (!this._codeMirror.getDoc().isClean()) {
        this.dirty = true;
      }
    });
  }

  _onKeydown(e) {
    e.stopPropagation();

    // manually do comment because opens Help menu otherwise...
    if (e.metaKey && e.shiftKey) {
      e.preventDefault();

      if (e.key === '/') {
        this._codeMirror.toggleComment();
      }
      // can't do anything for zoom, too deep in the system
    }
  }

  // need to copy same logic as for cmd + s / ctrl + s
  _save(e) {
    this._value = this._codeMirror.getValue();

    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this._value },
    });

    this._cleanDoc();
    this.dispatchEvent(event);
  }


  _cleanDoc() {
    this._codeMirror.getDoc().markClean();
    this.dirty = false;
  }
}

if (customElements.get('sc-editor') === undefined) {
  customElements.define('sc-editor', ScEditor);
}

export default ScEditor;
