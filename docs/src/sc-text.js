import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

const myVar = 'coucou';

export const template = html`

<h2>sc-text</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-text.js';

const template = html\`<sc-text>My Text</sc-text>\`;
`}</sc-code-example>

<sc-text
  id="test-text"
  @change=${e => document.querySelector('#text-change').value = e.detail.value}
>Hello!</sc-text>

<sc-code-example language="markdown">${`
The red border indicates that the text is in dirty state, i.e. the content has been changed but not saved yet.

The "change" event is triggered when:
- "Cmd+S" is pressed
- when the element loose the focus, i.e. on blur
`}</sc-code-example>


<h3>Events</h3>
<div>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly id="text-change"></sc-text>
</div>
<pre><code class="language-html">\
${`\
<sc-text
  @change=\${e => console.log(e.detail.value)}
></sc-text>`}
<code></pre>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[value='']</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-text').value = e.detail.value}
  ></sc-text>
</div>
<div>
  <sc-text readonly>[readonly=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-text').readonly = e.detail.value}
  ></sc-toggle>
</div>
<div>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-text').disabled = e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  value="\
#test-text {
  width: 200px;
  height: 30px;
  font-size: 11px;
  border-radius: 2px;

  font-size: var(--sc-font-size);
  font-family: var(--sc-font-family);
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

<!-- testing -->
<!-- <sc-text readonly>${myVar}</sc-text> -->
`;
