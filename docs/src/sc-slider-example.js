import { html } from 'lit';

export default function() {
  return html`
    <pre><code>
import '@ircam/simple-components/sc-slider.js';

${`<sc-slider></sc-slider>`}
    </code></pre>

    <sc-slider
      id="test-slider"
      @input="${e => {
        const $display = document.querySelector('#slider-input');
        $display.value = e.detail.value;
      }}"
      @change="${e => {
        const $display = document.querySelector('#slider-change');
        $display.value = e.detail.value;
      }}"
    ></sc-slider>

    <h3>Events</h3>
    <p>
      <sc-text readonly value="@input => e.detail.value"></sc-text>
      <sc-number id="slider-input"></sc-number>
    </p>
    <p>
      <sc-text readonly value="@change => e.detail.value"></sc-text>
      <sc-number id="slider-change"></sc-number>
    </p>

    <h3>Attributes</h3>
    <p>
      <sc-text readonly value="[value=0.5]"></sc-text>
      <sc-number
        value="0.5"
        @input="${e => {
          const $component = document.querySelector('#test-slider');
          $component.value = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[width=200]"></sc-text>
      <sc-number
        min="30"
        max="300"
        value="200"
        integer
        @input="${e => {
          const $component = document.querySelector('#test-slider');
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
          const $component = document.querySelector('#test-slider');
          $component.height = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[min=-1]"></sc-text>
      <sc-number
        min="-200"
        max="0"
        value="0"
        @input="${e => {
          const $component = document.querySelector('#test-slider');
          $component.min = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[max=1]"></sc-text>
      <sc-number
        min="1"
        max="200"
        value="1"
        @input="${e => {
          const $component = document.querySelector('#test-slider');
          $component.max = e.detail.value;
        }}"
      ></sc-number>
    </p>
    <p>
      <sc-text readonly value="[orientation=horizontal]"></sc-text>
      <sc-button
        value="horizontal"
        @input="${e => {
          const $component = document.querySelector('#test-slider');
          $component.orientation = e.detail.value;
        }}"
      ></sc-button>
      <sc-button
        value="vertical"
        @input="${e => {
          const $component = document.querySelector('#test-slider');
          $component.orientation = e.detail.value;
        }}"
      ></sc-button>
    </p>
    <p>
      <sc-text readonly value="[display-number=false]"></sc-text>
      <sc-toggle
        @change="${e => {
          const $component = document.querySelector('#test-slider');
          $component.displayNumber = e.detail.value;
        }}"
      ></sc-toggle>
    </p>
    <p>
      <sc-text readonly value="[color=#dededeff]"></sc-text>
      <sc-text
        value="#dededeff"
        @change="${e => {
          const $component = document.querySelector('#test-slider');
          $component.color = e.detail.value;
        }}"
      ></sc-text>
    </p>

  `;
}
