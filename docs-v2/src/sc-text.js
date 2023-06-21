import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`
<h2>sc-text</h2>

<pre><code>
import '@ircam/simple-components/sc-text.js';

${`<sc-text></sc-text>`}
</code></pre>

<sc-text
  id="test-text"
  @change="${e => {
    const $event = document.querySelector('#text-change');
    $event.value = e.detail.value;
  }}"
>Hello!</sc-text>

<h3>Events</h3>
<div>
  <sc-text readonly>@change</sc-text>
  <sc-text readonly id="text-change"></sc-text>
  <p><i>@change event is triggered on blur and on "cmd + s" </i></p>
</div>
<pre><code class="language-html">\
${`\
<sc-text
  @change=\${e => console.log(e.detail.value)}
></sc-text>`}
<code></pre>

<h3>Attributes</h3>
<p>
  <sc-text readonly>[value='']</sc-text>
  <sc-text
    @change="${e => {
      const $component = document.querySelector('#test-text');
      $component.value = e.detail.value;
    }}"
  ></sc-text>
</p>
<p>
  <sc-text readonly>[readonly=false]</sc-text>
  <sc-toggle
    @change="${e => {
      const $component = document.querySelector('#test-text');
      $component.readonly = e.detail.value;
    }}"
  ></sc-toggle>
</p>
<p>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change="${e => {
      const $component = document.querySelector('#test-text');
      $component.disabled = e.detail.value;
    }}"
  ></sc-toggle>
</p>

<h3>Styling</h3>
<sc-editor
  value="\
#test-text {
  width: 200px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
