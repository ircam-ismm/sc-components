import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-clock</h2>

<pre><code class="language-javascript">\
${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-clock.js';

const template = html\`<sc-clock
  .getTimeFunction=\${e => Date.now() / 1000}
></sc-clock>\`;`}
</code></pre>

<sc-clock id="test-clock"></sc-clock>

<h3>Attributes</h3>
<p>
  <sc-text readonly>[?twinkle=true]</sc-text>
  <sc-toggle
    active
    @change=${e => document.querySelector('#test-clock').twinkle = e.detail.value}
  ></sc-toggle>
</p>
<p>
  <sc-text readonly>[format='hh:mm:ss:ms']</sc-text>
  <sc-text
    @change=${e => document.querySelector('#test-clock').format = e.detail.value}
  >hh:mm:ss:ms</sc-text>
</p>

<h3>Properties</h3>
<p>
  <sc-text readonly>[.getTimeFunction]</sc-text>
  <sc-editor
    value="\
  const $clock = document.querySelector('#test-clock');
  const startTime = Date.now();

  $clock.getTimeFunction = () => {
    const dt = Date.now() - startTime;
     // return time in seconds
    return dt / 1000;
  }
"
    @change=${e => eval(e.detail.value)}
  ></sc-editor>
</p>

<h3>Styling</h3>
<sc-editor
  value="\
#test-clock {
  width: 200px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

`;

// (function() {
//   const startTime = Date.now();

//   // $clock.getTimeFunction = getTime
//   return function getTime() {
//     const dt = Date.now() - startTime;
//      // return time in seconds
//     return dt / 1000;
//   }
// }())
