const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const extractSASS = new ExtractTextPlugin({
  filename: 'styles.css',
  disable: false,
});

module.exports = {
  mode: 'development',
  context: __dirname,
  target: 'electron-main',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/temp'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.sass$/,
        use: extractSASS.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/main.js'),
        to: path.resolve(__dirname, 'src/temp/main.js'),
      },
    ]),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'src/temp/index.html'),
      template: path.resolve(__dirname, 'src/resource/template.html'),
      inject: false,
    }),
    extractSASS,
  ],
};
