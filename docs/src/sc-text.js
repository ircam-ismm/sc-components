import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

const myVar = 'coucou';

export const template = html`

<h2>sc-text</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-text.js';

const template = html\`
  <sc-text>Hello!</sc-text>
\`;
`}</sc-code-example>

<sc-text
  id="test-text"
  @change=${e => document.querySelector('#text-change').value = e.detail.value}
>Hello!</sc-text>

<h3>Attributes</h3>
<div>
  <sc-text>value [=""]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-text').value = e.detail.value}
  >Hello!</sc-text>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-text').disabled = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?editable [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-text').editable = e.detail.value}
  ></sc-toggle>
  <p>If editable, the "change" event is trigerred on Cmd+S, Enter and on blur, the red outline indicates dirty state.</p>
</div>
<div>
  <sc-text>?multiline [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-text').multiline = e.detail.value}
  ></sc-toggle>
  <p>If multiline and editable, the "change" event is not triggered on Enter</p>
</div>
<div>
  <sc-text>placeholder [=""]</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-text').placeholder = e.detail.value}
    editable
  ></sc-text>
</div>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="text-change" multiline></sc-text>
</div>
<sc-code-example language="html">
${`\
<sc-text
  @change=\${e => console.log(e.detail.value)}
></sc-text>`}
</sc-code-example>

<!-- <div>
  <sc-text>@input</sc-text>
  <sc-text id="text-input"></sc-text>
</div>
<sc-code-example language="html">
${`\
<sc-text
  @input=\${e => console.log(e.detail.value)}
></sc-text>`}
</sc-code-example> -->


<h3>Keyboard shortcuts</h3>
<sc-text class="key">Cmd+S</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-text {
  width: 200px;
  height: 30px;
  font-size: 11px;
  border-radius: 2px;

  font-size: var(--sc-font-size);
  font-family: var(--sc-font-family);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

<!-- testing -->
<!-- <sc-text>${myVar}</sc-text> -->
`;
