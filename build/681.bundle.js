"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[681],{1681:(e,t,s)=>{s.r(t),s.d(t,{template:()=>r});var c=s(182),l=s(4670);const r=c.dy`

<h2>sc-slider</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-slider.js';\n\nconst template = html`\n  <sc-slider></sc-slider>\n`;\n"}</sc-code-example>

<sc-slider
  id="test-slider"
  @input=${e=>document.querySelector("#slider-input").value=e.detail.value}
  @change=${e=>document.querySelector("#slider-change").value=e.detail.value}
></sc-slider>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-number readonly id="slider-input"></sc-number>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-number readonly id="slider-change"></sc-number>
</div>


<h3>Attributes</h3>
<div>
  <sc-text>min=0</sc-text>
  <sc-number value="0" integer
    @input=${e=>document.querySelector("#test-slider").min=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>max=1</sc-text>
  <sc-number value="1" integer
    @input=${e=>document.querySelector("#test-slider").max=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>value=0.5</sc-text>
  <sc-number value="0.5"
    @input=${e=>document.querySelector("#test-slider").value=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>step=0.001</sc-text>
  <sc-number value="0.001"
    @input=${e=>document.querySelector("#test-slider").step=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>?number-box=false</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-slider").numberBox=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>orientation="horizontal"</sc-text>
  <sc-radio
    options=${JSON.stringify(["horizontal","vertical"])}
    value="horizontal"
    @change=${e=>document.querySelector("#test-slider").orientation=e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>?relative=false</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-slider").relative=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?disabled=false</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-slider").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-slider {
  width: 200px;
  height: 30px;
  --sc-slider-background-color: var(--sc-color-primary-2);
  --sc-slider-foreground-color: var(--sc-color-primary-5);
}
  "
  @change=${e=>(0,l.default)(e.detail.value)}
></sc-editor>

`}}]);