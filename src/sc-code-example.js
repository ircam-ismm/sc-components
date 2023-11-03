import { html, css, svg, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import hljs from 'highlight.js';

import ScElement from './ScElement.js';

class ScCodeExample extends ScElement {
  static properties = {
    language: {
      type: String,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      vertical-align: top;
      display: block;
      box-sizing: border-box;
      vertical-align: top;
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
    }
  `;

  constructor() {
    super();

    this.language = 'javascript';
  }

  render() {
    let content = ``;

    try {
      content = hljs.highlight(this.textContent.trim(), { language: this.language }).value;
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
