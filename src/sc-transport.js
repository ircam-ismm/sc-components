import { html } from 'lit';
import JSON5 from 'json5';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-transport</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-transport.js';

const template = html\`<sc-transport></sc-transport>\`;
`}</sc-code-example>

<sc-transport
  id="test-transport"
  @change=${e => document.querySelector('#transport-input').value = e.detail.value}
></sc-transport>

<h3>Events</h3>
<p>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly id="transport-input"></sc-text>
</p>

<h3>Attributes</h3>
<div>
  <p>define which button(s) should be displayed</p>
  <sc-text style="width: 260px;" readonly>[buttons=["play", "pause", "stop"]]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-transport').buttons = JSON5.parse(e.detail.value)}
  >["play", "pause", "stop"]</sc-text>
</div>
<p>note that "value" and "state" are aliases</p>
<div>
  <sc-text readonly>[state=null]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-transport').state = e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text readonly>[value=null]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-transport').value = e.detail.value}
  ></sc-text>
</div>


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

