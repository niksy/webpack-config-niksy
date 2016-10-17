# Long-term caching

There are 2 viable approaches:

* Follow recommendations from [Medium article on long-term caching](https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95), which follow conventional "content hash" way of long term caching but has some issues in development mode (e.g. hashes don’t get updated on watch change)
* [Use Webpack internals for creating small "runtime chunk"](https://github.com/webpack/webpack/tree/master/examples/chunkhash) which contains Webpack runtime and chunk manifest. Everything else will stay mostly long-term cached
	* This can also be used in combination with `OccurenceOrderPlugin` for properly ordered modules

## Example for first approach

```js
var webpack = require('webpack');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
	// ...
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['core', 'bootstrap'],
			minChunks: Infinity,
		}),
		new WebpackMd5Hash(),
		new ChunkManifestPlugin({
			filename: 'chunk-manifest.json',
			manifestVariable: 'webpackManifest'
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	]
};
```

## Example for second approach

```js
var webpack = require('webpack');

module.exports = {
	// ...
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['core', 'bootstrap', 'runtime'],
			minChunks: Infinity,
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	]
};
```
