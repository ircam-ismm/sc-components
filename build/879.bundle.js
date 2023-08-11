"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[879],{5879:(e,t,c)=>{c.r(t),c.d(t,{template:()=>a});var s=c(182),n=c(4670);const a=s.dy`

<h2>sc-bang</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-bang.js';\n\nconst template = html`\n  <sc-bang></sc-bang>\n`;\n"}</sc-code-example>

<sc-bang
  id="test-bang"
  @input=${e=>document.querySelector("#bang-input").active=!0}
></sc-bang>

<h3>Events</h3>
<p>
  <sc-text>@input</sc-text>
  <sc-bang id="bang-input"></sc-bang>
</p>
<sc-code-example language="html">${"\n<sc-bang\n  @input=${e => console.log(e.detail.value)}\n></sc-bang>\n"}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>?active=false</sc-text>
  <sc-bang
    @input=${e=>document.querySelector("#test-bang").active=!0}
  ></sc-bang>
</div>
<p>Use the "live" directive to make the element reactive to external events:</p>
<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport { live } from 'lit/directives/live.js';\nimport '@ircam/sc-components/sc-bang.js';\n\nhtml`\n  <sc-bang\n    ?active=${live(myFlag)}\n  ></sc-bang>\n`;\n"}</sc-code-example>

<div>
  <sc-text>?disabled=false</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-bang").disabled=e.detail.value}
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
#test-bang {
  width: 30px;
  height: 30px;
}
  "
  @change=${e=>(0,n.default)(e.detail.value)}
></sc-editor>
`}}]);