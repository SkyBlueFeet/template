/* eslint-disable @typescript-eslint/camelcase */
import path from "path";
import WebpackBaseConfig from "./webpack.base.conf";
import utils from "./utils";
import webpack from "webpack";
import config from "../config";
import merge from "webpack-merge";

import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSPlugin from "optimize-css-assets-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import env from "../config/prod.env";

const WebpackBuildConfig: webpack.Configuration = {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap
    ? "cheap-module-eval-source-map"
    : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[name].[chunkhash].js")
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].min.css"),
      chunkFilename: utils.assetsPath("css/[name].[contenthash].css")
    }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency",
      favicon: utils.resolve("logo.png")
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      }
    ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        },
        vue: {
          name: "vue",
          priority: -5,
          test: /[\\/]vue[\\/]/
        },
        "vue-router": {
          name: "vue-router",
          priority: -5,
          test: /[\\/]vue-router[\\/]/
        }
      },

      chunks: "all",
      minChunks: 1,
      minSize: 10000,
      name: true
    },
    minimizer: [
      /**
       * JS代码压缩
       */
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
        // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
        // assetNameRegExp: /\.(sa|sc|c)ss$/g,
        // 指定一个优化css的处理器，默认cssnano
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

const WebpackConfig: webpack.Configuration = merge(
  WebpackBaseConfig,
  WebpackBuildConfig
);

if (config.build.productionGzip) {
  WebpackConfig.plugins?.push(
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
  WebpackConfig.plugins?.push(new BundleAnalyzerPlugin());
}

export default WebpackConfig;
