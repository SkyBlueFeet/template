/*
 * @Date: 2020-03-16 12:46:50
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-16 14:21:22
 * @repository: https://github.com/SkyBlueFeet
 */
import webpack, { Stats } from "webpack";

import ora from "ora";
import rimraf from "rimraf";
import chalk from "chalk";
import path from "path";

process.env.NODE_ENV = "production";

import config from "../config/config";

import index from "../config";

const spinner = ora("building for production...");
spinner.start();

rimraf(
  path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
  err => {
    if (err) throw err;
    webpack(index("production"), (err: Error, stats: Stats) => {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: true, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false
        }) + "\n\n"
      );

      if (stats.hasErrors()) {
        console.log(chalk.red("  Build failed with errors.\n"));
        process.exit(1);
      }

      console.log(chalk.cyan("  Build complete.\n"));
      console.log(
        chalk.green(
          "  Tip: built files are meant to be served over an HTTP server.\n" +
            "  Opening index.html over file:// won't work.\n"
        )
      );
    });
  }
);
