import { html } from 'lit';
import '../../src/sc-midi.js';
import '../../src/sc-toggle.js';

let add = false;
let $toggle = document.createElement('sc-toggle');

setInterval(() => {
  const $div = document.querySelector('#test');
  add = !add;

  if (add) {
    $div.appendChild($toggle);
  } else {
    $toggle.remove();
  }
}, 1000);

export const template = html`
<div style="margin-top:20px;">
  <sc-midi
    active
  ></sc-midi>
</div>
<div id="test"></div>
`;

