/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-10-06 19:13:41
 * @LastEditTime: 2020-10-06 23:53:35
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */
// import "babel-polyfill";
// import update from './update.js';
function updates() {
  console.log('update')
}

console.log(Array.from('test').includes('t'))
// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
const t = 'one'
console.log(`this is ${t}`)
console.log(
  'if you have sourcemaps enabled in your devtools, click on main.js:5 -->'
)

Array.from('test').forEach(i => {
  console.log(i)
})

updates()
