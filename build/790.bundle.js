"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[790],{6790:(t,s,c)=>{c.r(s),c.d(s,{template:()=>o});var e=c(2182),a=c(1630);const o=e.qy`

<h2>sc-status</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-status.js';\n\nconst template = html`\n  <sc-status></sc-status>\n`;\n"}</sc-code-example>

<sc-status id="test-state"></sc-status>

<h3>Attributes</h3>
<div>
  <sc-text>?active [=false]</sc-text>
  <sc-toggle
    @change=${t=>document.querySelector("#test-state").active=t.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-state {
  width: 30px;
  height: 30px;
  background-color: var(--sc-color-primary-1);

  --sc-status-color-inactive: var(--sc-color-secondary-3);
  --sc-status-color-active: var(--sc-color-secondary-4);
}
  "
  @change=${t=>(0,a.default)(t.detail.value)}
></sc-editor>
`}}]);