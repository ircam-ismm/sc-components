"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[164],{6164:(e,c,t)=>{t.r(c),t.d(c,{template:()=>s});var l=t(2182),o=t(1630);const s=l.qy`

<h2>sc-color-picker</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-color-picker.js';\n\nconst template = html`\n  <sc-color-picker\n  ></sc-color-picker>\n`;\n"}</sc-code-example>

<sc-color-picker
  id="test-color-picker"
  @change=${e=>document.querySelector("#change-color-value").value=e.detail.value}
  @input=${e=>document.querySelector("#input-color-value").value=e.detail.value}
></sc-color-picker>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-text id="input-color-value"></sc-text>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="change-color-value"></sc-text>
</div>
<sc-code-example language="html">${"\n<sc-color-picker\n  @input=${e => console.log(e.detail.value)}\n></sc-color-picker>"}
</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>value [=null]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-color-picker").value=e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-color-picker").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-color-picker {
  width: 30px;
  height: 30px;
}
  "
  @change=${e=>(0,o.default)(e.detail.value)}
></sc-editor>
`}}]);