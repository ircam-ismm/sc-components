import '@babel/polyfill';
import '@webcomponents/webcomponentsjs';
import { html, render } from 'lit/html.js';
import { map } from 'lit/directives/map.js';
import hljs from 'highlight.js';

import applyStyle from './utils/applyStyle.js';

// import lib
import '../../index.js';

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

  // main page
  const { template } = pages[hash];
  render(template, document.querySelector('#main > section'));

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
  };

  window.addEventListener('hashchange', (e) => setContent(pages));
  setContent(pages);

  document.querySelector('#switch-mode').addEventListener('input', () => {
    const $content = document.querySelector('#content');
    $content.classList.toggle('dark');
    $content.classList.toggle('light');
  });
}());
