import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-code-example</h2>

<sc-code-example
  language="javascript"
  id="test-code-example"
>${`
import { html } from 'lit';
import '@ircam/sc-components/sc-code-example.js';

const template = html\`
  <sc-code-example language="javascript">
    const a = 42;
  </sc-code-example>
\`;
`}</sc-code-example>

<h3>Attributes</h3>

<div>
  <sc-text>language [="javascript"]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-code-example').language = e.detail.value}
  >javascript</sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-code-example {
  width: 100%;
  height: auto;
  --sc-code-example-padding: 1em;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
