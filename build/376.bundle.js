"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[376,6],{6376:(e,t,n)=>{n.r(t),n.d(t,{enter:()=>u,exit:()=>d,template:()=>m});var a=n(182),s=n(4670),c=n(2006),l=n(850);let i=null,r=null,o=null;function u(){const e=document.querySelector("#test-signal");i=(0,c.default)(1,60,1,((e,t)=>{o={time:e,data:Array.from(t)}})),r=(0,c.default)(2,60,1,((t,n)=>{o.data[1]=.5*n[0],e.value=o})),i.start(),r.start()}function d(){i.stop(),r.stop()}const m=a.dy`

<h2>sc-signal</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-signal.js';\n\nconst template = html`\n  <sc-signal></sc-signal>\n`;\n"}</sc-code-example>

<sc-signal id="test-signal"></sc-signal>

<h3>Properties</h3>

<div>
  <sc-text>.value={ time, data[] }</sc-text>
  <sc-code-example language="javascript">${"\nrender(html`<sc-signal></sc-signal>`, $container);\n\nconst $signal = $container.querySelector('sc-signal');\n\nsetInterval(() => {\n  const frame = {\n    time: Date.now() / 1000, // time is is seconds\n    data: [Math.random()],\n  }\n\n  $signal.value = frame;\n}, 100);\n  "}</sc-code-example>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>[duration=1]</sc-text>
  <sc-number
    min="0.5"
    max="10"
    value="1"
    @change=${e=>document.querySelector("#test-signal").duration=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[min=-1]</sc-text>
  <sc-number
    min="-10"
    max="0"
    value="-1"
    @change=${e=>document.querySelector("#test-signal").min=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[max=1]</sc-text>
  <sc-number
    min="0"
    max="10"
    value="1"
    @change=${e=>document.querySelector("#test-signal").max=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[line-width=1]</sc-text>
  <sc-number
    min="1"
    max="10"
    value="1"
    @change=${e=>document.querySelector("#test-signal").lineWidth=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[colors=[]]</sc-text>
  <sc-text
    editable
    style="width: 500px;"
    @change=${e=>document.querySelector("#test-signal").colors=l.parse(e.detail.value)}
  >['#4682B4', '#ffa500', '#00e600', '#ff0000', '#800080', '#224153']</sc-text>
</div>
<div>
  <sc-text>[?min-max=true]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-signal").minMax=e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-signal {
  width: 300px;
  height: 150px;
}
  "
  @change=${e=>(0,s.default)(e.detail.value)}
></sc-editor>
`},2006:(e,t,n)=>{function a(e,t,n,a,s=1/0){const c={},l=new Float32Array(n),i=n/t;Math.PI;let r=e/t,o=0,u=null,d=0,m=0;return c.frequency=e=>{r=e/t},c.start=()=>{!function e(){for(let e=0;e<n;e++){const t=Math.sin(2*o*Math.PI);l[e]=t,o=(o+r)%1}a(d,l),d+=i,m+=1,m<s&&(u=setTimeout(e,1e3*i))}()},c.stop=()=>{clearTimeout(u)},c}n.r(t),n.d(t,{default:()=>a})}}]);