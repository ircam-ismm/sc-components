import '@webcomponents/webcomponentsjs';
import { html, render } from 'lit/html.js';
import { map } from 'lit/directives/map.js';

import applyStyle from './utils/applyStyle.js';

// import lib
import '../../index.js';

// list of pages
const pages = [
  'home',
  'sc-bang',
  'sc-button',
  'sc-toggle',
  'sc-text',
  'sc-radio',
  'sc-icon',
  'sc-dial',
  'sc-number',
  'sc-slider',
  'sc-clock',
  'sc-editor',
  'sc-code-example',
  'sc-select',
  'sc-dots',
  'sc-matrix',
  'sc-signal',
  'sc-tap-tempo',
  'sc-switch',
  'sc-flash',
  'sc-record',
  'sc-prev',
  'sc-next',
  'sc-loop',
].sort();

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

// current page module
let current = null;

async function setContent(pages, page) {
  // fallback to homepage
  if (!pages.includes(page)) {
    page = 'home';
  }

  const title = (page === 'home') ? 'sc-component | documentation' : `${page} | sc-components`;
  document.title = title;
  // reset styles
  applyStyle('');

  // render navbar and close it if it is opened - ordered
  const $nav = document.querySelector('#main > nav');

  render(map(pages, (value) => {
    return html`<a
      href="/${value}"
      class="${value === page ? 'selected' : ''}"
      @click=${e => {
        e.preventDefault();

        if (value === page) {
          return;
        }

        history.pushState({ page: value }, '', `/${value}`);
        setContent(pages, value);
      }}
    >${value}</a>`;
  }), $nav);

  $nav.classList.remove('active');

  // exit current page
  if (current && current.exit) {
    current.exit();
  }
  // grab new page
  current = await import(`./${page}.js`);

  render(current.template, document.querySelector('#main > section'));

  if (current.enter) {
    current.enter();
  }
}

(async function main() {
  // init on rigth page
  const pathname = window.location.pathname;
  const page = pathname.replace(/^\//, '');

  // history stuff
  history.pushState({ page }, '', `/${page}`);

  window.addEventListener('popstate', e => {
    setContent(pages, e.state.page);
  });

  setContent(pages, page);
  // ligh / dark mode
  document.querySelector('#switch-mode').addEventListener('change', () => {
    const $content = document.querySelector('#main > section');
    $content.classList.toggle('dark');
    $content.classList.toggle('light');
  });

  // show / hide nav bar on small screens
  document.querySelector('#toggle-menu').addEventListener('input', () => {
    const $nav = document.querySelector('#main > nav');
    $nav.classList.toggle('active');
  });
}());
