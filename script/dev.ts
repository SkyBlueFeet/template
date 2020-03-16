/*
 * @Date: 2020-03-16 12:46:50
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-16 13:55:15
 * @repository: https://github.com/SkyBlueFeet
 */
import WebpackDevServer from "webpack-dev-server";
import webpack, { Configuration } from "webpack";

process.env.NODE_ENV = "development";

import index from "../config";

index("development")
  .then((devConfig: Configuration) => {
    const Compile = webpack(devConfig);
    const app = new WebpackDevServer(Compile, devConfig.devServer);

    app.listen(devConfig.devServer.port, error => console.error(error));
  })
  .catch(reason => console.error(reason));
