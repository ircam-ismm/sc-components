import { html } from 'lit/html.js';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-number.js';

${`<sc-number></sc-number>`}
    </code></pre>

    <sc-number
      id="test-number"
      value="0"
      @input="${e => {
        const $event = document.querySelector('#number-input');
        $event.value = e.detail.value;
      }}"
      @change="${e => {
        const $event = document.querySelector('#number-change');
        $event.value = e.detail.value;
      }}"
    ></sc-number>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@input (e.detail.value)"></sc-text>
      <sc-number id="number-input"></sc-number>
    </p>
    <p>
      <sc-text readonly value="@change (e.detail.value)"></sc-text>
      <sc-number id="number-change"></sc-number>
    </p>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[width=100]"></sc-text>
      <sc-number
        min="30"
        max="300"
        value="100"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-number');
          $component.width = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[height=30]"></sc-text>
      <sc-number
        min="30"
        max="300"
        value="30"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-number');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[min=-Infinity]"></sc-text>
      <sc-number
        max="0"
        value="-9999"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-number');
          $component.min = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[max=+Infinity]"></sc-text>
      <sc-number
        min="1"
        value="9999"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-number');
          $component.max = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[value=0]"></sc-text>
      <sc-number
        value="0"
        @input="${e => {
          const $component = document.querySelector('#test-number');
          $component.value = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[integer=false]"></sc-text>
      <sc-toggle
        id="test-number"
        @change="${e => {
          const $component = document.querySelector('#test-number');
          $component.integer = e.detail.value;
        }}"
      ></sc-toggle>
    </p>
  `;
}
