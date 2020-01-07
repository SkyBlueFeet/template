const config = require("../config");
const HOST = process.env.HOST;
const PORT = process.env.PORT ? Number(process.env.PORT) : undefined;
const path = require("path");

module.exports = {
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
  port: PORT || Number(config.dev.port),
  open: config.dev.autoOpenBrowser,
  overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
  publicPath: config.dev.assetsPublicPath,
  proxy: config.dev.proxyTable,
  quiet: true // necessary for FriendlyErrorsPlugin
  // watchOptions: {
  //     poll: config.dev.poll
  // }
};
