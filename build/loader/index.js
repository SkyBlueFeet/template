const { resolve, assetsPath } = require('../utils');
const config = require('../../config');
const vueLoaderConfig = require('./vue-loader.conf');

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'happypack/loader?id=eslint',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')]
});

module.exports = [
    ...(config.dev.useEslint ? [createLintingRule()] : []),
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
    },
    {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
    },
    {
        test: /\.(jsonc|json5)$/,
        loader: require.resolve('./json5-loader.js'),
        include: [resolve('src')]
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: assetsPath('img/[name].[hash:7].[ext]')
        }
    },
    {
        test: /\.md?$/,
        use: [{
            loader: 'html-loader'
        }, {
            loader: require.resolve('./md-loader.js')
        }]
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: assetsPath('media/[name].[hash:7].[ext]')
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
    }
];