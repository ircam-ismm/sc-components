import { css } from 'lit';

// insert global variables in document
const cssVars = `
:root {
  --sc-font-family: Consolas, monaco, monospace;
  --sc-font-size: 11px;
  --sc-color-primary-1: #121212ff;
  --sc-color-primary-2: #272822ff;
  --sc-color-primary-3: #3d3e39ff;
  --sc-color-primary-4: #6a6a69ff;
  --sc-color-primary-5: #dededeff;
  --sc-color-secondary-1: #f4b43eff; /* orange / yellow */
  --sc-color-secondary-2: #1c78c0ff; /* blue */
  --sc-color-secondary-3: #d9534fff; /* red */
  --sc-color-secondary-4: #5ec451ff; /* green */
  --sc-color-secondary-5: #cd7afaff; /* lila */
}
`;

// adapted from https://davidwalsh.name/add-rules-stylesheets
const $style = document.createElement('style');
$style.type = 'text/css';
$style.appendChild(document.createTextNode(''));

const $firstStylesheet = document.querySelector('style');
// insert before first stylesheet, so that values can be overriden by user
if ($firstStylesheet) {
  $firstStylesheet.parentNode.insertBefore($style, $firstStylesheet);
} else {
  document.head.appendChild($style);
}

// insert rule seem to be available when element is in the DOM
$style.sheet.insertRule(cssVars);
