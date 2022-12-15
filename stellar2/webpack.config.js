// Webpack uses this to work with directories
const path = require('path')

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

	// Path to your entry point. From this file Webpack will begin his work
	entry: './src/javascript/index.js',

	// Path and filename of your result bundle.
	// Webpack will bundle all JavaScript into this file
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	// Default mode for Webpack is production.
	// Depending on mode Webpack will apply different things
	// on final bundle. For now we don't need production's JavaScript 
	// minifying and other thing so let's set mode to development
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: [
					/node_modules/
				]
			}
		]
	},
	externals: {
		test: /\.js?$/,
		include: [
			path.resolve(__dirname),
			path.resolve(__dirname, '../lib')
		],
		exclude: /node_modules/,
		loader: 'babel-loader'
	},
}
