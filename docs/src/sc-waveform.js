import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

let buffer = new AudioBuffer({
  length: 44100,
  numberOfChannels: 1,
  sampleRate: 44100,
});
const testData = buffer.getChannelData(0);
for (let i = 0; i < testData.length; i++) {
  testData[i] = Math.sin(2 * Math.PI * 10 * i / testData.length);
}

export const template = html`

<h2>sc-waveform</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-waveform.js';

const template = html\`
  <sc-waveform></sc-waveform>
\`;
`}</sc-code-example>

<sc-waveform
  id="test-waveform"
  .buffer=${buffer}
  @input=${e => document.querySelector('#waveform-input').value = JSON.stringify(e.detail.value) }
  @change=${e => document.querySelector('#waveform-change').value = JSON.stringify(e.detail.value)}
></sc-waveform>

<h3>Events</h3>
<div>
  <sc-text>@input</sc-text>
  <sc-text id="waveform-input"></sc-text>
</div>
<div>
  <sc-text>@change</sc-text>
  <sc-text id="waveform-change"></sc-text>
</div>

<h3>Attributes</h3>

<div>
  <sc-text>?selection [=false]</sc-text>
  <sc-toggle
    @change="${e => document.querySelector('#test-waveform').selection = e.detail.value}"
  ></sc-toggle>
</div>

<div>
  <sc-text>?cursor [=false]</sc-text>
  <sc-toggle
    @change="${e => document.querySelector('#test-waveform').cursor = e.detail.value}"
  ></sc-toggle>
</div>

<div>
  <sc-text>cursor-position [=0]</sc-text>
  <sc-slider
    value=0
    @input=${e => document.querySelector('#test-waveform').cursorPosition = e.detail.value * buffer.duration}
  ></sc-slider>
</div>

<h3>Properties</h3>

<div>
  <sc-text>.buffer [=AudioBuffer]</sc-text>
  <sc-dragndrop
    style="
      height: 60px;
    "
    @change="${e => {
    const file = Object.values(e.detail.value)[0];
    if (file instanceof AudioBuffer) {
      buffer = file;
      document.querySelector('#test-waveform').buffer = file;
    }
  }}"
  ></sc-dragndrop>
</div>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-waveform {
  width: 300px;
  height: 150px;
  --sc-waveform-color: white;
  --sc-waveform-cursor-color: red;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
