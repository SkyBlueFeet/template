'use strict';

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

const PagesConf = require('./pages.config'),
    Global = require('./global'),
    Conf = require('../config'),
    utils = require('./utils'),
    rules = require('./rules');

const resolve = dir => path.resolve(__dirname, '..', dir);

const IS_PRODUCTION = Global.IS_PRODUCTION;

// console.log(`当前环境${IS_PRODUCTION ? 'production' : 'development'}`);

module.exports = {
    context: resolve('dist'),
    entry: PagesConf.entries,
    output: {
        publicPath: '/', // 打包后资源文件的引用会基于此路径
        path: Conf.build.outputDir,
        filename: IS_PRODUCTION ? 'js/[name].[chunkhash].js' : 'js/[name].[hash].js'
        // publicPath: Global.IS_PRODUCTION
        //   ? Conf.build.assetsPublicPath
        //   : Conf.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: Global.alias,
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            _: 'lodash/core.min.js',
            ejs: 'ejs'
            // 'window._': 'lodash'
        }),
        // new webpack.ProgressPlugin(),
        ...PagesConf.pages,
        ...rules.happyPackPlugin,
        new CleanWebpackPlugin(),
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, '..', './assets'), //打包的静态资源目录地址
            to: './assets' //打包到dist
        }]),
        new webpack.DefinePlugin({
            // prefixPath: JSON.stringify(router.prefixPath)
        }),
    ],
    module: {
        rules: rules.loader
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};