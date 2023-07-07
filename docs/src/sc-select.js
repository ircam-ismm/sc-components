import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

const testArray = ['a', 'b', 'c', 'g'];
// Object does not work for now...
// const testObject = { a: 'aaa', b: 'bbb', c: 'ccc', d: 'ddd' };

export const template = html`

<h2>sc-select</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-select.js';

const template = html\`
  <sc-select
    options="\${JSON.stringify(['a', 'b', 'c', 'd'])}"
  ></sc-select>
\`;
`}</sc-code-example>

<sc-select
  id="test-select"
  placeholder="Select an option"
  options="${JSON.stringify(testArray)}"
  @change=${e => document.querySelector('#options-value').value = e.detail.value}
></sc-select>

<h3>Events</h3>
<div>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly id="options-value"></sc-text>
</div>
<sc-code-example language="html">${`
<sc-select
  options="\${JSON.stringify(['a', 'b', 'c', 'd'])}"
  @change=\${e => console.log(e.detail.name, e.detail.value)}
></sc-select>`}
</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[value=null]</sc-text>
  <sc-radio
    id="radio-change"
    options="${JSON.stringify(testArray)}"
    @change=${e => document.querySelector('#test-select').value = e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text readonly>options=[]</sc-text>
  <sc-editor
    save-button
    value="${JSON.stringify(testArray)}"
    @change=${e => {
      document.querySelector('#test-select').options = JSON.parse(e.detail.value);
      document.querySelector('#radio-change').options = JSON.parse(e.detail.value);
    }}
  ></sc-editor>
</div>
<div>
  <sc-text readonly>[placeholder='']</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-select').placeholder = e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-select').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
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


