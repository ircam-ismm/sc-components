import '@babel/polyfill';
import '@webcomponents/webcomponentsjs';
import { html, render } from 'lit/html.js';
import { until } from 'lit/directives/until.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import '../../sc-position-surface.js';
import '../../sc-speed-surface.js';

import '../../sc-button.js';
import '../../sc-toggle.js';
import '../../sc-slider.js';
import '../../sc-number.js';
import '../../sc-editor.js';
import '../../sc-text.js';
import '../../sc-bang.js';
import '../../sc-signal.js';
import '../../sc-dot-map.js';
import '../../sc-dragndrop.js';
import '../../sc-matrix.js';
import '../../sc-context-menu.js';
import '../../sc-file-tree.js';
import '../../sc-transport.js';
import '../../sc-record.js';
import '../../sc-loop.js';
import '../../sc-tap-tempo.js';
import '../../sc-return.js';

// controls
import matrix from './sc-matrix-example.js';
import dragndrop from './sc-dragndrop-example.js';
import bang from './sc-bang-example.js';
import button from './sc-button-example.js';
import editor from './sc-editor-example.js';
import number from './sc-number-example.js';
import slider from './sc-slider-example.js';
import text from './sc-text-example.js';
import toggle from './sc-toggle-example.js';
import dotMap from './sc-dot-map-example.js';
import contextMenu from './sc-context-menu-example.js';
import fileTree from './sc-file-tree-example.js';
import transport from './sc-transport-example.js';
import record from './sc-record-example.js';
import loop from './sc-loop-example.js';
import returnButton from './sc-return-example.js';
import tapTempo from './sc-tap-tempo-example.js';

// monitoring
import signal from './sc-signal-example.js';

const docs = {
  'sc-bang': bang,
  'sc-toggle': toggle,
  'sc-number': number,
  'sc-slider': slider,
  'sc-button': button,
  'sc-text': text,
  'sc-transport': transport,
  'sc-record': record,
  'sc-loop': loop,
  'sc-editor': editor,
  'sc-matrix': matrix,
  'sc-dot-map': dotMap,
  'sc-dragndrop': dragndrop,
  'sc-context-menu': contextMenu,
  'sc-signal': signal,
  'sc-file-tree': fileTree,
  'sc-transport': transport,
  'sc-tap-tempo': tapTempo,
  'sc-return': returnButton,
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
