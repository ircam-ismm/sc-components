"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[262],{8262:(e,t,i)=>{i.r(t),i.d(t,{template:()=>n});var s=i(2182),c=i(1967),a=i(1630);const r={path:"docs",name:"docs",children:[{path:"docs/TODOS.md",name:"TODOS.md",size:1588,extension:".md",type:"file"},{path:"docs/src",name:"src",children:[{path:"docs/src/index.js",name:"index.js",size:1584,extension:".md",type:"file"},{path:"docs/src/utils.js",name:"utils.js",size:1588,extension:".md",type:"file"}],size:3172,type:"directory"},{path:"docs/README.md",name:"README.md",size:1584,extension:".md",type:"file"},{path:"docs/www",name:"www",children:[{path:"docs/www/index.html",name:"index.html",size:1584,extension:".md",type:"file"},{path:"docs/www/styles.css",name:"styles.css",size:1588,extension:".md",type:"file"}],size:3172,type:"directory"}],size:3172,type:"directory"},n=s.qy`

<h2>sc-filetree</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-filetree.js';\n\nconst template = html`\n  <sc-filetree\n    .value=\"${JSON.stringify(tree)}\"\n  ></sc-filetree>\n`;\n"}</sc-code-example>

<sc-filetree
  id="test-filetree"
  .value=${r}
  editable
  @input=${e=>document.querySelector("#filetree-input").value=JSON.stringify(e.detail.value,null,2)}
  @change=${e=>document.querySelector("#filetree-change").value=JSON.stringify(e.detail.value,null,2)}
></sc-filetree>

<p>
  The data format used by the component to render the file tree is based on the format proposed by the <a href="https://www.npmjs.com/package/directory-tree" target="_blank">directory-tree</a> library.
  <br />
  Note that for now only the fields: "name", "path", and "type" of the entries are actually used by the component.
</p>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-text style="width: 300px; min-height: 150px;" id="filetree-input"></sc-text>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-text style="width: 300px; height: 104px;" id="filetree-change"></sc-text>
  <p><i>Note that "change" events are only propagated if "editable=true"</i></p>
</div>

<h3>Properties</h3>
<div>
  <p>Value of the underlying file tree</p>
  <sc-text>.value [={}]</sc-text>
  <sc-editor
    style="width: 500px; height: 500px;"
    language="json"
    .value=${JSON.stringify(r,null,2)}
    @change=${e=>document.querySelector("#test-filetree").value=c.parse(e.detail.value)}
  ></sc-editor>
</div>

<h3>Attributes</h3>
<div>
  <p>
    Add context menu with "create", "rename" and "delete" interfaces on right-click.
    <br /><br />
    <i>Be aware that the filetree is not changed by the component itself, it only gives you the commands and informations to be forwarded to another abstraction which should do the real job</i>
  </p>
  <sc-text>?editable [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-filetree").editable=e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-filetree {
  color: #cccccc;
  width: 300px;
  height: 150px;

  background-color: var(--sc-color-primary-2);
  --sc-filetree-hover-background-color: var(--sc-color-primary-3);
  --sc-filetree-active-background-color: var(--sc-color-primary-4);
}
  "
  @change=${e=>(0,a.default)(e.detail.value)}
></sc-editor>

`}}]);