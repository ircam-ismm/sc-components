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

const template = html\`
  <sc-matrix></sc-matrix>
\`;
`}</sc-code-example>

<sc-matrix
  id="test-matrix"
  @change=${e => document.querySelector('#matrix-change').value = prettify(e.detail.value)}
></sc-matrix>

<h3>Events</h3>

<div>
  <sc-text>@change</sc-text>
  <sc-text style="width: 300px; height: 150px;" id="matrix-change"></sc-text>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>rows=4</sc-text>
  <sc-number
    integer
    min="1"
    max="32"
    value="4"
    @input=${e => document.querySelector('#test-matrix').rows = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>columns=8</sc-text>
  <sc-number
    integer
    min="1"
    max="32"
    value="8"
    @input=${e => document.querySelector('#test-matrix').columns = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>?reset=false</sc-text>
  <sc-bang
    @input=${e => document.querySelector('#test-matrix').reset = e.detail.value}
  ></sc-bang>
</div>
<div>
  <sc-text>?disabled=false</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-matrix').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Properties</h3>
<div>
  <p>The different values a cell can take (in order)</p>
  <sc-text>.states=[0, 1]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-matrix').states = JSON5.parse(e.detail.value)}
  >[0, 0.5, 1]</sc-text>
</div>
<div>
  <p>Setting value changes the whole matrix state</p>
  <sc-text>.value=[]</sc-text>
  <sc-text
    editable
    style="height: 80px;"
    @change=${e => document.querySelector('#test-matrix').value = JSON5.parse(e.detail.value)}
  >[
  [0, 1],
  [1, 0],
]</sc-text>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-matrix {
  width: 300px;
  height: 200px;
  background-color: var(--sc-color-primary-2);
  border: 1px solid var(--sc-color-primary-3);

  --sc-matrix-cell-color: #ffffff;
  --sc-matrix-cell-border: var(--sc-color-primary-4);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
