# Sourcemaps

```js
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
	// ...
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: 'style'
			},
			{
				test: /\.scss$/,
				loader: 'css',
				query: {
					sourceMap: true
				}
			},
			{
				test: /\.scss$/,
				loader: 'postcss'
			},
			{
				test: /\.scss$/,
				loader: 'sass',
				query: {
					sourceMap: true
				}
			}
		]
	}
};
```
