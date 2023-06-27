import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-toggle</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-toggle.js';

const template = html\`<sc-toggle></sc-toggle>\`;
`}</sc-code-example>

<sc-toggle
  id="test-toggle"
  @change=${e => document.querySelector('#toggle-change').active = e.detail.value}
></sc-toggle>

<h3>Events</h3>
<div>
  <sc-text readonly>@change</sc-text>
  <sc-toggle id="toggle-change"></sc-toggle>
</div>
<sc-code-example language="html">${`
<sc-toggle
  @change=\${e => console.log(e.detail.value)}
></sc-toggle>
`}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[?active=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-toggle').active = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-toggle').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  value="\
#test-toggle {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
