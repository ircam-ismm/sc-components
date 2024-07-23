import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-qrcode</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-qrcode.js';

const template = html\`
  <sc-qrcode></sc-qrcode>
\`;
`}</sc-code-example>

<sc-qrcode id="test-qrcode"></sc-qrcode>

<h3>Attributes</h3>
<div>
  <sc-text>value [='https://ircam-ismm.github.io/sc-components/']</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-qrcode').value = e.detail.value}
  >http://soundworks.dev/</sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-qrcode {
  width: 200px;
  height: 200px;
  background-color: var(--sc-color-primary-1);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;

