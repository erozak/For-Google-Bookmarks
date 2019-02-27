const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.base');

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
  template: path.resolve(process.cwd(), 'app/template.html'),
  inject: true,
});


module.exports = merge(common, {
  mode: 'production',
  plugins: [
    createHTMLWebpackPlugin('popup'),
    createHTMLWebpackPlugin('options'),
    new CopyPlugin([
      {
        from: path.resolve(process.cwd(), 'public'),
        to: path.resolve(process.cwd(), 'build'),
      }
    ]),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ],
  },
});
