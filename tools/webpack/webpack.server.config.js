const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

//Change process.env to production when going live.
//TODO: Make dev/production environment selection more efficient

var server = {
  entry: './src/server.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'development'`,
      },
      'TESTNET': true
    })
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

module.exports = server;
