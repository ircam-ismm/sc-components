"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[245],{9245:(e,t,c)=>{c.r(t),c.d(t,{template:()=>d});var s=c(2182),n=c(1630),i=c(2247);const o=Object.keys(i.A),a="question";let l=null,u=null,r=null;const d=s.qy`

<h2>sc-icon</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-icon.js';\n\nconst template = html`\n  <sc-icon\n    type=\"network\"\n    value=\"my-icon\"\n  ></sc-icon>\n`;\n"}</sc-code-example>

<sc-icon
  id="test-icon"
  value="my-icon"
  type="${a}"
  @input=${e=>{document.querySelector("#icon-input").active=!0;const t=document.querySelector("#icon-value-input");t.value=e.detail.value,clearTimeout(l),l=setTimeout((()=>t.value=""),500)}}
  @press=${e=>{document.querySelector("#icon-press").active=!0;const t=document.querySelector("#icon-value-press");t.value=e.detail.value,clearTimeout(u),u=setTimeout((()=>t.value=""),500)}}
  @release=${e=>{document.querySelector("#icon-release").active=!0;const t=document.querySelector("#icon-value-release");t.value=e.detail.value,clearTimeout(r),r=setTimeout((()=>t.value=""),500)}}
></sc-icon>

<p>
  <i>Vectors and icons by <a href="https://www.svgrepo.com" target="_blank">SVG Repo</a></i>
</p>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-bang id="icon-input"></sc-bang>
  <sc-text id="icon-value-input"></sc-text>
</div>
<div>
  <sc-text>@press</sc-text>
  <sc-bang id="icon-press"></sc-bang>
  <sc-text id="icon-value-press"></sc-text>
</div>
<div>
  <sc-text>@release</sc-text>
  <sc-bang id="icon-release"></sc-bang>
  <sc-text id="icon-value-release"></sc-text>
</div>
<sc-code-example language="html">${'\n<sc-icon\n  type="burger"\n  value="menu"\n  @input=${e => console.log(e.detail.value)}\n></sc-icon>\n'}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>type [="question"]</sc-text>
  <sc-radio
    options="${JSON.stringify(o)}"
    value="${a}"
    @change=${e=>document.querySelector("#test-icon").type=e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>?active [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-icon").active=e.detail.value}
  ></sc-toggle>
</div>
<div>
  <p>Value propagated within the event</p>
  <sc-text>value [=null]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-icon").value=e.detail.value}
  ></sc-text>
</div>
<div>
  <p>If set, the button will act as a link with <code>target="_blank"</code></p>
  <sc-text>href [=null]</sc-text>
  <sc-text
    editable
    @change=${e=>document.querySelector("#test-icon").href=e.detail.value}
  >https://soundworks.dev</sc-text>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-icon").disabled=e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-icon {
  width: 30px;
  height: 30px;
  --sc-icon-color: white;
  --sc-icon-active: var(--sc-color-secondary-3);
}
  "
  @change=${e=>(0,n.default)(e.detail.value)}
></sc-editor>

<h3>With inner value</h3>
<sc-icon
  @input=${e=>console.log("coucou asco")}
>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1792 1792" xml:space="preserve">
    <path d="M187.8,1659L896,200.9L1604.2,1659L896,1285.5L187.8,1659z"/>
  </svg>
</sc-icon>

`}}]);