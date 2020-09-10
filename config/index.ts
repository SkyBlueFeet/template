/*
 * @Date: 2020-03-16 13:39:53
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-16 23:29:07
 * @repository: https://github.com/SkyBlueFeet
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Configuration } from "webpack";

import FriendlyErrorsPlugin from "friendly-errors-webpack-plugin";
import portfinder from "portfinder";

import * as utils from "./utils";
import config from "./config";
import Notifier from "node-notifier";
import assembly, { env } from "./assembly";

const PORT = process.env.PORT ? Number(process.env.PORT) : undefined;

function typeConvert<T, K>(type: T): K {
  return type as any;
}

function index(env: "development"): Promise<Configuration>;
function index(env: "production"): Configuration;
function index(env: env): Configuration | Promise<Configuration> {
  if (env === "development") {
    const devWebpackConfig = assembly("development");

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
          if (severity !== "error" || !config.dev.notifyOnErrors) return;
          typeConvert<string, any[]>(errors).forEach(k =>
            console.log(k.webpackError)
          );

          Notifier.notify({
            title: "Webpack",
            message: `${severity}: ${(errors[0] as any).webpackError}`,
            icon: utils.resolve("logo.png")
          });
        }
      };
    };

    return new Promise<Configuration>((resolve, reject) => {
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
          devWebpackConfig.plugins.push(
            new FriendlyErrorsPlugin(portfind(port))
          );

          resolve(devWebpackConfig);
        }
      });
    });
  } else if (env === "production") {
    return assembly("production");
  }
}

export default index;
