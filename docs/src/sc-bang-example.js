import { html } from 'lit';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-bang.js';

${`<sc-bang></sc-bang>`}
    </code></pre>

    <sc-bang
      id="test-bang"
      @input="${e => {
        const $event = document.querySelector('#bang-input');
        $event.active = true;
      }}"
    ></sc-bang>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@input"></sc-text>
      <sc-bang id="bang-input"></sc-bang>
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
          const $component = document.querySelector('#test-bang');
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
          const $component = document.querySelector('#test-bang');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[active=false]"></sc-text>
      <sc-bang
        @input="${e => {
          const $component = document.querySelector('#test-bang');
          $component.active = true;
        }}"
      ></sc-bang>
    </p>
  `;
}
