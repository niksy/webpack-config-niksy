module.exports = {
	module: {
		rules: [
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
