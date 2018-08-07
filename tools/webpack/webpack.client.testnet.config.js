const webpack = require('webpack');
const path = require('path');

var client = {
  entry: './src/client/client.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'public/client.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'TESTNET': true
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = client;
