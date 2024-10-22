"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[285],{1285:(e,t,s)=>{s.r(t),s.d(t,{template:()=>i});var a=s(2182),c=s(1630);const o=["a","b","c","d"],i=a.qy`

<h2>sc-tab</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-tab.js';\n\nconst template = html`\n  <sc-tab\n    options=\"${JSON.stringify(['a', 'b', 'c', 'd'])}\"\n  ></sc-tab>\n`;\n"}</sc-code-example>

<sc-tab
  id="test-tab"
  options="${JSON.stringify(o)}"
  @change=${e=>document.querySelector("#options-value").value=e.detail.value}
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
  <sc-text>value [=null]</sc-text>
  <sc-tab
    id="tab-change"
    options="${JSON.stringify(o)}"
    @change=${e=>document.querySelector("#test-tab").value=e.detail.value}
  ></sc-tab>
</div>
<div>
  <p>Values of the different options. If an object is given, the key is used as option's text and the value as the option's value</p>
  <sc-text>options [=[]|{}]</sc-text>
  <sc-editor
    save-button
    value="${JSON.stringify({a:!0,b:42},null,2)}"
    @change=${e=>{document.querySelector("#test-tab").options=JSON.parse(e.detail.value),document.querySelector("#tab-change").options=JSON.parse(e.detail.value)}}
  ></sc-editor>
</div>
<div>
  <sc-text>orientation [="vertical"]</sc-text>
  <sc-tab
    options="${JSON.stringify(["vertical","horizontal"])}"
    value="horizontal"
    @change=${e=>document.querySelector("#test-tab").orientation=e.detail.value}
  ></sc-tab>
</div>
<div>
  <p><i>
    Applies for mouse interaction only. The re-ordered values are stored in local storage and retreived
    on page load, if your page is highly dynamic it is best to defined an <code>id</code> on your component
    to ensure this feature remains stable.
  </i></p>
  <sc-text>sortable [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-tab").sortable=e.detail.value}
  ></sc-toggle>
</div>
<!-- <div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-tab").disabled=e.detail.value}
  ></sc-toggle>
</div> -->

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-tab {
  width: 200px;
  height: auto;
  font-size: 11px;

  --sc-tab-selected: var(--sc-color-secondary-1);
}
  "
  @change=${e=>(0,c.default)(e.detail.value)}
></sc-editor>
`}}]);