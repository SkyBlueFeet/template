const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

let option = {
  cwd: path.resolve(__dirname, 'app/pages'), // 在pages目录里找
  sync: true // 这里不能异步，只能同步
};

let entryNames = glob.sync('**/entry.js', option);
let pageNames = glob.sync('**/page.js', option);
// let routerNames = glob.sync('**/**/', option);
let routerNames = [];
let templatePath = glob.sync('**/page.js', option);
pageNames.forEach((value, index) => {
  ((fn, val) => console.log(fn(fn(val, 'page.js'), '/')))(_.trimEnd, value);
  // console.log(_.trimEnd(value, 'entry.js'));
  // console.log(_.trimEnd(value, '/'));
});
templatePath.forEach((value, index) => {
  routerNames.push(_.replace(value, 'page.js', 'index.html'));
});
pageNames.forEach(page => {
  // console.log(_.trimEnd(page, '/page.js'));
});
