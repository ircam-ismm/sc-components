import { html, render } from 'lit';
import '../../src/sc-select.js';

export const template = html`
  <div id="placeholder"></div>
`;

const options = ['a', 'b', 'c', 'd', 'e'];

function renderComponent() {
  console.log('render');
  render(html`
    <p>
      <a href="https://github.com/ircam-ismm/sc-components/issues/21">
        https://github.com/ircam-ismm/sc-components/issues/21
      </a>
    </p>

    <p>Check error in console</p>
    <sc-select></sc-select>
    <sc-select options="coucou"></sc-select>

    <p>should not rendered</p>
    <sc-select
      .options=${options}
    ></sc-select>
  `, document.querySelector('#placeholder'));
}

setInterval(renderComponent, 50);
