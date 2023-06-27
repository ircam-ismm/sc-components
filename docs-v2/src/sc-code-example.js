import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-code-example</h2>

<sc-code-example language="javascript">${`
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

`;
