import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-switch</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-switch.js';

const template = html\`<sc-switch></sc-switch>\`;
`}</sc-code-example>

<sc-switch
  id="test-switch"
  @change=${e => document.querySelector('#switch-change').active = e.detail.value}
></sc-switch>

<h3>Events</h3>

<div>
  <sc-text readonly>@change</sc-text>
  <sc-switch id="switch-change"></sc-switch>
</div>

<h3>Attributes</h3>

<div>
  <sc-text readonly>[active=false]</sc-text>
  <sc-switch
    @change=${e => document.querySelector('#test-switch').active = e.detail.value}
  ></sc-switch>
</div>

<h3>Styling</h3>
<sc-editor
  save-button
  value="\
#test-switch {
  width: 60px;
  height: 30px;
  border-radius: 2px;

  --sc-switch-transition-time: 75ms;
  --sc-switch-toggle-color: white;
  --sc-switch-active-color: var(--sc-color-secondary-1);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
