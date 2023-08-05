"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[721],{4721:(t,e,c)=>{c.r(e),c.d(e,{template:()=>o});var a=c(182),s=c(4670);const o=a.dy`

<h2>sc-tap-tempo</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-tap-tempo.js';\n\nconst template = html`\n  <sc-tap-tempo>tap</sc-tap-tempo>\n`;\n"}</sc-code-example>

<sc-tap-tempo
  id="test-tap-tempo"
  @change=${t=>document.querySelector("#tap-tempo-change").value=t.detail.value}
></sc-tap-tempo>

<h3>Events</h3>

<div>
  <sc-text>@change</sc-text>
  <sc-number readonly id="tap-tempo-change"></sc-number>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${t=>document.querySelector("#test-tap-tempo").disabled=t.detail.value}
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
#test-tap-tempo {
  width: 50px;
  height: 30px;
  background-color: var(--sc-color-primary-3);

  --sc-tap-tempo-background-color: var(--sc-color-secondary-5);
}
  "
  @change=${t=>(0,s.default)(t.detail.value)}
></sc-editor>

`}}]);