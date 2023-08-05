import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-switch</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-switch.js';

const template = html\`
  <sc-switch></sc-switch>
\`;
`}</sc-code-example>

<sc-switch
  id="test-switch"
  @change=${e => document.querySelector('#switch-change').active = e.detail.value}
></sc-switch>

<h3>Events</h3>

<div>
  <sc-text>@change</sc-text>
  <sc-switch id="switch-change"></sc-switch>
</div>

<h3>Attributes</h3>

<div>
  <sc-text>[active=false]</sc-text>
  <sc-switch
    @change=${e => document.querySelector('#test-switch').active = e.detail.value}
  ></sc-switch>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-switch').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
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
