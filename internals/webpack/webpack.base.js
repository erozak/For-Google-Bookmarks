const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    popup: path.resolve(process.cwd(), 'app/popup.ts'),
    options: path.resolve(process.cwd(), 'app/options.ts'),
    background: path.resolve(process.cwd(), 'app/background.ts'),
    content_scripts: path.resolve(process.cwd(), 'app/content.ts'),
  },
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: 'js/[name].js',
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
  },
};
