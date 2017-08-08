const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    context:__dirname,
    devtool: 'source-map',
    entry: {
        vendors:'./vendors/index.js',
        app: './src/index.js'
    },
    output: {
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            MAIN$: path.resolve(__dirname, './src/app.js'),
        }
    },
    externals: {
        "angular": "angular",
        "CodeMirror": "CodeMirror"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate-loader!babel-loader' },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.css$/, exclude: [/node_modules\/(?!(bootstrap)\/).*/], loader: 'style-loader!css-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.(jpe?g|png|gif)$/i, loader: "url-loader" }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { context: path.join(__dirname, 'node_modules'), from: 'angular/angular.min.js', to: './app/lib' },
            { context: path.join(__dirname, 'node_modules'), from: 'jquery/dist/jquery.min.js', to: './app/lib' },
            { context: path.join(__dirname, 'vendors'), from: '**/*', to: './app/lib' },
            { context: path.join(__dirname, 'src'), from: 'styles/*', to: './app/lib' }
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: '[name]-bundle.js',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            hash: true,
            attrs: ['img:url']
        }),
    ]
}

module.exports = config;