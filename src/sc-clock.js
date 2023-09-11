import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-clock</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-clock.js';

const template = html\`
  <sc-clock></sc-clock>
\`;
`}</sc-code-example>

<sc-clock id="test-clock"></sc-clock>

<h3>Attributes</h3>
<div>
  <sc-text>format [="hh:mm:ss:ms"]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-clock').format = e.detail.value}
  >hh:mm:ss:ms</sc-text>
</div>
<div>
  <sc-text>?twinkle [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-clock').twinkle = e.detail.value}
  ></sc-toggle>
</div>

<h3>Properties</h3>
<div>
  <sc-text>.getTimeFunction</sc-text>
  <sc-editor
    save-button
    style="width: 420px;"
    value="\
const $clock = document.querySelector('#test-clock');
const startTime = Date.now();
// return a time in seconds
$clock.getTimeFunction = () => {
  const dt = Date.now() - startTime;
  return dt / 1000;
}
"
    @change=${e => eval(e.detail.value)}
  ></sc-editor>
  <p>By default, retrieves the time from the locale date/time</p>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-clock {
  width: 200px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
