'use strict';

const pify = require('pify');
const mergeConfig = require('webpack-merge');
const readPkgUp = require('read-pkg-up');
const browserResolve = require('browser-resolve');

/**
 * @param  {Object} file
 * @param  {Object} opts
 *
 * @return {Promise}
 */
function getResolvedBrowserValues ( file, opts ) {

	const browserPkgField = file.pkg.browser;

	return Promise.all(
		Object.keys(browserPkgField)
			.map(( fieldName ) => {
				return pify(browserResolve)(browserPkgField[fieldName], {
					basedir: opts.cwd
				})
					.then(( fieldResolvedValue ) => {
						const obj = {};
						obj[fieldName] = fieldResolvedValue;
						return obj;
					});
			})
	)
		.then(( fields ) => {
			return fields.reduce(( obj, field ) => {
				return Object.assign(obj, field);
			}, {});
		});


}

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

/**
 * @param  {Object} opts
 *
 * @return {Promise}
 */
module.exports.browserResolve = ( opts ) => {

	opts = Object.assign({
		cwd: process.cwd()
	}, opts);

	return readPkgUp({
		cwd: opts.cwd
	})
		.then(( file ) => {
			if ( file.pkg && !file.pkg.browser ) {
				return {};
			}
			return getResolvedBrowserValues(file, opts);
		});

};
