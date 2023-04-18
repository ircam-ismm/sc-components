import { html } from 'lit/html.js';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-return.js';

${`<sc-return></sc-return>`}
    </code></pre>

    <sc-return
      id="test-return"
      @change="${e => {
        const $event = document.querySelector('#return-change');
        $event.active = e.detail.value;
      }}"
    ></sc-return>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@change"></sc-text>
      <sc-toggle id="return-change"></sc-toggle>
    </p>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[width=30]"></sc-text>
      <sc-number
        min="30"
        max="300"
        value="30"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-return');
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
          const $component = document.querySelector('#test-return');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[active=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-return');
          $component.active = e.detail.value;
        }}"
      ></sc-toggle>
    </p>
  `;
}
