"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[633],{3633:(e,o,n)=>{n.r(o),n.d(o,{template:()=>t});var r=n(2182);n(1630);const t=r.qy`

<h2>sc-separator</h2>

<p>Handle for resizing two consecutive flex containers</p>

<sc-code-example language="javascript">${'import { html } from \'lit\';\nimport \'@ircam/sc-components/sc-separator.js\';\n\nconst template = html`\n  <div style="display: flex; flex-direction: row">\n    <div style="flex-grow: 1;">\n      content 1\n    </div>\n\n    <sc-separator direction="row"></sc-separator>\n\n    <div style="flex-grow: 1;">\n      content 2\n    </div>\n  </div>\n`;\n'}</sc-code-example>

<div style="width: 400px; height: 150px; display: flex; overflow: hidden;">
  <div style="flex-grow: 1; background-color: var(--sc-color-primary-2);">
    content 1
  </div>

  <sc-separator direction="row"></sc-separator>

  <div style="flex-grow: 1; background-color: var(--sc-color-primary-3);">
    content 2
  </div>
</div>

<div style="margin: 20px 0;"></div>

<sc-code-example language="javascript">${'import { html } from \'lit\';\nimport \'@ircam/sc-components/sc-separator.js\';\n\nconst template = html`\n  <div style="display: flex; flex-direction: column;">\n    <div style="flex-grow: 1;">\n      content 1\n    </div>\n\n    <sc-separator direction="column"></sc-separator>\n\n    <div style="flex-grow: 1;">\n      content 2\n    </div>\n  </div>\n`;\n'}</sc-code-example>

<div style="width: 400px; height: 150px; display: flex; flex-direction: column; overflow: hidden;">
  <div style="flex-grow: 1; background-color: var(--sc-color-primary-2);">
    content 1
  </div>

  <sc-separator direction="column"></sc-separator>

  <div style="flex-grow: 1; background-color: var(--sc-color-primary-3);">
    content 2
  </div>
</div>
`}}]);