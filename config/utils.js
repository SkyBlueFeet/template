'use strict';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const func = require('../utils/func');
/**
 * Utils.js主要存放webpack配置需要使用的实现方法，
 * 这些方法都是一次性且只在webpack配置文件中使用
 */

const config = require('../config');

/**
 * 对css、js文件抽取和压缩
 */
exports.compress = [
    /**
     * JS代码压缩
     */
    new UglifyJsPlugin({
        uglifyOptions: {
            cache: true, //Boolean/String,字符串即是缓存文件存放的路径
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
        canPrint: false // 是否打印编译过程中的日志
    })
];
/**
 * 系统通知
 */
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: config.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.resolve(__dirname, '..', 'favicon.png')
        });
    };
};

exports.wrapCustomClass = function(render) {
    return function(...args) {
        return render(...args)
            .replace('<code class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">');
    };
};