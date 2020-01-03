// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        // to edit target browsers: use "browserslist" field in package.json
        autoprefixer: {
            remove: true
        },
        'postcss-preset-env': {
            stage: 3
        },
        'postcss-px2rem': {
            remUnit: 15
        }
    }
}