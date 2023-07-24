import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-keyboard</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-keyboard.js';

const template = html\`<sc-keyboard></sc-keyboard>\`;
`}</sc-code-example>

<sc-keyboard
  id="test-keyboard"
  @input=${e => document.querySelector('#keyboard-input').value = e.detail.value}
></sc-keyboard>

`;
