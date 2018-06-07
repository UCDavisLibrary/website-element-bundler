const path = require('path');
const BUILD_IE = true;

let configs = require('@ucd-lib/cork-app-build').watch({
  root : __dirname,
  entry : '',
  preview : 'preview/lib',
  clientModules : 'widgets/node_modules',
  modern : '[name].bundle.js',
  ie : '[name].ie-bundle.js'
}, BUILD_IE);

if( !Array.isArray(configs) ) {
  configs = [configs];
} 

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