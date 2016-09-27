# Directory alias

Similar to `paths` in Browserify.

```js
var path = require('path');

module.exports = {
	// ...
	resolve: {
		root: [
			path.resolve(__dirname, 'local_modules')
		]
	}
};
```
