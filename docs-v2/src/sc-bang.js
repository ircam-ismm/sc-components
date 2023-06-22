import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`
<h2>sc-bang</h2>

<pre><code class="language-javascript">\
${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-bang.js';

const template = html\`<sc-bang></sc-bang>\`;`}
</code></pre>

<sc-bang
  id="test-bang"
  @input=${e => document.querySelector('#bang-input').active = true}
></sc-bang>

<h3>Events</h3>
<p>
  <sc-text readonly>@input</sc-text>
  <sc-bang id="bang-input"></sc-bang>
</p>
<pre><code class="language-html">\
${`\
<sc-bang
  @input=\${e => console.log(e.detail.value)}
></sc-bang>`}
<code></pre>

<h3>Attributes</h3>
<p>
  <sc-text readonly>[active=false]</sc-text>
  <sc-bang
    @input=${e => document.querySelector('#test-bang').active = true}
  ></sc-bang>
</p>
<pre><code class="language-javascript">\
${`\
// use the "live" directive to make the element responsive to events
import { html } from 'lit';
import { live } from 'lit/directives/live.js';

html\`
  <sc-bang
    ?active=\${live(myFlag)}
  ></sc-bang>
\`;`}
</code></pre>
<p>
  <sc-text readonly>[disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-bang').disabled = e.detail.value}
  ></sc-toggle>
</p>

<h3>Styling</h3>
<sc-editor
  value="\
#test-bang {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
