import { html } from 'lit/html.js';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-transport.js';

${`<sc-transport></sc-transport>`}
    </code></pre>

    <sc-transport
      id="test-transport"
      buttons="[play, pause, stop]"
      @change="${e => {
        const $event = document.querySelector('#transport-change');
        $event.value = e.detail.value;
      }}"
    ></sc-transport>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@change"></sc-text>
      <sc-text id="transport-change" readonly value="undefined"></sc-text>
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
          const $component = document.querySelector('#test-transport');
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
          const $component = document.querySelector('#test-transport');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[buttons=[]]"></sc-text>
      <sc-text
        value="[play, pause, stop]"
        @change="${e => {
      const $component = document.querySelector('#test-transport'); 
      $component.buttons = e.detail.value;
    }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly value="[state='']"></sc-text>
      <sc-button
        value="play"
        width="100"
        @input="${e => {
          const $component = document.querySelector('#test-transport');
          $component.state = e.detail.value;
        }}"
      ></sc-button>
      <sc-button
        value="pause"
        width="100"
        @input="${e => {
          const $component = document.querySelector('#test-transport');
          $component.state = e.detail.value;
        }}"
      ></sc-button>
      <sc-button
        value="stop"
        width="100"
        @input="${e => {
          const $component = document.querySelector('#test-transport');
          $component.state = e.detail.value;
        }}"
      ></sc-button>
    </p>

  `;
}
