const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


let config = {
	context: path.resolve(__dirname, 'src'),

	entry: {
		hot: 'react-hot-loader/patch',
		bundle: './index.js',
		// hello: './hello.js' вторая точка входа
		vendors: ['react', 'react-dom']
	},
	output: {
		filename: '[name].js', // имя исходя из количества точек входа
		path: path.resolve(__dirname, 'public'),
		publicPath: '/public/'
	},

	devServer: {
		port: 8080,
		hot: true
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			// используется, если не нужно выделять стили в отдельный файл, при этом удаляем нижерасположенную настройку
			// {
			// 	test: /\.css$/,  //  если используем sass то меняем формат .scss
			// 	use: ['style-loader', 'css-loader']  // и добавляем загрузчик , 'sass-loader'
			// },
			// плагин ExtractTextPlugin используется только с webpack 3
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8000,
						name: '[path][name].[ext]'
					}
				}
			}
		]
	},
	plugins: [
		// для третией версии вебпака, выделяет подключенные библиотеки, описанные в vendors
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendors'
		// }),
		// ниже используется для четвертой версии вебпака, но нужно поработать над настройками
		new webpack.LoaderOptionsPlugin({
			test: /[\\/]node_modules[\\/]/,
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all"
					}
				}
			},
		}),
		new ExtractTextPlugin('styles.css'),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	
	resolve: {
		extensions: ['.js', '.json', '.jsx', '*']
	}
};

module.exports = (env, options) => {
	let production = options.mode === 'production';
	config.devtool = production ? false : 'evel-sourcemap';
	return config;
}

