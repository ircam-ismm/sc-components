"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[395],{5395:(e,t,o)=>{o.r(t),o.d(t,{template:()=>s});var r=o(2182),a=o(1630);const s=r.qy`

<h2>sc-dragndrop</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-dragndrop.js';\n\nconst template = html`\n  <sc-dragndrop>drag and drop files</sc-dragndrop>\n`;\n"}</sc-code-example>

<sc-dragndrop
  id="test-dragndrop"
  @change=${e=>{console.log(e.detail.value);let t="{";for(let o in e.detail.value)t+=`\n  ${o}: "${e.detail.value[o]}",`;t+="\n}",document.querySelector("#dragndrop-change").value=t}}
></sc-dragndrop>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="dragndrop-change"></sc-text>
  <p><i>Open the console to see more infos about loaded files)</i></p>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>format [="load"]</sc-text>
  <sc-radio
    options=${JSON.stringify(["load","raw"])}
    value="load"
    @change=${e=>document.querySelector("#test-dragndrop").format=e.detail.value}
  ></sc-radio>
  <p>
    - "load": does its best to load and decode the asset (e.g. AudioBuffer, Image, json, text or midi files).<br > Most suited for interactive usage directly in the context of the page.
  </p>
  <p style="margin-top: 8px;">
    - "raw": return File instances which is better suited for uploading assets to a server.
  </p>
</div>

<h3>Styles</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-dragndrop {
  width: 300px;
  height: 150px;
  border: 1px solid var(--sc-color-primary-2);
  background-color: var(--sc-color-primary-1);
  border-radius: 2px;
  font-family: var(--sc-font-family);
  font-size: var(--sc-font-size);
  color: white;

  --sc-dragndrop-dragged-background-color: var(--sc-color-primary-2);
  --sc-dragndrop-processing-background-color: var(--sc-color-secondary-3);
}
  "
  @change=${e=>(0,a.default)(e.detail.value)}
></sc-editor>

<h4>Debug internal state</h4>
<div>
  <sc-text>_status</sc-text>
  <sc-radio
    options=${JSON.stringify(["idle","drag","processing"])}
    value="idle"
    @change=${e=>document.querySelector("#test-dragndrop")._status=e.detail.value}
  ></sc-radio>
</div>


`}}]);