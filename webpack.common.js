const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src')
        },
        extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                include: /src/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'source-map-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            // file-loader(for fonts)
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        })
    ]
};
