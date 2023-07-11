import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-icon</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-icon.js';

const template = html\`<sc-icon icon="question"></sc-icon>\`;
`}</sc-code-example>

<sc-icon
  id="test-icon"
  value="my-icon"
  icon="question"
  @input=${e => document.querySelector('#icon-input').value = e.detail.value}
></sc-icon>

<h3>Events</h3>
<div>
  <sc-text readonly>@input</sc-text>
  <sc-text readonly id="icon-input"></sc-text>
</div>
<sc-code-example language="html">${`
<sc-icon
  icon="burger"
  value="menu"
  @input=\${e => console.log(e.detail.value)}
></sc-icon>
`}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[icon="question"]</sc-text>
  <sc-radio
    options="${JSON.stringify(['question', 'info', 'github', 'burger', 'gear', 'save'])}"
    value="question"
    @change=${e => document.querySelector('#test-icon').icon = e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text readonly>[value=null]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-icon').value = e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text readonly>[href=null]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-icon').href = e.detail.value}
  >https://soundworks.dev</sc-text>
</div>
<div>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-icon').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  save-button
  value="\
#test-icon {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;


