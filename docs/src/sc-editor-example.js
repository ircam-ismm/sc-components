import { html } from 'lit';

function js() {}
const exampleCode = `function add(a, b) {
  return a + b;
}
`;

export default function () {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-editor.js';

${`<sc-editor></sc-editor>`}
    </code></pre>

    <sc-editor
      id="test-editor"
      value="${exampleCode}"
      @change="${e => {
        const $event = document.querySelector('#editor-change');
        $event.value = e.detail.value;
      }}"
    ></sc-editor>

    <h3>Events</h3>
    <div>
      <sc-text readonly value="@change"></sc-text>
      <sc-text readonly width="300" height="200" id="editor-change"></sc-text>
      <p><i>@change event is triggered on "cmd + s" and when clicking the "save" button</i></p>
    </div>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[width=300]"></sc-text>
      <sc-number
        min="200"
        max="600"
        value="300"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-editor');
          $component.width = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[height=200]"></sc-text>
      <sc-number
        min="100"
        max="500"
        value="200"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-editor');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[font-size=11]"></sc-text>
      <sc-number
        min="8"
        max="20"
        value="11"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-editor');
          $component.fontSize = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[value='']"></sc-text>
      <sc-editor
        value="${exampleCode}"
        @change="${e => {
          const $editor = document.querySelector('#test-editor');
          $editor.value = e.detail.value;
        }}"
      ></sc-editor>

    </p>
  `;
}
