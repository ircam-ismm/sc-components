import { html, css, nothing } from 'lit';

import { EditorView, keymap, lineNumbers, drawSelection, highlightActiveLine } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { history, toggleComment, } from '@codemirror/commands';
import { javascript as javascriptLang } from '@codemirror/lang-javascript';
import { html as htmlLang } from '@codemirror/lang-html';
import { css as cssLang } from '@codemirror/lang-css';
import { json as jsonLang } from '@codemirror/lang-json';
import { markdown as markdownLang} from '@codemirror/lang-markdown';
import { rust as rustLang} from '@codemirror/lang-rust';
import { yaml as yamlLang} from '@codemirror/lang-yaml';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";

import ScElement from './ScElement.js';
import './sc-icon.js';

class ScEditor extends ScElement {
  #languageCompartment = null;
  #editorState = null;
  #editorView = null;
  #initValue = ``;
  #language = 'javascript';

  static properties = {
    value: {
      type: String,
    },
    language: {
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
      background-color: var(--sc-color-primary-2);
      overflow: scroll;
    }

    .cm-editor { height: 100%; }
    .cm-scroller { overflow: auto; }
    .cm-gutter {
      padding-right: 12px;
      font-size: calc(var(--sc-font-size) - 1px);
      color: var(--sc-color-primary-4);
      border-right: 1px dotted var(--sc-color-primary-3);
    }

    sc-icon {
      position: absolute;
      bottom: 2px;
      right: 2px;
    }
  `;

  get value() {
    // return last saved state
    if (this.#editorState) {
      return this.#editorState.doc.toString();
    } else {
      return this.#initValue;
    }
  }

  set value(value) {
    if (this.#editorView) {
      const update = this.#editorView.state.update({
        changes: {
          from: 0,
          to: this.#editorView.state.doc.length,
          insert: value,
        },
      });

      this.#editorView.update([update]);
      this.#markClean();
    } else {
      this.#initValue = value !== null ? value.toString() : '';
    }
  }

  get language() {
    return this.#language;
  }

  set language(value) {
    this.#language = value;

    if (this.#languageCompartment) {
      this.#editorView.dispatch({
        effects: this.#languageCompartment.reconfigure(this.#getLanguage()),
      });
    }
  }

  constructor() {
    super();

    this.saveButton = false;
    this.dirty = false;
  }

  render() {
    return html`
      <div @keydown="${this.#onKeydown}" class="container"></div>
      ${this.dirty && this.saveButton
        ? html`<sc-icon type="save" @input=${this.save}></sc-icon>`
        : nothing
      }
    `;
  }

  firstUpdated() {
    const $container = this.shadowRoot.querySelector('.container');

    this.#languageCompartment = new Compartment();

    const theme = EditorView.theme({
      "&": {
        fontSize: 'var(--sc-editor-font-size)',
        // border: "1px solid #c0c0c0"
      },
      ".cm-content": {
        // fontFamily: "Menlo, Monaco, Lucida Console, monospace",
        // minHeight: "200px"
      },
      ".cm-gutters": {
        minHeight: "200px"
      },
      ".cm-scroller": {
        overflow: "auto",
        maxHeight: "600px"
      }
    });

    const extensions = [
      this.#languageCompartment.of(this.#getLanguage()),
      lineNumbers(),
      history(),
      drawSelection(),
      highlightActiveLine(),
      monokai,
      keymap.of([...vscodeKeymap]),
      EditorState.allowMultipleSelections.of(true),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          this.dirty = true;
        }
      }),
    ];

    this.#editorState = EditorState.create({
      doc: this.#initValue,
      extensions,
    });

    this.#editorView = new EditorView({
      parent: $container,
      state: this.#editorState,
    });
  }

  save(e) {
    this.#markClean();

    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);
  }

  #getLanguage() {
    switch (this.language) {
      case 'javascript':
      case 'typescript':
      case 'js':
      case 'ts':
        return javascriptLang();
        break;
      case 'html':
        return htmlLang();
        break;
      case 'css':
        return cssLang();
        break;
      case 'json':
        return jsonLang();
        break;
      case 'markdown':
      case 'md':
      case 'text':
      case 'txt':
        return markdownLang();
        break;
      case 'rust':
      case 'rs':
        return rustLang();
        break;
      case 'yaml':
      case 'yml':
        return yamlLang();
        break;
      default:
        return javascriptLang();
        break;
    }
  }

  #onKeydown(e) {
    e.stopPropagation();

    // manually do `toggleComment` because opens native Help menu, and doesn't
    // when registered in keymap, maybe due to azerty keyboard weirdness
    if (e.metaKey && e.shiftKey) {
      e.preventDefault();

      if (e.key === '/') {
        toggleComment(this.#editorView);
      }
      // can't do anything for zoom, too deep in the system
    }

    if (e.metaKey && e.key === 's') {
      e.preventDefault();
      this.save();
    }

    // @fixme - issue with line number that don't have their line height updated
    // cf. https://discuss.codemirror.net/t/editor-font-size-change-dynamically/5704/12
    // if (e.metaKey && e.key === '-') {
    //   e.preventDefault();
    //   const styles = window.getComputedStyle(this);
    //   let fontSize = parseInt(styles.getPropertyValue('--sc-editor-font-size'));
    //   this.style.setProperty('--sc-editor-font-size', `${fontSize - 1}px`);
    //   // this.requestUpdate();
    //   setTimeout(() => {
    //     console.log('ok');
    //     this.#editorView.requestMeasure()
    //   }, 1000);
    // }

    // // Cmd + Shift + '+' is swallowed by browser, use = instead
    // if (e.metaKey && e.key === '=') {
    //   e.preventDefault();
    //   const styles = window.getComputedStyle(this);
    //   let fontSize = parseInt(styles.getPropertyValue('--sc-editor-font-size'));
    //   this.style.setProperty('--sc-editor-font-size', `${fontSize + 1}px`);
    //   // this.requestUpdate();
    //   setTimeout(() => {
    //     console.log('ok');
    //     this.#editorView.requestMeasure()
    //   }, 1000);
    // }
  }

  #markClean() {
    this.#editorState = this.#editorView.state;
    this.dirty = false;
  }
}

if (customElements.get('sc-editor') === undefined) {
  customElements.define('sc-editor', ScEditor);
}

export default ScEditor;
