# Handle environment variables

```js
var webpack = require('webpack');

module.exports = {
	// ...
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
			}
		})
	]
};
```
