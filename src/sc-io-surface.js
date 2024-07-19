import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-io-surface <span style="color: var(--sc-color-secondary-3); font-style:italic;">- experimental</span></h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-io-surface.js';

const template = html\`
  <sc-io-surface></sc-io-surface>
\`;
`}</sc-code-example>

<sc-io-surface
  id="test-io-surface"
  style="background-color: var(--sc-color-primary-1);"
  @enter=${e => {
    document.querySelector('#io-surface-enter-event').active = true;
    document.querySelector('#io-surface-enter').value = JSON.stringify(e.detail.value);
  }}
  @exit=${e => {
    document.querySelector('#io-surface-exit-event').active = true;
    document.querySelector('#io-surface-exit').value = JSON.stringify(e.detail.value);
  }}
  @change=${e => {
    document.querySelector('#io-surface-change-event').active = true;
    document.querySelector('#io-surface-change').value = JSON.stringify(e.detail);
  }}
></sc-io-surface>

<p>
  A surface that is activated / deactivated when clicked, enter or exited.
  <br />
  Simple building block for creating more complex interfaces
</p>

<h3>Events</h3>
<div>
  <sc-text>@enter (e.detail.value)</sc-text>
  <sc-bang id="io-surface-enter-event"></sc-bang>
  <sc-text id="io-surface-enter"></sc-text>
</div>
<div>
  <sc-text>@exit (e.detail.value)</sc-text>
  <sc-bang id="io-surface-exit-event"></sc-bang>
  <sc-text id="io-surface-exit"></sc-text>
</div>
<div>
  <sc-text>@change (e.detail)</sc-text>
  <sc-bang id="io-surface-change-event"></sc-bang>
  <sc-text id="io-surface-change"></sc-text>
</div>

<h3>Attributes</h3>
<div>
  <sc-text>value [=0]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-io-surface').value = e.detail.value}
  >0</sc-text>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-io-surface {
  width: 100px;
  height: 100px;
  background-color: var(--sc-color-secondary-3);
}

#test-io-surface[active] {
  background-color: var(--sc-color-secondary-4);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

<h3>Example</h3>

<p>Click anywhere and move your cursor</p>
<sc-code-example language="html">${`\
<div style="user-select: none;">
  <sc-io-surface
    style="margin: 10px; background-color: #343434;"
    @enter=${e => e.target.style.backgroundColor = 'white'}
    @exit=${e => e.target.style.backgroundColor = '#343434'}
  ></sc-io-surface>
  <!-- ... -->
</div>
`}</sc-code-example>
<div style="user-select: none;">
  <sc-io-surface
    style="margin: 10px; background-color: #343434;"
    @enter=${e => e.target.style.backgroundColor = 'white'}
    @exit=${e => e.target.style.backgroundColor = '#343434'}
  ></sc-io-surface>
  <sc-io-surface
    style="margin: 10px; background-color: #343434;"
    @enter=${e => e.target.style.backgroundColor = 'white'}
    @exit=${e => e.target.style.backgroundColor = '#343434'}
  ></sc-io-surface>
  <sc-io-surface
    style="margin: 10px; background-color: #343434;"
    @enter=${e => e.target.style.backgroundColor = 'white'}
    @exit=${e => e.target.style.backgroundColor = '#343434'}
  ></sc-io-surface>
  <sc-io-surface
    style="margin: 10px; background-color: #343434;"
    @enter=${e => e.target.style.backgroundColor = 'white'}
    @exit=${e => e.target.style.backgroundColor = '#343434'}
  ></sc-io-surface>
  <sc-io-surface
    style="margin: 10px; background-color: #343434;"
    @enter=${e => e.target.style.backgroundColor = 'white'}
    @exit=${e => e.target.style.backgroundColor = '#343434'}
  ></sc-io-surface>
  <sc-io-surface
    style="margin: 10px; background-color: #343434;"
    @enter=${e => e.target.style.backgroundColor = 'white'}
    @exit=${e => e.target.style.backgroundColor = '#343434'}
  ></sc-io-surface>
  <sc-io-surface
    style="margin: 10px; background-color: #343434;"
    @enter=${e => e.target.style.backgroundColor = 'white'}
    @exit=${e => e.target.style.backgroundColor = '#343434'}
  ></sc-io-surface>
</div>
`;
