import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`
<h2>sc-dial</h2>

<pre><code class="language-javascript">\
${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-dial.js';

const template = html\`<sc-dial></sc-dial>\`;`}
</code></pre>

<sc-dial
  id="test-dial"
  @input=${e => document.querySelector('#dial-input').value = e.detail.value}
  @change=${e => document.querySelector('#dial-change').value = e.detail.value}
></sc-dial>

<h3>Events</h3>
<p>
  <sc-text readonly>@input</sc-text>
  <sc-text readonly id="dial-input"></sc-text>
</p>
<p>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly id="dial-change"></sc-text>
</p>

<h3>Attributes</h3>
<p>
  <sc-text readonly>[min=0]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-dial').min = parseFloat(e.detail.value)}
  >0</sc-text>
</p>
<p>
  <sc-text readonly>[max=1]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-dial').max = parseFloat(e.detail.value)}
  >1</sc-text>
</p>
<p>
  <sc-text readonly>[value=0]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-dial').value = parseFloat(e.detail.value)}
  >0</sc-text>
</p>
<p>
  <sc-text readonly>[show-value=true]</sc-text>
  <sc-toggle
    active
    @change=${e => document.querySelector('#test-dial').showValue = e.detail.value}
  >0</sc-toggle>
</p>
<p>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-dial').disabled = e.detail.value}
  ></sc-toggle>
</p>

<h3>Styling</h3>
<sc-editor
  value="\
#test-dial {
  width: 50px;
  height: 50px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;

