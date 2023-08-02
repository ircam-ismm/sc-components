import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-next</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-next.js';

const template = html\`
  <sc-next></sc-next>
\`;
`}</sc-code-example>

<sc-next
  id="test-next"
  @input=${e => document.querySelector('#next-input').active = e.detail.value}
></sc-next>

<h3>Events</h3>
<p>
  <sc-text>@input</sc-text>
  <sc-bang id="next-input"></sc-bang>
</p>

<h3>Attributes</h3>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-next').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-next {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

<h3>Example</h3>
<div>
  <sc-prev></sc-prev>
  <sc-next></sc-next>
</div>
`;
