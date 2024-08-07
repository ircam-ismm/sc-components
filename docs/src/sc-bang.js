import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-bang</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-bang.js';

const template = html\`
  <sc-bang></sc-bang>
\`;
`}</sc-code-example>

<sc-bang
  id="test-bang"
  @input=${e => document.querySelector('#bang-input').active = true}
></sc-bang>

<h3>Events</h3>
<p>
  <sc-text>@input</sc-text>
  <sc-bang id="bang-input"></sc-bang>
</p>
<sc-code-example language="html">${`
<sc-bang
  @input=\${e => console.log(e.detail.value)}
></sc-bang>
`}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>?active [=false]</sc-text>
  <sc-bang
    @input=${e => document.querySelector('#test-bang').active = true}
  ></sc-bang>
</div>
<p>Use the "live" directive to make the element reactive to external events:</p>
<sc-code-example language="javascript">${`
import { html } from 'lit';
import { live } from 'lit/directives/live.js';
import '@ircam/sc-components/sc-bang.js';

html\`
  <sc-bang
    ?active=\${live(myFlag)}
  ></sc-bang>
\`;
`}</sc-code-example>

<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-bang').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-bang {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
