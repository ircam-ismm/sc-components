"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[767],{1767:(e,t,c)=>{c.r(t),c.d(t,{template:()=>a});var s=c(4254),l=c(2981);let u,n,o;const a=s.dy`

<h2>sc-button</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-button.js';\n\nconst template = html`<sc-button>My text</sc-button>`;\n"}</sc-code-example>

<sc-button
  id="test-button"
  value="my-value"
  @input=${e=>{document.querySelector("#button-input").active=!0;const t=document.querySelector("#button-value-input");t.value=e.detail.value,clearTimeout(u),u=setTimeout((()=>t.value=""),500)}}
  @press=${e=>{document.querySelector("#button-press").active=!0;const t=document.querySelector("#button-value-press");t.value=e.detail.value,clearTimeout(n),n=setTimeout((()=>t.value=""),500)}}
  @release=${e=>{document.querySelector("#button-release").active=!0;const t=document.querySelector("#button-value-release");t.value=e.detail.value,clearTimeout(o),o=setTimeout((()=>t.value=""),500)}}
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
<sc-code-example language="html">${"\n<sc-button\n  @input=${e => console.log(e.detail.value)}\n>My text</sc-button>\n"}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[value=null]</sc-text>
  <sc-text
    @change=${e=>document.querySelector("#test-button").value=e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text readonly>[selected=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-button").selected=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-button").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  save-button
  value="\
#test-button {
  width: 200px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e=>(0,l.default)(e.detail.value)}
></sc-editor>
`}}]);