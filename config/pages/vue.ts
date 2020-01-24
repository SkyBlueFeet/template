import { Entry } from "webpack";
import { resolve } from "../utils";
import { Options as PageOptions } from "html-webpack-plugin";
import { env } from "../assembly";
import { MixingPagesOption } from ".";

export default function(env: env): MixingPagesOption {
  const vueEntry: Entry = {
    app: resolve("src/main.ts")
  };

  const vuePages: PageOptions[] = [
    {
      filename: "index.html",
      template: resolve("src/index.html")
    }
  ];

  return {
    entries: vueEntry,
    htmlOptions: vuePages
  };
}
