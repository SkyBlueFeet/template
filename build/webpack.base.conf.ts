import webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";
import HappyPackPlugin from "happypack";
import * as utils from "./utils";
import config from "../config";
import rolesConfig from "./loader";
import { Configuration } from "webpack";

const WebpackBaseConfig: Configuration = {
  context: utils.resolve(),
  entry: {
    app: "./src/main.ts"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": utils.resolve("src"),
      "@root": utils.resolve()
    }
  },
  module: {
    rules: rolesConfig
  },
  plugins: [
    new VueLoaderPlugin(),
    new HappyPackPlugin({
      id: "babel",
      loaders: ["babel-loader"]
    }),
    new HappyPackPlugin({
      id: "eslint",
      loaders: [
        {
          loader: "eslint-loader",
          options: {
            formatter: require("eslint-friendly-formatter"),
            emitWarning: !config.dev.showEslintErrorsInOverlay
          }
        }
      ]
    }),
    new webpack.ProvidePlugin({
      _: "lodash"
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};

export default WebpackBaseConfig;
