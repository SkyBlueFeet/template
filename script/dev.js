const WebpackDevServer = require("webpack-dev-server");
const WebpackDevconfig = require("../build/webpack.dev.conf");
const ServerConfig = require("../build/server-config");
const webpack = require("webpack");
const config = require("../config");
if (!config.dev.useWebpackDevServer) {
  require("../compiler/dev-server").ready.then(res => {
    console.log("Ready");
  });
} else {
  WebpackDevconfig.then(config => {
    const Compile = webpack(config);

    const app = new WebpackDevServer(Compile, ServerConfig);

    app.listen(ServerConfig.port, error => {
      console.log("error");
    });
  }).catch(reason => {
    console.log(reason);
  });
}
