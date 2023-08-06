// copy index.html to every pages to avoid the 404.html (and problems) when
// deploying on github
import fs from 'node:fs';

import { pages } from '../src/infos.js';

// flatten pages
const list = [];

for (let cat in pages) {
  const subpages = pages[cat];

  for (let title in subpages) {
    if (subpages[title] === 'home') {
      continue;
    }

    list.push(subpages[title]);
  }
}

const indexFile = 'index.html';

list.forEach(page => {
  if (page === 'home') {
    return;
  }

  fs.cpSync('index.html', `${page}.html`);
});

