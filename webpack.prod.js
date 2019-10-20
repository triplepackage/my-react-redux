const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
   devtool: 'source-map',
   performance: {
     maxAssetSize: 1000000
   },
   plugins: [
     new CleanWebpackPlugin(['dist']),
   ]
 });
