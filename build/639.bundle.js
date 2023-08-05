"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[639],{9639:(e,t,s)=>{s.r(t),s.d(t,{template:()=>o});var c=s(182),l=s(4670);const a=["a",!0,43,"g"],o=c.dy`

<h2>sc-select</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-select.js';\n\nconst template = html`\n  <sc-select\n    options=\"${JSON.stringify(['a', true, 43, 'g'])}\"\n  ></sc-select>\n`;\n"}</sc-code-example>

<sc-select
  id="test-select"
  placeholder="Select an option"
  options="${JSON.stringify(a)}"
  @change=${e=>document.querySelector("#options-value").value=e.detail.value}
></sc-select>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="options-value"></sc-text>
</div>
<sc-code-example language="html">${"\n<sc-select\n  options=\"${JSON.stringify(['a', 'b', 'c', 'd'])}\"\n  @change=${e => console.log(e.detail.name, e.detail.value)}\n></sc-select>"}
</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>[value=null]</sc-text>
  <sc-select
    id="radio-change"
    options="${JSON.stringify(a)}"
    @change=${e=>document.querySelector("#test-select").value=e.detail.value}
  ></sc-select>
</div>
<div>
  <p>if an object is given, the key will be used as the option text and the value as the value</p>
  <sc-text>options=[]</sc-text>
  <sc-editor
    save-button
    value="${JSON.stringify({a:!0,b:42},null,2)}"
    @change=${e=>{document.querySelector("#test-select").options=JSON.parse(e.detail.value),document.querySelector("#radio-change").options=JSON.parse(e.detail.value)}}
  ></sc-editor>
</div>
<div>
  <sc-text>[placeholder='']</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-select").placeholder=e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-select").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-select {
  width: 200px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e=>(0,l.default)(e.detail.value)}
></sc-editor>
`}}]);