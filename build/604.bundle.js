"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[604],{604:(t,e,s)=>{s.r(e),s.d(e,{template:()=>a});var c=s(182),n=s(4670);const a=c.dy`

<h2>sc-next</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-next.js';\n\nconst template = html`\n  <sc-next></sc-next>\n`;\n"}</sc-code-example>

<sc-next
  id="test-next"
  @input=${t=>document.querySelector("#next-input").active=t.detail.value}
></sc-next>

<h3>Events</h3>
<p>
  <sc-text>@input</sc-text>
  <sc-bang id="next-input"></sc-bang>
</p>

<h3>Attributes</h3>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${t=>document.querySelector("#test-next").disabled=t.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-next {
  width: 30px;
  height: 30px;
}
  "
  @change=${t=>(0,n.default)(t.detail.value)}
></sc-editor>

<h3>Example</h3>
<div>
  <sc-prev></sc-prev>
  <sc-next></sc-next>
</div>
`}}]);