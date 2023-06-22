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
        {
          test: /\.(js|mjs)$/,
          // 'exclude': /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env',
                  {
                    targets: 'ios >= 9, not ie 11, not op_mini all',
                  }
                ]
              ],
              plugins: [
                ['@babel/plugin-transform-arrow-functions'], // for iOS 9 : https://caniuse.com/arrow-functions
                ['@babel/plugin-proposal-class-properties']
              ],
            },
          },
        },
      ],
    },
  };
};


