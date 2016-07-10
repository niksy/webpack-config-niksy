var webpack = require('webpack');

module.exports = {
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'core',
			filename: 'core.bundle.js'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};
