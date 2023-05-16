import { html } from 'lit/html.js';
import { getTime } from '@ircam/sc-gettime';

let startTime = 0;

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-progress-bar.js';

${`<sc-progress-bar></sc-progress-bar>`}
    </code></pre>

    <sc-progress-bar
      id="test-progress-bar"
      .getProgressFunction="${() => getTime() - startTime}"
      min="0"
      max="1"
    ></sc-progress-bar>

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
          const $component = document.querySelector('#test-progress-bar');
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
          const $component = document.querySelector('#test-progress-bar');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[min=0]"></sc-text>
      <sc-number
        min="0"
        value="0"
        @input="${e => {
          const $component = document.querySelector('#test-progress-bar');
          $component.min = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[max=1]"></sc-text>
      <sc-number
        min="0"
        value="1"
        @input="${e => {
          const $component = document.querySelector('#test-progress-bar');
          $component.max = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[displayNumber=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-progress-bar');
          $component.displayNumber = e.detail.value;
        }}"
      ></sc-toggle>
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
