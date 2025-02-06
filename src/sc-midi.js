import { html, css, LitElement } from 'lit';
import applyStyle from './utils/applyStyle.js';

function logEvent(e) {
  const $el = e.currentTarget;
  const tagName = $el.tagName.toLowerCase();
  const type = e.type;
  const value = e.detail.value;

  const $logEvents = document.querySelector('#log-events');
  $logEvents.value = `${tagName} - @${type}: ${value}`;
}

class SomeWrapper extends LitElement {
  static styles = css`
    div {
      padding: 10px;
      display: inline-block;
      background-color: var(--sc-color-secondary-3);
    }
  `;

  render() {
    return html`
      <div>
        <sc-slider></sc-slider>
      </div>
    `;
  }
}

if (customElements.get('some-wrapper') === undefined) {
  customElements.define('some-wrapper', SomeWrapper);
}

export const template = html`

<h2>sc-midi</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-midi.js';

const template = html\`
  <sc-midi></sc-midi>
\`;
`}</sc-code-example>

<sc-midi
  id="test-midi"
></sc-midi>

<p style="margin: 20px 0;">
  Bindings are stored in local storage and retrieved between different sessions of the application and the binded elements are retrieved according to an internal id if not explicit id has been given in the DOM. The downside is that this internal id is generated according to the order of instanciation of the elements and is therefore susceptible to change between two sessions in complex and dynamic interfaces. In such cases, it is best to define stable ids yourself to keep the bindings coherent.
</p>

<h3>Compatible elements</h3>

<div style="margin: 30px 0;">
  <sc-slider @input=${logEvent} @change=${logEvent}></sc-slider>
  <sc-bang @input=${logEvent}></sc-bang>
  <sc-toggle @change=${logEvent}></sc-toggle>
  <sc-record @change=${logEvent}></sc-record>
  <sc-transport @change=${logEvent}></sc-transport>
  <sc-button @press=${logEvent} @release=${logEvent}>my button</sc-button>
  <sc-dial @input=${logEvent} @change=${logEvent}></sc-dial>
  <sc-keyboard></sc-keyboard>
</div>

<div style="margin-top: 20px;">
  <sc-text>Events from binded elements</sc-text>
  <sc-text id="log-events"></sc-text>
</div>

<h3>Bind into ShadowDOM</h3>

<some-wrapper></some-wrapper>

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Space</sc-text>
<sc-text class="key">Enter</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-midi {
  width: 80px;
  height: 30px;

  --sc-midi-panel-position-top: 0;
  --sc-midi-panel-position-right: 0;
  --sc-midi-panel-position-bottom: auto;
  --sc-midi-panel-position-left: auto;
  --sc-midi-panel-position-width: 300px;
  --sc-midi-panel-position-height: auto;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;
