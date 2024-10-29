import { html, css, svg, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import hljs from 'highlight.js/lib/core';
import javascriptLang from 'highlight.js/lib/languages/javascript';
import typescriptLang from 'highlight.js/lib/languages/typescript';
import htmlLang from 'highlight.js/lib/languages/xml';
import cssLang from 'highlight.js/lib/languages/css';
import jsonLang from 'highlight.js/lib/languages/json';
import markdownLang from 'highlight.js/lib/languages/markdown';
import yamlLang from 'highlight.js/lib/languages/yaml';
import rustLang from 'highlight.js/lib/languages/rust';
import shellLang from 'highlight.js/lib/languages/shell';
import bashLang from 'highlight.js/lib/languages/bash';
import textLang from 'highlight.js/lib/languages/plaintext';

hljs.registerLanguage('javascript', javascriptLang);
hljs.registerLanguage('js', javascriptLang);
hljs.registerLanguage('typescript', typescriptLang);
hljs.registerLanguage('ts', typescriptLang);
hljs.registerLanguage('rust', rustLang);
hljs.registerLanguage('rs', rustLang);
hljs.registerLanguage('html', htmlLang);
hljs.registerLanguage('css', cssLang);
hljs.registerLanguage('json', jsonLang);
hljs.registerLanguage('markdown', markdownLang);
hljs.registerLanguage('md', markdownLang);
hljs.registerLanguage('plaintext', textLang);
hljs.registerLanguage('text', textLang);
hljs.registerLanguage('txt', textLang);
hljs.registerLanguage('yaml', yamlLang);
hljs.registerLanguage('yml', yamlLang);
hljs.registerLanguage('shell', shellLang);
hljs.registerLanguage('sh', shellLang);
hljs.registerLanguage('bash', bashLang);

import ScElement from './ScElement.js';

class ScCodeExample extends ScElement {
  static properties = {
    language: {
      type: String,
      reflect: true,
    },
    value: {
      type: String,
    },
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      font-size: 0;
      font-size: var(--sc-font-size);
      font-family: var(--sc-font-family);
      border-radius: 2px;
      background-color: #23241f;

      --sc-code-example-padding: 1em;
    }

    pre {
      margin: 0;
    }

    pre {
      margin: 0;
    }

    pre, code {
      border-radius: inherit;
    }

    /* highlight.js monokai theme */
    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#23241f;color:#f8f8f2}.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params,.hljs-title.class_{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}

    pre code.hljs {
      padding: var(--sc-code-example-padding);
      line-height: calc(var(--sc-font-size) + 4px);
    }
  `;

  constructor() {
    super();

    this.language = 'javascript';
    this.value = '';
  }

  render() {
    const value = this.textContent.trim() || this.value;
    let content = ``;

    try {
      content = hljs.highlight(value, { language: this.language }).value;
    } catch (err) {
      content = err.message;
    }

    return html`
      <pre><code class="hljs ${this.language ? `language-${this.language}` : ''}">${unsafeHTML(content)}</pre></code>
    `;
  }
}

if (customElements.get('sc-code-example') === undefined) {
  customElements.define('sc-code-example', ScCodeExample);
}

export default ScCodeExample;
