import { Configuration } from "webpack";
import webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";

import FriendlyErrorsPlugin from "friendly-errors-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import portfinder from "portfinder";
import merge from "webpack-merge";

import * as utils from "../utils";
import config from "..";
import rules, { MixinRule } from "../rules";
import pages from "../pages";
import dev from "./webpack.dev.conf";
import prod from "./webpack.prod.conf";
// import PreloadWebpackPlugin = require("preload-webpack-plugin");
import Notifier from "node-notifier";

const PORT = process.env.PORT ? Number(process.env.PORT) : undefined;

export type env = "development" | "production" | "testing";

const WebpackBaseConfig: Configuration = {
  context: utils.resolve(),
  entry: pages(process.env.NODE_ENV as env).entries,
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [...config.global.extensions],
    alias: {
      ...config.global.alias
    }
  },
  module: {
    rules: rules
  },
  plugins: [
    ...MixinRule.plugins,
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    ...pages(process.env.NODE_ENV as env).html,

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.resolve("static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      }
    ]),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin(config.global.variables)
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

export default function(env: env): Promise<Configuration> {
  let webpackConfig: Promise<Configuration>;
  if (env === "development") {
    const devWebpackConfig = merge(WebpackBaseConfig, dev);

    const portfind: Function = (
      port: number | string
    ): FriendlyErrorsPlugin.Options => {
      return {
        compilationSuccessInfo: {
          messages: [`正在运行`],
          notes: [`http://${devWebpackConfig.devServer?.host}:${port}`]
        },
        onErrors(
          severity: FriendlyErrorsPlugin.Severity,
          errors: string
        ): void {
          if (severity !== "error" || config.dev.notifyOnErrors) return;

          Notifier.notify({
            title: "Webpack",
            message: `${severity}: ${errors}`,
            icon: utils.resolve("logo.png")
          });
        }
      };
    };

    webpackConfig = new Promise((resolve, reject) => {
      portfinder.basePort = PORT || config.dev.port;
      portfinder.getPort((err, port) => {
        if (err) {
          reject(err);
        } else {
          // publish the new Port, necessary for e2e tests
          process.env.PORT = port.toString();
          // add port to devServer config
          devWebpackConfig.devServer.port = port;

          // Add FriendlyErrorsPlugin
          devWebpackConfig.plugins?.push(
            new FriendlyErrorsPlugin(portfind(port))
          );

          resolve(devWebpackConfig);
        }
      });
    });
  } else {
    webpackConfig = new Promise(resolve => {
      resolve(merge(WebpackBaseConfig, prod));
    });
  }
  return webpackConfig;
}
