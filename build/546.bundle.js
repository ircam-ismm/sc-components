"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[546],{8546:(e,t,c)=>{c.r(t),c.d(t,{template:()=>l});var a=c(2182),s=c(1630);const l=a.qy`

<h2>sc-code-example</h2>

<sc-code-example
  language="javascript"
  id="test-code-example"
>${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-code-example.js';\n\nconst template = html`\n  <sc-code-example language=\"javascript\">\n    const a = 42;\n  </sc-code-example>\n`;\n"}</sc-code-example>

<h3>Attributes</h3>

<div>
  <sc-text>language [="javascript"]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-code-example").language=e.detail.value}
  >javascript</sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-code-example {
  width: 100%;
  height: auto;
  --sc-code-example-padding: 1em;
}
  "
  @change=${e=>(0,s.default)(e.detail.value)}
></sc-editor>
`}}]);