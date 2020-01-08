import { Configuration } from "webpack";
import * as utils from "./utils";
import path from "path";
import WebpackBaseConfig from "./webpack.base.conf";
import webpack from "webpack";
import config from "../config";

import merge from "webpack-merge";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import FriendlyErrorsPlugin from "friendly-errors-webpack-plugin";
import portfinder from "portfinder";
import WebpackDevServer from "webpack-dev-server";

const HOST = process.env.HOST;
const PORT = process.env.PORT ? Number(process.env.PORT) : undefined;

const DevServer: WebpackDevServer.Configuration = {
  clientLogLevel: "warning",
  historyApiFallback: {
    rewrites: [
      {
        from: /.*/,
        to: path.posix.join(config.dev.assetsPublicPath, "index.html")
      }
    ]
  },
  hot: true,
  contentBase: false, // since we use CopyWebpackPlugin.
  compress: true,
  host: HOST || config.dev.host,
  port: PORT || config.dev.port,
  open: config.dev.autoOpenBrowser,
  overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
  publicPath: config.dev.assetsPublicPath,
  proxy: config.dev.proxyTable,
  quiet: true, // necessary for FriendlyErrorsPlugin
  watchOptions: {
    poll: config.dev.poll
  }
};

const devWebpackConfig: webpack.Configuration = merge(WebpackBaseConfig, {
  mode: "development",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: "cheap-module-eval-source-map",

  // these devServer options should be customized in /config/index.js
  devServer: DevServer,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
      favicon: utils.resolve("logo.png")
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.resolve("static"),
        to: config.dev.assetsSubDirectory,
        ignore: [".*"]
      }
    ])
  ]
});

const portfind: Function = (port: number | string): object => {
  return {
    compilationSuccessInfo: {
      messages: [`正在运行: http://${devWebpackConfig.devServer?.host}:${port}`]
    },
    onErrors: config.dev.notifyOnErrors
      ? utils.createNotifierCallback()
      : undefined
  };
};

const DevConfig: Promise<Configuration> = new Promise((resolve, reject) => {
  portfinder.basePort = PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port.toString();
      // add port to devServer config
      devWebpackConfig.devServer
        ? (devWebpackConfig.devServer.port = port)
        : void 0;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins?.push(new FriendlyErrorsPlugin(portfind(port)));

      resolve(devWebpackConfig);
    }
  });
});

export default DevConfig;
