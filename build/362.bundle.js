"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[362],{2362:(e,t,i)=>{i.r(t),i.d(t,{enter:()=>c,template:()=>o});var n=i(182),s=i(4670);function a(e){const t=e.currentTarget.tagName.toLowerCase(),i=e.type,n=e.detail.value;document.querySelector("#log-events").value=`${t} - @${i}: ${n}`}function c(){}const o=n.dy`

<h2>sc-midi-learn</h2>

<p style="color: var(--sc-color-secondary-3)">This component is still experimental and subject to change</p>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-midi-learn.js';\n\nconst template = html`\n  <sc-midi-learn></sc-midi-learn>\n`;\n"}</sc-code-example>

<sc-midi-learn
  id="test-midi-learn"
></sc-midi-learn>

<h3>Compatible elements</h3>

<div style="margin: 30px 0;">
  <sc-slider @input=${a} @change=${a}></sc-slider>
  <sc-bang @input=${a}></sc-bang>
  <sc-toggle @change=${a}></sc-toggle>
  <sc-button @press=${a} @release=${a}>my button</sc-button>
  <sc-dial @input=${a} @change=${a}></sc-dial>
</div>

<p style="margin: 20px 0;">
  By default, the bindings are stored in local storage and retrieved between different sessions of the application and the binded elements are retrieved according to an internal id if not explicit id has been given in the DOM. The downside is that this internal id is generated according to the order of instanciation of the elements and is therefore susceptible to change between two sessions in complex and dynamic interfaces. In such cases, it is best to define stable ids yourself to keep the bindings coherent.
</p>

<p style="font-style: italic;">to implement: sc-keyboard</p>

<div style="margin-top: 20px;">
  <sc-text>Events from binded elements</sc-text>
  <sc-text id="log-events"></sc-text>
</div>

<!--
<h3>Attributes</h3>
<div>
  <sc-text>[?active=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-midi-learn").active=e.detail.value}
  ></sc-toggle>
</div>
-->

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-midi-learn {
  width: 80px;
  height: 30px;

  --sc-midi-learn-panel-position-top: 0;
  --sc-midi-learn-panel-position-right: 0;
  --sc-midi-learn-panel-position-bottom: auto;
  --sc-midi-learn-panel-position-left: auto;
  --sc-midi-learn-panel-position-width: 300px;
  --sc-midi-learn-panel-position-height: auto;
}
  "
  @change=${e=>(0,s.default)(e.detail.value)}
></sc-editor>

`}}]);