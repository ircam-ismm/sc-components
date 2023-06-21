import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`
<h2>sc-bang</h2>

<pre><code class="language-javascript">\
${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-toggle.js';

const template = html\`<sc-toggle></sc-toggle>\`;`}
</code></pre>

<sc-bang
  id="test-bang"
  @input="${e => {
    const $event = document.querySelector('#bang-input');
    $event.active = true;
  }}"
></sc-bang>

<h3>Events</h3>
<p>
  <sc-text readonly value="@input"></sc-text>
  <sc-bang id="bang-input"></sc-bang>
</p>
<pre><code class="language-html">\
${`\
<sc-toggle
  @input=\${e => console.log(e.detail.value)}
></sc-toggle>`}
<code></pre>

<h3>Attributes</h3>
<p>
  <sc-text readonly value="[active=false]"></sc-text>
  <sc-bang
    @input="${e => {
      const $component = document.querySelector('#test-bang');
      $component.active = true;
    }}"
  ></sc-bang>
</p>
<pre><code class="language-javascript">\
${`\
// use the "live" directive to make the element responsive to events
import { html } from 'lit';
import { live } from 'lit/directives/live.js';

html\`
  <sc-toggle
    ?active=\${live(myFlag)}
  ></sc-toggle>
\`;`}
</code></pre>
<p>
  <sc-text readonly value="[disabled=false]"></sc-text>
  <sc-toggle
    @change="${e => {
      const $component = document.querySelector('#test-bang');
      $component.disabled = e.detail.value;
    }}"
  ></sc-toggle>
</p>

<h3>Styling</h3>
<sc-editor
  value="\
#test-bang {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
