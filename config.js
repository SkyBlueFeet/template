'use strict';
const path = require('path');


module.exports = {
    name: 'App',
    /**
     * 首页，与入口名字符串相同，默认为index，即 pages文件夹下 index/index.html，
     * 其对应的入口名为index
     */
    index: 'index',

    /**
     * 文档根目录
     */
    docRoot: path.resolve(__dirname, '..', 'doc'),

    /**
     * app根目录
     */
    appRoot: path.resolve(__dirname, '..', 'app'),

    /**
     * 项目根目录
     */
    projectRoot: path.resolve(__dirname, '..', 'project'),
    dev: {
        host: 'localhost',
        port: 8080,
        autoOpen: false,
        proxyTable: {
            '/api': {
                target: 'http://localhost:53531/',
                pathRewrite: { '^/api': '' },
                changeOrigin: true, // target是域名的话，需要这个参数，
                secure: false, // 设置支持https协议的代理
            }
        },

        /**
         * 资源文件夹
         */
        assetsDir: 'static',
        errorOverlay: true,
        notifyOnErrors: true,
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: 'eval-source-map',
        outputDir: path.resolve(__dirname, '..', 'dist'),

        /**
         * css、js、ttf等资源打包后的路径类型，为'/'时所有资源的路径均为绝对路径,只能在服务器下使用，
         * Vue单页面使用'./'或'/'均可,但多页面只能使用'/'或者不配置(使用'./'时每个页面的所有资源路径均为 ./path/go/to,
         * 页面不在根目录时路径错误),不配置时所有资源均使用相对各页面的相对路径
         */
        assetsPublicPath: './'
    },
    build: {
        outputDir: path.resolve(__dirname, '..', 'dist'),
        devtool: 'hidden-source-map',
        assetsPublicPath: './',
        buildAnalyzerReport: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    }
};