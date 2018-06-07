const path = require('path');

let configs = require('@ucd-lib/cork-app-build').dist({
  root : __dirname,
  entry : '',
  dist : 'dist/lib',
  clientModules : 'widgets/node_modules',
  modern : '[name].bundle.js',
  ie : '[name].ie-bundle.js'
});

configs.forEach(config => {
  config.entry = require('./webpack-widgets.js');
  for( let key in config.entry ) {
    config.entry[key] = path.resolve(__dirname, config.entry[key]);
  }

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
