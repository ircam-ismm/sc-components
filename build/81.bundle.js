"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[81],{9081:(e,t,c)=>{c.r(t),c.d(t,{template:()=>r});var a=c(9392),s=c(1142),i=c(4670);const r=a.dy`

<h2>sc-matrix</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-matrix.js';\n\nconst template = html`\n  <sc-matrix></sc-matrix>\n`;\n"}</sc-code-example>

<sc-matrix
  id="test-matrix"
  @change=${e=>document.querySelector("#matrix-change").value=`[\n${e.detail.value.map((e=>`  [${e.join(", ")}],`)).join("\n")}\n]`}
></sc-matrix>

<h3>Events</h3>

<div>
  <sc-text>@change</sc-text>
  <sc-text style="width: 300px; height: 150px;" id="matrix-change"></sc-text>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>[rows=4]</sc-text>
  <sc-number
    integer
    min="1"
    max="32"
    value="4"
    @input=${e=>document.querySelector("#test-matrix").rows=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[columns=8]</sc-text>
  <sc-number
    integer
    min="1"
    max="32"
    value="8"
    @input=${e=>document.querySelector("#test-matrix").columns=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[?reset=false]</sc-text>
  <sc-bang
    @input=${e=>document.querySelector("#test-matrix").reset=e.detail.value}
  ></sc-bang>
</div>

<h3>Properties</h3>
<div>
  <p>the different values a cell can take</p>
  <sc-text>[.states=[0, 1]]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-matrix").states=s.parse(e.detail.value)}
  >[0, 0.5, 1]</sc-text>
</div>
<div>
  <p>changes the whole matrix state at once</p>
  <sc-text>[.value=[]]</sc-text>
  <sc-text
    editable
    style="height: 80px;"
    @change=${e=>document.querySelector("#test-matrix").value=s.parse(e.detail.value)}
  >[
  [0, 1],
  [1, 0],
]</sc-text>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-matrix").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-matrix {
  width: 300px;
  height: 200px;
  background-color: var(--sc-color-primary-2);
  border: 1px solid var(--sc-color-primary-3);

  --sc-matrix-cell-color: #ffffff;
  --sc-matrix-cell-border: var(--sc-color-primary-4);
}
  "
  @change=${e=>(0,i.default)(e.detail.value)}
></sc-editor>

`}}]);