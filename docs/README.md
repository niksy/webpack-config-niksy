# Additional setup

## Sensible defaults

"core" entry point contains common bundle with modules used throughout application adn is extracted with `CommonsChunkPlugin`

```js
var webpack = require('webpack');

module.exports = {
	entry: {
		core: ['jquery', 'underscore', './input/core.js'],
		index: './input/index.js'
	},
	output: {
		path: './output',
		publicPath: '//localhost/output/',
		filename: '[name].bundle.js',
		chunkFilename: '[chunkhash].chunk.js'
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
			name: 'core',
			filename: 'core.bundle.js'
		})
	]
};
```

## Handle environment variables

```js
var webpack = require('webpack');

module.exports = {
	// ...
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
			}
		})
	]
};
```

## CSS config

* Extracts style to separate CSS file
* Runs SASS and PostCSS

```js
var webpack = require('webpack');
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
		new ExtractTextPlugin('[name].bundle.css')
	]
};
```

## Sourcemaps

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

## Shimming

1. Exports from `./input/exposed-module` will be available on window (global) as `window.ExposedModule` (this should never be used, instead, you should use explicit define like `global.ExposedModule = require('./input/exposed-module');`)
2. If `./input/exposed-module` relies on jQuery but expects it to be available globally, this will prepend `var $ = require('jquery');` at the top of the file, making jQuery available locally (similar to "depends" in browserify-shim)
3. If `./input/exposed-module` doesn’t have proper exports, but instead exposes itself through global variables, this will expose those global variables through `module.exports`, so `window.exposed` will be exported from this module as `module.exports = window.exposed` (similar to "exports" in browserify-shim)
4. If jQuery is already defined in global scope and you don’t want to include it in your bundles (or isn’t part of bundling process), you can still use standard CommonJS requires, but replace calls to jQuery with reference to global variable. This will replace every reference to `require('jquery')` with `window.$`, so instead of `var $ = require('jquery');` you will get `var $ = window.$;` (similar to "global:jquery" in browserify-shim)

```js
var webpack = require('webpack');
var StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
	entry: {
		index: './input/index.js'
	},
	output: {
		path: './output',
		filename: '[name].bundle.js',
	},
	module: {
		loaders: [
			{
				test: require.resolve('./input/exposed-module'), // 1
				loader: 'expose?ExposedModule'
			},
			{
				test: require.resolve('./input/exposed-module'), // 2
				loader: 'imports?$=jquery'
			},
			{
				test: require.resolve('./input/exposed-module'), // 3
				loader: 'exports?window.exposed'
			},
			{
				
				test: /\.js$/, // 4
				loader: StringReplacePlugin.replace({
					replacements: [
					{
						pattern: /require\('jquery'\)/ig,
						replacement: function () {
							return 'window.$';
						}
					}
				]})
			}
		]
	}
	plugins: [
		new StringReplacePlugin()
	]
};
```

## Directory alias

Similar to "paths" in Browserify (difference).

```js
var path = require('path');

module.exports = {
	// ...
	resolve: {
		root: [
			path.resolve(__dirname, 'local_modules')
		]
	}
};
```

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

## Combined loaders

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
						loader: 'css',
						query: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss'
					},
					{
						loader: 'sass',
						query: {
							sourceMap: true
						}
					}
				])
			}
		]
	}	
};
```

## API usage

```js
var webpack = require('webpack');
var config = require('webpack-config-niksy');

var compiler = webpack(config());

// Build mode
compiler.run(function ( err, stats ) {
	if ( err ) {
		throw new Error(err.toString());
	}
	console.log(stats.toString({ colors: true }));
});

// Watch mode
compiler.watch({}, function ( err, stats ) {
	if ( err ) {
		throw new Error(err.toString());
	}
	console.log(stats.toString({ colors: true }));
});
```

## Additional resources

### Intro

* http://survivejs.com/webpack/introduction/
* https://github.com/ruanyf/webpack-demos
* https://github.com/petehunt/webpack-howto
* https://medium.com/@ericclemmons/3-ways-to-define-webpack-loaders-f2017c57dd21#.h0eed3oyq
* https://twitter.com/mxstbr/status/746659711857102848
* https://github.com/danderu/learn-webpack
* https://blog.madewithlove.be/post/webpack-your-bags/
* https://sebastiandedeyne.com/posts/2016/adventure-time-with-webpack
* http://rmurphey.com/blog/2016/01/19/notes-on-setting-up-js-project-2016-webpack
* http://jonathancreamer.com/advanced-webpack-part-1-the-commonschunk-plugin/
* https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.mcv46sf6i
* https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460#.lu1am9i0r
* https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7#.z3m1jvnc2

### Testing

* http://joshhunt.is/testing-webpack-universal-javascript-in-node/

### Tools

* https://github.com/survivejs/webpack-merge
* https://github.com/robertknight/webpack-bundle-size-analyzer
* https://github.com/js-dxtools/webpack-validator
* https://github.com/huston007/webpack-config-merger
* https://github.com/madewithlove/webpack-config
* https://github.com/jsdf/webpack-combine-loaders

### Browserify support

* https://github.com/webpack/transform-loader
* https://github.com/hughsk/ify-loader
