"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[309],{6309:(e,c,s)=>{s.r(c),s.d(c,{template:()=>r});var t=s(2182),l=(s(1967),s(1630));const r=t.qy`

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

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
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