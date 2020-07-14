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

      const x = (Math.random() * Math.abs(xRange[1] - xRange[0])) - xRange[0];
      const y = (Math.random() * Math.abs(yRange[1] - yRange[0])) - yRange[0];
      dots.push({ x, y });

      $dotMap.dots = dots;
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
      <sc-text readonly value="[xRange=[0, 1]]"></sc-text>
      <sc-text
        value="[0, 1]"
        @change="${e => {
          const $component = document.querySelector('#test-dot-map');
          $component.xRange = JSON.parse(e.detail.value);
        }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly value="[yRange=[0, 1]]"></sc-text>
      <sc-text
        value="[0, 1]"
        @change="${e => {
          const $component = document.querySelector('#test-dot-map');
          $component.yRange = JSON.parse(e.detail.value);
        }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly value="[dots=[]]"></sc-text>
      <sc-text id="dot-map-dots" width="300" height="300" readonly></sc-text>
    </p>
    <p>
      <sc-text readonly value="[line-width=1]"></sc-text>
      <sc-number
        min="1"
        max="10"
        value="1"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-dot-map');
          $component.lineWidth = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[display-min-max=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-dot-map');
          $component.displayMinMax = e.detail.value;
        }}"
      ></sc-toggle>
    </p>

    <p>
      <sc-text readonly width="350" value="value={ time<Number>(seconds), data<Array> }"></sc-text>
    <p>
  `;
}
