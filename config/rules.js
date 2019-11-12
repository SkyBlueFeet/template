'use strict';

const HappyPack = require('happypack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = dir => path.resolve(__dirname, '..', dir);
const Global = require('./global');
const router = require('../app/config/router');
const browserslist = require('../package.json').browserslist;

const IS_PRODUCTION = Global.IS_PRODUCTION;
exports.loader = [
{
    test: /\.js$/,
    loader: 'happypack/loader?id=babel',
    exclude: resolve('node_modules')
},
{
    test: /\.(c|le|pc|sa|sc)ss$/,
    use: [
        IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        }, {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }
    ]
},
{
    test: /\.ejs$/,
    use: [
    {
        loader: require.resolve('./ejs-loader'),
        options: {
            variable: 'data'
        }
    }]
},
{
    // 供iconfont方案使用，后面会带一串时间戳，需要特别匹配到
    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
    // exclude: /glyphicons/,
    // loader: 'file-loader?name=vendor/fonts/[name].[ext]',
    loader: 'url-loader',
    options: {
        name: 'fonts/[name].[ext]'
    }
},
{
    test: /\.(gif|png|jpe?g)$/i,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8000, // size <= 15KB, 改成15257(<14.9KB)试试?
            name: '[name].[ext]', // 设置文件名(>limit的情况)
            publicPath: 'assets/', // 设置资源文件的引用根路径
            outputPath: 'assets/' // publicPath/outputPath/[name].[ext]
        }
    }]
}];

exports.happyPackPlugin = [
    new HappyPack({
        id: 'babel',
        loaders: [
        {
            loader: 'babel-loader'
        }]
    })
];