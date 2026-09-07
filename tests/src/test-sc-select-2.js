import { html, render, nothing, LitElement } from 'lit';
import { delay } from '@ircam/sc-utils';
import '../../src/sc-select.js';

export const template = html`
  <div id="placeholder"></div>
`;

class TestElement extends LitElement {
  constructor() {
    super();

    console.log('constructor');
  }

  render() {
    console.log('render');
    return html`
      <sc-select
        .options=${['a', 'b', 'c', 'd', 'e']}
      ></sc-select>
    `
  }
}

customElements.define('test-element', TestElement);

(async function() {
  await delay(500);

  render(html`
    <test-element></test-element>
  `, document.querySelector('#placeholder'));

  await delay(500);

  render(nothing, document.querySelector('#placeholder'));

  await delay(500);

  render(html`
    <test-element></test-element>
  `, document.querySelector('#placeholder'));
}());

