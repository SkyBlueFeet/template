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
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            "modules": true
        },
        project: "./tsconfig.json"
    },
    env: {
        browser: true,
        es6: true,
        node: true,
        commonjs: false,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        //         'standard',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    "overrides": [
    {
        "files": ['*.ts', '*.tsx'],
        "rules": {
            'indent': [1, 4]
        },
        "parser": '@typescript-eslint/parser',
        "plugins": ['@typescript-eslint/eslint-plugin'],
    },
    {
        "files": ["*.js", "*.jsx"],
        "rules": {
            'arrow-parens': 0,
            // allow async-await
            'generator-star-spacing': 0,
            // allow debugger during development
            'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
            'semi': ['error', 'always'],
            'space-before-function-paren': 0,
            'quotes': [1, 'single'],
            'no-unused-vars': 0,
            'dot-location': [0, 'always'],
            'newline-after-var': [0, 'always'],
            'no-console': [0, 'always'],
            'indent': [1, 4],
            'prefer-const': [0, "any"],
            'eol-last': [0, "always"],
            'no-explicit-any': [0, "always"]
        },
        "parser": 'babel-eslint',
        "plugins": ['html', 'vue', 'import', 'promise', 'node', 'standard'], //
    }],
    // required to lint *.vue files

    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
};