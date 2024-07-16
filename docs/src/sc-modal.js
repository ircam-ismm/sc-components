import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-modal</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-modal.js';

const template = html\`
  <sc-modal></sc-modal>
\`;
`}</sc-code-example>

<sc-modal
  id="test-modal"
  active
  title="my modal 1"
>
  <!-- <div style="width: auto; background-color: red;"> -->
    <sc-slider></sc-slider>
    <br />
    <br />
    <sc-text>toggle</sc-text><sc-toggle></sc-toggle>
    <br />
    <br />
    <sc-filter></sc-filter>
  <!-- </div> -->
</sc-modal>

<sc-modal
  id="test-modal"
  active
  title="my modal 2"
>
  <!-- <div style="width: auto; background-color: red;"> -->
    <sc-slider></sc-slider>
    <br />
    <br />
    <sc-text>toggle</sc-text><sc-toggle></sc-toggle>
    <br />
    <br />
    <sc-filter></sc-filter>
  <!-- </div> -->
</sc-modal>

<sc-modal
  id="test-modal"
  active
  title="my modal 3"
>
  <!-- <div style="width: auto; background-color: red;"> -->
    <sc-slider></sc-slider>
    <br />
    <br />
    <sc-text>toggle</sc-text><sc-toggle></sc-toggle>
    <br />
    <br />
    <sc-filter></sc-filter>
  <!-- </div> -->
</sc-modal>

<h3>Events</h3>
<p>
  <sc-text>@input</sc-text>
  <sc-modal id="modal-input"></sc-modal>
</p>
<sc-code-example language="html">${`
<sc-modal
  @input=\${e => console.log(e.detail.value)}
></sc-modal>
`}</sc-code-example>

<h3>Attributes</h3>
<div>
  <sc-text>?active [=false]</sc-text>
  <sc-modal
    @input=${e => document.querySelector('#test-modal').active = true}
  ></sc-modal>
</div>

`;
