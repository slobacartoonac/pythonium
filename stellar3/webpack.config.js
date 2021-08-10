const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
	entry: './src/javascript/bootstrap.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  plugins: [
    new CopyWebpackPlugin(['./src/html/index.html'])
  ],
  mode: "development",
  externals: {
		test: /\.js?$/,
		include: [
		  path.resolve(__dirname),
		  path.resolve(__dirname, '../lib'),
		  path.resolve(__dirname, '../gravity_calc/pkg')
		],
		exclude: /node_modules/,
		loader: 'babel-loader'
	},
	resolve: {
		alias: {
		  my_lib: path.resolve(__dirname, '../lib'),
		  gravity_calc: path.resolve(__dirname, '../gravity_calc/pkg'),
		},
	}
};
