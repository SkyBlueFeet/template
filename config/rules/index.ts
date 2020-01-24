import * as utils from "../utils";
import config from "..";

import { mdLoader, ejsLoader, json5Loader } from "./loaders";
import { RuleSetRule } from "webpack";
import handler, { MixinRuleOptions } from "./happypack";

// 需要使用happypack的规则
const happypackOptions: MixinRuleOptions[] = [
  {
    id: "babel",
    setRule: true,
    rule: {
      test: /\.jsx?$/,
      use: ["babel-loader"],
      include: [
        utils.resolve("src"),
        utils.resolve("node_modules/webpack-dev-server/client")
      ],
      exclude: (file: string): boolean =>
        /node_modules/.test(file) && !/\.vue\.js/.test(file)
    }
  },
  {
    id: "ejs",
    setRule: true,
    rule: {
      test: /\.ejs?$/,
      use: [
        {
          loader: ejsLoader
        },
        {
          loader: "html-loader",
          options: {
            attrs: [":data-src", "img:src"]
          }
        }
      ]
    }
  }
];

// 如果使用ESlint检查，则将该规则添加进去
if (config.dev.useEslint) {
  happypackOptions.push({
    id: "eslint",
    setRule: true,
    rule: {
      test: new RegExp(`/\\.(${config.dev.eslintFeilds.join("|")})$/`),
      use: [
        {
          loader: "eslint-loader",
          options: {
            formatter: require("eslint-friendly-formatter"),
            emitWarning: !config.dev.showEslintErrorsInOverlay
          }
        }
      ],
      enforce: "pre",
      include: [utils.resolve("src")]
    }
  });
}

export const MixinRule = handler(happypackOptions);

const loaders: RuleSetRule[] = [
  {
    test: /\.vue$/,
    loader: "vue-loader",
    options: {
      transformAssetUrls: {
        video: ["src", "poster"],
        source: "src",
        img: "src",
        image: "xlink:href"
      }
    }
  },
  {
    test: /\.tsx?$/,
    use: [
      "happypack/loader?id=babel",
      {
        loader: "ts-loader",
        options: {
          appendTsxSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  ...handler(happypackOptions).rules,
  {
    test: /\.(jsonc|json5)$/,
    loader: json5Loader,
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
        loader: "html-loader",
        options: {
          attrs: [":data-src", "img:src"]
        }
      },
      {
        loader: mdLoader
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

export default loaders;
