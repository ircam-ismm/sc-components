"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[988],{6988:(e,t,c)=>{c.r(t),c.d(t,{template:()=>o});var s=c(2182),l=c(1630);const o=s.qy`

<h2>sc-toggle</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-toggle.js';\n\nconst template = html`\n  <sc-toggle></sc-toggle>\n`;\n"}</sc-code-example>

<sc-toggle
  id="test-toggle"
  @change=${e=>document.querySelector("#toggle-change").active=e.detail.value}
></sc-toggle>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-toggle id="toggle-change"></sc-toggle>
</div>
<sc-code-example language="html">${"\n<sc-toggle\n  @change=${e => console.log(e.detail.value)}\n></sc-toggle>\n"}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>?active [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-toggle").active=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-toggle").disabled=e.detail.value}
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
#test-toggle {
  width: 30px;
  height: 30px;
  background-color: var(--sc-color-primary-2);
  --sc-toggle-inactive-color: var(--sc-color-primary-4);
  --sc-toggle-active-color: var(--sc-color-primary-5);
}
  "
  @change=${e=>(0,l.default)(e.detail.value)}
></sc-editor>
`}}]);