"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[962],{3962:(e,t,c)=>{c.r(t),c.d(t,{template:()=>o});var s=c(182),i=c(4670);let n=null,l=null,a=null;const o=s.dy`

<h2>sc-icon</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-icon.js';\n\nconst template = html`\n  <sc-icon\n    type=\"question\"\n    value=\"my-icon\"\n  ></sc-icon>\n`;\n"}</sc-code-example>

<sc-icon
  id="test-icon"
  value="my-icon"
  type="question"
  @input=${e=>{document.querySelector("#icon-input").active=!0;const t=document.querySelector("#icon-value-input");t.value=e.detail.value,clearTimeout(n),n=setTimeout((()=>t.value=""),500)}}
  @press=${e=>{document.querySelector("#icon-press").active=!0;const t=document.querySelector("#icon-value-press");t.value=e.detail.value,clearTimeout(l),l=setTimeout((()=>t.value=""),500)}}
  @release=${e=>{document.querySelector("#icon-release").active=!0;const t=document.querySelector("#icon-value-release");t.value=e.detail.value,clearTimeout(a),a=setTimeout((()=>t.value=""),500)}}
></sc-icon>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-bang id="icon-input"></sc-bang>
  <sc-text id="icon-value-input"></sc-text>
</div>
<div>
  <sc-text>@press</sc-text>
  <sc-bang id="icon-press"></sc-bang>
  <sc-text id="icon-value-press"></sc-text>
</div>
<div>
  <sc-text>@release</sc-text>
  <sc-bang id="icon-release"></sc-bang>
  <sc-text id="icon-value-release"></sc-text>
</div>
<sc-code-example language="html">${'\n<sc-icon\n  type="burger"\n  value="menu"\n  @input=${e => console.log(e.detail.value)}\n></sc-icon>\n'}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>type [="question"]</sc-text>
  <sc-radio
    options="${JSON.stringify(["question","info","github","burger","gear","save","delete","close","midi"])}"
    value="question"
    @change=${e=>document.querySelector("#test-icon").type=e.detail.value}
  ></sc-radio>
</div>
<div>
  <p>Value propagated within the event</p>
  <sc-text>value [=null]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-icon").value=e.detail.value}
  ></sc-text>
</div>
<div>
  <p>If set, the button will act as a link with <code>target="_blank"</code></p>
  <sc-text>href [=null]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-icon").href=e.detail.value}
  >https://soundworks.dev</sc-text>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-icon").disabled=e.detail.value}
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
#test-icon {
  width: 30px;
  height: 30px;
}
  "
  @change=${e=>(0,i.default)(e.detail.value)}
></sc-editor>
`}}]);