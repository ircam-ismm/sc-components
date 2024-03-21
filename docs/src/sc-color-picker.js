import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';


export const template = html`

<h2>sc-color-picker</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-color-picker.js';

const template = html\`
  <sc-color-picker
  ></sc-color-picker>
\`;
`}</sc-code-example>

<sc-color-picker
  id="test-color-picker"
  @change=${e => document.querySelector('#change-color-value').value = e.detail.value}
  @input=${e => document.querySelector('#input-color-value').value = e.detail.value}
></sc-color-picker>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-text id="input-color-value"></sc-text>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="change-color-value"></sc-text>
</div>
<sc-code-example language="html">${`
<sc-color-picker
  @input=\${e => console.log(e.detail.value)}
></sc-color-picker>`}
</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>value [=null]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-color-picker').value = e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-color-picker').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-color-picker {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;


