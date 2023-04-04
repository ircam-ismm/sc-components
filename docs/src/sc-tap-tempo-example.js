import { html } from 'lit/html.js';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-tap-tempo.js';

${`<sc-tap-tempo></sc-tap-tempo>`}
    </code></pre>

    <sc-tap-tempo
      id="test-tap-tempo"
      @change="${e => {
        const $event = document.querySelector('#tempo-value');
        $event.value = e.detail.value;
      }}"
    ></sc-tap-tempo>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@change"></sc-text>
      <sc-number id="tempo-value"></sc-number>
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
          const $component = document.querySelector('#test-tap-tempo');
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
          const $component = document.querySelector('#test-tap-tempo');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
  `;
}
