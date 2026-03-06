"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[309],{6309(e,t,c){c.r(t),c.d(t,{template:()=>r});var s=c(2182),l=c(1630);const r=s.qy`

<h2>sc-fullscreen</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-fullscreen.js';\n\nconst template = html`\n  <sc-fullscreen></sc-fullscreen>\n`;\n"}</sc-code-example>

<sc-fullscreen
  id="test-fullscreen"
></sc-fullscreen>

<h3>Attributes</h3>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-fullscreen").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Properties</h3>
<div>
  <sc-text>.element [=Element|CSSSelector]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-fullscreen").element=e.detail.value}
  >sc-code-example</sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-fullscreen {
  width: 30px;
  height: 30px;
  border: 1px solid var(--sc-color-primary-3);
  background-color: var(--sc-color-primary-2);
}
  "
  @change=${e=>(0,l.default)(e.detail.value)}
></sc-editor>

`}}]);