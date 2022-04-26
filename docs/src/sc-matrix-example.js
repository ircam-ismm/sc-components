import { html } from 'lit';

export default function() {
    // dirty hack to make sure the element is in the DOM
  // setInterval(() => {
  //   const $matrix = document.querySelector('#test-matrix');
  //   const value = $matrix.value;

  //   for (let i = 0; i < 20; i++) {
  //     const rowIndex = Math.floor(Math.random() * value.length);
  //     const colIndex = Math.floor(Math.random() * value[rowIndex].length);
  //     const cellValue = $matrix.entries[Math.floor(Math.random() * $matrix.entries.length)];

  //     value[rowIndex][colIndex] = cellValue;
  //     $matrix.value = value;
  //   }

  // }, 50);

  return html`
    <pre><code>
import '@ircam/simple-components/sc-matrix.js';

${`<sc-matrix></sc-matrix>`}
    </code></pre>

    <sc-matrix
      id="test-matrix"
      @change="${e => {
        const $change = document.querySelector('#matrix-change');
        $change.value = e.detail.value.map(row => row.join(', ')).join('\n');
      }}"
    >
    </sc-matrix>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@change"></sc-text>
      <sc-text
        id="matrix-change"
        width="400"
        height="150"
        readonly
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
          const $component = document.querySelector('#test-matrix');
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
          const $component = document.querySelector('#test-matrix');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[rows=4]"></sc-text>
      <sc-number
        min="1"
        max="10"
        value="4"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-matrix');
          $component.rows = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[columns=8]"></sc-text>
      <sc-number
        min="4"
        max="16"
        value="8"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-matrix');
          $component.columns = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[entries=[0, 1]]"></sc-text>
      <sc-text
        value="[0, 1]"
        @change="${e => {
          const $component = document.querySelector('#test-matrix');
          console.log(e.detail.value);
          $component.entries = JSON.parse(e.detail.value);
        }}"
      ></sc-text>
    </p>
    <p>
      <sc-text readonly value="[reset]"></sc-text>
      <sc-bang
        value="[0, 1]"
        @input="${e => {
          const $component = document.querySelector('#test-matrix');
          $component.reset = true;
        }}"
      ></sc-bang>
    </p>
  `;
}
