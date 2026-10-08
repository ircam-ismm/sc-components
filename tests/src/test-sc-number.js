import { html } from 'lit';

import '../../src/sc-number.js';

// setTimeout(() => {
//   document.body.querySelector('#remove').remove();
// }, 2000);

export const template = html`
  <p>
    <a href="https://github.com/ircam-ismm/sc-components/issues/31">
      https://github.com/ircam-ismm/sc-components/issues/31
    </a>
  </p>
  <div>
    <p>min: 50, max: 1000, value: 100</p>
    <sc-number
      id="remove"
      min="50"
      max="1000"
      value="100"
      number-box
      @input=${e => console.log(e.detail.value)}
    ></sc-number>
  </div>
  <div>
    <p>min: -200, max: 500, value: 250</p>
    <sc-number
      value="250"
      max="500"
      min="-200"
      number-box
    ></sc-number>
  </div>
  <div>
    <p>min: 10, max: 100, value: 100</p>
    <sc-number
      max="100"
      min="10"
      value="100"
      number-box
    ></sc-number>
  </div>

  <div>
    <p>throw min >= max</p>
    <sc-number
      min="2"
      max="0"
      value="100"
      number-box
    ></sc-number>
  </div>
`;
