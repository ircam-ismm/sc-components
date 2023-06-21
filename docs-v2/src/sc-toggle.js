import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`
<h2>sc-bang</h2>

<pre><code class="language-javascript">\
${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-toggle.js';

const template = html\`<sc-toggle></sc-toggle>\`;`}
</code></pre>

<sc-toggle
  id="test-toggle"
  @change="${e => {
    const $feedback = document.querySelector('#toggle-change');
    $feedback.active = e.detail.value;
  }}"
></sc-toggle>

<h3>Events</h3>
<p>
  <sc-text readonly value="@change"></sc-text>
  <sc-toggle id="toggle-change"></sc-toggle>
</p>
<pre><code class="language-html">\
${`\
<sc-toggle
  @change=\${e => console.log(e.detail.value)}
></sc-toggle>`}
<code></pre>

<h3>Attributes</h3>
<p>
  <sc-text readonly value="[?active=false]"></sc-text>
  <sc-toggle
    @change="${e => {
      const $component = document.querySelector('#test-toggle');
      $component.active = e.detail.value;
    }}"
  ></sc-toggle>
</p>
<p>
  <sc-text readonly value="[?disabled=false]"></sc-text>
  <sc-toggle
    @change="${e => {
      const $component = document.querySelector('#test-toggle');
      $component.disabled = e.detail.value;
    }}"
  ></sc-toggle>
</p>

<h3>Styling</h3>
<sc-editor
  value="\
#test-toggle {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;

