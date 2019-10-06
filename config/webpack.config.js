'use strict';

const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const PagesConf = require('./pages.config');
const Global = require('./global');
const Conf = require('../config');
const utils = require('./utils');
const rules = require('./rules');

const resolve = dir => path.resolve(__dirname, '..', dir);

const IS_PRODUCTION = Global.IS_PRODUCTION;

// console.log(`当前环境${IS_PRODUCTION ? 'production' : 'development'}`);

module.exports = {
    context: resolve('.'),
    entry: PagesConf.entries,
    output: {
        path: Conf.build.outputDir,
        filename: IS_PRODUCTION ? 'js/[name].[chunkhash].js' : 'js/[name].[hash].js'
        // publicPath: Global.IS_PRODUCTION
        //   ? Conf.build.assetsPublicPath
        //   : Conf.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: Global.alias
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            vue$: 'vue/dist/vue.esm.js'
        }),
        new VueLoaderPlugin(),
        // new webpack.ProgressPlugin(),
        ...PagesConf.pages,
        ...rules.happyPackPlugin
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