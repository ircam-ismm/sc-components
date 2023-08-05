import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-loop</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-loop.js';

const template = html\`
  <sc-loop></sc-loop>
\`;
`}</sc-code-example>

<sc-loop
  id="test-loop"
  @change=${e => document.querySelector('#loop-change').active = e.detail.value}
></sc-loop>

<h3>Events</h3>
<p>
  <sc-text>@change</sc-text>
  <sc-toggle id="loop-change"></sc-toggle>
</p>

<h3>Attributes</h3>
<div>
  <sc-text>[active=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-loop').active = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-loop').disabled = e.detail.value}
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
#test-loop {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;

