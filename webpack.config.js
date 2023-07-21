import path from 'node:path';
import * as url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default {
  entry: './index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
};
