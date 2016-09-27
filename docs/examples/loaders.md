# Loaders

* Order of loaders is important - last loader in array will be applied first, second-to-last second, etc. This is not the case with plugins.

## Adding loaders

Loaders can be added in two different ways.

### Every loader in it’s object block

```js
module.exports = {
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: 'style'
			},
			{
				test: /\.scss$/,
				loader: 'css'
			},
			{
				test: /\.scss$/,
				loader: 'postcss'
			},
			{
				test: /\.scss$/,
				loader: 'sass'
			}
		]
	}
};
```

## Combined loaders

This is useful for plugins like [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md).

```js
var combineLoaders = require('webpack-config-niksy').combineLoaders;

module.exports = {
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: combineLoaders([
					{
						loader: 'style'
					},
					{
						loader: 'css'
					},
					{
						loader: 'postcss'
					},
					{
						loader: 'sass'
					}
				])
			}
		]
	}	
};
```
