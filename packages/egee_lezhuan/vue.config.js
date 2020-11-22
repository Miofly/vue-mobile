const config = require('../../vue.config')

module.exports = {
	configureWebpack: (config) => {
		config.resolve.extensions = ['.js', '.vue', '.json', '.ts', '.tsx']

	},
	...config
}
