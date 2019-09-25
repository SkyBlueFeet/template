const Global = require('./global.js');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const utils = require('./utils');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */
const resolve = dir => path.resolve(__dirname, '..', dir);
const IS_PRODUCTION = Global.IS_PRODUCTION;

console.log(`当前环境${IS_PRODUCTION ? 'production' : 'development'}`);
console.log(utils.pages);
module.exports = {
    mode: IS_PRODUCTION ? 'production' : 'development',

    entry: utils.entries,

    output: {
        filename: 'js/[name].[chunkhash].js',
        path: resolve('dist')
    },

    resolve: {
        alias: Global.alias
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        ...utils.pages,
        new MiniCssExtractPlugin({
            /**
             * Options similar to the same options in webpackOptions.output
             * all options are optional
             */

            filename: 'css/page/[name].[hash].css',
            chunkFilename: 'css/[name].[hash].css',
            ignoreOrder: false // Enable to remove warnings about conflicting order
        })
    ],

    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',

                options: {
                    plugins: ['syntax-dynamic-import'],

                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(c|le|pc)ss$/,
                use: [
                    IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                // exclude: /glyphicons/,
                // loader: 'file-loader?name=static/fonts/[name].[ext]',
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[hash].[ext]'
                }
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons/common', // 提取出来的文件命名
                    // name： ‘common/common’ //  即先生成common文件夹
                    chunks: 'initial', // initial表示提取入口文件的公共css及js部分
                    // chunks: 'all' // 提取所有文件的公共部分
                    // test： '/\.css$/'  // 只提取公共css ，命名可改styles
                    minChunks: 2, // 表示提取公共部分最少的文件数
                    minSize: 0, // 表示提取公共部分最小的大小
                    // 如果发现页面中未引用公共文件，加上enforce: true
                    enforce: true
                },
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/, //匹配node模块中匹配的的模块
                    priority: 10, //设置匹配优先级，数字越大，优先级越高
                    chunks: 'initial'
                }
            },

            chunks: 'initial',
            minChunks: 2,
            minSize: 0,
            name: true
        },
        minimizer: IS_PRODUCTION ? utils.compress : []
    },

    devServer: {
        open: true
    }
};