module.exports = {
	module: {
		loaders: [
			{
				test: /\.css$/,
				include: /local_modules/,
				loader: 'style'
			}
		]
	}
};
