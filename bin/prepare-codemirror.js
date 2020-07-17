const fs = require('fs');
const path = require('path');

// https://stackoverflow.com/questions/10111163/in-node-js-how-can-i-get-the-path-of-a-module-i-have-loaded-via-require-that-is#answer-49455609
const pathToCodeMirror = path.dirname(require.resolve('codemirror/package.json'));

const pre = `
import { css } from 'lit-element';

export default css\`
`;

const post = `
\`;
`;

const distDirectory = path.join(process.cwd(), 'vendors');

if (!fs.existsSync(distDirectory)) {
  fs.mkdirSync(distDirectory);
}

const cmCss = {
  input: path.join(pathToCodeMirror, 'lib/codemirror.css'),
  output: path.join(distDirectory, 'codemirror-css.js'),
};

const theme = {
  input: path.join(pathToCodeMirror, 'theme/monokai.css'),
  output: path.join(distDirectory, 'theme-monokai-css.js'),
};

const searchBox = {
  input: path.join(pathToCodeMirror, 'addon/dialog/dialog.css'),
  output: path.join(distDirectory, 'addon-dialog-css.js'),
};

const lint = {
  input: path.join(pathToCodeMirror, 'addon/lint/lint.css'),
  output: path.join(distDirectory, 'addon-lint-css.js'),
};

[cmCss, theme, searchBox, lint].forEach(dep => {
  const css = fs.readFileSync(dep.input);
  const js = `${pre}${css}${post}`;
  fs.writeFileSync(dep.output, js);
});



