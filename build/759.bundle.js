"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[759],{4759:(e,t,a)=>{a.r(t),a.d(t,{template:()=>o});var s=a(182),c=a(4670);const i=["a","b","c","d"],o=s.dy`

<h2>sc-radio</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-radio.js';\n\nconst template = html`\n  <sc-radio\n    options=\"${JSON.stringify(['a', 'b', 'c', 'd'])}\"\n  ></sc-radio>\n`;\n"}</sc-code-example>

<sc-radio
  id="test-radio"
  options="${JSON.stringify(i)}"
  @change=${e=>document.querySelector("#options-value").value=e.detail.value}
></sc-radio>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="options-value"></sc-text>
</div>
<sc-code-example language="html">${"\n<sc-radio\n  @change=${e => console.log(e.detail.name, e.detail.value)}\n></sc-radio>"}
</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>value [=null]</sc-text>
  <sc-radio
    id="radio-change"
    options="${JSON.stringify(i)}"
    @change=${e=>document.querySelector("#test-radio").value=e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>options [=[]]</sc-text>
  <sc-editor
    save-button
    value="${JSON.stringify(i)}"
    @change=${e=>{document.querySelector("#test-radio").options=JSON.parse(e.detail.value),document.querySelector("#radio-change").options=JSON.parse(e.detail.value)}}
  ></sc-editor>
</div>
<div>
  <sc-text>orientation [="vertical"]</sc-text>
  <sc-radio
    options="${JSON.stringify(["vertical","horizontal"])}"
    value="vertical"
    @change=${e=>document.querySelector("#test-radio").orientation=e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-radio").disabled=e.detail.value}
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
#test-radio {
  width: 200px;
  height: auto;
  font-size: 11px;
}
  "
  @change=${e=>(0,c.default)(e.detail.value)}
></sc-editor>
`}}]);