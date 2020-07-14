module.exports = api => {
  api.cache(false);

  return {
    "sourceMap": "inline",
    "presets": [
      [
        "@babel/preset-env", {}
      ]
    ],
    plugins: [
      ['@babel/plugin-transform-arrow-functions'],
      ['@babel/plugin-proposal-class-properties', { 'loose' : true }],
    ]
  }
}

