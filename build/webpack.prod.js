'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const PurifyCSSPlugin = require('@wafflepie/purify-css-webpack');
const path = require('path');
const glob = require('glob');

const utils = require('./utils');
const config = require('../config');
const env = require('./global');

env.IS_PRODUCTION = true;

const pageDir = path.resolve(__dirname, '..', 'app');

const ejsPath = () => {
    const paths = glob.sync('**/*.ejs', {
        cwd: pageDir, // 搜寻目录
        sync: true // 同步操作
    });
    paths.forEach((key, index, arr) => {
        arr[index] = path.resolve(__dirname, '../app/' + key);
    });
    return paths;
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
                    chunks: 'all'
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
// glob.sync(path.join(__dirname, 'app/*.html')),



if (config.build.buildAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
        .BundleAnalyzerPlugin;
    ProdWebpackConf.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = ProdWebpackConf;