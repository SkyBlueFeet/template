const autoprefixer = require('autoprefixer');
const cssNextPreset = require('postcss-preset-env');

module.exports = {
    plugins: [
        autoprefixer({
            remove: false
        }),
        cssNextPreset({
            stage: 3
        })
    ]
};