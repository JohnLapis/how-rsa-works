const path = require('path')
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = function (webpackEnv) {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve('./js'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              "presets": ["babel-preset-react-app"],
            }
          }
        },
      ],
    },
  }
}
