const path = require('path');

module.exports = env => {
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


