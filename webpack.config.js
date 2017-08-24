const parts = require('./config/webpack.parts');
const env = require('./config/env.js');

// Toggle NODE_ENV environment variable between
// 'development' and 'production' for different builds
// Defaults to 'production'
process.env.BABEL_ENV === env ? 'development' : 'production';

module.exports = {
  entry: parts.entry,
  output: parts.output,

  plugins: parts.plugins,
  devtool: parts.devtool,
  devServer: parts.devServer,

  module: {
    rules: [
      parts.lintCSS,
      parts.loadCSS,
      parts.lintJS,
      parts.loadJS,
      parts.loadImages,
    ],
  },
};
