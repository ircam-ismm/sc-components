import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-flash</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-flash.js';

const template = html\`<sc-flash></sc-flash>\`;
`}</sc-code-example>

<sc-flash
  id="test-flash"
  @input=${e => document.querySelector('#bang-input').active = true}
></sc-flash>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[active=false]</sc-text>
  <sc-bang
    @input=${e => document.querySelector('#test-flash').active = true}
  ></sc-bang>
</div>
<p>use the "live" directive to make the element reactive to external to events:</p>
<sc-code-example language="javascript">${`
import { html } from 'lit';
import { live } from 'lit/directives/live.js';

html\`
  <sc-flash
    ?active=\${live(myFlag)}
  ></sc-flash>
\`;
`}</sc-code-example>

<div>
  <p>duration of the flash, expressed in seconds:</p>
  <sc-text readonly>[duration=0.05]</sc-text>
  <sc-number
    value="0.05"
    min="0.01"
    max="1"
    @change=${e => document.querySelector('#test-flash').duration = e.detail.value}
  ></sc-number>
</div>


<h3>Styling</h3>
<sc-editor
  save-button
  value="\
#test-flash {
  width: 100px;
  height: 30px;
  background-color: var(--sc-color-primary-1);
  border: 1px solid var(--sc-color-primary-3);

  --sc-flash-active: var(--sc-color-secondary-3);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;

