# Styles

* Extracts style to separate CSS file
* Runs Sass and PostCSS
* Outputs with `[contenthash]` for proper file revving and long-term caching

```js
var config = require('webpack-config-niksy');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	// ...
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', config.combineLoaders([{
					{
						loader: 'css'
					},
					{
						loader: 'postcss'
					}
				}]))
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', , config.combineLoaders([{
					{
						loader: 'css'
					},
					{
						loader: 'postcss'
					},
					{
						loader: 'sass'
					}
				}]))
			}
		]
	},
	postcss: function () {
		return [
			autoprefixer({
				browsers: [
					'last 10 versions'
				]
			})
		];
	},
	plugins: [
		// ...
		new ExtractTextPlugin('[name]-[contenthash].css')
	]
};
```
