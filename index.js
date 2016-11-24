'use strict';

const validateConfig = require('webpack-validator');
const mergeConfig = require('webpack-merge');
const combineLoaders = require('webpack-combine-loaders');
const merge = require('lodash/merge');
const mapValues = require('lodash/mapValues');
const readPkgUp = require('read-pkg-up');
const browserResolve = require('browser-resolve');

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
		bail: true,
		resolve: {
			modulesDirectories: ['node_modules'],
			extensions: ['', '.json', '.js'],
			packageMains: ['browser', 'main'],
			packageAlias: 'browser'
		}

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
module.exports.browserResolve = ( opts ) => {

	opts = Object.assign({
		cwd: process.cwd()
	}, opts);

	const file = readPkgUp.sync({
		cwd: opts.cwd
	});

	if ( !file.pkg && file.pkg.browser ) {
		return {};
	}
	return mapValues(file.pkg.browser, ( value ) => {
		return browserResolve.sync(value, {
			basedir: opts.cwd
		});
	});
};
