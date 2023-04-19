import { html } from 'lit/html.js';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-return.js';

${`<sc-return></sc-return>`}
    </code></pre>

    <sc-return
      id="test-return"
      @input="${e => {
        const $event = document.querySelector('#return-input');
        $event.active = true;
      }}"
    ></sc-return>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@input"></sc-text>
      <sc-bang id="return-input"></sc-bang>
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
  `;
}
