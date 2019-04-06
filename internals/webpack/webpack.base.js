// ts-check

const webpack = require('webpack');
const path = require('path');

const { fromApp } = require('../utils/path');
const { OUTPUT_PATH } = require('./constants');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    popup: fromApp('popup.ts'),
    options: fromApp('options.ts'),
    background: fromApp('background.ts'),
    content_scripts: fromApp('content.ts'),
  },
  output: {
    path: OUTPUT_PATH,
    filename: 'scripts/[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules', fromApp()],
  },
};
