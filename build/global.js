'use strict';

const path = require('path');

const RootDir = path.resolve(__dirname, '..');

const resolve = (...paths) => path.join(__dirname, '..', ...paths);

/**
 * IS_PRODUCTION设置全局环境
 * alias全局假名路径
 *
 */

module.exports = {
    IS_PRODUCTION: false,
    alias: {
        '@tpl': resolve(),
        '@layout': resolve('core/layout'),
        '@components': resolve('core/components'),
        '@utils': resolve('utils'),
        '@core': resolve('core'),
        '@src': resolve('src'),
        '@script': resolve('src/script'),
        '@style': resolve('src/style'),
    }
};