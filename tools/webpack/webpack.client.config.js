const webpack = require('webpack');
const path = require('path');

//Change process.env to production when going live.
//TODO: Make dev/production environment selection more efficient

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
      'process.env': {
        NODE_ENV: `'development'`
      }
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

module.exports = client;
