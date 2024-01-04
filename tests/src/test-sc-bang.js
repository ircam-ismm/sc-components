import { html, render } from 'lit';
import { live } from 'lit/directives/live.js';

import '../../src/sc-bang.js';

let value = false;

export const template = html`
  <p>
    <a href="https://github.com/ircam-ismm/sc-components/issues/34">
      https://github.com/ircam-ismm/sc-components/issues/34
    </a>
  </p>

  ${console.log('in render', value)}
  <sc-bang ?active=${live(value)}></sc-text>
`;

// does not work..., why?
setInterval(() => {
  value = !value;
  console.log(value);

  // this do not render...
  render(template, document.body.querySelector('section'));
}, 1000);

