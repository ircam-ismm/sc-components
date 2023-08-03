"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[222],{9631:(e,t,s)=>{s.r(t),s.d(t,{template:()=>n});var c=s(182),o=s(4670);const n=c.dy`

<h2>sc-editor</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-editor.js';\n\nconst template = html`\n  <sc-editor></sc-editor>\n`;\n"}</sc-code-example>

<sc-editor
  id="test-editor"
  value="\
function test() {
  return 42;
}"
  @change=${e=>document.querySelector("#editor-change").value=e.detail.value}
></sc-editor>

<sc-code-example language="markdown">${'\nThe red line on the left shows if the editor is in dirty state, i.e. if the content has been changed but not saved yet.\n\nThe "change" event is triggered when:\n- "Cmd+S" is pressed\n- on click on the "floppy disc" button if the "saev-button" attribute is set to true\n'}</sc-code-example>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-editor id="editor-change"></sc-bang>
</div>

<h3>Attributes</h3>

<div>
  <sc-text>[value='']</sc-text>
  <sc-editor
    save-button
    value="const myValue = true;"
    @change=${e=>document.querySelector("#test-editor").value=e.detail.value}
  ></sc-editor>
</div>
<div>
  <sc-text>[save-button=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-editor").saveButton=e.detail.value}
  ></sc-toggle>
  <pre><code class="language-markdown">Note that the button only appears whens the editor is in "dirty" state</pre></code>
</div>
<div>
  <sc-text>[dirty=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-editor").dirty=e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-editor {
  width: 300px;
  height: 200px;
  font-size: 11px;
}
  "
  @change=${e=>(0,o.default)(e.detail.value)}
></sc-editor>
`}}]);