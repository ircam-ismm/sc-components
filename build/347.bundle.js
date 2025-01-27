"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[347],{8347:(e,t,c)=>{c.r(t),c.d(t,{template:()=>s});var o=c(2182),l=c(1630);const s=o.qy`

<h2>sc-modal</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-modal.js';\n\nconst template = html`\n  <sc-modal>\n    <sc-filter></sc-filter>\n  </sc-modal>\n`;\n"}</sc-code-example>

<sc-modal
  id="test-modal"
  title="my modal 1"
  icon="filter"
  bind-to-element="#main > section"
>
  <sc-filter></sc-filter>
</sc-modal>

<h3>Attributes</h3>
<div>
  <sc-text>?active [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-modal").active=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?icon [="plus"]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-modal").icon=e.detail.value}
  >filter</sc-text>
  <p>cf. <a href="./sc-icon">sc-icon</a></p>
</div>
<div>
  <sc-text>?title [="modal window"]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-modal").title=e.detail.value}
  >my modal 1</sc-text>
</div>
<div>
  <sc-text>?resizable [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-modal").resizable=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?movable [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-modal").movable=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?bind-to-element [="body"]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-modal").bindToElement=e.detail.value}
  >#main > section</sc-text>
  <p>CSS selector of a DOM element that defines the boundaries in which the modal can be moved</p>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-modal {
  width: 30px;
  height: 30px;

  --sc-modal-width: auto;
  --sc-modal-height: auto;
  /* relative to :host position and size */
  --sc-modal-position-top: 0;
  --sc-modal-position-bottom: auto;
  --sc-modal-position-left: 100%;
  --sc-modal-position-right: auto;
}
  "
  @change=${e=>(0,l.default)(e.detail.value)}
></sc-editor>
`}}]);