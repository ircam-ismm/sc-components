import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-status</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-status.js';

const template = html\`
  <sc-status></sc-status>
\`;
`}</sc-code-example>

<sc-status id="test-state"></sc-status>

<h3>Attributes</h3>
<div>
  <sc-text>[active=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-state').active = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-state {
  width: 30px;
  height: 30px;
  background-color: var(--sc-color-primary-1);

  --sc-status-color-inactive: var(--sc-color-secondary-3);
  --sc-status-color-active: var(--sc-color-secondary-4);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
