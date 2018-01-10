'use strict';

const mergeConfig = require('webpack-merge');
const mapValues = require('lodash/mapValues');
const readPkgUp = require('read-pkg-up');
const browserResolve = require('browser-resolve');

/**
 * @param  {Object} config
 *
 * @return {Object}
 */
module.exports = ( config ) => {
	return mergeConfig({

		output: {
			filename: '[name].bundle.js',
			chunkFilename: '[chunkhash].chunk.js'
		},
		module: {
			rules: [
				{
					parser: {
						amd: false
					}
				}
			]
		}

	}, config);
};

module.exports.mergeConfig = mergeConfig;
module.exports.browserResolve = ( opts ) => {

	opts = Object.assign({
		cwd: process.cwd()
	}, opts);

	const file = readPkgUp.sync({
		cwd: opts.cwd
	});

	if ( file.pkg && !file.pkg.browser ) {
		return {};
	}
	return mapValues(file.pkg.browser, ( value ) => {
		return browserResolve.sync(value, {
			basedir: opts.cwd
		});
	});
};
