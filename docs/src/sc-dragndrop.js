import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-dragndrop</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-dragndrop.js';

const template = html\`
  <sc-dragndrop>drag and drop files</sc-dragndrop>
\`;
`}</sc-code-example>

<sc-dragndrop
  id="test-dragndrop"
  @change=${e => {
    console.log(e.detail.value);

    let txt = '{';
    for (let name in e.detail.value) {
      txt += `\n  ${name}: "${e.detail.value[name]}",`
    }
    txt += '\n}';

    document.querySelector('#dragndrop-change').value = txt;
  }}
></sc-dragndrop>

<h3>Events</h3>
<div>
  <p>open the console to see more infos about loaded files</p>
  <sc-text>@change</sc-text>
  <sc-text id="dragndrop-change"></sc-text>
</div>

<h3>Attributes</h3>
<div>
  <sc-code-example language="markdown">
Format can be:
- "load": do its best to load and decode the asset (e.g. AudioBuffer, Image, json, text or midi files),
  Most suited for interactive usage directly in the context of the page.
- "raw": return File instances which is better suited for uploading assets to a server.
  </sc-code-example>
  <sc-text>[format="load"]</sc-text>
  <sc-radio
    options=${JSON.stringify(['load', 'raw'])}
    value="load"
    @change=${e => document.querySelector('#test-dragndrop').format = e.detail.value}
  ></sc-radio>
</div>

<h3>Styles</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-dragndrop {
  width: 300px;
  height: 150px;
  border: 1px solid var(--sc-color-primary-2);
  background-color: var(--sc-color-primary-1);
  border-radius: 2px;
  font-family: var(--sc-font-family);
  font-size: var(--sc-font-size);
  color: white;

  --sc-dragndrop-dragged-background-color: var(--sc-color-primary-2);
  --sc-dragndrop-processing-background-color: var(--sc-color-secondary-3);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

<h4>Debug internal state</h4>
<div>
  <sc-text>_status</sc-text>
  <sc-radio
    options=${JSON.stringify(['idle', 'drag', 'processing'])}
    value="idle"
    @change=${e => document.querySelector('#test-dragndrop')._status = e.detail.value}
  ></sc-radio>
</div>


`;
