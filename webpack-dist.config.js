const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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

  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8,
          mangle: {
            safari10: true
          }
        }
      })
    ]
  }
});

module.exports = configs;
