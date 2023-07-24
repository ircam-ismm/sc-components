import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-slider</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-slider.js';

const template = html\`
  <sc-slider></sc-slider>
\`;
`}</sc-code-example>

<sc-slider
  id="test-slider"
  @input=${e => document.querySelector('#slider-input').value = e.detail.value}
  @change=${e => document.querySelector('#slider-change').value = e.detail.value}
></sc-slider>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-number id="slider-input"></sc-number>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-number id="slider-change"></sc-number>
</div>


<h3>Attributes</h3>
<div>
  <sc-text>[min=0]</sc-text>
  <sc-number value="0" integer
    @input=${e => document.querySelector('#test-slider').min = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[max=1]</sc-text>
  <sc-number value="1" integer
    @input=${e => document.querySelector('#test-slider').max = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[value=0.5]</sc-text>
  <sc-number value="0.5"
    @input=${e => document.querySelector('#test-slider').value = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[step=0.001]</sc-text>
  <sc-number value="0.001"
    @input=${e => document.querySelector('#test-slider').step = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>[?number-box=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-slider').numberBox = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>[orientation="horizontal"]</sc-text>
  <sc-radio
    options=${JSON.stringify(['horizontal', 'vertical'])}
    value="horizontal"
    @change=${e => document.querySelector('#test-slider').orientation = e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>[?relative=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-slider').relative = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-slider').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-slider {
  width: 200px;
  height: 30px;
  --sc-slider-background-color: var(--sc-color-primary-2);
  --sc-slider-foreground-color: var(--sc-color-primary-5);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
