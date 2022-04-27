import { html } from 'lit/html.js';

export default function() {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-dragndrop.js';

${`<sc-dragndrop></sc-dragndrop>`}
    </code></pre>

    <sc-dragndrop
      id="test-dragndrop"
      width="300"
      height="200"
      @change="${e => {
        const $change = document.querySelector('#dragndrop-change');

        let txt = '{';
        for (let name in e.detail.value) {
          txt += `\n  ${name}: "${e.detail.value[name]}",`
        }
        txt += '\n}';

        $change.value = txt;
      }}"
    >
    </sc-dragndrop>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@change"></sc-text>
      <sc-text
        id="dragndrop-change"
        width="400"
        height="200"
        readonly
        value="see console to see the non-stringified version"
      ></sc-text>
    </p>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[width=30]"></sc-text>
      <sc-number
        min="30"
        max="600"
        value="300"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-dragndrop');
          $component.width = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[height=30]"></sc-text>
      <sc-number
        min="30"
        max="600"
        value="200"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-dragndrop');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text width="250" readonly value="[label='Drag and Drop Files']"></sc-text>
      <sc-text
        value="Drag and Drop Files"
        @change="${e => {
          const $component = document.querySelector('#test-dragndrop');
          $component.label = e.detail.value;
        }}"
      ></sc-number>
    </p>
  `;
}
