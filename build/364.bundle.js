"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[364],{7364:(e,t,s)=>{s.r(t),s.d(t,{template:()=>d});var c=s(2182),a=s(1967),o=s(1630);const d=c.qy`

<h2>sc-dots</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-dots.js';\n\nconst template = html`\n  <sc-dots\n    .value=${[{ x: 0.5, y: 0.5 }]}\n  ></sc-dots>\n`;\n"}</sc-code-example>

<sc-dots
  id="test-dots"
  capture-events
  persist-events
  disabled
  .value=${[{x:.5,y:.5}]}
  @input=${e=>document.querySelector("#dots-input").value=a.stringify(e.detail.value,null,2)}
></sc-dots>

<h3>Properties</h3>

<div>
  <sc-text>.value [=[]]</sc-text>
  <sc-text
    editable
    multiline
    style="width: 300px;"
    @change=${e=>document.querySelector("#test-dots").value=a.parse(e.detail.value)}
  >[{ x: 0.5, y: 0.5 }]</sc-text>
  <p>Each "dots" position must contain a "x" and a "y" field</p>
  <p>An optionnal "color" field can also be given</p>
  <sc-text style="background-color: transparent"></sc-text>
  <sc-text
    editable
    multiline
    style="width: 300px;"
    @change=${e=>document.querySelector("#test-dots").value=a.parse(e.detail.value)}
  >[{ x: 0.5, y: 0.5, color: 'red' }]</sc-text>
</div>

<h3>Attributes</h3>

<div>
  <sc-text>x-range [=[0, 1]]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-dots").xRange=a.parse(e.detail.value)}
  >[0, 1]</sc-text>
</div>

<div>
  <sc-text>y-range [=[0, 1]]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-dots").yRange=a.parse(e.detail.value)}
  >[0, 1]</sc-text>
</div>

<div>
  <p>Radius of the dots in pixels</p>
  <sc-text>radius [=5]</sc-text>
  <sc-slider
    min="5"
    max="100"
    @input=${e=>document.querySelector("#test-dots").radius=e.detail.value}
  >[0, 1]</sc-slider>
</div>
<div>
  <p>Radius relative to the given ranges</p>
  <sc-text>radius-relative [=null]</sc-text>
  <sc-slider
    @input=${e=>{document.querySelector("#test-dots").radius=null,document.querySelector("#test-dots").radiusRelative=e.detail.value}}
  ></sc-slider>
</div>

<div style="margin-top: 30px;">
  <p>Use the component as a multitouch input interface</p>
  <sc-text>?capture-events [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-dots").captureEvents=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <p>If "capture-events" is true, persist the last position(s) on the component</p>
  <sc-text>?persist-events [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-dots").persistEvents=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-dots").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Events</h3>

<div>
  <p>If "capture-events" is true</p>
  <sc-text>@input</sc-text>
  <sc-text id="dots-input" style="height: 200px;"></sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-dots {
  width: 300px;
  height: 300px;
  background-image: url(./assets/seating-map.png);
  background-color: var(--sc-color-primary-1);

  --sc-dots-color: var(--sc-color-secondary-2);
  --sc-dots-opacity: 1;
}
  "
  @change=${e=>(0,o.default)(e.detail.value)}
></sc-editor>

<div>
  <sc-text readonly>debug containers</sc-text>
  <sc-toggle @change=${e=>document.querySelector("#test-dots").classList.toggle("debug")}></sc-toggle>
</div>

`}}]);