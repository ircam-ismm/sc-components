"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[643],{3643:(e,t,c)=>{c.r(t),c.d(t,{template:()=>a});var s=c(2182),l=c(1630);const a=s.qy`

<h2>sc-text</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-text.js';\n\nconst template = html`\n  <sc-text>Hello!</sc-text>\n`;\n"}</sc-code-example>

<sc-text
  id="test-text"
  @change=${e=>document.querySelector("#text-change").value=e.detail.value}
  @input=${e=>document.querySelector("#text-input").value=e.detail.value}
>Hello!</sc-text>

<h3>Attributes</h3>
<sc-bang
  @input=${e=>document.querySelector("#test-text").focus()}
></sc-bang>
<div>
  <sc-text>value [=""]</sc-text>
  <sc-text
    id="stuff"
    editable
    @change=${e=>document.querySelector("#test-text").value=e.detail.value}
  >Hello!</sc-text>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-text").disabled=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?editable [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-text").editable=e.detail.value}
  ></sc-toggle>
  <p>If editable, the "change" event is trigerred on Cmd+S, Enter and on blur, the red outline indicates dirty state.</p>
</div>
<!-- <div>
  <sc-text>?multiline [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-text").multiline=e.detail.value}
  ></sc-toggle>
  <p>If multiline and editable, the "change" event is not triggered on Enter</p>
</div> -->
<div>
  <sc-text>placeholder [=""]</sc-text>
  <sc-text
    @change=${e=>document.querySelector("#test-text").placeholder=e.detail.value}
    editable
  ></sc-text>
</div>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="text-change" multiline></sc-text>
</div>
<div>
  <sc-text>@input</sc-text>
  <sc-text id="text-input"></sc-text>
</div>
<sc-code-example language="javascript">
${"<sc-text\n  @change=${e => console.log(e.detail.value)}\n  @input=${e => console.log(e.detail.value)}\n></sc-text>"}
</sc-code-example>


<h3>Keyboard shortcuts</h3>
<sc-text class="key">Cmd+S</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-text {
  width: 200px;
  height: 30px;
  font-size: 11px;
  border-radius: 2px;

  font-size: var(--sc-font-size);
  font-family: var(--sc-font-family);
}
  "
  @change=${e=>(0,l.default)(e.detail.value)}
></sc-editor>

<!-- testing -->
<!-- <sc-text>${"coucou"}</sc-text> -->
`}}]);