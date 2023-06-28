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

<div class="example">
  <h2>sc-dots</h2>

  <sc-code-example language="javascript">${`
  import { html } from 'lit';
  import '@ircam/sc-components/sc-dots.js';

  const template = html\`<sc-dots></sc-dots>\`;
  `}</sc-code-example>

  <sc-dots
    id="test-dots"
    .value=${[{ x: 0.5, y: 0.5 }]}
    @input=${e => document.querySelector('#dots-input').value = JSON5.stringify(e.detail.value, null, 2)}
  ></sc-dots>
</div>

<div class="api">
  <h3>Properties</h3>

  <div>
    <p>dot positions must contain the "x" and "y" fields</p>
    <sc-text readonly>[.value=[]]</sc-text>
    <sc-text
      style="width: 300px;"
      @change=${e => document.querySelector('#test-dots').value = JSON5.parse(e.detail.value)}
    >[{ x: 0.5, y: 0.5 }]</sc-text>
  </div>
  <div>
    <p>an optionnal "color" field can be given</p>
    <sc-text readonly>[.value=[]]</sc-text>
    <sc-text
      style="width: 300px;"
      @change=${e => document.querySelector('#test-dots').value = JSON5.parse(e.detail.value)}
    >[{ x: 0.5, y: 0.5, color: 'red' }]</sc-text>
  </div>

  <h3>Attributes</h3>

  <div>
    <sc-text readonly>[x-range=[0, 1]]</sc-text>
    <sc-text
      @change=${e => document.querySelector('#test-dots').xRange = JSON5.parse(e.detail.value)}
    >[0, 1]</sc-text>
  </div>

  <div>
    <sc-text readonly>[y-range=[0, 1]]</sc-text>
    <sc-text
      @change=${e => document.querySelector('#test-dots').yRange = JSON5.parse(e.detail.value)}
    >[0, 1]</sc-text>
  </div>

  <div>
    <p>radius of the dots in pixels (if set, takes precedence over "radius-relative")</p>
    <sc-text readonly>[radius=5]</sc-text>
    <sc-slider
      min="5"
      max="100"
      @input=${e => document.querySelector('#test-dots').radius = e.detail.value}
    >[0, 1]</sc-slider>
  </div>
  <div>
    <p>radius relative to the given ranges</p>
    <sc-text readonly>[radius-relative=null]</sc-text>
    <sc-slider
      @input=${e => {
        document.querySelector('#test-dots').radius = null;
        document.querySelector('#test-dots').radiusRelative = e.detail.value
      }}
    ></sc-slider>
  </div>

  <div style="margin-top: 30px;">
    <p>use sc-dot component as (multitouch) input interface</p>
    <sc-text readonly>[?capture-events=false]</sc-text>
    <sc-toggle
      @change=${e => document.querySelector('#test-dots').captureEvents = e.detail.value}
    ></sc-toggle>
  </div>
  <div>
    <p>"persist-events" only works if "capture-events" is set</p>
    <sc-text readonly>[?persist-events=false]</sc-text>
    <sc-toggle
      @change=${e => document.querySelector('#test-dots').persistEvents = e.detail.value}
    ></sc-toggle>

  <h3>Events</h3>

  <div>
    <p>set "capture-events" to true to get events from the interface</p>
    <sc-text readonly>[@input]</sc-text>
    <sc-text id="dots-input" readonly style="height: 200px;"></sc-text>

  </div>

  <h3>Styling</h3>
  <sc-editor
    style="width: 500px;"
    value="\
  #test-dots {
    width: 300px;
    height: 300px;
    background-color: var(--sc-color-primary-0);

    --sc-dots-opacity: 1;
    --sc-dots-color: var(--sc-color-secondary-2);
    --sc-dots-background-image: url(./assets/seating-map.png);
  }
    "
    @change=${e => applyStyle(e.detail.value)}
  ></sc-editor>

  <div>
    <sc-text readonly>debug containers</sc-text>
    <sc-toggle @change=${e => document.querySelector('#test-dots').classList.toggle('debug')}></sc-toggle>
  </div>
</div>

`;
