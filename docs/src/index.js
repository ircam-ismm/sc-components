import '@babel/polyfill';
import '@webcomponents/webcomponentsjs';
import { html, render } from 'lit/html.js';
import { map } from 'lit/directives/map.js';
import hljs from 'highlight.js';

import applyStyle from './utils/applyStyle.js';

// import lib
import '../../index.js';

// ignore unescape html warnings
hljs.configure({ ignoreUnescapedHTML: true });

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

setTheme('dark');

let current = null;

function setContent(pages) {
  let hash = window.location.hash.replace(/^#/, '');

  // fallback to homepage
  if (hash === '') {
    hash = 'home';
  }

  // reset styles
  applyStyle('');

  // nav (order)
  render(map(Object.entries(pages), ([key, value]) => {
    return html`<a href="#${key}" class="${key === hash ? 'selected' : ''}">${key}</a>`;
  }), document.querySelector('#main > nav'));

  // exit current page
  if (current && current.exit) {
    current.exit();
  }
  // grab new page
  current = pages[hash] ? pages[hash] : pages['home'];

  render(current.template, document.querySelector('#main > section'));

  if (current.enter) {
    current.enter();
  }

  // example and api zones
  // const $example = document.querySelector('.example');
  // const $api = document.querySelector('.api');

  // if ($example && $api) {
  //   const { height } = $example.getBoundingClientRect();
  //   $api.style.marginTop = `${height + 140}px`;
  // }

  // highlight code blocks
  hljs.highlightAll();
}

(async function main() {
  // add pages
  const pages = {
    'home': await import('./home.js'),
    'sc-bang': await import('./sc-bang.js'),
    'sc-button': await import('./sc-button.js'),
    'sc-toggle': await import('./sc-toggle.js'),
    'sc-text': await import('./sc-text.js'),
    'sc-radio': await import('./sc-radio.js'),
    'sc-icon': await import('./sc-icon.js'),
    'sc-dial': await import('./sc-dial.js'),
    'sc-number': await import('./sc-number.js'),
    'sc-slider': await import('./sc-slider.js'),
    'sc-clock': await import('./sc-clock.js'),
    'sc-editor': await import('./sc-editor.js'),
    'sc-code-example': await import('./sc-code-example.js'),
    'sc-select': await import('./sc-select.js'),
    'sc-dots': await import('./sc-dots.js'),
    'sc-matrix': await import('./sc-matrix.js'),
    'sc-signal': await import('./sc-signal.js'),
    'sc-tap-tempo': await import('./sc-tap-tempo.js'),
    'sc-switch': await import('./sc-switch.js'),
  };

  const sortedKeys = Array.from(Object.keys(pages)).sort();
  const sortedPages = sortedKeys.reduce((acc, key) => {
    acc[key] = pages[key];
    return acc;
  }, {});

  window.addEventListener('hashchange', (e) => setContent(sortedPages));
  setContent(sortedPages);

  document.querySelector('#switch-mode').addEventListener('change', () => {
    console.log('coucou');
    const $content = document.querySelector('#main > section');
    $content.classList.toggle('dark');
    $content.classList.toggle('light');
  });

  document.querySelector('#toggle-menu').addEventListener('input', () => {
    const $nav = document.querySelector('#main > nav');
    $nav.classList.toggle('active');
  });
}());
