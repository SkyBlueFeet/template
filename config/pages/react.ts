/*
 * @Date: 2020-03-16 12:59:30
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-16 15:03:25
 * @repository: https://github.com/SkyBlueFeet
 */
import { Entry } from "webpack";
import { resolve } from "../utils";
import { Options as PageOptions } from "html-webpack-plugin";
import { env } from "../assembly";
import { MixingPagesOption } from ".";

export default function(env: env): MixingPagesOption {
  const reactEntry: Entry = {
    app: resolve("src/main.tsx")
  };

  const reactPages: PageOptions[] = [
    {
      filename: "index.html",
      template: resolve("src/index.html")
    }
  ];

  return {
    entries: reactEntry,
    htmlOptions: reactPages
  };
}
