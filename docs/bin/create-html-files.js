// copy index.html to every pages to avoid the 404.html (and problems) when
// deploying on github
import fs from 'node:fs';

import pages from '../src/pages.js';

console.log(process.cwd());

const indexFile = 'index.html';

pages.forEach(page => {
  if (page === 'home') {
    return;
  }

  fs.cpSync('index.html', `${page}.html`);
});

