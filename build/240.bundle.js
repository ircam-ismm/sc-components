"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[240],{6240:(t,c,e)=>{e.r(c),e.d(c,{template:()=>a});var s=e(2182),i=e(1630);const a=s.qy`

<h2>sc-switch</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-switch.js';\n\nconst template = html`\n  <sc-switch></sc-switch>\n`;\n"}</sc-code-example>

<sc-switch
  id="test-switch"
  @change=${t=>document.querySelector("#switch-change").active=t.detail.value}
></sc-switch>

<h3>Events</h3>

<div>
  <sc-text>@change</sc-text>
  <sc-switch id="switch-change"></sc-switch>
</div>

<h3>Attributes</h3>

<div>
  <sc-text>?active [=false]</sc-text>
  <sc-switch
    @change=${t=>document.querySelector("#test-switch").active=t.detail.value}
  ></sc-switch>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${t=>document.querySelector("#test-switch").disabled=t.detail.value}
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
#test-switch {
  width: 60px;
  height: 30px;
  border-radius: 2px;

  --sc-switch-transition-time: 75ms;
  --sc-switch-toggle-color: white;
  --sc-switch-active-color: var(--sc-color-secondary-1);
}
  "
  @change=${t=>(0,i.default)(t.detail.value)}
></sc-editor>
`}}]);