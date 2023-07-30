import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-midi-learn</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-midi-learn.js';

const template = html\`
  <sc-midi-learn></sc-midi-learn>
\`;
`}</sc-code-example>

<sc-midi-learn
  id="test-midi-learn"
></sc-midi-learn>

<div>
  <sc-slider></sc-slider>
  <sc-bang></sc-bang>
  <sc-toggle></sc-toggle>
  <sc-button></sc-button>
</div>

`;
