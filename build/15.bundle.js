"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[15],{15:(e,t,s)=>{s.r(t),s.d(t,{template:()=>i});var c=s(9392),o=s(1142),a=s.n(o),d=s(2981);const i=c.dy`

<div class="example">
  <h2>sc-dots</h2>

  <sc-code-example language="javascript">${"\n  import { html } from 'lit';\n  import '@ircam/sc-components/sc-dots.js';\n\n  const template = html`<sc-dots></sc-dots>`;\n  "}</sc-code-example>

  <sc-dots
    id="test-dots"
    .value=${[{x:.5,y:.5}]}
    @input=${e=>document.querySelector("#dots-input").value=a().stringify(e.detail.value,null,2)}
  ></sc-dots>
</div>

<div class="api">
  <h3>Properties</h3>

  <div>
    <p>dot positions must contain the "x" and "y" fields</p>
    <sc-text readonly>[.value=[]]</sc-text>
    <sc-text
      style="width: 300px;"
      @change=${e=>document.querySelector("#test-dots").value=a().parse(e.detail.value)}
    >[{ x: 0.5, y: 0.5 }]</sc-text>
  </div>
  <div>
    <p>an optionnal "color" field can be given</p>
    <sc-text readonly>[.value=[]]</sc-text>
    <sc-text
      style="width: 300px;"
      @change=${e=>document.querySelector("#test-dots").value=a().parse(e.detail.value)}
    >[{ x: 0.5, y: 0.5, color: 'red' }]</sc-text>
  </div>

  <h3>Attributes</h3>

  <div>
    <sc-text readonly>[x-range=[0, 1]]</sc-text>
    <sc-text
      @change=${e=>document.querySelector("#test-dots").xRange=a().parse(e.detail.value)}
    >[0, 1]</sc-text>
  </div>

  <div>
    <sc-text readonly>[y-range=[0, 1]]</sc-text>
    <sc-text
      @change=${e=>document.querySelector("#test-dots").yRange=a().parse(e.detail.value)}
    >[0, 1]</sc-text>
  </div>

  <div>
    <p>radius of the dots in pixels (if set, takes precedence over "radius-relative")</p>
    <sc-text readonly>[radius=5]</sc-text>
    <sc-slider
      min="5"
      max="100"
      @input=${e=>document.querySelector("#test-dots").radius=e.detail.value}
    >[0, 1]</sc-slider>
  </div>
  <div>
    <p>radius relative to the given ranges</p>
    <sc-text readonly>[radius-relative=null]</sc-text>
    <sc-slider
      @input=${e=>{document.querySelector("#test-dots").radius=null,document.querySelector("#test-dots").radiusRelative=e.detail.value}}
    ></sc-slider>
  </div>

  <div style="margin-top: 30px;">
    <p>use sc-dot component as (multitouch) input interface</p>
    <sc-text readonly>[?capture-events=false]</sc-text>
    <sc-toggle
      @change=${e=>document.querySelector("#test-dots").captureEvents=e.detail.value}
    ></sc-toggle>
  </div>
  <div>
    <p>"persist-events" only works if "capture-events" is set</p>
    <sc-text readonly>[?persist-events=false]</sc-text>
    <sc-toggle
      @change=${e=>document.querySelector("#test-dots").persistEvents=e.detail.value}
    ></sc-toggle>

  <h3>Events</h3>

  <div>
    <p>set "capture-events" to true to get events from the interface</p>
    <sc-text readonly>[@input]</sc-text>
    <sc-text id="dots-input" readonly style="height: 200px;"></sc-text>

  </div>

  <h3>Styling</h3>
  <sc-editor
    save-button
    style="width: 500px;"
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
    @change=${e=>(0,d.default)(e.detail.value)}
  ></sc-editor>

  <div>
    <sc-text readonly>debug containers</sc-text>
    <sc-toggle @change=${e=>document.querySelector("#test-dots").classList.toggle("debug")}></sc-toggle>
  </div>
</div>

`}}]);