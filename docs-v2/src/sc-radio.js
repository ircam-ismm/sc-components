import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

const testArray = ['a', 'b', 'c', 'g'];
// Object does not work for now...
// const testObject = { a: 'aaa', b: 'bbb', c: 'ccc', d: 'ddd' };

export const template = html`
<h2>sc-text</h2>

<pre><code class="language-javascript">\
${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-radio.js';

const template = html\`
  <sc-radio
    options="\${JSON.stringify(['a', 'b', 'c', 'd'])}"
  ></sc-radios-options>
\`;`}
</code></pre>

<sc-radio
  id="test-radio"
  options="${JSON.stringify(testArray)}"
  @change=${e => {
    document.querySelector('#options-name').value = e.detail.name;
    document.querySelector('#options-value').value = e.detail.value;
  }}
></sc-radio>

<h3>Events</h3>
<p>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly id="options-name"></sc-text>
  <sc-text readonly id="options-value"></sc-text>
</p>
<pre><code class="language-html">\
${`\
<sc-radio
  @change=\${e => console.log(e.detail.name, e.detail.value)}
></sc-radio>`}
<code></pre>

<h3>Attributes</h3>
<p>
  <sc-text readonly>[value=null]</sc-text>
  <sc-radio
    id="radio-change"
    options="${JSON.stringify(testArray)}"
    @change=${e => document.querySelector('#test-radio').value = e.detail.value}
  ></sc-radio>
</p>
<p>
  <sc-text readonly>options=[]</sc-text>
  <sc-editor
    value="${JSON.stringify(testArray)}"
    @change=${e => {
      document.querySelector('#test-radio').options = JSON.parse(e.detail.value);
      document.querySelector('#radio-change').options = JSON.parse(e.detail.value);
    }}
  ></sc-editor>
</p>
<p>
  <sc-text readonly>[orientation="vertical"]</sc-text>
  <sc-radio
    options="${JSON.stringify(['vertical', 'horizontal'])}"
    value="vertical"
    @change=${e => document.querySelector('#test-radio').orientation = e.detail.value}
  ></sc-radio>
</p>
<p>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-radio').disabled = e.detail.value}
  ></sc-toggle>
</p>

<h3>Styling</h3>
<sc-editor
  value="\
#test-radio {
  width: 200px;
  height: auto;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
