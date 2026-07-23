"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[422],{5422(e,a,t){t.r(a);var s=t(2182),c=t(1630);const o=s.qy`

<h2>sc-loading</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-loading.js';\n\nconst template = html`\n  <sc-loading></sc-loading>\n`;\n"}</sc-code-example>

<sc-loading id="test-loading"></sc-loading>

<h3>Properties</h3>
<div>
  <sc-text>type [=square] </sc-text>
  <sc-radio
    .options=${["square","horizontal","vertical"]}
    value="square"
    @change=${e=>document.querySelector("#test-loading").type=e.detail.value}
  ></sc-radio>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-loading {
  width: 50px;
  height: 50px;
  grid-gap: 4px;

  --sc-loading-color: var(--sc-color-primary-4);
  --sc-loading-duration: 3s;
}
  "
  @change=${e=>(0,c.default)(e.detail.value)}
></sc-editor>
`;t.d(a,["template",0,o])}}]);