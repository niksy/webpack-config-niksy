var validateConfig = require('webpack-validator');
var mergeConfig = require('webpack-merge');
var combineLoaders = require('webpack-combine-loaders');
var merge = require('lodash/merge');

/**
 * @param  {Object} config
 * @param  {Object} validationOptions
 *
 * @return {Object}
 */
module.exports = function ( config, validationOptions ) {
	return mergeConfig({

		output: {
			filename: '[name].bundle.js',
			chunkFilename: '[chunkhash].chunk.js'
		},
		module: {
			loaders: [
				{
					test: /\.json$/,
					loader: 'json'
				},
				{
					test: /\.js$/,
					loader: 'imports',
					query: {
						define: '>false'
					}
				}
			]
		},
		bail: true

	}, validateConfig(config, merge({
		rules: {
			'no-root-files-node-modules-nameclash': true,
			'loader-enforce-include-or-exclude': true,
			'loader-prefer-include': true
		},
		quiet: true
	}, validationOptions)));
};

module.exports.combineLoaders = combineLoaders;
module.exports.mergeConfig = mergeConfig;
