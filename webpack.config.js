var path = require('path')
var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');
module.exports = {
  entry: [
    './src/client/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.s?css$/,
      loaders: ['style','css','sass'],
      include: path.join(__dirname, 'src')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
