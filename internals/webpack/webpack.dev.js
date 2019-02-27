const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.base');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
});
