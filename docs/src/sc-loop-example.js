import { html } from 'lit/html.js';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-loop.js';

${`<sc-loop></sc-loop>`}
    </code></pre>

    <sc-loop
      id="test-loop"
      @change="${e => {
        const $event = document.querySelector('#loop-change');
        $event.active = e.detail.value;
      }}"
    ></sc-loop>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@change"></sc-text>
      <sc-toggle id="loop-change"></sc-toggle>
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
          const $component = document.querySelector('#test-loop');
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
          const $component = document.querySelector('#test-loop');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[active=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-loop');
          $component.active = e.detail.value;
        }}"
      ></sc-toggle>
    </p>
  `;
}
