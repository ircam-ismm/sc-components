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
  @input=${e => document.querySelector('#filetree-input').value = JSON.stringify(e.detail.value, null, 2)}
  @change=${e => document.querySelector('#filetree-change').value = JSON.stringify(e.detail.value, null, 2)}
></sc-filetree>

<p>
the data format used by the component is based on the format proposed by the <a href="https://www.npmjs.com/package/directory-tree" target="_blank">directory-tree</a> library.
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
    add "create", "rename", "delete" interfaces on the filetree, be aware that the value
    is never changed by the components, it only gives you commands to forward to
    another abstraction which should do the real work
  </p>
  <sc-text>[editable=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-filetree').editable = e.detail.value}
  ></sc-toggle>
<div>
  <p>value of the underlying file tree</p>
  <sc-text>[.value={}]</sc-text>
  <sc-editor
    style="width: 500px; height: 500px;"
    .value=${JSON.stringify(tree, null, 2)}
    @change=${e => document.querySelector('#test-filetree').value = JSON5.parse(e.detail.value)}
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
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
