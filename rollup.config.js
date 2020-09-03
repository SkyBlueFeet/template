import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

import babel from "@rollup/plugin-babel";
const isProduction = true;

export default {
  input: "bin/main.ts",
  output: {
    name: "main",
    file: "assets/bundle.js",
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: !isProduction,
  },
  plugins: [
    // typescript(),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".ts"],
      exclude: "node_modules/**",
    }),
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    isProduction && terser(), // minify, but only in production
  ],
};
