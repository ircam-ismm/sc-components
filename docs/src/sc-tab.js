import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

const testArray = ['a', 'b', 'c', 'd'];
const testObject = { a: true, b: 42 };

export const template = html`

<h2>sc-tab</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-tab.js';

const template = html\`
  <sc-tab
    options="\${JSON.stringify(['a', 'b', 'c', 'd'])}"
  ></sc-tab>
\`;
`}</sc-code-example>

<sc-tab
  id="test-tab"
  options="${JSON.stringify(testArray)}"
  @change=${e => document.querySelector('#options-value').value = e.detail.value}
></sc-tab>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="options-value"></sc-text>
</div>
<sc-code-example language="html">${`
<sc-tab
  @change=\${e => console.log(e.detail.name, e.detail.value)}
></sc-tab>`}
</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>value [=null]</sc-text>
  <sc-tab
    id="tab-change"
    options="${JSON.stringify(testArray)}"
    @change=${e => document.querySelector('#test-tab').value = e.detail.value}
  ></sc-tab>
</div>
<div>
  <p>Values of the different options. If an object is given, the key is used as option's text and the value as the option's value</p>
  <sc-text>options [=[]|{}]</sc-text>
  <sc-editor
    save-button
    value="${JSON.stringify(testObject, null, 2)}"
    @change=${e => {
      document.querySelector('#test-tab').options = JSON.parse(e.detail.value);
      document.querySelector('#tab-change').options = JSON.parse(e.detail.value);
    }}
  ></sc-editor>
</div>
<div>
  <sc-text>orientation [="vertical"]</sc-text>
  <sc-tab
    options="${JSON.stringify(['vertical', 'horizontal'])}"
    value="horizontal"
    @change=${e => document.querySelector('#test-tab').orientation = e.detail.value}
  ></sc-tab>
</div>
<div>
  <p><i>
    Applies for mouse interaction only. The re-ordered values are stored in local storage and retreived
    on page load, if your page is highly dynamic it is best to defined an <code>id</code> on your component
    to ensure this feature remains stable.
  </i></p>
  <sc-text>sortable [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-tab').sortable = e.detail.value}
  ></sc-toggle>
</div>
<!-- <div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-tab').disabled = e.detail.value}
  ></sc-toggle>
</div> -->

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-tab {
  width: 200px;
  height: auto;
  font-size: 11px;

  --sc-tab-selected: var(--sc-color-secondary-1);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;

