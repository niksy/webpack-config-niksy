module.exports = {
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[chunkhash].chunk.js'
	},
	module: {
		loaders: [
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
	bail: true,
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.json', '.js'],
		packageMains: ['browser', 'main'],
		packageAlias: 'browser'
	}
};
