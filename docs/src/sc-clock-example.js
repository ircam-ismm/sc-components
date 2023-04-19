import { html } from 'lit/html.js';
import { getTime } from '@ircam/sc-gettime';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-clock.js';

${`<sc-clock></sc-clock>`}
    </code></pre>

    <sc-clock
      id="test-clock"
      .getTimeFunction="${getTime}"
    ></sc-clock>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[.getTimeFunction]"></sc-text>
    </p>
    <p>
      <sc-text readonly value="[width=400]"></sc-text>
      <sc-number
        min="30"
        max="1000"
        value="400"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-clock');
          $component.width = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[height=50]"></sc-text>
      <sc-number
        min="30"
        max="300"
        value="50"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-clock');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[fontSize=13]"></sc-text>
      <sc-number
        min="0"
        max="50"
        value="13"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-clock');
          $component.fontSize = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text width="300" readonly value="[twinkle=null] (bang to set to [0, 0.5])"></sc-text>
      <sc-bang
        @input="${e => {
          const $component = document.querySelector('#test-clock');
          $component.twinkle = [0, 0.5];
        }}"
      ></sc-bang>
    </p>
  `;
}
