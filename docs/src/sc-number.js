import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-number</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-number.js';

const template = html\`
  <sc-number></sc-number>
\`;
`}</sc-code-example>

<sc-number
  id="test-number"
  @input=${e => document.querySelector('#number-input').value = e.detail.value}
  @change=${e => document.querySelector('#number-change').value = e.detail.value}
></sc-number>

<h3>Events</h3>
<div>
  <sc-text readonly>@input</sc-text>
  <sc-number readonly id="number-input"></sc-number>
</div>
<div>
  <sc-text readonly>@change</sc-text>
  <sc-number readonly id="number-change"></sc-number>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>[min=-Infinity]</sc-text>
  <sc-number max="0" value="-9999" integer
    @input=${e => document.querySelector('#test-number').min = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[max=+Infinity]</sc-text>
  <sc-number min="1" value="9999" integer
    @input=${e => document.querySelector('#test-number').max = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[value=0]</sc-text>
  <sc-number
    @input=${e => document.querySelector('#test-number').value = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[?integer=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-number').integer = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>[?readonly=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-number').readonly = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-number').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-number {
  width: 100px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
