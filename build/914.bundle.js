"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[914],{4914:(e,t,c)=>{c.r(t),c.d(t,{template:()=>a});var s=c(2182),o=c(1630);const a=s.qy`

<h2>sc-qrcode</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-qrcode.js';\n\nconst template = html`\n  <sc-qrcode></sc-qrcode>\n`;\n"}</sc-code-example>

<sc-qrcode id="test-qrcode"></sc-qrcode>

<h3>Attributes</h3>
<div>
  <sc-text>value [='https://ircam-ismm.github.io/sc-components/']</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-qrcode").value=e.detail.value}
  >http://soundworks.dev/</sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-qrcode {
  width: 200px;
  height: 200px;
  background-color: var(--sc-color-primary-1);
}
  "
  @change=${e=>(0,o.default)(e.detail.value)}
></sc-editor>
`}}]);