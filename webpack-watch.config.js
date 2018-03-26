const path = require('path');
const entries = require('./entries');

let config = require('@ucd-lib/cork-app-build').watch({
  root : __dirname,
  entry : '@ucd-lib/ucd-library-search/ucd-library-search',
  preview : 'preview',
  clientModules : 'elements/node_modules',
  modern : '[name].bundle.js'
});

// local test
entries.test = path.join(__dirname, 'test-widget')
config.resolve.modules.push(path.join(__dirname, 'test-widget', 'node_modules'));

config.entry = entries;

config.optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor",
        chunks: "all"
      }
    }
  }
}

module.exports = config;