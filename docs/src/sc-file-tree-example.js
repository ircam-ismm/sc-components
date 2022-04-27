import { html } from 'lit/html.js';

export default function () {
  const tree = {
    path: 'docs',
    name: 'docs',
    children: [
      {
        path: 'inner/docs',
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

  return html`
    <sc-file-tree
      id="test-file-tree"
      value="${JSON.stringify(tree)}"
      @input="${e => {
        const $bang = document.querySelector('#file-tree-input');
        $bang.active = true;

        const $text = document.querySelector('#file-tree-value-input');
        $text.value = JSON.stringify(e.detail.value, null, 2);
      }}"
      @change="${e => {
        console.log(e);
      }}"
    ></sc-file-tree>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@input (e.detail.value)"></sc-text>
      <sc-bang id="file-tree-input"></sc-bang>
      <sc-text readonly id="file-tree-value-input" height="130" width="300"></sc-text>
    </p>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="value=null"></sc-text>
      <sc-text
        width="300"
        height="300"
        value="${JSON.stringify(tree, null, 2)}"
        @change="${e => {
          const $component = document.querySelector('#test-file-tree');
          $component.value = JSON.parse(e.detail.value);
        }}"
      ></sc-number>
    </p>
  `;
}
