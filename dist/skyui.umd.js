/*!
 * skyui.umd.js v1.0.0
 * (c) 2018-2020 skybluefeet <yakun1593@163.com>
 * Released under the MIT License.
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  // import "babel-polyfill";

  console.log(Array.from("test").includes("t")); // even though Rollup is bundling all your files together, errors and
  // logs will still point to your original source modules

  var t = "one";
  console.log("this is " + t);
  console.log("if you have sourcemaps enabled in your devtools, click on main.js:5 -->");
  Array.from("test").forEach(function (i) {
    console.log(i);
  }); // update();

})));
