"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[90],{90:(e,t,c)=>{c.r(t),c.d(t,{template:()=>l});var s=c(2182),a=c(1630);const l=s.qy`

<h2>sc-dial</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-dial.js';\n\nconst template = html`\n  <sc-dial></sc-dial>\n`;\n"}</sc-code-example>

<sc-dial
  id="test-dial"
  @input=${e=>document.querySelector("#dial-input").value=e.detail.value}
  @change=${e=>document.querySelector("#dial-change").value=e.detail.value}
></sc-dial>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-number readonly id="dial-input"></sc-number>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-number readonly id="dial-change"></sc-number>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>min [=0]</sc-text>
  <sc-number
    @change=${e=>document.querySelector("#test-dial").min=e.detail.value}
  >0</sc-number>
</div>
<div>
  <sc-text>max [=1]</sc-text>
  <sc-number
    value="1"
    @change=${e=>document.querySelector("#test-dial").max=e.detail.value}
  >1</sc-number>
</div>
<div>
  <sc-text>value [=0]</sc-text>
  <sc-number
    @input=${e=>document.querySelector("#test-dial").value=e.detail.value}
  >0</sc-number>
</div>
<div>
  <sc-text>hide-value [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-dial").hideValue=e.detail.value}
  >0</sc-toggle>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-dial").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-dial {
  width: 50px;
  height: 50px;

  --sc-dial-color: var(--sc-color-secondary-1);
}
  "
  @change=${e=>(0,a.default)(e.detail.value)}
></sc-editor>
`}}]);