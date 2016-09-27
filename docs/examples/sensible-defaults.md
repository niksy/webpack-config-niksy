# Sensible defaults

* `bootstrap` and `core` entry points contain common modules used throughout application. [Order of files is important](https://github.com/webpack/webpack/issues/1016#issuecomment-182093533)
* Every emitted file contains `[chunkhash]` so it gets changed only when file contents are changed for proper file revving and long-term caching

```js
var webpack = require('webpack');

module.exports = {
	entry: {
		bootstrap: ['modernizr'],
		core: ['jquery', 'underscore', './input/core.js'],
		index: './input/index.js'
	},
	output: {
		path: './output',
		publicPath: '//localhost/output/',
		filename: '[name]-[chunkhash].js',
		chunkFilename: '[id]-[chunkhash].js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style'
			},
			{
				test: /\.css$/,
				loader: 'css'
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['core', 'bootstrap'],
			minChunks: Infinity
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: true,
			mangle: true,
			comments: false
		})
	]
};
```
