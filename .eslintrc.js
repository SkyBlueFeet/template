/*
 * @Date: 2019-06-19 12:48:14
 * @LastEditors: SkyBlue
 * @LastEditTime: 2019-06-21 19:47:14
 * @Gitee: https://gitee.com/skybluefeet
 * @remote repository: https://gitee.com/skybluefeet/skyblue.git
 */
// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6
    },
    env: {
        browser: true,
        es6: true,
        node: true,
        commonjs: false,
        jquery: true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard',
        'eslint:recommended',
        'G:\\ubuntu开发环境\\VSCode开发环境\\.eslintrc.js'
    ],
    // required to lint *.vue files
    plugins: ['html'], //
    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
    rules: {
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        semi: ['error', 'always'],
        'space-before-function-paren': 0,
        quotes: [1, 'single'],
        'no-unused-vars': 0,
        'dot-location': [0, 'always'],
        'newline-after-var': [0, 'always'],
        'no-useless-catch': [0, 'always'],
        'no-console': [0, 'always'],
        'eol-last': ["error", "never"],
        'indent': [1, 4],
        'prefer-const': [0, "any"]
    }
};