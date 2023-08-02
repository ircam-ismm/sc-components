"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[340],{1340:(e,t,s)=>{s.r(t),s.d(t,{template:()=>d});var c=s(9392),o=s(1142),a=s(4670);const d=c.dy`

<h2>sc-dots</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-dots.js';\n\nconst template = html`\n  <sc-dots\n    .value=${[{ x: 0.5, y: 0.5 }]}\n  ></sc-dots>\n`;\n"}</sc-code-example>

<sc-dots
  id="test-dots"
  .value=${[{x:.5,y:.5}]}
  @input=${e=>document.querySelector("#dots-input").value=o.stringify(e.detail.value,null,2)}
></sc-dots>

<h3>Properties</h3>

<div>
  <p>dot positions must contain the "x" and "y" fields</p>
  <sc-text>[.value=[]]</sc-text>
  <sc-text
    editable
    style="width: 300px;"
    @change=${e=>document.querySelector("#test-dots").value=o.parse(e.detail.value)}
  >[{ x: 0.5, y: 0.5 }]</sc-text>
</div>
<div>
  <p>an optionnal "color" field can be given</p>
  <sc-text>[.value=[]]</sc-text>
  <sc-text
    editable
    style="width: 300px;"
    @change=${e=>document.querySelector("#test-dots").value=o.parse(e.detail.value)}
  >[{ x: 0.5, y: 0.5, color: 'red' }]</sc-text>
</div>

<h3>Attributes</h3>

<div>
  <sc-text>[x-range=[0, 1]]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-dots").xRange=o.parse(e.detail.value)}
  >[0, 1]</sc-text>
</div>

<div>
  <sc-text>[y-range=[0, 1]]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-dots").yRange=o.parse(e.detail.value)}
  >[0, 1]</sc-text>
</div>

<div>
  <p>radius of the dots in pixels (if set, takes precedence over "radius-relative")</p>
  <sc-text>[radius=5]</sc-text>
  <sc-slider
    min="5"
    max="100"
    @input=${e=>document.querySelector("#test-dots").radius=e.detail.value}
  >[0, 1]</sc-slider>
</div>
<div>
  <p>radius relative to the given ranges</p>
  <sc-text>[radius-relative=null]</sc-text>
  <sc-slider
    @input=${e=>{document.querySelector("#test-dots").radius=null,document.querySelector("#test-dots").radiusRelative=e.detail.value}}
  ></sc-slider>
</div>

<div style="margin-top: 30px;">
  <p>use sc-dot component as (multitouch) input interface</p>
  <sc-text>[?capture-events=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-dots").captureEvents=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <p>"persist-events" only works if "capture-events" is set</p>
  <sc-text>[?persist-events=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-dots").persistEvents=e.detail.value}
  ></sc-toggle>

<h3>Events</h3>

<div>
  <p>set "capture-events" to true to get events from the interface</p>
  <sc-text>@input</sc-text>
  <sc-text id="dots-input" style="height: 200px;"></sc-text>

</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-dots {
  width: 300px;
  height: 300px;
  background-color: var(--sc-color-primary-1);

  --sc-dots-opacity: 1;
  --sc-dots-color: var(--sc-color-secondary-2);
  --sc-dots-background-image: url(./assets/seating-map.png);
  --sc-dots-background-color: var(--sc-color-primary-1);
}
  "
  @change=${e=>(0,a.default)(e.detail.value)}
></sc-editor>

<div>
  <sc-text readonly>debug containers</sc-text>
  <sc-toggle @change=${e=>document.querySelector("#test-dots").classList.toggle("debug")}></sc-toggle>
</div>

`}}]);