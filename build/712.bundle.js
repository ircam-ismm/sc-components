"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[712],{8712:(e,t,s)=>{s.r(t),s.d(t,{template:()=>i});var c=s(182),a=s(4670);const i=c.dy`

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
  <sc-text>offset=48</sc-text>
  <sc-number
    integer
    min="0"
    max="100"
    value="48"
    @input=${e=>document.querySelector("#test-keyboard").offset=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>range=24</sc-text>
  <sc-number
    integer
    min="1"
    max="100"
    value="24"
    @input=${e=>document.querySelector("#test-keyboard").range=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>input-mode="reactive"</sc-text>
  <sc-radio
    options="${JSON.stringify(["reactive","stateful"])}"
    value="reactive"
    @change=${e=>document.querySelector("#test-keyboard").inputMode=e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>mode="monophonic"</sc-text>
  <sc-radio
    options="${JSON.stringify(["monophonic","polyphonic"])}"
    value="monophonic"
    @change=${e=>document.querySelector("#test-keyboard").mode=e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>?disabled=false</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-keyboard").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<p>Example with an AZERTY layout, but the positions of the keys should be consistent on all keyboard layouts:</p>
<div>
  <div style="display: inline-block; width: 20px;">&nbsp;</div>
  <sc-text class="key">Z</sc-text>
  <sc-text class="key">E</sc-text>
  <div style="display: inline-block; width: 40px;">&nbsp;</div>
  <sc-text class="key">T</sc-text>
  <sc-text class="key">Y</sc-text>
  <sc-text class="key">U</sc-text>
</div>
<div>
  <sc-text class="key">Q</sc-text>
  <sc-text class="key">S</sc-text>
  <sc-text class="key">D</sc-text>
  <sc-text class="key">F</sc-text>
  <sc-text class="key">G</sc-text>
  <sc-text class="key">H</sc-text>
  <sc-text class="key">J</sc-text>
  <sc-text class="key">K</sc-text>
</div>
<br >
<sc-text>up / down octava</sc-text>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>MIDI</h3>
<sc-midi></sc-midi>

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
  @change=${e=>(0,a.default)(e.detail.value)}
></sc-editor>
`}}]);