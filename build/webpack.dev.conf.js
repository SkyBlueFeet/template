"use strict";
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const ServerConfig = require("./server-config");
const portfinder = require("portfinder");

const HOST = process.env.HOST;
const PORT = process.env.PORT ? Number(process.env.PORT) : undefined;

const devConfig = merge(baseWebpackConfig, {
  mode: "development",
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: "#cheap-module-eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    })
  ]
});

// add hot-reload related code to entry chunks

function devExport(useWebpackDevServer = true) {
  const portfind = port => {
    return {
      compilationSuccessInfo: {
        messages: [`正在运行: http://${devConfig.devServer.host}:${port}`]
      },
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
    };
  };
  if (!useWebpackDevServer) {
    Object.keys(devConfig.entry).forEach(function(name) {
      devConfig.entry[name] = ["./compiler/dev-client"].concat(
        devConfig.entry[name]
      );
    });
    return devConfig;
  } else {
    devConfig.devServer = ServerConfig;
    return new Promise((resolve, reject) => {
      portfinder.basePort = PORT || config.dev.port;
      portfinder.getPort((err, port) => {
        if (err) {
          reject(err);
        } else {
          // publish the new Port, necessary for e2e tests
          process.env.PORT = port.toString();
          // add port to devServer config
          devConfig.devServer.port = port;

          // Add FriendlyErrorsPlugin
          devConfig.plugins.push(new FriendlyErrorsPlugin(portfind(port)));

          resolve(devConfig);
        }
      });
    });
  }
}

module.exports = devExport(config.dev.useWebpackDevServer);
