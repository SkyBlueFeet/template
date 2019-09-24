const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const is_production = require('./global').IS_PRODUCTION;

const pageDir = path.resolve(__dirname, '..', 'app/pages');
let option = {
    cwd: pageDir, // 在pages目录里找
    sync: true // 这里不能异步，只能同步
};

let templates = glob.sync('**/page.js', option);
let filename = [];
let entries = {};
let pages = [];

templates.forEach(template => {
    /**
     * 遍历文件夹下的所有page.js, 默认有page.js文件的文件夹都有entry.js， 不再遍历所有文件夹entry.js
     * fs.access查看entry.js是否存在，由于是异步实现，故在这里无法使用
     * template:遍历到的page.js路径,，格式index/page.js
     * entryPath:由page.js路径拼凑出的入口文件entry.js路径,格式index/entry.js
     * entryName:入口名,格式index/login、index或者about/thinks
     * entryName确定HtmlWebpackPlugin的filename
     */
    let entryPath = `${pageDir}/${_.replace(template, 'page.js', 'entry.js')}`;
    filename.push(_.replace(template, 'page.js', 'index.html'));
    fs.access(entryPath, fs.constants.F_OK, err => {
        console.log(`${entryPath} ${err ? '不存在' : '存在'}`);
    });
    //确定entryName入口名，
    let entryName = ((fn, val) => fn(fn(val, 'page.js'), '/'))(
        _.trimEnd,
        template
    );
    pages.push(
        /**
         * HtmlWebpackPlugin配置解析
         * filename: 打包后的页面路径， 也跟页面路由有关,
         * 若filename为test / login / index.html, 则在服务器上输入 / test / login或者 / test / login / index.html即可
         * template确定模板文件路径， 支持js\ html\ ejs以及其他webpack支持的模板文件，
         * Webpack不在意模板文件的形式及格式， 理论上只要能输出html片段即可支持， 这里page.js为模板文件
         * chunks:指定entry入口名，若不配置默认接入所有入口,会将入口名对应的js文件放到相应页面script标签中
         * inject: script标签位置， option为 "true" | "body" | "head" | "false",true和body会放到底部，head放到头部，false不生成script标签
         * minify:代码压缩
         * 配置文档: https: //github.com/jantimon/html-webpack-plugin#options
         */
        new HtmlWebpackPlugin({
            filename: entryName === 'index' ? 'index.html' : `${entryName}/index.html`,
            template: path.resolve(__dirname, '..', 'app/pages', template),
            chunks: [entryName, 'commons/common', 'vendor'],
            inject: is_production ? true : 'head',
            //按chunks的顺序对js进行引入
            minify: {
                //剥离HTML注释
                removeComments: is_production,
                //尽可能删除属性的引号
                removeAttributeQuotes: is_production,
                //折叠对文档树中的文本节点有贡献的空白空间
                collapseWhitespace: false
            },
            hash: true // 为静态资源生成hash值
            // xhtml: true
        })
    );
    entries[entryName] = entryPath;
});

const compress = [
    /**
     * JS代码压缩
     */
    new UglifyJsPlugin({
        uglifyOptions: {
            cache: true, //Boolean/String,字符串即是缓存文件存放的路径
            parallel: true, // 启用多线程并行运行提高编译速度
            comments: true,
            warnings: false,
            sourceMap: true,
            compress: {
                // 移除 console
                drop_console: false,
                drop_debugger: true
            }
        }
    }),
    new OptimizeCSSAssetsPlugin({
        // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
        // assetNameRegExp: /\.(sa|sc|c)ss$/g,
        // 指定一个优化css的处理器，默认cssnano
        cssProcessor: require('cssnano'),

        cssProcessorPluginOptions: {
            preset: [
                'default',
                {
                    discardComments: { removeAll: true }, //对注释的处理
                    normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                }
            ]
        },
        canPrint: true // 是否打印编译过程中的日志
    })
];

module.exports = {
    pages,
    entries,
    compress
};