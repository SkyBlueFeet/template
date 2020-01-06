// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ["@typescript-eslint/eslint-plugin", "plugin:prettier/recommended"],
  globals: {
    _: true
  },
  // required to lint *.vue files
  plugins: ["html"],
  // add your custom rules here
  rules: {}
};
