"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[119],{6119:(e,t,c)=>{c.r(t),c.d(t,{template:()=>l});var s=c(182),a=c(4670);const l=s.dy`

<h2>sc-text</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-text.js';\n\nconst template = html`\n  <sc-text>Hello!</sc-text>\n`;\n"}</sc-code-example>

<sc-text
  id="test-text"
  @change=${e=>document.querySelector("#text-change").value=e.detail.value}
>Hello!</sc-text>

<h3>Attributes</h3>
<div>
  <sc-text>value [=""]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-text").value=e.detail.value}
  >Hello!</sc-text>
</div>
<div>
  <p>If editable, the "change" event is trigerred on Cmd+S and on blur, the red outline indicates dirty state</p>
  <sc-text>?editable [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-text").editable=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-text").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="text-change"></sc-text>
</div>
<sc-code-example language="html">
${"<sc-text\n  @change=${e => console.log(e.detail.value)}\n></sc-text>"}
</sc-code-example>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Cmd+S</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
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
  @change=${e=>(0,a.default)(e.detail.value)}
></sc-editor>

<!-- testing -->
<!-- <sc-text>${"coucou"}</sc-text> -->
`}}]);