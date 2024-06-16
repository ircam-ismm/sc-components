"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[511],{3511:(t,e,s)=>{s.r(e),s.d(e,{template:()=>o});var c=s(2182),a=s(1967),r=s(1630);const o=c.qy`
<h2>sc-transport</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-transport.js';\n\nconst template = html`\n  <sc-transport></sc-transport>\n`;\n"}</sc-code-example>

<sc-transport
  id="test-transport"
  @change=${t=>document.querySelector("#transport-input").value=t.detail.value}
></sc-transport>

<h3>Events</h3>
<p>
  <sc-text>@change</sc-text>
  <sc-text id="transport-input"></sc-text>
</p>

<h3>Properties</h3>
<div>
  <p>Define which button(s) should be displayed amongst "play" (or "start"), "pause" and "stop"</p>
  <sc-text style="width: 260px;">.buttons [=["play", "pause", "stop"]]</sc-text>
  <sc-text
    editable
    @change=${t=>document.querySelector("#test-transport").buttons=a.parse(t.detail.value)}
  >["play", "pause", "stop"]</sc-text>
</div>

<h3>Attributes</h3>
<div>
  <p>Set component state to one of the <code>buttons</code> value</p>
  <sc-text>value [=null]</sc-text>
  <sc-text
    editable
    @change=${t=>document.querySelector("#test-transport").value=t.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${t=>document.querySelector("#test-transport").disabled=t.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>
<sc-text class="key">Space</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-transport {
  width: auto;
  height: 30px;

  --sc-transport-background-color: var(--sc-color-primary-3);
  --sc-transport-active-background-color: var(--sc-color-primary-1);
  --sc-transport-active-play-fill: var(--sc-color-secondary-4);
  --sc-transport-active-pause-fill: var(--sc-color-secondary-1);
  --sc-transport-active-stop-fill: var(--sc-color-secondary-3);
}
  "
  @change=${t=>(0,r.default)(t.detail.value)}
></sc-editor>
`}}]);