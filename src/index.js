import { html, render } from 'lit/html.js';
import { map } from 'lit/directives/map.js';

import applyStyle from './utils/applyStyle.js';

// import lib
import '../../src/index.js';
// list of pages
import components from './components.js';
// debug mode on localhost
window.SC_DEBUG = window.location.hostname === 'localhost';

const pages = {
  'intro': {
    'home': 'home',
    'styling': 'misc-styling',
  },
  components: components.reduce((acc, value) => {
    acc[value] = value;
    return acc;
  }, {}),
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

setTheme('dark');

// current page module
let current = null;
let prefix = null;

async function setContent(pages, page) {
  // fallback to homepage if page is not found
  let pageFound = false;

  for (let name in pages) {
    const pageList = pages[name];
    for (let [key, value] of Object.entries(pageList)) {
      if (value === page) {
        pageFound = true;
      }
    }
  }

  if (!pageFound) {
    page = 'home';
  }

  // document title
  document.title = (page === 'home')
    ? 'sc-components | documentation'
    : `${page} | sc-components`;

  // reset styles
  applyStyle('');

  // render nav bar
  const $nav = document.querySelector('#main > nav');
  // close navbar on small screens
  $nav.classList.remove('active');

  const nav = [];

  for (let name in pages) {
    const pageList = pages[name];

    // nav section title
    if (name !== 'intro') {
      const navTitle = html`<p>${name}</p>`;
      nav.push(navTitle);
    }

    // link list
    const links = map(Object.entries(pageList), ([value, key]) => {
      return html`<a
        href="./${key}"
        class="${page === key ? 'selected' : ''}"
        @click=${e => {
          e.preventDefault();

          if (page === key) {
            return;
          }

          const url = key === 'home' ? `${prefix}/` : `${prefix}/${key}`;
          history.pushState({ page: key }, '', url);
          setContent(pages, key);
        }}
      >${value}</a>`;
    });

    nav.push(links);
  }

  render(nav, $nav);

  // exit current page
  if (current && current.exit) {
    current.exit();
  }
  // grab new page
  current = await import(`./${page}.js`);

  render(current.template, document.querySelector('#main > section'));

  // focus the example element
  const $demoEl = document.querySelector(`#main > section ${page}`);
  if ($demoEl) {
    setTimeout(() => $demoEl.focus(), 0);
  }

  if (current.enter) {
    current.enter();
  }
}

(async function main() {
  // init on rigth page
  const pathname = window.location.pathname;
  const isProd = pathname.startsWith('/sc-components');
  prefix = isProd ? '/sc-components' : '';

  const page = pathname.replace(new RegExp(`^${prefix}/`), '');

  // history stuff
  history.pushState({ page }, '', `${prefix}/${page}`);

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
