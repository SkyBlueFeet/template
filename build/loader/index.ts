/* eslint-disable @typescript-eslint/no-var-requires */
import utils from "../utils";
import config from "../../config";
import vueLoaderConfig from "./vue-loader.conf";

const createLintingRule = (): Record<string, string | string[] | RegExp> => ({
    test: /\.(js|vue|ts)$/,
    loader: "happypack/loader?id=eslint",
    enforce: "pre",
    include: [utils.resolve("src"), utils.resolve("test")]
});

export default [
    ...(config.dev.useEslint ? [createLintingRule()] : []),
    {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
    },
    {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
            appendTsSuffixTo: [/\.vue$/]
        }
    },
    {
        test: /\.jsx?$/,
        loader: "happypack/loader?id=babel",
        include: [
            utils.resolve("src"),
            utils.resolve("test"),
            utils.resolve("node_modules/webpack-dev-server/client")
        ]
    },
    {
        test: /\.(jsonc|json5)$/,
        loader: require.resolve("./json5-loader"),
        include: [utils.resolve("src")]
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
            limit: 10000,
            name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
    },
    {
        test: /\.md?$/,
        use: [
            {
                loader: "html-loader"
            },
            {
                loader: require.resolve("./md-loader")
            }
        ]
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
            limit: 10000,
            name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
            limit: 10000,
            name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
    }
];
