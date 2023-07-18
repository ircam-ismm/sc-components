import { html, render } from 'lit/html.js';
import { map } from 'lit/directives/map.js';

// import lib
import '../../index.js';
// list of pages
import components from './components.js';

// current page module
let current = null;

async function setContent(page) {
  if (current && current.exit) {
    current.exit();
  }

  current = await import(`./test-${page}.js`);

  render(current.template, document.body.querySelector('section'));

  if (current.enter) {
    current.enter();
  }
}

(async function main() {
  setContent('raw-style');
  // setContent('directives');
  // init on rigth page
  const $links = document.body.querySelectorAll('nav a');
  $links.forEach($link => {
    $link.addEventListener('click', e => {
      e.preventDefault();
      const page = $link.id;

      setContent(page);
    });
  });
}());
