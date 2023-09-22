import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit/directives/repeat.js';

import '../../src/sc-slider.js';
import '../../src/sc-select.js';

const stuff = ['a', 'b', 'c'];

export const template = html`
  <style>
    sc-slider {
      width: 200px;
      height: 400px;
    }
  </style>
  <h2>repeat</h2>
  ${repeat(stuff, name => name, name => html`
      <sc-slider orientation="vertical"></sc-slider>
    `
  )}
  <h2>keyed</h2>
  <h3>sc-slider</h3>
  ${stuff.map(name => {
    return keyed(name, html`
      <sc-slider orientation="vertical"></sc-slider>
    `)
  })}

  <h3>select</h3>
  ${keyed('abc', html`
    <sc-select options="${JSON.stringify(stuff)}"></sc-select>
  `)}
`
