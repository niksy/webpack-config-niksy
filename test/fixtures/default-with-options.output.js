'use strict';

const path = require('path');

module.exports = {
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
	},
	resolve: {
		root: [
			path.resolve(process.cwd())
		]
	}
};
