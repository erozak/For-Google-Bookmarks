const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.base');
const { fromApp, fromRoot } = require('../utils/path');
const { OUTPUT_PATH } = require('./constants');

const createHTMLWebpackPlugin = (name) => new HTMLWebpackPlugin({
  filename: `${name}.html`,
  chunks: [name],
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
  template: fromApp('template.html'),
  inject: true,
});


module.exports = merge(common, {
  nodeEnv: 'production',
  mode: 'production',
  plugins: [
    createHTMLWebpackPlugin('popup'),
    createHTMLWebpackPlugin('options'),
    new CopyPlugin([
      {
        from: fromRoot('public'),
        to: OUTPUT_PATH,
      }
    ]),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
  },
});
