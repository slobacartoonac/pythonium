const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
  externals: {
		test: /\.js?$/,
		include: [
		  path.resolve(__dirname),
		  path.resolve(__dirname, '../lib')
		],
		exclude: /node_modules/,
		loader: 'babel-loader'
	},
	resolve: {
		alias: {
		  my_lib: path.resolve(__dirname, '../lib'),
		},
	}
};
