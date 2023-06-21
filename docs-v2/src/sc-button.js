import { html } from 'lit/html.js';
import applyStyle from './utils/applyStyle.js';

let timeoutIdInput;
let timeoutIdPress;
let timeoutIdRelease;


export const template = html`
<h2>sc-button</h2>

<pre><code class="language-javascript">\
${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-button.js';

const template = html\`<sc-button>My text</sc-button>\`;`}
</code></pre>

<sc-button
  id="test-button"
  value="my-value"
  @input="${e => {
    const $event = document.querySelector('#button-input');
    $event.active = true;

    clearTimeout(timeoutIdInput);
    const $value = document.querySelector('#button-value-input');
    $value.value = e.detail.value;
    timeoutIdInput = setTimeout(() => $value.value = '', 500);
  }}"
  @press="${e => {
    const $event = document.querySelector('#button-press');
    $event.active = true;

    clearTimeout(timeoutIdPress);
    const $value = document.querySelector('#button-value-press');
    $value.value = e.detail.value;
    timeoutIdPress = setTimeout(() => $value.value = '', 500);
  }}"
  @release="${e => {
    const $event = document.querySelector('#button-release');
    $event.active = true;

    clearTimeout(timeoutIdRelease);
    const $value = document.querySelector('#button-value-release');
    $value.value = e.detail.value;
    timeoutIdRelease = setTimeout(() => $value.value = '', 500);
  }}"
>My text</sc-button>

<h3>Events</h3>
<p>
  <sc-text readonly value="@input"></sc-text>
  <sc-bang id="button-input"></sc-bang>
  <sc-text readonly id="button-value-input"></sc-text>
</p>
<p>
  <sc-text readonly value="@press"></sc-text>
  <sc-bang id="button-press"></sc-bang>
  <sc-text readonly id="button-value-press"></sc-text>
</p>
<p>
  <sc-text readonly value="@release"></sc-text>
  <sc-bang id="button-release"></sc-bang>
  <sc-text readonly id="button-value-release"></sc-text>
</p>
<pre><code class="language-html">\
${`\
<sc-button
  @input=\${e => console.log(e.detail.value)}
>My text</sc-button>`}
<code></pre>

<h3>Attributes</h3>
<p>
  <sc-text readonly value="[value=null]"></sc-text>
  <sc-text
    value="my-value"
    @change="${e => {
      const $component = document.querySelector('#test-button');
      $component.value = e.detail.value;
    }}"
  ></sc-text>
</p>
<p>
  <sc-text readonly value="[selected=false]"></sc-text>
  <sc-toggle
    @change="${e => {
      const $component = document.querySelector('#test-button');
      $component.selected = e.detail.value;
    }}"
  ></sc-toggle>
</p>
<p>
  <sc-text readonly value="[disabled=false]"></sc-text>
  <sc-toggle
    @change="${e => {
      const $component = document.querySelector('#test-button');
      $component.disabled = e.detail.value;
    }}"
  ></sc-toggle>
</p>

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


