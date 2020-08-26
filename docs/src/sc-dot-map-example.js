import { html } from 'lit-html';

export default function () {
  // dirty hack to make sure the element is in the DOM
  setTimeout(() => {
    const $dotMap = document.querySelector('#test-dot-map');
    const $dotMapDots = document.querySelector('#dot-map-dots');
    const dots = [];

    setInterval(() => {
      if (dots.length > 20) {
        const removeIndex = Math.floor(Math.random() * dots.length);
        dots.splice(removeIndex, 1);
      }

      const xRange = $dotMap.xRange;
      const yRange = $dotMap.yRange;

      const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
      const y = Math.random() * (yRange[1] - yRange[0]) + yRange[0];
      dots.push({ x, y });

      $dotMap.value = dots;
      $dotMapDots.value = JSON.stringify(dots, null, 2);
    }, 500);
  }, 150);

  return html`
    <pre><code>
import '@ircam/simple-components/sc-dot-map.js';

${`<sc-dot-map></sc-dot-map>`}
    </code></pre>

    <sc-dot-map
      id="test-dot-map"
      style="outline: 1px solid #454545"
    ></sc-dot-map>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[width=300]"></sc-text>
      <sc-number
        min="150"
        max="600"
        value="300"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-dot-map');
          $component.width = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[height=300]"></sc-text>
      <sc-number
        min="150"
        max="600"
        value="300"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-dot-map');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[x-range=[0, 1]] (l -> r)"></sc-text>
      <sc-text
        value="[0, 1]"
        @change="${e => {
          const $component = document.querySelector('#test-dot-map');
          $component.xRange = JSON.parse(e.detail.value);
        }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly value="[y-range=[0, 1]] (t -> b)"></sc-text>
      <sc-text
        value="[0, 1]"
        @change="${e => {
          const $component = document.querySelector('#test-dot-map');
          $component.yRange = JSON.parse(e.detail.value);
        }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly height="42" value="[dots=[]] \n(dot={ x, y[, color, ...])"></sc-text>
      <sc-text id="dot-map-dots" width="300" height="150" readonly></sc-text>
    </p>

    <h4>As input</h4>
    <p>
      <sc-text readonly value="[capture-event=false]"></sc-text>
      <sc-toggle
        active
        @change="${e => {
          const $component = document.querySelector('#test-dot-map-2');
          $component.captureEvents = e.detail.value;
        }}"
      ></sc-toggle>
      <sc-dot-map
        id="test-dot-map-2"
        capture-events
        @input="${e => {
          const $component = document.querySelector('#dot-map-change');
          $component.value = JSON.stringify(e.detail.value, null, 2);
        }}"
      ></sc-dot-map>
    </p>
    <p>
      <sc-text readonly value="[persist-event=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-dot-map-2');
          $component.persistEvents = e.detail.value;
        }}"
      ></sc-toggle>
    </p>
    <p>
      <sc-text readonly value="[background-image=null]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-dot-map-2');
          if (e.detail.value === true) {
            $component.backgroundImage = 'images/seating-map.png';
          } else {
            $component.backgroundImage = null;
          }
        }}"
      ></sc-toggle>
    </p>
    <p>
      <sc-text readonly value="@change"></sc-text>
      <sc-text id="dot-map-change" width="300" height="120" readonly></sc-text>
    </p>
  `;
}
