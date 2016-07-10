module.exports = {
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[chunkhash].chunk.js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				include: /local_modules/,
				loader: 'style'
			},
			{
				test: /\.scss$/,
				include: /local_modules/,
				loader: 'css',
				query: {
					sourceMap: true
				}
			},
			{
				test: /\.scss$/,
				include: /local_modules/,
				loaders: ['postcss']
			},
			{
				test: /\.scss$/,
				include: /local_modules/,
				loader: 'sass?sourceMap'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.js$/,
				loader: 'imports',
				query: {
					define: '>false'
				}
			}
		]
	},
	bail: true
};
