/* eslint-disable @typescript-eslint/camelcase */
import { Options } from "webpack";

import * as utils from "../utils";
import webpack from "webpack";
import config from "..";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSPlugin from "optimize-css-assets-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const WebpackBuildConfig: webpack.Configuration = {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap as Options.Devtool,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[name].[chunkhash].js")
  },
  plugins: [
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].min.css"),
      chunkFilename: utils.assetsPath("css/[name].[contenthash].css")
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: "all",
      minChunks: 1,
      minSize: 10000,
      name: true
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true, // 启用多线程并行运行提高编译速度
        cache: true, // Boolean/String,字符串即是缓存文件存放的路径
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          compress: {
            // 移除 console
            drop_console: config.build.removeConsole,
            drop_debugger: true
          }
        }
      }),
      new OptimizeCSSPlugin({
        cssProcessor: require("cssnano"),

        cssProcessorPluginOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true }, // 对注释的处理
              normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
            }
          ]
        },
        canPrint: false // 是否打印编译过程中的日志
      })
    ],
    runtimeChunk: {
      name: "runtime"
    }
  }
};

if (config.build.productionGzip) {
  WebpackBuildConfig.plugins?.push(
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  WebpackBuildConfig.plugins?.push(new BundleAnalyzerPlugin());
}

export default WebpackBuildConfig;
