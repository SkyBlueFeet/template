/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from "path";
const { loader: ExtractLoader } = require("mini-css-extract-plugin");

import config from "../config";

const isProduction = process.env.NODE_ENV === "production";

import * as packageConfig from "../package.json";

export interface LoaderOption {
    sourceMap?: boolean;
    usePostCSS?: boolean;
    extract?: boolean;
}
export interface Loader {
    loader?: string;
    test?: RegExp;
    options?: LoaderOption;
    use?: Array<string | object>;
}
let Loaders: Array<string | Loader>;

export default {
    resolve: function (...params: string[]): string {
        return path.resolve(__dirname, "..", ...(params || ""));
    },

    assetsPath: function (_path: string): string {
        const assetsSubDirectory = isProduction
            ? config.build.assetsSubDirectory
            : config.dev.assetsSubDirectory;

        return path.posix.join(assetsSubDirectory, _path);
    },

    cssLoaders: function (
        options: LoaderOption
    ): Record<string, Array<string | Loader>> {
        // options = options || {};

        Loaders = ["vue-style-loader"];

        const cssLoader: Loader = {
            loader: "css-loader",
            options: {
                sourceMap: options.sourceMap
            }
        };

        const postcssLoader: Loader = {
            loader: "postcss-loader",
            options: {
                sourceMap: options.sourceMap
            }
        };

        // generate loader string to be used with extract text plugin
        function generateLoaders(
            loader?: string,
            loaderOptions?: LoaderOption
        ): Array<string | Loader> {
            const loaders: Array<string | Loader> = options.usePostCSS
                ? [cssLoader, postcssLoader]
                : [cssLoader];

            if (loader) {
                loaders.push({
                    loader: loader + "-loader",
                    options: Object.assign({}, loaderOptions, {
                        sourceMap: options.sourceMap || false
                    })
                });
            }

            // Extract CSS when that option is specified
            // (which is the case during production build)
            if (options.extract) {
                return [ExtractLoader].concat(loaders);
            } else {
                return Loaders.concat(loaders);
            }
        }

        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        return {
            css: generateLoaders(),
            postcss: generateLoaders(),
            less: generateLoaders("less"),
            sass: generateLoaders("sass"),
            scss: generateLoaders("sass"),
            stylus: generateLoaders("stylus"),
            styl: generateLoaders("stylus")
        };
    },

    // Generate loaders for standalone style files (outside of .vue)
    styleLoaders: function (options: LoaderOption): Loader[] {
        const output: Loader[] = [];
        const loaders = this.cssLoaders(options);

        for (const extension in loaders) {
            const _loader = loaders[extension];
            output.push({
                test: new RegExp("\\." + extension + "$"),
                use: _loader
            });
        }

        return output;
    },

    createNotifierCallback: (): Function => {
        const notifier = require("node-notifier");

        return (
            severity: string,
            errors: Array<Record<string, string>>
        ): void => {
            if (severity !== "error") return;

            const error = errors[0];
            const filename = error.file && error.file.split("!").pop();

            notifier.notify({
                title: packageConfig.name,
                message: severity + ": " + error.name,
                subtitle: filename || "",
                icon: path.join(__dirname, "logo.png")
            });
        };
    }
};
