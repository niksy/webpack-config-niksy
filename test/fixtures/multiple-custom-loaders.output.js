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
			},
			{
				test: /\.scss$/,
				include: /local_modules/,
				use: [{
					loader: 'style-loader'
				}]
			},
			{
				test: /\.scss$/,
				include: /local_modules/,
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}]
			},
			{
				test: /\.scss$/,
				include: /local_modules/,
				use: [{
					loader: 'postcss-loader'
				}]
			},
			{
				test: /\.scss$/,
				include: /local_modules/,
				use: [{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}]
			}
		]
	}
};
