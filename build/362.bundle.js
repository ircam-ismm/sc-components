"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[362],{6362:(t,e,s)=>{s.r(e),s.d(e,{template:()=>n});var a=s(9392),c=s(1142),r=s.n(c),o=s(2981);const n=a.dy`

<h2>sc-transport</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-transport.js';\n\nconst template = html`<sc-transport></sc-transport>`;\n"}</sc-code-example>

<sc-transport
  id="test-transport"
  @change=${t=>document.querySelector("#transport-input").value=t.detail.value}
></sc-transport>

<h3>Events</h3>
<p>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly id="transport-input"></sc-text>
</p>

<h3>Attributes</h3>
<div>
  <p>define which button(s) should be displayed</p>
  <sc-text style="width: 260px;" readonly>[buttons=["play", "pause", "stop"]]</sc-text>
  <sc-text
    @change=${t=>document.querySelector("#test-transport").buttons=r().parse(t.detail.value)}
  >["play", "pause", "stop"]</sc-text>
</div>
<p>note that "value" and "state" are aliases</p>
<div>
  <sc-text readonly>[state=null]</sc-text>
  <sc-text
    @change=${t=>document.querySelector("#test-transport").state=t.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text readonly>[value=null]</sc-text>
  <sc-text
    @change=${t=>document.querySelector("#test-transport").value=t.detail.value}
  ></sc-text>
</div>


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
  @change=${t=>(0,o.default)(t.detail.value)}
></sc-editor>
`}}]);