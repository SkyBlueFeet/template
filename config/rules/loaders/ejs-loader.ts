import _ from "lodash";
import { transform, TransformOptions } from "@babel/core";

const babelrc: TransformOptions = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        targets: {
          browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
        },
        corejs: "3", // 声明corejs版本
        useBuiltIns: "usage"
      }
    ]
  ],
  plugins: [
    "transform-vue-jsx",
    "@vue/babel-plugin-transform-vue-jsx",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true
      }
    ],
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};

const pluginOptions = {
  variable: "data",
  interpolate: /\{\{(.+?)\}\}/g
};

function replaceString(string: string): string {
  const $string = string.split("       ");
  let result = "";
  result = $string.join("");
  return result;
}

export default function(source: string): string {
  const templateStr = transform(
    "module.exports = " + _.template(source, pluginOptions),
    babelrc
  ).code;
  return replaceString(templateStr);
}
