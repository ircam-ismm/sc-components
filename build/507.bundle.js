"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[507],{2507:(e,t,c)=>{c.r(t),c.d(t,{template:()=>l});var o=c(182),s=c(4670);const l=o.dy`

<h2>sc-loop</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-loop.js';\n\nconst template = html`\n  <sc-loop></sc-loop>\n`;\n"}</sc-code-example>

<sc-loop
  id="test-loop"
  @change=${e=>document.querySelector("#loop-change").active=e.detail.value}
></sc-loop>

<h3>Events</h3>
<p>
  <sc-text>@change</sc-text>
  <sc-toggle id="loop-change"></sc-toggle>
</p>

<h3>Attributes</h3>
<div>
  <sc-text>[active=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-loop").active=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-loop").disabled=e.detail.value}
  ></sc-toggle>
</div>


<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-loop {
  width: 30px;
  height: 30px;
}
  "
  @change=${e=>(0,s.default)(e.detail.value)}
></sc-editor>
`}}]);