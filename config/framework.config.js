'use strict';
const path = require('path');


module.exports = {
    name: 'App',
    /**
     * 首页，与入口名字符串相同，默认为src/pages文件夹下 index/index.html，
     * 其对应的入口名为index
     * @type { String }
     */
    index: 'login',

    /**
     * 需要扫描的页面根目录
     * @type { String }
     */
    pageRoot: {
        page: path.resolve(__dirname, '..', 'src/pages')
    },

    /**
     * 首页所在根目录,对应pageRoot键名(多个页面根目录时有效)
     * @type { String }
     */
    defaultPageRoot: 'page',

    /**
     * 应用主要页面存放目录,所有ejs、js、css都应该放在下列目录下
     * @type { Array<String> }
     */
    resourceRoot: {
        src: path.resolve(__dirname, '..', 'src')
    },


    /**
     * 此项目的是为了抽取重用的css和JS
     * 所有css和js文件应该放到以数组子项为名的文件夹中
     */
    splitFolderList: {
        style: ['style', 'css'],
        script: ['script'],
    },

    dev: {
        host: 'localhost',
        port: 8080,
        autoOpen: false,
        proxyTable: {
            // '/api': {
            //     target: 'http://localhost:59255/',
            //     pathRewrite: { '^/api': '' },
            //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true，
            //     secure: false, // 如果是https接口，需要配置这个参数为true
            // },
            // '/api': {
            //     target: 'http://localhost:59255/',
            //     pathRewrite: { '^/api': '' },
            //     changeOrigin: true,
            //     secure: false,
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
        assetsPublicPath: '/',

    },
    build: {
        outputDir: path.resolve(__dirname, '..', 'dist'),
        devtool: 'hidden-source-map',
        assetsPublicPath: '/',

        buildAnalyzerReport: true,
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
};
