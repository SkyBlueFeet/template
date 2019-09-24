const Global = require('./global.js');
const webpack = require('webpack');

Global.IS_PRODUCTION = false;

const BaseWebpackConf = require('./webpack.config');

BaseWebpackConf.plugins.push(
    new webpack.DefinePlugin({
        IS_PRODUCTION: JSON.stringify(false)
    })
);

module.exports = BaseWebpackConf;