"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[518,289],{3518:(e,t,a)=>{a.r(t),a.d(t,{template:()=>n});var c=a(2182),l=a(1630);const s=(0,a(5289).default)(2,100,12,((e,t)=>{const a=document.querySelector("#test-table"),[c,l]=a.range;for(let e=0;e<t.length;e++)t[e]=c+(t[e]+1)/2*(l-c);document.querySelector("#test-table").value=t})),n=c.qy`

<h2>sc-table</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-table.js';\n\nconst template = html`\n  <sc-table></sc-table>\n`;\n"}</sc-code-example>

<sc-table
  id="test-table"
  @change=${e=>{document.querySelector("#table-change")&&(document.querySelector("#table-change").active=!0,document.querySelector("#table-value-change").value=JSON.stringify(e.detail.value))}}
  @input=${e=>{document.querySelector("#table-input").active=!0,document.querySelector("#table-value-input").value=JSON.stringify(e.detail)}}
></sc-table>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-bang id="table-change"></sc-bang>
  <sc-text id="table-value-change"></sc-text>
</div>
<div>
  <sc-text>@input</sc-text>
  <sc-bang id="table-input"></sc-bang>
  <sc-text id="table-value-input"></sc-text>
</div>
<sc-code-example language="javascript">${"\n<sc-table\n  @change=${e => console.log(e.detail.value)}\n  @input=${e => console.log(e.detail.index, e.detail.value)}\n></sc-table>\n"}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>size [=32]</sc-text>
  <sc-number
    min="1"
    max="1024"
    step="1"
    value="32"
    @change=${e=>document.querySelector("#test-table").size=e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text>mode [='cursor']</sc-text>
  <sc-tab
    .options=${["cursor","slider"]}
    value="cursor"
    @change=${e=>document.querySelector("#test-table").mode=e.detail.value}
  ></sc-tab>
</div>

<h3>Properties</h3>
<div>
  <sc-text>.range [=[0,1]]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-table").range=JSON.parse(e.detail.value)}
  >[0, 1]</sc-text>
</div>
<div>
  <sc-text>.value [=number[]]</sc-text>
  <sc-text>test as monitor</sc-text>
  <sc-toggle @change=${e=>e.detail.value?s.start():s.stop()}></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-table {
  width: 300px;
  height: 150px;
}
  "
  @change=${e=>(0,l.default)(e.detail.value)}
></sc-editor>
`},5289:(e,t,a)=>{function c(e,t,a,c,l=1/0){const s={},n=new Float32Array(a),i=a/t;Math.PI;let o=e/t,u=0,r=null,d=0,v=0;return s.frequency=e=>{o=e/t},s.start=()=>{!function e(){for(let e=0;e<a;e++){const t=Math.sin(2*u*Math.PI);n[e]=t,u=(u+o)%1}c(d,n),d+=i,v+=1,v<l&&(r=setTimeout(e,1e3*i))}()},s.stop=()=>{clearTimeout(r)},s}a.r(t),a.d(t,{default:()=>c})}}]);