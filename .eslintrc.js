// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true
    }
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential",
    "plugin:prettier/recommended"
  ],
  globals: {
    _: true
  },
  // required to lint *.vue files
  plugins: ["react", "vue", "html"],
  // add your custom rules here
  rules: {}
};
