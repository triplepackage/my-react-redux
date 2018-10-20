var debug = process.env.WEBPACK_MODE !== "production";
var path = require('path');
var webpack = require('webpack');
var dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    path: path.join(__dirname, 'dist'),
    filename: "client.min.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: debug ? [
    new dotenv(),
    new HtmlWebpackPlugin({template: path.join(__dirname,"/src/index.html")})
    ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new HtmlWebpackPlugin({template: path.join(__dirname,"/src/index.html")}),
    new dotenv()
  ],
};
