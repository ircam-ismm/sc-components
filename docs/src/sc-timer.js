import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-text</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import { live } from 'lit/directives/live.js';
import '@ircam/sc-components/sc-timer.js';

const template = html\`
  <sc-timer duration="5" ?active=\${live(flag)}></sc-timer>
\`;
`}</sc-code-example>

<sc-timer id="test-timer"></sc-timer>

<h3>Attributes</h3>
<div>
  <sc-text>duration [=1]</sc-text>
  <sc-number
    value="1"
    integer
    @input=${e => document.querySelector('#test-timer').duration = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>?active [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-timer').active = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?loop [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-timer').loop = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-timer {
  width: 30px;
  height: 30px;
  background-color: var(--sc-color-primary-2);
  border: 1px solid var(--sc-color-primary-3);
  padding: 4px;

  --sc-slider-background-fill-color: var(--sc-color-primary-2);
  --sc-slider-foreground-fill-color: var(--sc-color-secondary-1);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
