const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const BROWSER_DIR = path.resolve(__dirname, './src/browser');
const SERVER_DIR = path.resolve(__dirname, './src/server');


const browserConfig = {
    entry: BROWSER_DIR + "/client_index.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.min.js"
    },
    devtool: "cheap-module-source-map",
    module: {
        rules:[
            {
              test: /js$/,
              exclude: /(node_modules)/,
              loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loaders: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "url-loader"
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
          include: /\.min\.js$/
        })]
    }
};

const serverConfig = {
    entry: SERVER_DIR + "/server_index.js",
    target: "node",
    output: {
        path: __dirname,
        filename: "server.min.js",
        libraryTarget: "commonjs2"
    },
    devtool: "cheap-module-source-map",
    module: {
        rules:[
            {
              test: /js$/,
              exclude: /(node_modules)/,
              loader: "babel-loader"
            },
            {
                test: /css$/,
                use: 'css-loader'
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "url-loader",
            }
        ]
    } ,
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
          include: /\.min\.js$/
        })]
    }
};


module.exports = [browserConfig, serverConfig];