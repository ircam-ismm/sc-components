"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[229],{6229:(e,t,a)=>{a.r(t),a.d(t,{template:()=>l});var c=a(9392),r=a(1142),s=a.n(r),i=a(2981);const l=c.dy`

<h2>sc-matrix</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-matrix.js';\n\nconst template = html`<sc-matrix></sc-matrix>`;\n"}</sc-code-example>

<sc-matrix
  id="test-matrix"
  @change=${e=>document.querySelector("#matrix-change").value=`[\n${e.detail.value.map((e=>`  [${e.join(", ")}],`)).join("\n")}\n]`}
></sc-matrix>

<h3>Events</h3>

<div>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly style="width: 300px; height: 150px;" id="matrix-change"></sc-text>
</div>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[rows=4]</sc-text>
  <sc-number
    integer
    min="1"
    max="32"
    value="4"
    @input=${e=>document.querySelector("#test-matrix").rows=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[columns=8]</sc-text>
  <sc-number
    integer
    min="1"
    max="32"
    value="8"
    @input=${e=>document.querySelector("#test-matrix").columns=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[?reset=false]</sc-text>
  <sc-bang
    @input=${e=>document.querySelector("#test-matrix").reset=e.detail.value}
  ></sc-bang>
</div>

<h3>Properties</h3>
<div>
  <p>The different values a cell can take</p>
  <sc-text readonly>[.states=[0, 1]]</sc-text>
  <sc-text
    @change=${e=>document.querySelector("#test-matrix").states=s().parse(e.detail.value)}
  >[0, 0.5, 1]</sc-text>
</div>
<div>
  <p>Change the whole matrix state at once</p>
  <sc-text readonly>[.value=[]]</sc-text>
  <sc-text
    style="height: 80px;"
    @change=${e=>document.querySelector("#test-matrix").value=s().parse(e.detail.value)}
  >[
  [0, 1],
  [1, 0],
]</sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  save-button
  style="width: 500px;"
  value="\
#test-matrix {
  width: 300px;
  height: 200px;
  background-color: var(--sc-color-primary-2);
  border: 1px solid var(--sc-color-primary-3);

  --sc-matrix-cell-color: #ffffff;
  --sc-matrix-cell-border: var(--sc-color-primary-5);
}
  "
  @change=${e=>(0,i.default)(e.detail.value)}
></sc-editor>

`}}]);