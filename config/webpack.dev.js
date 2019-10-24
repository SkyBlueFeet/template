'use strict';
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const Global = require('./global');
const config = require('../config');
const utils = require('./utils');

Global.IS_PRODUCTION = false;

const DevWebpackConf = merge(require('./webpack.config'),
{
    mode: 'development',
    devServer: {
        host: config.dev.host,
        port: config.dev.prot,
        open: config.dev.autoOpen,
        hot: true,
        quiet: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: config.dev.proxyTable
    },
    devtool: config.dev.devtool,
    plugins: [
        new webpack.DefinePlugin({
            IS_PRODUCTION: JSON.stringify(false),
            'process.env': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        // new webpack.NoEmitOnErrorsPlugin(),

        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ]
});
module.exports = new Promise((resolve, reject) => {
    let port = config.dev.port;

    process.env.PORT = port;

    DevWebpackConf.devServer.port = port;

    // Add FriendlyErrorsPlugin
    DevWebpackConf.plugins.push(
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    `正在运行: http://${config.dev.host}:${port}`
                ]
            },
            onErrors: config.dev.notifyOnErrors ?
                utils.createNotifierCallback() : undefined
        })
    );

    resolve(DevWebpackConf);
});