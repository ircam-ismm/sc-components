"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[754],{9373:(e,t,s)=>{s.r(t),s.d(t,{template:()=>a});var c=s(2182),n=s(1630);const a=c.qy`

<h2>sc-next</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-next.js';\n\nconst template = html`\n  <sc-next></sc-next>\n`;\n"}</sc-code-example>

<sc-next
  id="test-next"
  @input=${e=>document.querySelector("#next-input").active=e.detail.value}
></sc-next>

<h3>Events</h3>
<p>
  <sc-text>@input</sc-text>
  <sc-bang id="next-input"></sc-bang>
</p>

<h3>Attributes</h3>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-next").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-next {
  width: 30px;
  height: 30px;
}
  "
  @change=${e=>(0,n.default)(e.detail.value)}
></sc-editor>

<h3>Example</h3>
<div>
  <sc-prev></sc-prev>
  <sc-next></sc-next>
</div>
`}}]);