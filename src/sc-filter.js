import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-filter <span style="color: var(--sc-color-secondary-3); font-style:italic;">- experimental</span></h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-filter.js';

const template = html\`
  <sc-filter></sc-filter>
\`;
`}</sc-code-example>

<sc-filter
  id="test-filter"
></sc-filter>

<h3>Properties</h3>
<div>
  <sc-text>edit-filter-index</sc-text>
  <sc-number
    min="0"
    max="1"
    integer
    @change=${e => document.querySelector('#test-filter').editFilterIndex = e.detail.value}
  ></sc-number>
</div>

`;
