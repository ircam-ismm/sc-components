"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[357],{6357:(e,t,s)=>{s.r(t),s.d(t,{template:()=>l});var c=s(182),a=s(4670);const l=c.dy`

<h2>sc-flash</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-flash.js';\n\nconst template = html`\n  <sc-flash></sc-flash>\n`;\n"}</sc-code-example>

<sc-flash
  id="test-flash"
  @input=${e=>document.querySelector("#bang-input").active=!0}
></sc-flash>

<h3>Attributes</h3>
<div>
  <sc-text>[active=false]</sc-text>
  <sc-bang
    @input=${e=>document.querySelector("#test-flash").active=!0}
  ></sc-bang>
</div>
<p>use the "live" directive to make the element reactive to external to events:</p>
<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport { live } from 'lit/directives/live.js';\n\nhtml`\n  <sc-flash\n    ?active=${live(myFlag)}\n  ></sc-flash>\n`;\n"}</sc-code-example>

<div>
  <p>duration of the flash, expressed in seconds:</p>
  <sc-text>[duration=0.05]</sc-text>
  <sc-number
    value="0.05"
    min="0.01"
    max="1"
    @change=${e=>document.querySelector("#test-flash").duration=e.detail.value}
  ></sc-number>
</div>


<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-flash {
  width: 100px;
  height: 30px;
  background-color: var(--sc-color-primary-1);
  border: 1px solid var(--sc-color-primary-3);

  --sc-flash-active: var(--sc-color-secondary-3);
}
  "
  @change=${e=>(0,a.default)(e.detail.value)}
></sc-editor>
`}}]);