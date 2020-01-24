import path from "path";

export default {
  global: {
    // 第三方全局对象，可以不需要再引入直接使用
    variables: {
      _: "lodash"
    },
    // 可以不写后缀的文件类型,但是Vue等文件需要声明才能被识别
    extensions: [".js", ".json", ".ts", ".tsx"],
    // 在工程内可以直接使用该变量指代路径
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@src": path.resolve(__dirname, "../src"),
      "@types": path.resolve(__dirname, "../types"),
      "@root": path.resolve(__dirname, "..")
    }
  },
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        target: "http://localhost:59255/",
        pathRewrite: { "^/api": "" },
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true，
        secure: false // 如果是https接口，需要配置这个参数为true
      }
    },

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // Eslint需要检查的文件类型
    eslintFeilds: ["js", "vue", "ts", "tsx", "jsx"],
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: true,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),
    index: "index.html",

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: false,

    removeConsole: true,
    removeComments: true,

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
