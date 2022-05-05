import { html } from 'lit/html.js';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-record.js';

${`<sc-record></sc-record>`}
    </code></pre>

    <sc-record
      id="test-record"
      @change="${e => {
        const $event = document.querySelector('#record-change');
        $event.active = e.detail.value;
      }}"
    ></sc-record>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@change"></sc-text>
      <sc-toggle id="record-change"></sc-toggle>
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
          const $component = document.querySelector('#test-record');
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
          const $component = document.querySelector('#test-record');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[active=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-record');
          $component.active = e.detail.value;
        }}"
      ></sc-toggle>
    </p>
  `;
}
