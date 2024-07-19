"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[275],{2275:(e,o,t)=>{t.r(o),t.d(o,{template:()=>i});var c=t(2182),n=t(1630);const i=c.qy`

<h2>sc-io-zone</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-io-zone.js';\n\nconst template = html`\n  <sc-io-zone></sc-io-zone>\n`;\n"}</sc-code-example>

<sc-io-zone
  id="test-io-zone"
  @change=${e=>document.querySelector("#io-zone-input").value=JSON.stringify(e.detail)}
></sc-io-zone>

<p>
  A zone that is activated / deactivated when clicked, enter or leaved.
  <br />
  Mainly a simple building block for creating more complex interfaces
</p>

<h3>Events</h3>
<p>
  <sc-text>@change</sc-text>
  <sc-text id="io-zone-input"></sc-text>
</p>

<h3>Attributes</h3>
<div>
  <sc-text>value [=0]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-io-zone").value=e.detail.value}
  >0</sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-io-zone {
  width: 100px;
  height: 100px;
  background-color: var(--sc-color-secondary-3);
}

#test-io-zone[active] {
  background-color: var(--sc-color-secondary-4);
}
  "
  @change=${e=>(0,n.default)(e.detail.value)}
></sc-editor>

<h3>Example</h3>

<p>Click anywhere and move your cursor</p>
<div style="user-select: none">
  <sc-io-zone style="margin: 10px"></sc-io-zone>
  <sc-io-zone style="margin: 10px"></sc-io-zone>
  <sc-io-zone style="margin: 10px"></sc-io-zone>
  <sc-io-zone style="margin: 10px"></sc-io-zone>
  <sc-io-zone style="margin: 10px"></sc-io-zone>
  <sc-io-zone style="margin: 10px"></sc-io-zone>
  <sc-io-zone style="margin: 10px"></sc-io-zone>
</div>
`}}]);