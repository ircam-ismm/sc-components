import { LitElement, html, css } from 'lit';
import { theme, fontSize } from './styles.js';
import './sc-button.js';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/keymap/sublime.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/comment/comment.js';

// css
import cmStyles from './vendors/codemirror-css.js';
import monokaiTheme from './vendors/theme-monokai-css.js';
import addonDialog from './vendors/addon-dialog-css.js';


// globalThis.JSHINT = JSHINT;

CodeMirror.commands.save = function(cm) {
  cm._scComponent.value = cm.getValue();

  const event = new CustomEvent('change', {
    bubbles: true,
    composed: true,
    detail: { value: cm._scComponent.value },
  });

  cm._scComponent.cleanDoc();
  cm._scComponent.dispatchEvent(event);
};

class ScEditor extends LitElement {
  static get properties() {
    return {
      height: {
        type: Number,
      },
      width: {
        type: Number,
      },
      fontSize: {
        type: Number,
        attribute: 'font-size',
      },
      value: {
        type: String,
      },
    };
  }

  static get styles() {
    // this is very ugly
    // @todo - find a better solution to impor code mirror's css...
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
      }

      :host > div {
        box-sizing: border-box;
        border: 1px solid ${theme['--color-primary-2']};
        border-left: 2px solid ${theme['--color-primary-2']};
        position: relative;
        font-size: ${fontSize};
      }

      :host > div.dirty {
        border-left: 2px solid ${theme['--color-secondary-3']};
      }

      /* highlight focused editor */
      .CodeMirror { opacity: 0.9; }
      .CodeMirror.CodeMirror-focused { opacity: 1; }

      ${cmStyles}
      ${monokaiTheme}
      ${addonDialog}

      sc-button {
        position: absolute;
        right: 2px;
        bottom: 2px;
        z-index: 1;
      }
    `;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value !== null ? value : '';

    if (this.codeMirror) {
      const pos = this.codeMirror.getCursor();
      this.codeMirror.setValue(this._value);
      this.codeMirror.setCursor(pos);
      this.cleanDoc();
      setTimeout(() => this.codeMirror.refresh(), 1);
    }
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
    this._editorWidth = this._width - 3;

    if (this.codeMirror) {
      this.requestUpdate();
    }
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
    this._editorHeight = this._height - 2;

    if (this.codeMirror) {
      this.requestUpdate();
    }
  }

  constructor() {
    super();

    this._value = null;

    this.width = 300;
    this.height = 200;
    this.fontSize = 11;
    this.value = ``;

    /** private */
    this.$container = null;
  }

  render() {
    if (this.codeMirror) {
      // @note - a bit hardcore but more efficient than in setters
      // @todo - debounce
      this.codeMirror.setSize(this._editorWidth, this._editorHeight);
    }

    return html`
      <div
        style="
          width: ${this._width}px;
          height: ${this._height}px;
        "
        @keydown="${this.onKeydown}"
      >
        <div
          class="codemirror"
          style="
            width: ${this._editorWidth}px;
            height: ${this._editorHeight}px;
            font-size: ${this.fontSize}px;
          "
        ></div>
        <sc-button
          text="save"
          width="120"
          @input="${e => e.stopPropagation()}"
          @release="${this.save}"
        ></sc-button>
      </div>
    `;
  }

  onKeydown(e) {
    // manually do comment because opens Help menu otherwise...
    if (e.metaKey && e.shiftKey) {
      e.preventDefault();

      if (e.key === '/') {
        this.codeMirror.toggleComment();
      }
      // can't do anything for zoom, too deep in the system
    }
  }

  // need to copy same logic as for cmd + s / ctrl + s
  save(e) {
    this._value = this.codeMirror.getValue();

    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this._value },
    });

    this.cleanDoc();
    this.dispatchEvent(event);
  }

  firstUpdated() {
    this.$container = this.shadowRoot.querySelector('div');
    this.$codeContainer = this.shadowRoot.querySelector('div .codemirror');

    this.codeMirror = CodeMirror(this.$codeContainer, {
      value: this._value, // init w/ markup value if any
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      tabSize: 2,
      keyMap: 'sublime',
    });

    // monkey patch component in codeMirror to propagate save from keyboard
    this.codeMirror._scComponent = this;

    // set the size of the editor to match container
    this.codeMirror.setSize(this._editorWidth, this._editorHeight);

    // replace tabs with 2 spaces
    this.codeMirror.setOption('extraKeys', {
      Tab: function(cm) {
        let spaces = '';
        for (let i = 0; i < cm.getOption('indentUnit'); i++) {
          spaces += ' ';
        }

        cm.replaceSelection(spaces);
      }
    });

    // track if document is clean
    this.codeMirror.on('change', () => {
      if (!this.codeMirror.getDoc().isClean()) {
        this.$container.classList.add('dirty');
      }
    });
  }

  cleanDoc() {
    this.codeMirror.getDoc().markClean();
    this.$container.classList.remove('dirty');
  }
}

customElements.define('sc-editor', ScEditor);

export default ScEditor;
