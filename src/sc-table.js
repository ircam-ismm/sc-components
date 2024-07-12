import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';
import sineGenerator from './utils/sineGenerator.js';

const sine = sineGenerator(2, 100, 12, (time, buffer) => {
  const $el = document.querySelector('#test-table');
  const [min, max] = $el.range;

  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = min + ((buffer[i] + 1) / 2) * (max - min);
  }
  document.querySelector('#test-table').value = buffer;
});

export const template = html`

<h2>sc-table</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-table.js';

const template = html\`
  <sc-table></sc-table>
\`;
`}</sc-code-example>

<sc-table
  id="test-table"
  @change=${e => {
    if (document.querySelector('#table-change')) {
      document.querySelector('#table-change').active = true;
      document.querySelector('#table-value-change').value = JSON.stringify(e.detail.value);
    }
  }}
  @input=${e => {
    document.querySelector('#table-input').active = true;
    document.querySelector('#table-value-input').value = JSON.stringify(e.detail);
  }}
></sc-table>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-bang id="table-change"></sc-bang>
  <sc-text id="table-value-change"></sc-text>
</div>
<div>
  <sc-text>@input</sc-text>
  <sc-bang id="table-input"></sc-bang>
  <sc-text id="table-value-input"></sc-text>
</div>
<sc-code-example language="javascript">${`
<sc-table
  @change=\${e => console.log(e.detail.value)}
  @input=\${e => console.log(e.detail.index, e.detail.value)}
></sc-table>
`}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>size [=32]</sc-text>
  <sc-number
    min="1"
    max="1024"
    step="1"
    value="32"
    @change=${e => document.querySelector('#test-table').size = e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text>mode [='cursor']</sc-text>
  <sc-tab
    .options=${['cursor', 'slider']}
    value="cursor"
    @change=${e => document.querySelector('#test-table').mode = e.detail.value}
  ></sc-tab>
</div>

<h3>Properties</h3>
<div>
  <sc-text>.range [=[0,1]]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-table').range = JSON.parse(e.detail.value)}
  >[0, 1]</sc-text>
</div>
<div>
  <sc-text>.value [=number[]]</sc-text>
  <sc-text>test as monitor</sc-text>
  <sc-toggle @change=${e => e.detail.value ? sine.start() : sine.stop()}></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-table {
  width: 300px;
  height: 150px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
