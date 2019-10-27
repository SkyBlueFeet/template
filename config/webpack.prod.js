'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const sizePlugin = require('size-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const utils = require('./utils');
const config = require('../config');
const env = require('./global');

env.IS_PRODUCTION = true;


const ProdWebpackConf = merge(require('./webpack.config'), {
    mode: 'production',
    devtool: config.build.devtool,
    devServer: {
        port: 8089,
        open: false
    },
    plugins: [
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, '..', './assets'), //打包的静态资源目录地址
            to: './assets' //打包到dist
        }]),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 10
        }),
        new webpack.DefinePlugin({
            IS_PRODUCTION: JSON.stringify(true)
        }),
        new sizePlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[hash].css',
            ignoreOrder: false // Enable to remove warnings about conflicting order
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all', //同时分割同步和异步代码,推荐。
            cacheGroups: {
                commons: {
                    name: 'commons', // 提取出来的文件命名
                    // name： ‘common/common’ //  即先生成common文件夹
                    chunks: 'all', // initial表示提取入口文件的公共css及js部分
                    // chunks: 'all' // 提取所有文件的公共部分
                    test: /[\\/]app[\\/]/,
                    minChunks: 2, // 表示提取公共部分最少的文件数
                    minSize: 10, // 表示提取公共部分最小的大小
                    // 如果发现页面中未引用公共文件，加上enforce: true
                    enforce: false
                },
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/, //匹配node模块中匹配的的模块
                    priority: 10, //设置匹配优先级，数字越大，优先级越高
                    chunks: 'initial'
                }
            },
            minChunks: 2,
            minSize: 0,
            name: true
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

if (config.build.buildAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin;
    ProdWebpackConf.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = ProdWebpackConf;