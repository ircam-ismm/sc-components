import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

const icons = [
  'question',
  'info',
  'github',
  'burger',
  'gear',
  'save',
  'delete',
  'close',
  'midi',
  'network',
  'internet',
  'prompt',
  'upload',
];

let timeoutIdInput = null;
let timeoutIdPress = null;
let timeoutIdRelease = null;

export const template = html`

<h2>sc-icon</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-icon.js';

const template = html\`
  <sc-icon
    type="question"
    value="my-icon"
  ></sc-icon>
\`;
`}</sc-code-example>

<sc-icon
  id="test-icon"
  value="my-icon"
  type="question"
  @input=${e => {
    document.querySelector('#icon-input').active = true;

    const $value = document.querySelector('#icon-value-input')
    $value.value = e.detail.value;

    clearTimeout(timeoutIdInput);
    timeoutIdInput = setTimeout(() => $value.value = '', 500);
  }}
  @press=${e => {
    document.querySelector('#icon-press').active = true;

    const $value = document.querySelector('#icon-value-press');
    $value.value = e.detail.value;

    clearTimeout(timeoutIdPress);
    timeoutIdPress = setTimeout(() => $value.value = '', 500);
  }}
  @release=${e => {
    document.querySelector('#icon-release').active = true;

    const $value = document.querySelector('#icon-value-release');
    $value.value = e.detail.value;

    clearTimeout(timeoutIdRelease);
    timeoutIdRelease = setTimeout(() => $value.value = '', 500);
  }}
></sc-icon>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-bang id="icon-input"></sc-bang>
  <sc-text id="icon-value-input"></sc-text>
</div>
<div>
  <sc-text>@press</sc-text>
  <sc-bang id="icon-press"></sc-bang>
  <sc-text id="icon-value-press"></sc-text>
</div>
<div>
  <sc-text>@release</sc-text>
  <sc-bang id="icon-release"></sc-bang>
  <sc-text id="icon-value-release"></sc-text>
</div>
<sc-code-example language="html">${`
<sc-icon
  type="burger"
  value="menu"
  @input=\${e => console.log(e.detail.value)}
></sc-icon>
`}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>type [="question"]</sc-text>
  <sc-radio
    options="${JSON.stringify(icons)}"
    value="question"
    @change=${e => document.querySelector('#test-icon').type = e.detail.value}
  ></sc-radio>
</div>
<div>
  <p>Value propagated within the event</p>
  <sc-text>value [=null]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-icon').value = e.detail.value}
  ></sc-text>
</div>
<div>
  <p>If set, the button will act as a link with <code>target="_blank"</code></p>
  <sc-text>href [=null]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-icon').href = e.detail.value}
  >https://soundworks.dev</sc-text>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-icon').disabled = e.detail.value}
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
#test-icon {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;


