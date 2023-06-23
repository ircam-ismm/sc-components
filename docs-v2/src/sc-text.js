import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-text</h2>

<pre><code class="language-javascript">\
${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-text.js';

const template = html\`<sc-text>My Text</sc-text>\`;`}
</code></pre>

<sc-text
  id="test-text"
  @change=${e => document.querySelector('#text-change').value = e.detail.value}
>Hello!</sc-text>

<h3>Events</h3>
<div>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly id="text-change"></sc-text>
  <p><i>@change event is triggered on blur and on "cmd + s" </i></p>
</div>
<pre><code class="language-html">\
${`\
<sc-text
  @change=\${e => console.log(e.detail.value)}
></sc-text>`}
<code></pre>

<h3>Attributes</h3>
<p>
  <sc-text readonly>[value='']</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-text').value = e.detail.value}
  ></sc-text>
</p>
<p>
  <sc-text readonly>[readonly=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-text').readonly = e.detail.value}
  ></sc-toggle>
</p>
<p>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-text').disabled = e.detail.value}
  ></sc-toggle>
</p>

<h3>Styling</h3>
<sc-editor
  value="\
#test-text {
  width: 200px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
