const path = require('path');

let configs = require('@ucd-lib/cork-app-build').dist({
  root : __dirname,
  entry : 'webpack-widgets.js',
  dist : 'dist/lib',
  clientModules : 'widgets/node_modules',
  modern : '[name].bundle.js',
  ie : '[name].ie-bundle.js'
});

configs.forEach(config => {
  config.output.chunkFilename = config.output.filename.replace(/name/, 'chunkhash');
});

module.exports = configs;
