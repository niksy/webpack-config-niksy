'use strict';

const validateConfig = require('webpack-validator');
const mergeConfig = require('webpack-merge');
const combineLoaders = require('webpack-combine-loaders');
const merge = require('lodash/merge');

/**
 * @param  {Object} config
 * @param  {Object} validationOptions
 *
 * @return {Object}
 */
module.exports = ( config, validationOptions ) => {
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
