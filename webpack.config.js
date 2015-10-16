var webpack = require('webpack');
var path = require('path');

var config = {
  context: path.join(__dirname, '/source'),

  entry: {
    'replace-webpack-plugin': './replace-webpack-plugin.js'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'replace-webpack-plugin.js',
    library: 'replace-webpack-plugin',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('replace-webpack-plugin', 'replace-webpack-plugin.js')
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
