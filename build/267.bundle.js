"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[267],{5267:(e,t,c)=>{c.r(t),c.d(t,{template:()=>i});var s=c(2182),o=c(1630);let a=new AudioBuffer({length:44100,numberOfChannels:1,sampleRate:44100});const r=a.getChannelData(0);for(let e=0;e<r.length;e++)r[e]=Math.sin(2*Math.PI*10*e/r.length);const i=s.qy`

<h2>sc-waveform</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-waveform.js';\n\nconst template = html`\n  <sc-waveform></sc-waveform>\n`;\n"}</sc-code-example>

<sc-waveform 
  id="test-waveform"
  .buffer=${a}
  @input=${e=>document.querySelector("#waveform-input").value=JSON.stringify(e.detail.value)}
  @change=${e=>document.querySelector("#waveform-change").value=JSON.stringify(e.detail.value)}
></sc-waveform>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-text id="waveform-input"></sc-text>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="waveform-change"></sc-text>
</div>

<h3>Attributes</h3>

<div>
  <sc-text>?selection [=false]</sc-text>
  <sc-toggle
    @change="${e=>document.querySelector("#test-waveform").selection=e.detail.value}"
  ></sc-toggle>
</div>

<div>
  <sc-text>?cursor [=false]</sc-text>
  <sc-toggle
    @change="${e=>document.querySelector("#test-waveform").cursor=e.detail.value}"
  ></sc-toggle>
</div>

<div>
  <sc-text>cursor-position [=0]</sc-text>
  <sc-slider
    value=0
    @input=${e=>document.querySelector("#test-waveform").cursorPosition=e.detail.value*a.duration}
  ></sc-slider>
</div>

<h3>Properties</h3>

<div>
  <sc-text>.buffer [=AudioBuffer]</sc-text>
  <sc-dragndrop
    style="
      height: 60px;
    "
    @change="${e=>{const t=Object.values(e.detail.value)[0];t instanceof AudioBuffer&&(a=t,document.querySelector("#test-waveform").buffer=t)}}"
  ></sc-dragndrop>
</div>  
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-waveform {
  width: 300px;
  height: 150px;
  --sc-waveform-color: white;
  --sc-waveform-cursor-color: red;
}
  "
  @change=${e=>(0,o.default)(e.detail.value)}
></sc-editor>
`}}]);