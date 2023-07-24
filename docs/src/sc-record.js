import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-record</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-record.js';

const template = html\`
  <sc-record></sc-record>
\`;
`}</sc-code-example>

<sc-record
  id="test-record"
  @change=${e => document.querySelector('#record-change').active = e.detail.value}
></sc-record>

<h3>Events</h3>
<p>
  <sc-text>@change</sc-text>
  <sc-toggle id="record-change"></sc-toggle>
</p>

<h3>Attributes</h3>
<div>
  <sc-text>[active=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-record').active = e.detail.value}
  ></sc-toggle>
</div>


<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-record {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
