var assert = require('assert');
var pick = require('lodash/pick');
var webpack = require('webpack');
var fn = require('../');

describe('loaders dependencies', function () {

	it('all "dependencies" are defined in "peerDependencies"', function () {
		var pkg = require('../package.json');
		assert.deepStrictEqual(pick(pkg.dependencies, ['json-loader', 'imports-loader']), pkg.peerDependencies);
	});

});

describe('config', function () {

	it('default config', function () {
		assert.deepStrictEqual(fn(require('./fixtures/default.input')), require('./fixtures/default.output'));
	});

});

describe('loaders', function () {

	it('one custom loader', function () {
		assert.deepStrictEqual(fn(require('./fixtures/one-custom-loader.input')), require('./fixtures/one-custom-loader.output'));
	});

	it('multiple custom loaders', function () {
		assert.deepStrictEqual(fn(require('./fixtures/multiple-custom-loaders.input')), require('./fixtures/multiple-custom-loaders.output'));
	});

});

describe('plugins', function () {

	it('one custom plugin', function () {
		var plugins = fn(require('./fixtures/one-custom-plugin.input')).plugins;
		assert.equal(plugins.length, 1);
		assert.equal(plugins[0] instanceof webpack.optimize.CommonsChunkPlugin, true);
	});

	it('multiple custom plugins', function () {
		var plugins = fn(require('./fixtures/multiple-custom-plugins.input')).plugins;
		assert.equal(plugins.length, 3);
		assert.equal(plugins[0] instanceof webpack.DefinePlugin, true);
		assert.equal(plugins[1] instanceof webpack.optimize.CommonsChunkPlugin, true);
		assert.equal(plugins[2] instanceof webpack.optimize.UglifyJsPlugin, true);
	});

});

describe('config validation', function () {

	it('invalid config', function () {
		var errors = fn(require('./fixtures/invalid-config.input'), { returnValidation: true }).error.details;
		assert.equal(errors.length, 3);
	});

});
