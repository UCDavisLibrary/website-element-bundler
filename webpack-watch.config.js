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
  config.entry = path.resolve(__dirname, 'webpack-widgets.js');
  config.output.chunkFilename = config.output.filename;
});

module.exports = configs;