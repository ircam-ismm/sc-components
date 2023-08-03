"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[129],{6129:(e,t,c)=>{c.r(t),c.d(t,{template:()=>a});var s=c(182),p=c(4670);const a=s.dy`

<h2>sc-prev</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-prev.js';\n\nconst template = html`\n  <sc-prev></sc-prev>\n`;\n"}</sc-code-example>

<sc-prev
  id="test-prev"
  @input=${e=>document.querySelector("#prev-input").active=e.detail.value}
></sc-prev>

<h3>Events</h3>
<p>
  <sc-text>@input</sc-text>
  <sc-bang id="prev-input"></sc-bang>
</p>

<h3>Attributes</h3>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-prev").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-prev {
  width: 30px;
  height: 30px;
}
  "
  @change=${e=>(0,p.default)(e.detail.value)}
></sc-editor>

<h3>Example</h3>
<div>
  <sc-prev></sc-prev>
  <sc-next></sc-next>
</div>
`}}]);