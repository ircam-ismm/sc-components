import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';
import sineGenerator from './utils/sineGenerator.js';

let sine1 = null;
let sine2 = null;
let frame = null;

export function enter() {
  const $signal = document.querySelector('#test-signal');

  let counter = 0;

  sine1 = sineGenerator(1, 60, 1, (time, data) => {
    frame = { time, data: Array.from(data) }
  });

  sine2 = sineGenerator(2, 60, 1, (time, data) => {
    frame.data[1] = data[0] * 0.5;
    $signal.value = frame;
  });

  sine1.start();
  sine2.start();
}

export function exit() {
  console.log('exit signal');
  sine1.stop();
  sine2.stop();
}

export const template = html`

<h2>sc-signal</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-slider.js';

const template = html\`<sc-slider></sc-slider>\`;
`}</sc-code-example>

<sc-signal id="test-signal"></sc-signal>

<h3>Properties</h3>

<div>
  <sc-text readonly>.value={ time, data[] }</sc-text>
  <sc-code-example language="javascript">${`
render(html\`<sc-signal></sc-signal>\`, $container);

const $signal = $container.querySelector('sc-signal');

setInterval(() => {
  const frame = {
    time: Date.now() / 1000, // time is is seconds
    data: [Math.random()],
  }

  $signal.value = frame;
}, 100);
  `}</sc-code-example>
</div>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[duration=1]</sc-text>
  <sc-number
    min="0.5"
    max="10"
    value="1"
    @change=${e => document.querySelector('#test-signal').duration = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[min=-1]</sc-text>
  <sc-number
    min="-10"
    max="0"
    value="-1"
    @change=${e => document.querySelector('#test-signal').min = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[max=1]</sc-text>
  <sc-number
    min="0"
    max="10"
    value="1"
    @change=${e => document.querySelector('#test-signal').max = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[line-width=1]</sc-text>
  <sc-number
    min="1"
    max="10"
    value="1"
    @change=${e => document.querySelector('#test-signal').lineWidth = e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[?min-max=true]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-signal').minMax = e.detail.value}
  ></sc-toggle>
</div>


`;
