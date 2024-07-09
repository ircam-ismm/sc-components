import { html, render } from 'lit';
import { live } from 'lit/directives/live.js';

import '../../src/sc-select.js';

let value = false;

export const template = html`
  <p>
    <a href="https://github.com/ircam-ismm/sc-components/issues/21">
      https://github.com/ircam-ismm/sc-components/issues/21
    </a>
  </p>

  <p>Check error in console</p>
  <sc-select></sc-select>
  <sc-select options="coucou"></sc-select>
`;
