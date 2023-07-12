import path from 'node:path';
import * as url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default env => {
  let options = {};

  if (env.production) {
    options.mode = 'production';
  } else {
    options.mode = 'development';
    options.devtool = 'eval-cheap-module-source-map';
  }

  return {
    entry: './src/index.js',
    ...options,
    output: {
      filename: 'bundle.js',
      path: path.join(path.resolve(__dirname), 'build'),
    },
    module: {
      rules: [
        {
          test: /\.worklet\.js$/,
          use: {
            loader: 'worklet-loader'
          },
        },
      ],
    },
  };
};


