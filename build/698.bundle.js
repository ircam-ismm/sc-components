"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[698],{8698:(t,e,c)=>{c.r(e),c.d(e,{template:()=>n});var s=c(788),o=c(4670);let u,a,l;const n=s.dy`

<h2>sc-button</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-button.js';\n\nconst template = html`\n  <sc-button value=\"my-value\">My text</sc-button>\n`;\n"}</sc-code-example>

<sc-button
  id="test-button"
  value="my-value"
  @input=${t=>{document.querySelector("#button-input").active=!0;const e=document.querySelector("#button-value-input");e.value=t.detail.value,clearTimeout(u),u=setTimeout((()=>e.value=""),500)}}
  @press=${t=>{document.querySelector("#button-press").active=!0;const e=document.querySelector("#button-value-press");e.value=t.detail.value,clearTimeout(a),a=setTimeout((()=>e.value=""),500)}}
  @release=${t=>{document.querySelector("#button-release").active=!0;const e=document.querySelector("#button-value-release");e.value=t.detail.value,clearTimeout(l),l=setTimeout((()=>e.value=""),500)}}
>My text</sc-button>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-bang id="button-input"></sc-bang>
  <sc-text id="button-value-input"></sc-text>
</div>
<div>
  <sc-text>@press</sc-text>
  <sc-bang id="button-press"></sc-bang>
  <sc-text id="button-value-press"></sc-text>
</div>
<div>
  <sc-text>@release</sc-text>
  <sc-bang id="button-release"></sc-bang>
  <sc-text id="button-value-release"></sc-text>
</div>
<sc-code-example language="html">${"\n<sc-button\n  @input=${e => console.log(e.detail.value)}\n>My text</sc-button>\n"}</sc-code-example>

<h3>Attributes</h3>
<div>
  <p>Value propagated within the events, defaults to null</p>
  <sc-text>value=null</sc-text>
  <sc-text
    editable
    @change=${t=>document.querySelector("#test-button").value=t.detail.value}
  >my-value</sc-text>
</div>
<div>
  <sc-text>?selected=false</sc-text>
  <sc-toggle
    @change=${t=>document.querySelector("#test-button").selected=t.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?disabled=false</sc-text>
  <sc-toggle
    @change=${t=>document.querySelector("#test-button").disabled=t.detail.value}
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
#test-button {
  width: 200px;
  height: 30px;
  font-size: 11px;

  --sc-button-background-color: var(--sc-color-primary-2);
  --sc-button-background-color-hover: var(--sc-color-primary-3);
  --sc-button-background-color-active: var(--sc-color-primary-4);
  --sc-button-background-color-selected: var(--sc-color-secondary-3);
}
  "
  @change=${t=>(0,o.default)(t.detail.value)}
></sc-editor>
`}}]);