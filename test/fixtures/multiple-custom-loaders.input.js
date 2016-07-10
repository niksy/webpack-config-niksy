module.exports = {
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
			}
		]
	}
};
