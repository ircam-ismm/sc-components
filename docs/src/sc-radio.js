import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

const testArray = ['a', 'b', 'c', 'd'];
// Object does not work for now...
// const testObject = { a: 'aaa', b: 'bbb', c: 'ccc', d: 'ddd' };

export const template = html`

<h2>sc-radio</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-radio.js';

const template = html\`
  <sc-radio
    options="\${JSON.stringify(['a', 'b', 'c', 'd'])}"
  ></sc-radio>
\`;
`}</sc-code-example>

<sc-radio
  id="test-radio"
  options="${JSON.stringify(testArray)}"
  @change=${e => document.querySelector('#options-value').value = e.detail.value}
></sc-radio>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="options-value"></sc-text>
</div>
<sc-code-example language="html">${`
<sc-radio
  @change=\${e => console.log(e.detail.name, e.detail.value)}
></sc-radio>`}
</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>[value=null]</sc-text>
  <sc-radio
    id="radio-change"
    options="${JSON.stringify(testArray)}"
    @change=${e => document.querySelector('#test-radio').value = e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>options=[]</sc-text>
  <sc-editor
    save-button
    value="${JSON.stringify(testArray)}"
    @change=${e => {
      document.querySelector('#test-radio').options = JSON.parse(e.detail.value);
      document.querySelector('#radio-change').options = JSON.parse(e.detail.value);
    }}
  ></sc-editor>
</div>
<div>
  <sc-text>[orientation="vertical"]</sc-text>
  <sc-radio
    options="${JSON.stringify(['vertical', 'horizontal'])}"
    value="vertical"
    @change=${e => document.querySelector('#test-radio').orientation = e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-radio').disabled = e.detail.value}
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
#test-radio {
  width: 200px;
  height: auto;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
