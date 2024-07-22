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
  <sc-number readonly id="slider-input"></sc-number>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-number readonly id="slider-change"></sc-number>
</div>


<h3>Attributes</h3>
<div>
  <sc-text>min [=0]</sc-text>
  <sc-number value="0" integer
    @input=${e => document.querySelector('#test-slider').min = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>max [=1]</sc-text>
  <sc-number value="1" integer
    @input=${e => document.querySelector('#test-slider').max = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>value [=0.5]</sc-text>
  <sc-number value="0.5"
    @input=${e => document.querySelector('#test-slider').value = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>step [=0.001]</sc-text>
  <sc-number value="0.001"
    @input=${e => document.querySelector('#test-slider').step = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text>?number-box [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-slider').numberBox = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>orientation [="horizontal"]</sc-text>
  <sc-radio
    options=${JSON.stringify(['horizontal', 'vertical'])}
    value="horizontal"
    @change=${e => document.querySelector('#test-slider').orientation = e.detail.value}
  ></sc-radio>
</div>
<div>
  <sc-text>?relative [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-slider').relative = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?disabled [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-slider').disabled = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>mode [='lin']</sc-text>
  <sc-tab
    value="lin"
    .options=${['lin', 'exp', 'log']}
    @change=${e => document.querySelector('#test-slider').mode = e.detail.value}
  ></sc-tab>
</div>
<div>
  <sc-text>modeBase [=2]</sc-text>
  <sc-number
    value="2"
    min="0.01"
    max="100"
    @change=${e => document.querySelector('#test-slider').modeBase = e.detail.value}
  ></sc-number>
  <p style="font-style:italic;">Only applies if "mode" is "exp" or "log"</p>
</div>

<h3>Properties</h3>
<div>
  <sc-text>.lookupTable [=null] </sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-slider').lookupTable = JSON.parse(e.detail.value)}
  >[0, 1, 4]</sc-text>
  <p style="font-style:italic;">
    Sequence of numbers to use as a transfert function for mapping between component and values.
    <br />
    If set, take precedence over "mode", "min" and "max" attributes
  </p>
</div>

<h3>Keyboard shortcuts</h3>
<sc-text class="key large">←</sc-text>
<sc-text class="key large">↑</sc-text>
<sc-text class="key large">→</sc-text>
<sc-text class="key large">↓</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
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
