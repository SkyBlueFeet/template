'use strict';
const path = require('path');
const { loader: ExtractLoader } = require('mini-css-extract-plugin');

const { build: buildConfig, dev: devConfig } = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

const packageConfig = require('../package.json');

module.exports = {
    resolve: function(...params) {
        return path.resolve(__dirname, '..', ...params || '');
    },

    assetsPath: function(_path) {
        const assetsSubDirectory = isProduction ?
            buildConfig.assetsSubDirectory :
            devConfig.assetsSubDirectory;

        return path.posix.join(assetsSubDirectory, _path);
    },

    cssLoaders: function(options) {
        options = options || {};

        const cssLoader = {
            loader: 'css-loader',
            options: {
                sourceMap: options.sourceMap
            }
        };

        const postcssLoader = {
            loader: 'postcss-loader',
            options: {
                sourceMap: options.sourceMap
            }
        };

        // generate loader string to be used with extract text plugin
        function generateLoaders(loader, loaderOptions) {
            const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

            if (loader) {
                loaders.push({
                    loader: loader + '-loader',
                    options: Object.assign({}, loaderOptions, {
                        sourceMap: options.sourceMap
                    })
                });
            }

            // Extract CSS when that option is specified
            // (which is the case during production build)
            if (options.extract) {
                return [ExtractLoader].concat(loaders);
            } else {
                return ['vue-style-loader'].concat(loaders);
            }
        }

        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        return {
            css: generateLoaders(),
            postcss: generateLoaders(),
            less: generateLoaders('less'),
            sass: generateLoaders('sass'),
            scss: generateLoaders('sass'),
            stylus: generateLoaders('stylus'),
            styl: generateLoaders('stylus')
        };
    },

    // Generate loaders for standalone style files (outside of .vue)
    styleLoaders: function(options) {
        const output = [];
        const loaders = this.cssLoaders(options);

        for (const extension in loaders) {
            const loader = loaders[extension];
            output.push({
                test: new RegExp('\\.' + extension + '$'),
                use: loader
            });
        }

        return output;
    },

    createNotifierCallback: () => {
        const notifier = require('node-notifier');

        return (severity, errors) => {
            if (severity !== 'error') return;

            const error = errors[0];
            const filename = error.file && error.file.split('!').pop();

            notifier.notify({
                title: packageConfig.name,
                message: severity + ': ' + error.name,
                subtitle: filename || '',
                icon: path.join(__dirname, 'logo.png')
            });
        };
    }
};