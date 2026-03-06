"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[855],{7855(e,t,c){c.r(t),c.d(t,{template:()=>s});var r=c(2182),i=c(1630);const s=r.qy`

<h2>sc-text</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport { live } from 'lit/directives/live.js';\nimport '@ircam/sc-components/sc-timer.js';\n\nconst template = html`\n  <sc-timer duration=\"5\" ?active=${live(flag)}></sc-timer>\n`;\n"}</sc-code-example>

<sc-timer id="test-timer"></sc-timer>

<h3>Attributes</h3>
<div>
  <sc-text>duration [=1]</sc-text>
  <sc-number
    value="1"
    integer
    @input=${e=>document.querySelector("#test-timer").duration=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>?active [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-timer").active=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?loop [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-timer").loop=e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-timer {
  width: 30px;
  height: 30px;
  background-color: var(--sc-color-primary-2);
  border: 1px solid var(--sc-color-primary-3);
  padding: 4px;

  --sc-timer-background-fill-color: var(--sc-color-primary-2);
  --sc-timer-foreground-fill-color: var(--sc-color-secondary-1);
}
  "
  @change=${e=>(0,i.default)(e.detail.value)}
></sc-editor>
`}}]);