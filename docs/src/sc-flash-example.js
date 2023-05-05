import { html } from 'lit/html.js';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-flash.js';

${`<sc-flash></sc-flash>`}
    </code></pre>

    <sc-flash
      id="test-flash"
      @input="${e => {
        const $event = document.querySelector('#flash-input');
        $event.active = true;
      }}"
    ></sc-flash>
    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[width=100]"></sc-text>
      <sc-number
        min="30"
        max="300"
        value="100"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-flash');
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
          const $component = document.querySelector('#test-flash');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[flashTime=75]"></sc-text>
      <sc-number
        min="30"
        max="300"
        value="75"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-flash');
          $component.flashTime = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[color=red]"></sc-text>
      <sc-text
        value="red"
        @change="${e => {
          const $component = document.querySelector('#test-flash');
          $component.color = e.detail.value;
        }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly value="[active=false]"></sc-text>
      <sc-bang
        @input="${e => {
          const $component = document.querySelector('#test-flash');
          $component.active = true;
        }}"
      ></sc-bang>
    </p>
  `;
}
