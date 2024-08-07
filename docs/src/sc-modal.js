import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-modal</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-modal.js';

const template = html\`
  <sc-modal>
    <sc-filter></sc-filter>
  </sc-modal>
\`;
`}</sc-code-example>

<sc-modal
  id="test-modal"
  title="my modal 1"
  icon="filter"
  bind-to-element="#main > section"
>
  <sc-filter></sc-filter>
</sc-modal>

<h3>Attributes</h3>
<div>
  <sc-text>?active [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-modal').active = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?icon [="plus"]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-modal').icon = e.detail.value}
  >filter</sc-text>
  <p>cf. <a href="./sc-icon">sc-icon</a></p>
</div>
<div>
  <sc-text>?title [="modal window"]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-modal').title = e.detail.value}
  >my modal 1</sc-text>
</div>
<div>
  <sc-text>?resizable [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-modal').resizable = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?movable [=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-modal').movable = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text>?bind-to-element [="body"]</sc-text>
  <sc-text
    editable
    @change=${e => document.querySelector('#test-modal').bindToElement = e.detail.value}
  >#main > section</sc-text>
  <p>CSS selector of a DOM element that defines the boundaries in which the modal can be moved</p>
</div>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  language="css"
  value="\
#test-modal {
  width: 30px;
  height: 30px;

  --sc-modal-width: auto;
  --sc-modal-height: auto;
  /* relative to :host position and size */
  --sc-modal-position-top: 0;
  --sc-modal-position-bottom: auto;
  --sc-modal-position-left: 100%;
  --sc-modal-position-right: auto;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
