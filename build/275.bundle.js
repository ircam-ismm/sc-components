"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[275],{7275:(e,t,i)=>{i.r(t),i.d(t,{template:()=>c});var n=i(9392),a=i(1142),s=i(4670);const r={path:"docs",name:"docs",children:[{path:"docs/inner",name:"inner",children:[{path:"docs/inner/niap.md",name:"niap.md",size:1584,extension:".md",type:"file"},{path:"docs/inner/test.md",name:"test.md",size:1588,extension:".md",type:"file"}],size:3172,type:"directory"},{path:"docs/niap.md",name:"niap.md",size:1584,extension:".md",type:"file"},{path:"docs/test.md",name:"test.md",size:1588,extension:".md",type:"file"}],size:3172,type:"directory"},c=n.dy`

<h2>sc-filetree</h2>

<sc-code-example language="javascript">${"import { html } from 'lit';\nimport '@ircam/sc-components/sc-filetree.js';\n\nconst template = html`\n  <sc-filetree\n    .value=\"${JSON.stringify(tree)}\"\n  ></sc-filetree>\n`;\n"}</sc-code-example>

<sc-filetree
  id="test-filetree"
  .value=${r}
  @input=${e=>document.querySelector("#filetree-input").value=JSON.stringify(e.detail.value,null,2)}
  @change=${e=>document.querySelector("#filetree-change").value=JSON.stringify(e.detail.value,null,2)}
></sc-filetree>

<p>
  the data format used by the component to render the file tree is based on the format proposed by the <a href="https://www.npmjs.com/package/directory-tree" target="_blank">directory-tree</a> library.
</p>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-text style="width: 300px; min-height: 150px;" id="filetree-input"></sc-text>
</div>
<div>
  <p>"change" events are only propagated if "editable=true"</p>
  <sc-text>@change</sc-text>
  <sc-text style="width: 300px; height: 104px;" id="filetree-change"></sc-text>
</div>

<h3>Properties</h3>
<div>
  <p>
    add "create", "rename", "delete" interfaces on right-click.
    <br />
    (be aware that the filetree is not changed by the component itself, it only gives you the interface and commands to forward to another abstraction which should do the real work)
  </p>
  <sc-text>[editable=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-filetree").editable=e.detail.value}
  ></sc-toggle>
<div>
  <p>value of the underlying file tree</p>
  <sc-text>[.value={}]</sc-text>
  <sc-editor
    style="width: 500px; height: 500px;"
    .value=${JSON.stringify(r,null,2)}
    @change=${e=>document.querySelector("#test-filetree").value=a.parse(e.detail.value)}
  ></sc-editor>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-filetree {
  width: 30px;
  height: 30px;
}
  "
  @change=${e=>(0,s.default)(e.detail.value)}
></sc-editor>

`}}]);