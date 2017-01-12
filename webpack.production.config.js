var path = require('path')
var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("production")
      }
    }),
    new WriteFilePlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
};
