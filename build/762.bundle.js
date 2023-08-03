"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[762],{9762:(e,t,c)=>{c.r(t),c.d(t,{template:()=>o});var s=c(182),r=c(4670);const o=s.dy`

<h2>sc-record</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-record.js';\n\nconst template = html`\n  <sc-record></sc-record>\n`;\n"}</sc-code-example>

<sc-record
  id="test-record"
  @change=${e=>document.querySelector("#record-change").active=e.detail.value}
></sc-record>

<h3>Events</h3>
<p>
  <sc-text>@change</sc-text>
  <sc-toggle id="record-change"></sc-toggle>
</p>

<h3>Attributes</h3>
<div>
  <sc-text>[active=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-record").active=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-record").disabled=e.detail.value}
  ></sc-toggle>
</div>


<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-record {
  width: 30px;
  height: 30px;
}
  "
  @change=${e=>(0,r.default)(e.detail.value)}
></sc-editor>
`}}]);