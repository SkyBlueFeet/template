import { Entry, Configuration, Plugin } from "webpack";
import HtmlWebpackPlugin, { Options as HtmlOption } from "html-webpack-plugin";
import vue from "./vue";
import { resolve } from "../utils";
import { env } from "../assembly";

export interface PreOption {
  rel: "preload";
  include: "asyncChunks";
  excludeHtmlNames: [];
}

export interface MixingPagesOption {
  entries: Entry;
  htmlOptions: HtmlOption[];
  preOptions?: PreOption[];
}

export interface MixingPages {
  entries: MixingPagesOption["entries"];
  html: Configuration["plugins"];
  pre?: Configuration["plugins"];
}

/**
 * 返回一个指定配置的new HtmlWebpackPlugin()对象
 * HtmlWebpackPlugin配置文档: https: //github.com/jantimon/html-webpack-plugin#options
 * @param { HtmlOption } Option 包含html-webpack-plugin配置的对象
 * @param { env } env 运行模式
 * @returns { Plugin }
 */
function CreatePage(Option: HtmlOption, env: env): Plugin {
  Option = {
    filename: "index.html",
    inject: true,
    minify: {
      removeComments: env === "production",
      collapseWhitespace: env === "production",
      removeAttributeQuotes: env === "production"
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: "dependency",
    favicon: resolve("logo.png"),
    cache: true,
    ...Option
  };
  return new HtmlWebpackPlugin({
    ...Option
  });
}

export default function(env: env): MixingPages {
  const entries = {
    ...vue(env).entries
  };
  const options = [...vue(env).htmlOptions];
  const html = options.map(item => CreatePage(item, env));
  return {
    entries,
    html
  };
}
