import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export function enter() {
  // setTimeout(() => {
  //   const $el = document.querySelectorAll('sc-slider');
  //   $el.forEach($el => console.log($el.id));
  // }, 500);

  // setTimeout(() => {
  //   console.log('test');
  //   document.querySelector('#test').remove();
  // }, 1000);
}

export const template = html`

<h2>sc-midi-learn</h2>

<p style="color: var(--sc-color-secondary-3)">This component is still experimental and subbject to change</p>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-midi-learn.js';

const template = html\`
  <sc-midi-learn></sc-midi-learn>
\`;
`}</sc-code-example>

<sc-midi-learn
  active
  id="test-midi-learn"
></sc-midi-learn>

<div>
  <sc-slider></sc-slider>
  <sc-slider id="test"></sc-slider>

  <!--
  <sc-bang></sc-bang>
  <sc-toggle></sc-toggle>
  <sc-button></sc-button>
  <sc-dial></sc-dial>
  <sc-keyboard></sc-keyboard>
  -->
</div>

`;
