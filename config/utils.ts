import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import config from ".";

const isProduction = process.env.NODE_ENV === "production";

import { RuleSetUse, RuleSetUseItem, Rule } from "webpack";

export interface LoaderOption {
  sourceMap?: boolean;
  usePostCSS?: boolean;
  extract?: boolean;
}

export function resolve(...params: string[]): string {
  return path.resolve(__dirname, "..", ...(params || ""));
}

export function assetsPath(_path: string): string {
  const assetsSubDirectory = isProduction
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
}

/**
 * vue-loader@15版本废弃loaders配置
 * @param options
 */
function cssLoaders(options: LoaderOption): Record<string, RuleSetUse> {
  options = options || {};

  const cssLoader: RuleSetUseItem = {
    loader: "css-loader",
    options: {
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader: RuleSetUseItem = {
    loader: "postcss-loader",
    options: {
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(
    loader?: string,
    loaderOptions?: LoaderOption
  ): RuleSetUseItem[] {
    const loaders: RuleSetUseItem[] = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }
    function generate(
      extract = false,
      loaders: RuleSetUseItem[]
    ): RuleSetUseItem[] {
      let _loaders: RuleSetUseItem[] = extract
        ? [MiniCssExtractPlugin.loader]
        : ["vue-style-loader"];
      _loaders = _loaders.concat(loaders);
      return _loaders;
    }

    return generate(options.extract, loaders);
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass"),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus")
  };
}

export function styleLoaders(options: LoaderOption): Rule[] {
  const output: Rule[] = [];
  const loaders = cssLoaders(options);

  for (const extension in loaders) {
    const _loader = loaders[extension];
    output.push({
      test: new RegExp("\\." + extension + "$"),
      use: _loader
    });
  }

  return output;
}
