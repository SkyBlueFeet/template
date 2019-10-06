'use strict';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MarkdownItContainer = require('markdown-it-container');
const container = require('markdown-it-container');
const path = require('path');


const func = require('../utils/func.js');
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
            comments: true,
            warnings: false,
            sourceMap: true,
            compress: {
                // 移除 console
                drop_console: true,
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

exports.createContainer = (klass, defaultTitle) => {
    return [
        container,
        klass,
        {
            render(tokens, idx) {
                const token = tokens[idx];
                const info = token.info
                    .trim()
                    .slice(klass.length)
                    .trim();
                if (token.nesting === 1) {
                    return `<div class="${klass} custom-block"><p class="custom-block-title">${info ||
            defaultTitle}</p>\n`;
                } else {
                    return '</div>\n';
                }
            }
        }
    ];
};
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
/**
 * markdown页面模板，为每个markdown文件自动生成页面
 * @param  {String} v markdown页面根目录
 * @param  {Array} m markdown页面分类
 */
exports.mdtpl = (v, m) => {
    return `import layout from 'layout/layout.js';\nimport md from 'doc/${v}';
  \nexport default layout.initMdPage({title:'${m[1]}',active:'${ m[0]}',markdown:md});`;
};

exports.wrapCustomClass = function(render) {
    return function(...args) {
        return render(...args)
            .replace('<code class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">');
    };
};


exports.vueMarkdown = {
    preprocess: (MarkdownIt, source) => {
        MarkdownIt.renderer.rules.table_open = function() {
            return '<table class="table">';
        };
        MarkdownIt.renderer.rules.fence = this.wrapCustomClass(
            MarkdownIt.renderer.rules.fence
        );

        // ```html `` 给这种样式加个class hljs
        //  但是markdown-it 有个bug fence整合attr的时候直接加载class数组上而不是class的值上
        //  markdown-it\lib\renderer.js 71行 这么修改可以修复bug
        //  tmpAttrs[i] += ' ' + options.langPrefix + langName; --> tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
        // const fence = MarkdownIt.renderer.rules.fence
        // MarkdownIt.renderer.rules.fence = function(...args){
        //   args[0][args[1]].attrJoin('class', 'hljs')
        //   var a = fence(...args)
        //   return a
        // }

        // ```code`` 给这种样式加个class code_inline
        const code_inline = MarkdownIt.renderer.rules.code_inline;
        MarkdownIt.renderer.rules.code_inline = function(...args) {
            args[0][args[1]].attrJoin('class', 'code_inline');
            return code_inline(...args);
        };
        return source;
    },
    use: [
        [
            MarkdownItContainer,
            'demo',
            {
                validate: params => params.trim().match(/^demo\s*(.*)$/),
                render: function(tokens, idx) {
                    var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

                    if (tokens[idx].nesting === 1) {
                        var desc = tokens[idx + 2].content;
                        const html = func.convertHtml(
                            func.stripTags(tokens[idx].content, 'script')
                        );
                        // 移除描述，防止被添加到代码块
                        tokens[idx + 2].children = [];

                        return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`;
                    }
                    return '</div></demo-block>\n';
                }
            }
        ]
    ]
};