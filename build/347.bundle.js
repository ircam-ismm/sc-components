"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[347],{8347(e,t,o){o.r(t);var c=o(2182),s=o(7048),l=o(1630);const a=c.qy`

<h2>sc-modal</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-modal.js';\n\nconst template = html`\n  <sc-modal>\n    <sc-filter></sc-filter>\n  </sc-modal>\n`\n\n// for more complex usage\nconst template = html`\n  <sc-modal\n    .open=${async () => html`<my-component></component>`}\n  ></sc-modal>\n`;\n"}</sc-code-example>

<!-- API with slot for testing backward compatibility -->
<!-- <sc-modal
  title="my test modal"
  icon="filter"
>
  <sc-filter></sc-filter>
</sc-modal> -->

<sc-modal
  id="test-modal"
  title="my modal"
  icon="filter"
  bind-to-element="#main > section"
  .open=${async()=>(console.log("await modal open"),await(0,s.yy)(.2),c.qy`<sc-filter></sc-filter>`)}
  .close=${async()=>{await(0,s.yy)(.1),console.log("modal closed")}}
></sc-modal>

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

<h3>Properties</h3>
<div>
  <sc-text>.open {Function} [=null]</sc-text>
  <p>If defined, asynchronously execute the function and render the returned result when the component is set to "active"</p>
</div>
<div>
  <sc-text>.close {Function} [=null]</sc-text>
  <p>If defined, execute the function when the component is set to not "active"</p>
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
`;o.d(t,["template",0,a])}}]);