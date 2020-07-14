const fs = require('fs');
const path = require('path');
const cwd = process.cwd();

const pre = `
import { css } from 'lit-element';

export default css\`
`;

const post = `
\`;
`;

const distDirectory = path.join(cwd, 'vendors');
if (!fs.existsSync(distDirectory)) {
  fs.mkdirSync(distDirectory);
}

const cmCss = {
  input: path.join(cwd, 'node_modules/codemirror/lib/codemirror.css'),
  output: path.join(distDirectory, 'codemirror-css.js'),
};

const theme = {
  input: path.join(cwd, 'node_modules/codemirror/theme/monokai.css'),
  output: path.join(distDirectory, 'theme-monokai-css.js'),
};

const searchBox = {
  input: path.join(cwd, 'node_modules/codemirror/addon/dialog/dialog.css'),
  output: path.join(distDirectory, 'addon-dialog-css.js'),
};

const lint = {
  input: path.join(cwd, 'node_modules/codemirror/addon/lint/lint.css'),
  output: path.join(distDirectory, 'addon-lint-css.js'),
};

[cmCss, theme, searchBox, lint].forEach(dep => {
  const css = fs.readFileSync(dep.input);
  const js = `${pre}${css}${post}`;
  fs.writeFileSync(dep.output, js);
});



