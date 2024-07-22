import { html } from 'lit';
import JSON5 from 'json5';
import applyStyle from './utils/applyStyle.js';

// dirty hack to make sure the element is in the DOM
// setTimeout(() => {
//   const $dotMap = document.querySelector('#test-dots');
//   // const $dotMapDots = document.querySelector('#dots-dots');
//   const dots = [];

//   setInterval(() => {
//     if (dots.length > 20) {
//       const removeIndex = Math.floor(Math.random() * dots.length);
//       dots.splice(removeIndex, 1);
//     }

//     const xRange = $dotMap.xRange;
//     const yRange = $dotMap.yRange;

//     const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
//     const y = Math.random() * (yRange[1] - yRange[0]) + yRange[0];
//     dots.push({ x, y });

//     $dotMap.value = dots;
//     // $dotMapDots.value = JSON.stringify(dots, null, 2);
//   }, 500);
// }, 150);

export const template = html`

<h2>sc-dots</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-dots.js';

const template = html\`
  <sc-dots
    .value=\${[{ x: 0.5, y: 0.5 }]}
  ></sc-dots>
\`;
`}</sc-code-example>

<sc-dots
  id="test-dots"
  .value=${[{ x: 0.5, y: 0.5 }]}
  @input=${e => document.querySelector('#dots-input').value = JSON5.stringify(e.detail.value, null, 2)}
></sc-dots>

<h3>Properties</h3>

<div>
  <sc-text>.value [=[]]</sc-text>
  <sc-text
    editable
    multiline
    style="width: 300px;"
    @change=${e => document.querySelector('#test-dots').value = JSON5.parse(e.detail.value)}
  >[{ x: 0.5, y: 0.5 }]</sc-text>
  <p>Each "dots" position must contain a "x" and a "y" field</p>
  <p>An optionnal "color" field can also be given</p>
  <sc-text style="background-color: transparent"></sc-text>
  <sc-text
    editable
    multiline
    style="width: 300px;"
    @change=${e => document.querySelector('#test-dots').value = JSON5.parse(e.detail.value)}
  >[{ x: 0.5, y: 0.5, color: 'red' }]</sc-text>
</div>

<h3>Attributes</h3>

<div>
  <sc-text>x-range [=[0, 1]]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-dots').xRange = JSON5.parse(e.detail.value)}
  >[0, 1]</sc-text>
</div>

<div>
  <sc-text>y-range [=[0, 1]]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-dots').yRange = JSON5.parse(e.detail.value)}
  >[0, 1]</sc-text>
</div>

<div>
  <p>Radius of the dots in pixels</p>
  <sc-text>radius [=5]</sc-text>
  <sc-slider
    min="5"
    max="100"
    @input=${e => document.querySelector('#test-dots').radius = e.detail.value}
  >[0, 1]</sc-slider>
</div>
<div>
  <p>Radius relative to the given ranges</p>
  <sc-text>radius-relative [=null]</sc-text>
  <sc-slider
    @input=${e => {
      document.querySelector('#test-dots').radius = null;
      document.querySelector('#test-dots').radiusRelative = e.detail.value
    }}
  ></sc-slider>
</div>

<div style="margin-top: 30px;">
  <p>Use the component as a multitouch input interface</p>
  <sc-text>?capture-events [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-dots').captureEvents = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <p>If "capture-events" is true, persist the last position(s) on the component</p>
  <sc-text>?persist-events [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-dots').persistEvents = e.detail.value}
  ></sc-toggle>

<h3>Events</h3>

<div>
  <p>If "capture-events" is true</p>
  <sc-text>@input</sc-text>
  <sc-text id="dots-input" style="height: 200px;"></sc-text>

</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-dots {
  width: 300px;
  height: 300px;
  background-color: var(--sc-color-primary-1);

  --sc-dots-opacity: 1;
  --sc-dots-color: var(--sc-color-secondary-2);
  --sc-dots-background-image: url(./assets/seating-map.png);
  --sc-dots-background-color: var(--sc-color-primary-1);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

<div>
  <sc-text readonly>debug containers</sc-text>
  <sc-toggle @change=${e => document.querySelector('#test-dots').classList.toggle('debug')}></sc-toggle>
</div>

`;
