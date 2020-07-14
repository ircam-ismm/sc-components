import { html } from 'lit-html';
import sineGenerator from './utils/sineGenerator';

export default function () {
  // dirty hack to make sure the element is in the DOM
  setTimeout(() => {
    const $signal = document.querySelector('#test-signal');

    let frame = null;
    const sine1 = sineGenerator(0.5, 25, 1, (time, data) => {
      frame = { time, data: Array.from(data) }
    });

    const sine2 = sineGenerator(1, 25, 1, (time, data) => {
      frame.data[1] = data[0] * 0.5;
      $signal.value = frame;
    });

    sine1.start();
    sine2.start();

    // setTimeout(() => {
    //   sine1.stop();
    //   sine2.stop();
    // }, 2000);
  }, 150);

  return html`
    <pre><code>
import '@ircam/simple-components/sc-signal.js';

${`<sc-signal></sc-signal>`}
    </code></pre>

    <sc-signal id="test-signal"></sc-signal>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[width=300]"></sc-text>
      <sc-number
        min="100"
        max="600"
        value="300"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-signal');
          $component.width = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[height=150]"></sc-text>
      <sc-number
        min="75"
        max="300"
        value="150"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-signal');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[min=-1]"></sc-text>
      <sc-number
        min="-10"
        max="-1"
        value="-1"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-signal');
          $component.min = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[max=1]"></sc-text>
      <sc-number
        min="1"
        max="10"
        value="1"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-signal');
          $component.max = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[duration=-1]"></sc-text>
      <sc-number
        min="1"
        max="10"
        value="1"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-signal');
          $component.duration = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[line-width=1]"></sc-text>
      <sc-number
        min="1"
        max="10"
        value="1"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-signal');
          $component.lineWidth = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[display-min-max=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-signal');
          $component.displayMinMax = e.detail.value;
        }}"
      ></sc-toggle>
    </p>

    <h3>Properties</h3>
    <p>
      <sc-text readonly width="350" value="value={ time<Number>(seconds), data<Array> }"></sc-text>
    <p>
  `;
}
