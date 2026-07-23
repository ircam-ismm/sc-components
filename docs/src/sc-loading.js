import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-loading</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-loading.js';

const template = html\`
  <sc-loading></sc-loading>
\`;
`}</sc-code-example>

<sc-loading id="test-loading"></sc-loading>

<h3>Properties</h3>
<div>
  <sc-text>type [=square] </sc-text>
  <sc-radio
    .options=${['square', 'horizontal', 'vertical']}
    value="square"
    @change=${e => document.querySelector('#test-loading').type = e.detail.value}
  ></sc-radio>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-loading {
  width: 50px;
  height: 50px;
  grid-gap: 4px;

  --sc-loading-color: var(--sc-color-primary-4);
  --sc-loading-duration: 3s;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
