'use strict';

const assert = require('assert');
const path = require('path');
const pick = require('lodash/pick');
const webpack = require('webpack');
const fn = require('../');
const browserResolve = fn.browserResolve;

describe('Loaders dependencies', function () {

	it('should have all "dependencies" defined in "peerDependencies"', function () {
		const pkg = require('../package.json');
		assert.deepStrictEqual(pick(pkg.dependencies, ['json-loader', 'imports-loader']), pkg.peerDependencies);
	});

});

describe('Config', function () {

	it('should handle default config', function () {
		assert.deepStrictEqual(fn(require('./fixtures/default.input')), require('./fixtures/default.output'));
	});

	it('should handle default config with some options', function () {
		assert.deepStrictEqual(fn(require('./fixtures/default-with-options.input')), require('./fixtures/default-with-options.output'));
	});

});

describe('Loaders', function () {

	it('should handle one custom loader', function () {
		assert.deepStrictEqual(fn(require('./fixtures/one-custom-loader.input')), require('./fixtures/one-custom-loader.output'));
	});

	it('should handle multiple custom loaders', function () {
		assert.deepStrictEqual(fn(require('./fixtures/multiple-custom-loaders.input')), require('./fixtures/multiple-custom-loaders.output'));
	});

});

describe('Plugins', function () {

	it('should handle one custom plugin', function () {
		const plugins = fn(require('./fixtures/one-custom-plugin.input')).plugins;
		assert.equal(plugins.length, 1);
		assert.equal(plugins[0] instanceof webpack.optimize.CommonsChunkPlugin, true);
	});

	it('should handle multiple custom plugins', function () {
		const plugins = fn(require('./fixtures/multiple-custom-plugins.input')).plugins;
		assert.equal(plugins.length, 3);
		assert.equal(plugins[0] instanceof webpack.DefinePlugin, true);
		assert.equal(plugins[1] instanceof webpack.optimize.CommonsChunkPlugin, true);
		assert.equal(plugins[2] instanceof webpack.optimize.UglifyJsPlugin, true);
	});

});

describe('Config validation', function () {

	it('should report invalid config', function () {
		const errors = fn(require('./fixtures/invalid-config.input'), { returnValidation: true }).error.details;
		assert.equal(errors.length, 3);
	});

});

describe('Browser resolve', function () {

	it('should properly resolve browser entries in package.json', function () {
		assert.deepEqual(browserResolve({ cwd: path.resolve(__dirname, 'fixtures') }), {
			jackie: 'fs'
		});
	});

});
