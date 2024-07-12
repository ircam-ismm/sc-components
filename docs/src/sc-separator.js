import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-separator</h2>

<p>Handle for resizing two consecutive flex containers</p>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-separator.js';

const template = html\`
  <div style="display: flex; flex-direction: row">
    <div style="flex-grow: 1;">
      content 1
    </div>

    <sc-separator direction="row"></sc-separator>

    <div style="flex-grow: 1;">
      content 2
    </div>
  </div>
\`;
`}</sc-code-example>

<div style="width: 400px; height: 150px; display: flex; overflow: hidden;">
  <div style="flex-grow: 1; background-color: var(--sc-color-primary-2);">
    content 1
  </div>

  <sc-separator direction="row"></sc-separator>

  <div style="flex-grow: 1; background-color: var(--sc-color-primary-3);">
    content 2
  </div>
</div>

<div style="margin: 20px 0;"></div>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-separator.js';

const template = html\`
  <div style="display: flex; flex-direction: column;">
    <div style="flex-grow: 1;">
      content 1
    </div>

    <sc-separator direction="column"></sc-separator>

    <div style="flex-grow: 1;">
      content 2
    </div>
  </div>
\`;
`}</sc-code-example>

<div style="width: 400px; height: 150px; display: flex; flex-direction: column; overflow: hidden;">
  <div style="flex-grow: 1; background-color: var(--sc-color-primary-2);">
    content 1
  </div>

  <sc-separator direction="column"></sc-separator>

  <div style="flex-grow: 1; background-color: var(--sc-color-primary-3);">
    content 2
  </div>
</div>
`;
