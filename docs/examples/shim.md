# Shim

## Expose globally

Exports from `./input/exposed-module` will be available on window (global) as `window.ExposedModule`. This should never be used, instead, you should use explicit define like `global.ExposedModule = require('./input/exposed-module');`.

```js
module.exports = {
	// ...
	module: {
		loaders: [
			{
				test: require.resolve('./input/exposed-module'),
				loader: 'expose',
				query: {
					ExposedModule: true
				}
			}
			// or with string query
			// {
			// 	test: require.resolve('./input/exposed-module'),
			// 	loader: 'expose?ExposedModule'
			// }
		]
	}
};
```

## "depends" in browserify-shim

If `./input/exposed-module` relies on jQuery but expects it to be available globally, this will prepend `var $ = require('jquery');` at the top of the file, making jQuery available locally.

```js
module.exports = {
	// ...
	module: {
		loaders: [
			{
				test: require.resolve('./input/exposed-module'),
				loader: 'imports',
				query: {
					$: 'jquery'
				}
			}
			// or with string query
			// {
			// 	test: require.resolve('./input/exposed-module'),
			// 	loader: 'imports?$=jquery'
			// }
		]
	}
};
```

## "exports" in browserify-shim

If `./input/exposed-module` doesn’t have proper exports, but instead exposes itself through global variables, this will expose those global variables through `module.exports`, so `window.exposed` will be exported from this module as `module.exports = window.exposed`.

```js
module.exports = {
	// ...
	module: {
		loaders: [
			{
				test: require.resolve('./input/exposed-module'),
				loader: 'exports',
				query: {
					'window.exposed': true
				}
			}
			// or with string query
			// {
			// 	test: require.resolve('./input/exposed-module'),
			// 	loader: 'exports?window.exposed'
			// }
		]
	}
};
```

## "global:jquery" in browserify-shim

If jQuery is already defined in global scope and you don’t want to include it in your bundles (or isn’t part of bundling process), you can still use standard CommonJS requires, but replace calls to jQuery with reference to global variable. This will replace every reference to `require('jquery')` with `window.$`, so instead of `var $ = require('jquery');` you will get `var $ = window.$;`.

```js
var StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
	// ...
	module: {
		loaders: [
			{
				
				test: /\.js$/,
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
	},
	plugins: [
		new StringReplacePlugin()
	]
};
```
