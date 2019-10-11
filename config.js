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
    // projectRoot: path.resolve(__dirname, '..', 'project'),
    dev: {
        host: 'localhost',
        port: 8080,
        autoOpen: false,
        proxyTable: {
            // '/api': {
            //     target: 'http://localhost:59255/auth/',
            //     pathRewrite: { '^/api': '' },
            //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true，
            //     secure: false, // 如果是https接口，需要配置这个参数为true
            // },
            // '/api': {
            //     target: 'http://localhost:53531/',
            //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true，
            //     secure: false, // 如果是https接口，需要配置这个参数为true
            // },
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
        outputDir: path.resolve(__dirname, 'dist'),
        devtool: 'hidden-source-map',
        assetsPublicPath: './',
        buildAnalyzerReport: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        /**
         * 打包时是否去除注释
         */
        removeComments: true,

        /**
         * 打包时是否去除console
         */
        removeConsole: false,
    },
    axios: {
        method: 'post',
        // 基础url前缀
        baseURL: 'http://localhost:59255/auth/',
        // 请求头信息
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        /**
         * Json解析返回数据
         */
        JSONParse: true,
        methodParse: ['post', 'put', 'delete'],
        // 参数
        data: {},
        // 设置超时时间
        timeout: 10000,
        // 携带凭证
        withCredentials: false,
        // 返回数据类型
        responseType: 'json'
    }
};