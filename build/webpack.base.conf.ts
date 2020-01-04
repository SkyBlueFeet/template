/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HappyPackPlugin = require("happypack");
import utils from "./utils";
import config from "../config";
import rolesConfig from "./loader";
import { Configuration } from "webpack";
const happyThreadPool = HappyPackPlugin.ThreadPool({ size: 4 });

const WebpackBaseConfig: Configuration = {
    context: utils.resolve(),
    entry: {
        app: "./src/main.ts"
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        publicPath:
            process.env.NODE_ENV === "production"
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": utils.resolve("src"),
            "@root": utils.resolve()
        }
    },
    module: {
        rules: rolesConfig
    },
    plugins: [
        new VueLoaderPlugin(),
        new HappyPackPlugin({
            id: "babel",
            loaders: ["babel-loader"],
            threadPool: happyThreadPool
        }),
        new HappyPackPlugin({
            id: "eslint",
            loaders: [
                {
                    loader: "eslint-loader",
                    options: {
                        formatter: require("eslint-friendly-formatter"),
                        emitWarning: !config.dev.showEslintErrorsInOverlay
                    }
                }
            ],
            threadPool: happyThreadPool
        })
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty"
    }
};

export default WebpackBaseConfig;