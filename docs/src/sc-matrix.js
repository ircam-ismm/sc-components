import { html } from 'lit';
import JSON5 from 'json5';
import applyStyle from './utils/applyStyle.js';

function prettify(value) {
  return `[\n${value.map(row => `  [${row.join(', ')}],`).join('\n')}\n]`;
}

export const template = html`

<h2>sc-matrix</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-matrix.js';

const template = html\`<sc-matrix></sc-matrix>\`;
`}</sc-code-example>

<sc-matrix
  id="test-matrix"
  @change=${e => document.querySelector('#matrix-change').value = prettify(e.detail.value)}
></sc-matrix>

<h3>Events</h3>

<div>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly style="width: 300px; height: 150px;" id="matrix-change"></sc-text>
</div>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[rows=4]</sc-text>
  <sc-number
    integer
    min="1"
    max="32"
    value="4"
    @input=${e => document.querySelector('#test-matrix').rows = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[columns=8]</sc-text>
  <sc-number
    integer
    min="1"
    max="32"
    value="8"
    @input=${e => document.querySelector('#test-matrix').columns = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[?reset=false]</sc-text>
  <sc-bang
    @input=${e => document.querySelector('#test-matrix').reset = e.detail.value}
  ></sc-bang>
</div>

<h3>Properties</h3>
<div>
  <p>The different values a cell can take</p>
  <sc-text readonly>[.states=[0, 1]]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-matrix').states = JSON5.parse(e.detail.value)}
  >[0, 0.5, 1]</sc-text>
</div>
<div>
  <p>Change the whole matrix state at once</p>
  <sc-text readonly>[.value=[]]</sc-text>
  <sc-text
    style="height: 80px;"
    @change=${e => document.querySelector('#test-matrix').value = JSON5.parse(e.detail.value)}
  >[
  [0, 1],
  [1, 0],
]</sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  save-button
  style="width: 500px;"
  value="\
#test-matrix {
  width: 300px;
  height: 200px;
  background-color: var(--sc-color-primary-2);
  border: 1px solid var(--sc-color-primary-3);

  --sc-matrix-cell-color: #ffffff;
  --sc-matrix-cell-border: var(--sc-color-primary-5);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
