import { html } from 'lit/html.js';

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-text.js';

${`<sc-text></sc-text>`}
    </code></pre>

    <sc-text
      id="test-text"
      width="300"
      height="200"
      @change="${e => {
        const $event = document.querySelector('#text-change');
        $event.value = e.detail.value;
      }}"
      value="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ></sc-text>

    <h3>Events</h3>
    <div>
      <sc-text readonly value="@change"></sc-text>
      <sc-text readonly width="300" height="200" id="text-change"></sc-text>
      <p><i>@change event is triggered on blur and on "cmd + s" </i></p>
    </div>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[width=200]"></sc-text>
      <sc-number
        min="100"
        max="500"
        value="300"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-text');
          $component.width = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[height=30]"></sc-text>
      <sc-number
        min="30"
        max="300"
        value="200"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-text');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[value='']"></sc-text>
      <sc-text
        @change="${e => {
          const $component = document.querySelector('#test-text');
          $component.value = e.detail.value;
        }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly value="[readonly=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-text');
          $component.readonly = e.detail.value;
        }}"
      ></sc-toggle>
    </p>
  `;
}
