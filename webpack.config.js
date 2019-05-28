const path = require( 'path' );
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ( env, options ) => {
	return {
		entry: [
			'./src/index.js',
			'webpack-dev-server/client?http://localhost:3000'
		],
		output: {
			path: path.resolve( __dirname, 'dist' ),
			filename: 'bundle.js',
		},

		devtool: 'cheap-eval-source-map',
		devServer: {
			hotOnly: true,
			port: 3000
		},
		module: {
			rules: [
				{
					test: /\.jsx$|\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						}
					},
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
								sourceMap: true,
								url: false
							}
						},
					],
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'images/'
							}
						}
					]
				},
			],
		},
		plugins: [new HtmlWebpackPlugin({
			template: 'index.html'
		})]
	}
};