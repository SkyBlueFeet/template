'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = require('../config/prod.env');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].min.css'),
            chunkFilename: utils.assetsPath('css/[name].[contenthash].css')
        }),

        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                removeAttributeQuotes: false
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            favicon: utils.resolve('logo.png')

        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),

        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
        }])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                },
                vue: {
                    name: 'vue',
                    priority: -5,
                    test: /[\\/]vue[\\/]/
                },
                'vue-router': {
                    name: 'vue-router',
                    priority: -5,
                    test: /[\\/]vue-router[\\/]/
                }
            },

            chunks: 'all',
            minChunks: 1,
            minSize: 10000,
            name: true
        },
        minimizer: [
            /**
             * JS代码压缩
             */
            new UglifyJsPlugin({
                uglifyOptions: {
                    cache: true, // Boolean/String,字符串即是缓存文件存放的路径
                    parallel: true, // 启用多线程并行运行提高编译速度
                    comments: config.build.removeComments,
                    warnings: false,
                    sourceMap: true,
                    compress: {
                        // 移除 console
                        drop_console: config.build.removeConsole,
                        drop_debugger: true
                    }
                }
            }),
            new OptimizeCSSPlugin({
                // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
                // assetNameRegExp: /\.(sa|sc|c)ss$/g,
                // 指定一个优化css的处理器，默认cssnano
                cssProcessor: require('cssnano'),

                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true }, // 对注释的处理
                            normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                        }
                    ]
                },
                canPrint: false // 是否打印编译过程中的日志
            })
        ],
        runtimeChunk: {
            name: 'runtime'
        }
    }
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;