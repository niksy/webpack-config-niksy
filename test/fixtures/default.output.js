module.exports = {
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[chunkhash].chunk.js'
	},
	module: {
		rules: [
			{
				parser: {
					amd: false
				}
			}
		]
	}
};
