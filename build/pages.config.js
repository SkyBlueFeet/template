'use strict';
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const global = require('./global');
const is_production = global.IS_PRODUCTION;
const func = require('../utils/func');
const config = require('../config');
const utils = require('./utils');

const resolve = (dir, rel = '..') => path.resolve(__dirname, rel, dir);
const pageDir = resolve('app/pages');

/**
 * 存放页面目录，记录页面详细信息
 */
const directory = [];

/**
 * webpack入口配置
 * key=> 入口名,相对pages的目录，如index、ububtu\login
 * value=> 入口文件地址
 */
const entries = {};

/**
 * new HtmlWebpackPlugin()对象数组，由此生成若干HTML页面
 */
const pages = [];

/**
 * 返回一个指定配置的new HtmlWebpackPlugin()对象
 * HtmlWebpackPlugin配置文档: https: //github.com/jantimon/html-webpack-plugin#options
 * @param {Object} Object 包含html-webpack-plugin配置的对象
 * @returns {Object}
 */
const CreatePage = Object => {
    return new HtmlWebpackPlugin({

        /**
         * filename: 打包后的页面路径， 也跟页面路由有关,
         * 若filename为test/login/index.html, 则在服务器上输入 /test/login 或者 /test/login/index.html即可
         */
        filename: Object['filename'],

        /**
         * template确定模板文件路径， 支持js\html\ejs以及其他webpack支持的模板文件，
         * Webpack不在意模板文件的形式及格式， 理论上只要能输出html片段即可支持， 这里page.js为模板文件
         */
        template: Object['template'],

        /**
         * chunks:指定entry入口名，若不配置默认接入所有入口,会将入口名对应的js文件放到相应页面script标签中
         */
        chunks: Object['chunks'],

        /**
         * 指定页面标题
         */
        title: Object['title'] || global.title,

        /**
         * inject: script标签位置， option为 "true" | "body" | "head" | "false",true和body会放到底部，head放到头部，false不生成script标签
         */
        inject: Object['inject'] || (is_production ? true : 'head'),

        /**
         * minify:代码压缩
         */
        minify: {
            /**
             * 剥离HTML注释
             * */
            removeComments: is_production,

            /**
             * 尽可能删除属性的引号
             */
            removeAttributeQuotes: is_production,

            /**
             * 是否去除空白
             */
            collapseWhitespace: is_production
        },
        /**
         * 为静态资源生成hash值
         */
        hash: true
        // xhtml: true
    });
};

/**
 * glob配置选项
 */
const option = dir => {
    return {
        cwd: dir, // 搜寻目录
        sync: true // 同步操作
    };
};

//bootstrap入口
// entries['bootstrap'] = resolve('app/static/script/entry/bootstrap.js');

/**
 * 根据pages目录下的page.js自动生成HTML，每个page.js目录必须有entry.js，否则会编译失败
 */
(() => {
    /**
     * 遍历到的page.js路径,，格式index/page.js
     */
    const templates = glob.sync('**/page.js', option(pageDir));

    templates.forEach(template => {
        /**
         * 遍历文件夹下的所有page.js, 默认有page.js文件的文件夹都有entry.js， 不再遍历所有文件夹entry.js
         * entryPath:由page.js路径拼凑出的入口文件entry.js路径,格式index/entry.js
         */
        let entryPath = `${pageDir}/${_.replace(template, 'page.js', 'entry.js')}`;

        /**
         * 确定entryName入口名，
         * entryName:入口名,格式index/login、index或者about/thinks
         * entryName确定HtmlWebpackPlugin的filename
         */
        let getEntry = val => fn => fn(fn(val, 'page.js'), '/');
        let entryName = getEntry(template)(_.trimEnd);

        pages.push(
            CreatePage({
                filename: entryName === config.index ? 'index.html' : `${entryName}/index.html`,
                template: resolve(template, '../app/pages'),
                chunks: [entryName, 'commons', 'vendor', 'bootstrap']
            })
        );
        entries[entryName] = entryPath;

        let link = config.index === entryName ? '' : entryName;
        let tplPath = resolve(template, '../app/pages');
        directory.push({
            link: `http://localhost:${config.dev.port}/${link}`,
            page: entryName,
            entryPath: _.replace(tplPath, 'page.js', 'entry.js'),
            template: tplPath,
            content: null
        });
    });
})();



func.WriteFile(
    resolve('app'),
    'directory.json',
    JSON.stringify(directory, '', '\t')
);

module.exports = { entries, pages, directory };