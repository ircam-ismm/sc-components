import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';


export const template = html`

<h2>sc-tap-tempo</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-tap-tempo.js';

const template = html\`
  <sc-tap-tempo>tap</sc-tap-tempo>
\`;
`}</sc-code-example>

<sc-tap-tempo
  id="test-tap-tempo"
  @change=${e => document.querySelector('#tap-tempo-change').value = e.detail.value}
></sc-tap-tempo>

<h3>Events</h3>

<div>
  <sc-text>@change</sc-text>
  <sc-number readonly id="tap-tempo-change"></sc-number>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-tap-tempo').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-tap-tempo {
  width: 50px;
  height: 30px;
  background-color: var(--sc-color-primary-3);

  --sc-tap-tempo-background-color: var(--sc-color-secondary-5);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
