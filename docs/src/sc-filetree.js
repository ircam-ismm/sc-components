import { html } from 'lit';
import JSON5 from 'json5';
import applyStyle from './utils/applyStyle.js';

const tree = {
  path: 'docs',
  name: 'docs',
  children: [
    {
      path: 'docs/inner',
      name: 'inner',
      children: [
        {
          path: 'docs/inner/niap.md',
          name: 'niap.md',
          size: 1584,
          extension: '.md',
          type: 'file'
        },
        {
          path: 'docs/inner/test.md',
          name: 'test.md',
          size: 1588,
          extension: '.md',
          type: 'file'
        }
      ],
      size: 3172,
      type: 'directory'
    },
    {
      path: 'docs/niap.md',
      name: 'niap.md',
      size: 1584,
      extension: '.md',
      type: 'file'
    },
    {
      path: 'docs/test.md',
      name: 'test.md',
      size: 1588,
      extension: '.md',
      type: 'file'
    },
  ],
  size: 3172,
  type: 'directory'
};

export const template = html`

<h2>sc-filetree</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-filetree.js';

const template = html\`
  <sc-filetree
    .value="\${JSON.stringify(tree)}"
  ></sc-filetree>
\`;
`}</sc-code-example>

<sc-filetree
  id="test-filetree"
  .value=${tree}
  editable
  @input=${e => document.querySelector('#filetree-input').value = JSON.stringify(e.detail.value, null, 2)}
  @change=${e => document.querySelector('#filetree-change').value = JSON.stringify(e.detail.value, null, 2)}
></sc-filetree>

<p>
  The data format used by the component to render the file tree is based on the format proposed by the <a href="https://www.npmjs.com/package/directory-tree" target="_blank">directory-tree</a> library.
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
    .value=${JSON.stringify(tree, null, 2)}
    @change=${e => document.querySelector('#test-filetree').value = JSON5.parse(e.detail.value)}
  ></sc-editor>
</div>

<h3>Attributes</h3>
<div>
  <p>
    Add "create", "rename", "delete" interfaces on right-click.
    <br /><br />
    <i>Be aware that the filetree is not changed by the component itself, it only gives you the commands and informations to be forwarded to another abstraction which should do the real job</i>
  </p>
  <sc-text>?editable [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-filetree').editable = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
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
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
