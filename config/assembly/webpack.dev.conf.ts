import { Options } from "webpack";

import webpack from "webpack";

import WebpackDevServer from "webpack-dev-server";

import path from "path";

import * as utils from "../utils";
import config from "..";

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

const devWebpackConfig: webpack.Configuration = {
  mode: "development",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  devServer: DevServer,
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool as Options.Devtool,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

export default devWebpackConfig;
