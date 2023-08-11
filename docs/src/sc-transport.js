import { html } from 'lit';
import JSON5 from 'json5';
import applyStyle from './utils/applyStyle.js';


export const template = html`
<h2>sc-transport</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-transport.js';

const template = html\`
  <sc-transport></sc-transport>
\`;
`}</sc-code-example>

<sc-transport
  id="test-transport"
  @change=${e => document.querySelector('#transport-input').value = e.detail.value}
></sc-transport>

<h3>Events</h3>
<p>
  <sc-text>@change</sc-text>
  <sc-text id="transport-input"></sc-text>
</p>

<h3>Properties</h3>
<div>
  <p>Define which button(s) should be displayed</p>
  <sc-text style="width: 260px;">.buttons=["play", "pause", "stop"]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-transport').buttons = JSON5.parse(e.detail.value)}
  >["play", "pause", "stop"]</sc-text>
</div>

<h3>Attributes</h3>
<div>
  <p>Set component state to one of the <code>buttons</code> value</p>
  <sc-text>value=null</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-transport').value = e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text>?disabled=false</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-transport').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>
<sc-text class="key">Space</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-transport {
  width: auto;
  height: 30px;

  --sc-transport-background-color: var(--sc-color-primary-3);
  --sc-transport-active-background-color: var(--sc-color-primary-1);
  --sc-transport-active-play-fill: var(--sc-color-secondary-4);
  --sc-transport-active-pause-fill: var(--sc-color-secondary-1);
  --sc-transport-active-stop-fill: var(--sc-color-secondary-3);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;


