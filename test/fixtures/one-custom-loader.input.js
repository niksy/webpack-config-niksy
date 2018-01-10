module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				include: /local_modules/,
				use: [{
					loader: 'style-loader'
				}]
			}
		]
	}
};
