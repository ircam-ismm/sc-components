import { html } from 'lit/html.js';
import applyStyle from './utils/applyStyle.js';

let timeoutIdInput;
let timeoutIdPress;
let timeoutIdRelease;

export const template = html`

<h2>sc-button</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-button.js';

const template = html\`<sc-button>My text</sc-button>\`;
`}</sc-code-example>

<sc-button
  id="test-button"
  value="my-value"
  @input=${e => {
    document.querySelector('#button-input').active = true;

    const $value = document.querySelector('#button-value-input')
    $value.value = e.detail.value;

    clearTimeout(timeoutIdInput);
    timeoutIdInput = setTimeout(() => $value.value = '', 500);
  }}
  @press=${e => {
    document.querySelector('#button-press').active = true;

    const $value = document.querySelector('#button-value-press');
    $value.value = e.detail.value;

    clearTimeout(timeoutIdPress);
    timeoutIdPress = setTimeout(() => $value.value = '', 500);
  }}
  @release=${e => {
    document.querySelector('#button-release').active = true;

    const $value = document.querySelector('#button-value-release');
    $value.value = e.detail.value;

    clearTimeout(timeoutIdRelease);
    timeoutIdRelease = setTimeout(() => $value.value = '', 500);
  }}
>My text</sc-button>

<h3>Events</h3>
<div>
  <sc-text readonly>@input</sc-text>
  <sc-bang id="button-input"></sc-bang>
  <sc-text readonly id="button-value-input"></sc-text>
</div>
<div>
  <sc-text readonly>@press</sc-text>
  <sc-bang id="button-press"></sc-bang>
  <sc-text readonly id="button-value-press"></sc-text>
</div>
<div>
  <sc-text readonly>@release</sc-text>
  <sc-bang id="button-release"></sc-bang>
  <sc-text readonly id="button-value-release"></sc-text>
</div>
<sc-code-example language="html">${`
<sc-button
  @input=\${e => console.log(e.detail.value)}
>My text</sc-button>
`}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[value=null]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-button').value = e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text readonly>[selected=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-button').selected = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text readonly>[disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-button').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  resizable
  value="\
#test-button {
  width: 200px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;


