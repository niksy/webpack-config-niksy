var webpack = require('webpack');

module.exports = {
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'core',
			filename: 'core.bundle.js'
		})
	]
};
