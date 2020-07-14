import { html } from 'lit-html';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-toggle.js';

${`<sc-toggle></sc-toggle>`}
    </code></pre>

    <sc-toggle
      id="test-toggle"
      @change="${e => {
        const $event = document.querySelector('#toggle-change');
        $event.active = e.detail.value;
      }}"
    ></sc-toggle>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@change"></sc-text>
      <sc-toggle id="toggle-change"></sc-toggle>
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
          const $component = document.querySelector('#test-toggle');
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
          const $component = document.querySelector('#test-toggle');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[active=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-toggle');
          $component.active = e.detail.value;
        }}"
      ></sc-toggle>
    </p>
  `;
}
