"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[281],{6281:(t,e,a)=>{a.r(e),a.d(e,{template:()=>i});var c=a(182),s=a(4670);const o=["a","b","c","d"],i=c.dy`

<h2>sc-tab</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-tab.js';\n\nconst template = html`\n  <sc-tab\n    options=\"${JSON.stringify(['a', 'b', 'c', 'd'])}\"\n  ></sc-tab>\n`;\n"}</sc-code-example>

<sc-tab
  id="test-tab"
  options="${JSON.stringify(o)}"
  @change=${t=>document.querySelector("#options-value").value=t.detail.value}
></sc-tab>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="options-value"></sc-text>
</div>
<sc-code-example language="html">${"\n<sc-tab\n  @change=${e => console.log(e.detail.name, e.detail.value)}\n></sc-tab>"}
</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>[value=null]</sc-text>
  <sc-tab
    id="tab-change"
    options="${JSON.stringify(o)}"
    @change=${t=>document.querySelector("#test-tab").value=t.detail.value}
  ></sc-tab>
</div>
<div>
  <sc-text>options=[]</sc-text>
  <sc-editor
    save-button
    value="${JSON.stringify(o)}"
    @change=${t=>{document.querySelector("#test-tab").options=JSON.parse(t.detail.value),document.querySelector("#tab-change").options=JSON.parse(t.detail.value)}}
  ></sc-editor>
</div>
<div>
  <sc-text>[orientation="vertical"]</sc-text>
  <sc-tab
    options="${JSON.stringify(["vertical","horizontal"])}"
    value="horizontal"
    @change=${t=>document.querySelector("#test-tab").orientation=t.detail.value}
  ></sc-tab>
</div>
<!-- <div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${t=>document.querySelector("#test-tab").disabled=t.detail.value}
  ></sc-toggle>
</div> -->

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-tab {
  width: 200px;
  height: auto;
  font-size: 11px;

  --sc-tab-selected: var(--sc-color-secondary-1);
}
  "
  @change=${t=>(0,s.default)(t.detail.value)}
></sc-editor>
`}}]);