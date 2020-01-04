/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

export default merge(prodEnv, {
    NODE_ENV: "development"
});
