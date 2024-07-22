import { html } from 'lit';
import JSON5 from 'json5';
import applyStyle from './utils/applyStyle.js';


export const template = html`

<h2>sc-fullscreen</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-fullscreen.js';

const template = html\`
  <sc-fullscreen></sc-fullscreen>
\`;
`}</sc-code-example>

<sc-fullscreen
  id="test-fullscreen"
></sc-fullscreen>

<h3>Attributes</h3>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-fullscreen').disabled = e.detail.value}
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
#test-fullscreen {
  width: 30px;
  height: 30px;
  border: 1px solid var(--sc-color-primary-3);
  background-color: var(--sc-color-primary-2);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
