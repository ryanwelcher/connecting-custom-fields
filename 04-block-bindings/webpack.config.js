// Import the original config from the @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Add any a new entry point by extending the webpack config.
module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		ascf: './src/ascf-bindings.js',
		pods: './src/pods-bindings.js',
		variations: './src/variations.js',
	},
};
