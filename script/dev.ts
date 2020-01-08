import WebpackDevServer from "webpack-dev-server";
import WebpackDevconfig from "../build/webpack.dev.conf";
import webpack, { Configuration } from "webpack";

WebpackDevconfig.then((devConfig: Configuration) => {
  const Compile = webpack(devConfig);

  const app = new WebpackDevServer(Compile, devConfig.devServer);

  app.listen(devConfig.devServer.port, error => {
    console.log(error);
  });
}).catch(reason => {
  console.log(reason);
});
