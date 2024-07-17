"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[606],{1606:(e,t,c)=>{c.r(t),c.d(t,{template:()=>r});var s=c(2182);c(1630);const r=s.qy`

<h2>sc-filter <span style="color: var(--sc-color-secondary-3); font-style:italic;">- experimental</span></h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-filter.js';\n\nconst template = html`\n  <sc-filter></sc-filter>\n`;\n"}</sc-code-example>

<sc-filter
  id="test-filter"
></sc-filter>

<h3>Properties</h3>
<div>
  <sc-text>edit-filter-index</sc-text>
  <sc-number
    min="0"
    max="1"
    integer
    @change=${e=>document.querySelector("#test-filter").editFilterIndex=e.detail.value}
  ></sc-number>
</div>

`}}]);