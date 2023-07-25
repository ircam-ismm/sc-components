import path from 'node:path';
import * as url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// build unpkg bundle

export default {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
};
