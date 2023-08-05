import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

const testData = ['a', true, 43, 'g'];
// Object does not work for now...
// const testData = { 'aaa': true, 'bbb': 32,  'ccc': 'coucou'  };

export const template = html`

<h2>sc-select</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-select.js';

const template = html\`
  <sc-select
    options="\${JSON.stringify(['a', true, 43, 'g'])}"
  ></sc-select>
\`;
`}</sc-code-example>

<sc-select
  id="test-select"
  placeholder="Select an option"
  options="${JSON.stringify(testData)}"
  @change=${e => document.querySelector('#options-value').value = e.detail.value}
></sc-select>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="options-value"></sc-text>
</div>
<sc-code-example language="html">${`
<sc-select
  options="\${JSON.stringify(['a', 'b', 'c', 'd'])}"
  @change=\${e => console.log(e.detail.name, e.detail.value)}
></sc-select>`}
</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>[value=null]</sc-text>
  <sc-select
    id="radio-change"
    options="${JSON.stringify(testData)}"
    @change=${e => document.querySelector('#test-select').value = e.detail.value}
  ></sc-select>
</div>
<div>
  <p>if an object is given, the key will be used as the option text and the value as the value</p>
  <sc-text>options=[]</sc-text>
  <sc-editor
    save-button
    value="${JSON.stringify({ a: true, b: 42 }, null, 2)}"
    @change=${e => {
      document.querySelector('#test-select').options = JSON.parse(e.detail.value);
      document.querySelector('#radio-change').options = JSON.parse(e.detail.value);
    }}
  ></sc-editor>
</div>
<div>
  <sc-text>[placeholder='']</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-select').placeholder = e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-select').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-select {
  width: 200px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;


