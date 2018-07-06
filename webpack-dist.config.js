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
  config.entry = path.resolve(__dirname, 'webpack-widgets.js');
  config.output.chunkFilename = config.output.filename.replace(/name/, 'chunkhash');
});

module.exports = configs;
