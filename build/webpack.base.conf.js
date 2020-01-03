'use strict';
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const os = require('os');
const HappyPackPlugin = require('happypack');
const happyThreadPool = HappyPackPlugin.ThreadPool({ size: os.cpus().length });

const { resolve } = require('./utils');
const config = require('../config');
const rolesConfig = require('./loader');

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    // loader: 'eslint-loader',
    loader: 'happypack/loader?id=eslint',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')]
});

module.exports = {
    context: resolve(),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '@root': resolve()
        }
    },
    module: {
        rules: rolesConfig
    },
    plugins: [
        new VueLoaderPlugin(),
        new HappyPackPlugin({
            id: 'babel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool
        }),
        new HappyPackPlugin({
            id: 'eslint',
            loaders: [{
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: !config.dev.showEslintErrorsInOverlay
                }
            }],
            threadPool: happyThreadPool
        }),
    ],
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