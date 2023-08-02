import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

function logEvent(e) {
  const $el = e.currentTarget;
  const tagName = $el.tagName.toLowerCase();
  const type = e.type;
  const value = e.detail.value;

  const $logEvents = document.querySelector('#log-events');
  $logEvents.value = `${tagName} - @${type}: ${value}`;
}

export function enter() {
  // setTimeout(() => {
  //   const $el = document.querySelectorAll('sc-slider');
  //   $el.forEach($el => console.log($el.id));
  // }, 500);

  // setTimeout(() => {
  //   console.log('test');
  //   document.querySelector('#test').remove();
  // }, 1000);
}

export const template = html`

<h2>sc-midi-learn</h2>

<p style="color: var(--sc-color-secondary-3)">This component is still experimental and subject to change</p>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-midi-learn.js';

const template = html\`
  <sc-midi-learn></sc-midi-learn>
\`;
`}</sc-code-example>

<sc-midi-learn
  id="test-midi-learn"
></sc-midi-learn>

<h3>Compatible elements</h3>
<div style="margin: 30px 0;">
  <sc-slider @input=${logEvent} @change=${logEvent}></sc-slider>
  <sc-bang @input=${logEvent}></sc-bang>
  <sc-toggle @change=${logEvent}></sc-toggle>
  <sc-button @press=${logEvent} @release=${logEvent}>my button</sc-button>
  <sc-dial @input=${logEvent} @change=${logEvent}></sc-dial>
</div>

<p style="margin: 20px 0;">
  By default, the bindings are stored in local storage and retrieved between different sessions of the application and the binded elements are retrieved according to an internal id if not explicit id has been given in the DOM. The downside is that this internal id is generated according to the order of instanciation of the elements and is therefore susceptible to change between two sessions in complex and dynamic interfaces. In such cases, it is best to define stable ids yourself to keep the bindings coherent.
</p>

<p style="font-style: italic;">to implement: sc-keyboard</p>

<div style="margin-top: 20px;">
  <sc-text>Events from binded elements</sc-text>
  <sc-text id="log-events"></sc-text>
</div>

<!--
<h3>Attributes</h3>
<div>
  <sc-text>[?active=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-midi-learn').active = e.detail.value}
  ></sc-toggle>
</div>
-->

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-midi-learn {
  width: 80px;
  height: 30px;

  --sc-midi-learn-panel-position-top: 0;
  --sc-midi-learn-panel-position-right: 0;
  --sc-midi-learn-panel-position-bottom: auto;
  --sc-midi-learn-panel-position-left: auto;
  --sc-midi-learn-panel-position-width: 300px;
  --sc-midi-learn-panel-position-height: auto;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
