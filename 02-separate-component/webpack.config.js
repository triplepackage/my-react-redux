var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var dotenv = require('dotenv-webpack')

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/index.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ],
    rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }]
  },
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js",
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: debug ? [
    new dotenv()
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new dotenv()
  ],
};