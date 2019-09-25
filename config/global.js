const path = require('path');

const RootDir = path.resolve(__dirname, '..');
/**
 * IS_PRODUCTION设置全局环境
 * alias全局假名路径
 *
 */
module.exports = {
    IS_PRODUCTION: false,
    dev: {},
    build: {},
    alias: {
        root: RootDir,
        app: path.resolve(RootDir, 'app'),
        vendor: path.resolve(RootDir, 'vendor'),
        layout: path.resolve(RootDir, 'app/layout'),
        static: path.resolve(RootDir, 'app/static'),
        pages: path.resolve(RootDir, 'app/pages'),
        components: path.resolve(RootDir, 'app/components'),
    }
};