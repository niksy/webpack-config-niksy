# API usage

```js
var webpack = require('webpack');
var config = require('webpack-config-niksy');
var compiler = webpack(config());

// Build mode
compiler.run(function ( err, stats ) {
	if ( err ) {
		throw new Error(err.toString());
	}
	console.log(stats.toString({ colors: true }));
});

// Watch mode
compiler.watch({}, function ( err, stats ) {
	if ( err ) {
		throw new Error(err.toString());
	}
	console.log(stats.toString({ colors: true }));
});
```
