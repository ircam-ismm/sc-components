import '@babel/polyfill';
// import 'pepjs';
import { html, render } from 'lit-html';
import { until } from 'lit-html/directives/until.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import showdown from 'showdown';

const converter = new showdown.Converter();
// const text      = '# hello, markdown!';
// const htmlContent      = converter.makeHtml(text);
// console.log(htmlContent);

import '@ircam/simple-components/sc-position-surface.js';
import '@ircam/simple-components/sc-speed-surface.js';

import '@ircam/simple-components/sc-button.js';
import '@ircam/simple-components/sc-toggle.js';
import '@ircam/simple-components/sc-slider.js';
import '@ircam/simple-components/sc-number.js';
import '@ircam/simple-components/sc-editor.js';
import '@ircam/simple-components/sc-text.js';
import '@ircam/simple-components/sc-bang.js';
import '@ircam/simple-components/sc-signal.js';
import '@ircam/simple-components/sc-dot-map.js';

// controls
import bang from './sc-bang-example.js';
import button from './sc-button-example.js';
import editor from './sc-editor-example.js';
import number from './sc-number-example.js';
import slider from './sc-slider-example.js';
import text from './sc-text-example.js';
import toggle from './sc-toggle-example.js';
import dotMap from './sc-dot-map-example.js';

// monitoring
import signal from './sc-signal-example.js';

const docs = {
  'sc-bang': bang,
  'sc-button': button,
  'sc-editor': editor,
  'sc-number': number,
  'sc-slider': slider,
  'sc-text': text,
  'sc-toggle': toggle,
  'sc-signal': signal,
  'sc-dot-map': dotMap,
};

function setTheme(name) {
  switch (name) {
    case 'light':
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      break;
    case 'dark':
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      break;
  }
}

setTheme('light');

render(html`
  <section class="menu">
    <a href="https://github.com/ircam-ismm/simple-components">
      <sc-button text="Github"></sc-button>
    </a>
    <sc-button text="dark background" @press="${e => setTheme('dark')}"></sc-button>
    <sc-button text="light background" @press="${e => setTheme('light')}"></sc-button>

    ${Object.keys(docs).map(name => html`<a href="#${name}">&lt;${name}&gt;</a>`)}

  </section>
  <section class="content">
    <h1>sc-components</h1>

    <pre><code>
npm install @ircam/simple-components --save
    </code></pre>

    ${Object.keys(docs).map(name => {
      return html`
        <div class="component">
          <div class="doc">
            <h2><a href="#${name}" id="${name}" name="${name}">#</a> ${name}</h2>
            ${docs[name]()}
          </div>
        </div>
      `;
    })}

    <div style="height: 300px">&nbsp;</div>
  </section>
`, document.querySelector('#container'))
