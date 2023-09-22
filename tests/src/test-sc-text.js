import { html } from 'lit';

import '../../src/sc-text.js';

const value = "toto";

export const template = html`
  <p>
    <a href="https://github.com/ircam-ismm/sc-components/issues/22">
      https://github.com/ircam-ismm/sc-components/issues/22
    </a>
  </p>
  <sc-text value=${value}></sc-text>
  <sc-text .value=${value}></sc-text>
`;
