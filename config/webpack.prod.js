const env = require('./global');

env.IS_PRODUCTION = true;

module.exports = require('./webpack.config');