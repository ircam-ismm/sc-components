import { html } from 'lit/html.js';

export default function () {
  let timeoutIdInput;
  let timeoutIdPress;
  let timeoutIdRelease;

  return html`
    <pre><code>
import '@ircam/simple-components/sc-button.js';

${`<sc-button></sc-button>`}
    </code></pre>

    <sc-button
      id="test-button"
      value="my-value"
      text="my button"
      @input="${e => {
        const $event = document.querySelector('#button-input');
        $event.active = true;

        clearTimeout(timeoutIdInput);
        const $value = document.querySelector('#button-value-input');
        $value.value = e.detail.value;
        timeoutIdInput = setTimeout(() => $value.value = '', 500);
      }}"
      @press="${e => {
        const $event = document.querySelector('#button-press');
        $event.active = true;

        clearTimeout(timeoutIdPress);
        const $value = document.querySelector('#button-value-press');
        $value.value = e.detail.value;
        timeoutIdPress = setTimeout(() => $value.value = '', 500);
      }}"
      @release="${e => {
        const $event = document.querySelector('#button-release');
        $event.active = true;

        clearTimeout(timeoutIdRelease);
        const $value = document.querySelector('#button-value-release');
        $value.value = e.detail.value;
        timeoutIdRelease = setTimeout(() => $value.value = '', 500);
      }}"
    ></sc-button>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@input (e.detail.value)"></sc-text>
      <sc-bang id="button-input"></sc-bang>
      <sc-text readonly id="button-value-input"></sc-text>
    </p>
    <p>
      <sc-text readonly value="@press (e.detail.value)"></sc-text>
      <sc-bang id="button-press"></sc-bang>
      <sc-text readonly id="button-value-press"></sc-text>
    </p>
    <p>
      <sc-text readonly value="@release (e.detail.value)"></sc-text>
      <sc-bang id="button-release"></sc-bang>
      <sc-text readonly id="button-value-release"></sc-text>
    </p>


    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[width=200]"></sc-text>
      <sc-number
        min="30"
        max="300"
        value="200"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-button');
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
          const $component = document.querySelector('#test-button');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[value=null]"></sc-text>
      <sc-text
        value="my-value"
        @change="${e => {
          const $component = document.querySelector('#test-button');
          $component.value = e.detail.value;
        }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly value="[text=this.value]"></sc-text>
      <sc-text
        value="my button"
        @change="${e => {
          const $component = document.querySelector('#test-button');
          $component.text = e.detail.value;
        }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly value="[selected=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-button');
          $component.selected = e.detail.value;
        }}"
      ></sc-toggle>
    </p>
  `;
}
