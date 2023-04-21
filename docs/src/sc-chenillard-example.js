import { html } from 'lit/html.js';
import { getTime } from '@ircam/sc-gettime';

let startTime = 0;

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-chenillard.js';

${`<sc-chenillard></sc-chenillard>`}
    </code></pre>

    <sc-chenillard
      id="test-chenillard"
      .getProgressFunction="${() => getTime() - startTime}"
      min="0"
      max="1"
    ></sc-chenillard>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value=".getProgressFunction"></sc-text>
    </p>
    <p>
      <sc-text readonly value="[width=400]"></sc-text>
      <sc-number
        min="30"
        max="1000"
        value="400"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-chenillard');
          $component.width = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[height=50]"></sc-text>
      <sc-number
        min="4"
        max="300"
        value="50"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-chenillard');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[size=0.2]"></sc-text>
      <sc-number
        min="0"
        max="1"
        value="0.2"
        @input="${e => {
          const $component = document.querySelector('#test-chenillard');
          $component.size = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <h3>Test</h3>
    <p>
      <sc-text readonly value="Reset progress bar"></sc-text>
      <sc-bang
        @input=${e => { startTime = getTime() }}
      ></sc-bang>
    </p>
  `;
}
