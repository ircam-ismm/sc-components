import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-editor</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-editor.js';

const template = html\`<sc-editor></sc-editor>\`;
`}</sc-code-example>

<sc-editor
  id="test-editor"
  value="\
function test() {
  return 42;
}"
  @change=${e => document.querySelector('#editor-change').value = e.detail.value}
></sc-editor>

<sc-code-example language="markdown">${`
The red line on the left shows if the editor is in dirty state, i.e. if the content has been changed but not saved yet.

The "change" event is triggered when:
- "Cmd+S" is pressed
- on click on the "floppy disc" button if the "saev-button" attribute is set to true
`}</sc-code-example>

<h3>Events</h3>
<div>
  <sc-text readonly>@change</sc-text>
  <sc-editor id="editor-change"></sc-bang>
</div>

<h3>Attributes</h3>

<div>
  <sc-text readonly>[value='']</sc-text>
  <sc-editor
    value="const myValue = true;"
    @change=${e => document.querySelector('#test-editor').value = e.detail.value}
  ></sc-editor>
</div>
<div>
  <sc-text readonly>[save-button=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-editor').saveButton = e.detail.value}
  ></sc-toggle>
  <pre><code class="language-markdown">Note that the button only appears whens the editor is in "dirty" state</pre></code>
</div>
<div>
  <sc-text readonly>[dirty=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-editor').dirty = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  resizable
  value="\
#test-editor {
  width: 300px;
  height: 200px;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
