# webpack-config-niksy

[![Build Status][ci-img]][ci]

[Webpack][webpack] config for my projects.

Features sensible defaults like JSON support and no AMD support.

**For some examples of common use cases, [see docs][docs].**

## Install

```sh
npm install webpack webpack-config-niksy --save
```

## Usage

Add this config to your `webpack.config.js`:

```js
var config = require('webpack-config-niksy');

module.exports = config({
	// Your config
});
```

Config module exposes two additional static methods:

* [**config.mergeConfig**](#configmergeconfigconfig1-config2)
* [**config.combineLoaders**](#configcombineloadersloaders)

## API

### config(opts, [validationOpts])

Returns: `Object`

[Merges custom config][webpack-merge] with default one and returns new config, [validating][webpack-validator] config options in the process.

#### opts

Type: `Object`  
**Required**

Custom config.

#### validationOpts

Type: `Object`

Options passed to [config validator][webpack-validator].

### config.mergeConfig(config1, config2)

Returns: `Object`

[Merges two configs][webpack-merge] and returns new config. Useful for advanced use cases.

#### config1

Type: `Object`

#### config2

Type: `Object`

### config.combineLoaders(loaders)

Returns: `String`

[Combines array of loaders][webpack-combine-loaders] in object format to query string format.

#### loaders

Type: `Object[]`  
**Required**

Array of loaders to combine to query string representation of loader.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/webpack-config-niksy
[ci-img]: https://img.shields.io/travis/niksy/webpack-config-niksy.svg
[webpack]: https://webpack.github.io/
[webpack-merge]: https://github.com/survivejs/webpack-merge
[webpack-validator]: https://github.com/js-dxtools/webpack-validator
[webpack-combine-loaders]: https://github.com/jsdf/webpack-combine-loaders
[docs]: docs/README.md
