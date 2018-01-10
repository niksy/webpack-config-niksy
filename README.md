# webpack-config-niksy

[![Build Status][ci-img]][ci]

[Webpack][webpack] config for my projects.

Features:

* JSON support
* no AMD support
* directory and module resolving closer to CommonJS standard

**For some examples of common use cases, [see wiki][wiki].**

## Install

```sh
npm install webpack webpack-config-niksy --save
```

## Usage

Add this config to your `webpack.config.js`:

```js
const config = require('webpack-config-niksy');

module.exports = config({
	// Your config
});
```

Config module exposes additional static methods:

* [**config.mergeConfig**](#configmergeconfigconfig1-config2)
* [**config.browserResolve**](#configbrowserresolveopts)

## API

### config(opts, [validationOpts])

Returns: `Object`

[Merges custom config][webpack-merge] with default one and returns new config, [validating][webpack-validator] config options in the process.

#### opts

Type: `Object`

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

### config.browserResolve([opts])

Returns: `Object`

Resolves `browser` entries from package.json file. Useful for getting consistent values for [`alias`][webpack-resolve-alias] option and import/exports loader.

#### cwd

Type: `String`  
Default: `process.cwd`

Path from where to start looking for package.json file.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/webpack-config-niksy
[ci-img]: https://img.shields.io/travis/niksy/webpack-config-niksy.svg
[webpack]: https://webpack.github.io/
[webpack-merge]: https://github.com/survivejs/webpack-merge
[webpack-validator]: https://github.com/js-dxtools/webpack-validator
[webpack-resolve-alias]: https://webpack.github.io/docs/configuration.html#resolve-alias
[wiki]: https://github.com/niksy/webpack-config-niksy/wiki
