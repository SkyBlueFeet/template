'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const PurifyCSSPlugin = require('@wafflepie/purify-css-webpack');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const path = require('path');
const glob = require('glob');

const utils = require('./utils');
const env = require('./global');

const config = require('../config/framework.config');

env.IS_PRODUCTION = true;

const ejsPath = () => {
    let allPath = [];
    for (let [name, dir] of Object.entries(config.resourceRoot)) {
        let paths = glob.sync('**/*.ejs', {
            cwd: dir, // 搜寻目录
            sync: true // 同步操作
        });
        paths.forEach(key => {
            allPath.push(path.resolve(__dirname, '../' + name + '/' + key));
        });
    }
    return allPath;
};

const ProdWebpackConf = merge(require('./webpack.config'), {
    mode: 'production',
    devtool: config.build.devtool,
    devServer: {
        port: 8089,
        open: false
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 10
        }),
        new webpack.DefinePlugin({
            IS_PRODUCTION: JSON.stringify(true)
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
            ignoreOrder: false // Enable to remove warnings about conflicting order
        }),
        new PurifyCSSPlugin({
            paths: ejsPath()
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],

    optimization: {
        splitChunks: {
            chunks: 'all', //同时分割同步和异步代码,推荐。
            cacheGroups: {
                jquery: {
                    name: 'jquery',
                    chunks: 'all',
                    test: /[\\/]jquery[\\/]/,
                    priority: 50,
                    enforce: true
                },
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                }
            },
            minChunks: 2,
            minSize: 0,
            name: true
        },
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer: utils.compress
    }
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    ProdWebpackConf.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                `\\.(${config.build.productionGzipExtensions.join('|')})$`
            ),
            threshold: 2048,
            minRatio: 0.8
        })
    );
}
// glob.sync(path.join(__dirname, 'app/*.html')),



if (config.build.buildAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin;
    ProdWebpackConf.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = ProdWebpackConf;
