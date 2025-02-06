"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[717],{1717:(e,t,s)=>{s.r(t),s.d(t,{template:()=>a});var i=s(2182),n=s(1630);function c(e){const t=e.currentTarget.tagName.toLowerCase(),s=e.type,i=e.detail.value;document.querySelector("#log-events").value=`${t} - @${s}: ${i}`}class o extends i.WF{static styles=i.AH`
    div {
      padding: 10px;
      display: inline-block;
      background-color: var(--sc-color-secondary-3);
    }
  `;render(){return i.qy`
      <div>
        <sc-slider></sc-slider>
      </div>
    `}}void 0===customElements.get("some-wrapper")&&customElements.define("some-wrapper",o);const a=i.qy`

<h2>sc-midi</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-midi.js';\n\nconst template = html`\n  <sc-midi></sc-midi>\n`;\n"}</sc-code-example>

<sc-midi
  id="test-midi"
></sc-midi>

<p style="margin: 20px 0;">
  Bindings are stored in local storage and retrieved between different sessions of the application and the binded elements are retrieved according to an internal id if not explicit id has been given in the DOM. The downside is that this internal id is generated according to the order of instanciation of the elements and is therefore susceptible to change between two sessions in complex and dynamic interfaces. In such cases, it is best to define stable ids yourself to keep the bindings coherent.
</p>

<h3>Compatible elements</h3>

<div style="margin: 30px 0;">
  <sc-slider @input=${c} @change=${c}></sc-slider>
  <sc-bang @input=${c}></sc-bang>
  <sc-toggle @change=${c}></sc-toggle>
  <sc-record @change=${c}></sc-record>
  <sc-transport @change=${c}></sc-transport>
  <sc-button @press=${c} @release=${c}>my button</sc-button>
  <sc-dial @input=${c} @change=${c}></sc-dial>
  <sc-keyboard></sc-keyboard>
</div>

<div style="margin-top: 20px;">
  <sc-text>Events from binded elements</sc-text>
  <sc-text id="log-events"></sc-text>
</div>

<h3>Bind into ShadowDOM</h3>

<some-wrapper></some-wrapper>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-midi {
  width: 80px;
  height: 30px;

  --sc-midi-panel-position-top: 0;
  --sc-midi-panel-position-right: 0;
  --sc-midi-panel-position-bottom: auto;
  --sc-midi-panel-position-left: auto;
  --sc-midi-panel-position-width: 300px;
  --sc-midi-panel-position-height: auto;
}
  "
  @change=${e=>(0,n.default)(e.detail.value)}
></sc-editor>

`}}]);