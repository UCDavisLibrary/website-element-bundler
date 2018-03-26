const path = require('path');
const entries = require('./entries');

let configs = require('@ucd-lib/cork-app-build').dist({
  root : __dirname,
  entry : '',
  dist : 'dist',
  clientModules : 'elements/node_modules',
  modern : '[name].bundle.js',
  ie : '[name].ie-bundle.js'
});

// local test
entries.test = path.join(__dirname, 'test-widget')

configs.forEach(config => {
  
  config.entry = entries;

  config.resolve.modules.push(path.join(__dirname, 'test-widget', 'node_modules'));

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
});

module.exports = configs;
