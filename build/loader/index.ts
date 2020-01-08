/* eslint-disable @typescript-eslint/no-var-requires */
import * as utils from "../utils";
import config from "../../config";
import { Rule } from "webpack";

const createLintingRule = (): Rule => ({
  test: /\.(js|vue|ts|tsx|jsx)$/,
  loader: "happypack/loader?id=eslint",
  enforce: "pre",
  include: [utils.resolve("src")]
});

const loaders: Rule[] = [
  ...(config.dev.useEslint ? [createLintingRule()] : []),
  {
    test: /\.vue$/,
    loader: "vue-loader",
    options: utils.vueLoaderOption()
  },
  {
    test: /\.tsx?$/,
    use: [
      "happypack/loader?id=babel",
      {
        loader: "ts-loader",
        options: {
          appendTsxSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  {
    test: /\.jsx?$/,
    loader: "happypack/loader?id=babel",
    include: [
      utils.resolve("src"),
      utils.resolve("node_modules/webpack-dev-server/client")
    ],
    exclude: (file: string): boolean =>
      /node_modules/.test(file) && !/\.vue\.js/.test(file)
  },
  {
    test: /\.(jsonc|json5)$/,
    loader: require.resolve("./json5-loader"),
    include: [utils.resolve("src")]
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: "url-loader",
    options: {
      limit: 10000,
      name: utils.assetsPath("img/[name].[hash:7].[ext]")
    }
  },
  {
    test: /\.md?$/,
    use: [
      {
        loader: "html-loader"
      },
      {
        loader: require.resolve("./md-loader")
      }
    ]
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: "url-loader",
    options: {
      limit: 10000,
      name: utils.assetsPath("media/[name].[hash:7].[ext]")
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: "url-loader",
    options: {
      limit: 10000,
      name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
    }
  }
];

export default loaders;
