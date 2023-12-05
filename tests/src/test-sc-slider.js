import { html } from 'lit';

import '../../src/sc-slider.js';

export const template = html`
  <p>
    <a href="https://github.com/ircam-ismm/sc-components/issues/31">
      https://github.com/ircam-ismm/sc-components/issues/31
    </a>
  </p>
  <sc-slider
    min="50"
    max="1000"
    value="100"
    number-box
  ></sc-slider>
  <sc-slider
    max="1000"
    min="50"
    value="100"
    number-box
  ></sc-slider>
  <sc-slider
    max="50"
    min="1000"
    value="100"
    number-box
  ></sc-slider>
  <sc-slider
    max="50"
    min="50"
    value="100"
    number-box
  ></sc-slider>
`;
