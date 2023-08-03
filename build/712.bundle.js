"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[712],{8712:(e,t,o)=>{o.r(t),o.d(t,{template:()=>a});var c=o(182),s=o(4670);const a=c.dy`

<h2>sc-keyboard</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-keyboard.js';\n\nconst template = html`\n  <sc-keyboard></sc-keyboard>\n`;\n"}</sc-code-example>

<sc-keyboard
  id="test-keyboard"
  @input=${e=>document.querySelector("#keyboard-input").value=JSON.stringify(e.detail.value,null,2)}
></sc-keyboard>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-text id="keyboard-input" style="width: 300px; height: 120px;"></sc-text>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>[offset=48]</sc-text>
  <sc-number
    integer
    min="0"
    max="100"
    value="48"
    @input=${e=>document.querySelector("#test-keyboard").offset=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[range=24]</sc-text>
  <sc-number
    integer
    min="1"
    max="100"
    value="24"
    @input=${e=>document.querySelector("#test-keyboard").range=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[input-mode="reactive"]</sc-text>
  <sc-radio
    options="${JSON.stringify(["reactive","stateful"])}"
    value="reactive"
    @change=${e=>document.querySelector("#test-keyboard").inputMode=e.detail.value}
  ></sc-radio>
</div>
<div>
  <p>For now "mode=polyphonic" only works if "input-mode=stateful"</p>
  <sc-text>[mode="monophonic"]</sc-text>
  <sc-radio
    options="${JSON.stringify(["monophonic","polyphonic"])}"
    value="monophonic"
    @change=${e=>document.querySelector("#test-keyboard").mode=e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-keyboard").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-keyboard {
  width: 300px;
  height: 80px;

  --sc-keyboard-active-key: var(--sc-color-secondary-2);
}
  "
  @change=${e=>(0,s.default)(e.detail.value)}
></sc-editor>
`}}]);