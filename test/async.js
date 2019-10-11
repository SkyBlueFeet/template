/**
 *  js创建异步任务
 *  参考:https: //juejin.im/post/5cc12ca46fb9a0323d6e098c
 *       http: //es6.ruanyifeng.com/#docs/async
 */
const fetch = require('fetch');

async function fn() {
    return 'hello async'; // 等同于 return await 'hello async'
}
var p = fn();
console.log(p); // Promise { <state>: "fulfilled", <value>: "hello async" }
p.then(value => console.log(value)); // hello async
console.log("tes");

// async function getTitle(url) {
//     let response = await fetch(url);
//     let html = await response.text();
//     return html.match(/<title>([\s\S]+)<\/title>/i)[1];
// }
// getTitle('https://skybluefeet.cn').then(console.log)
//上面代码中，函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行then方法里面的console.log。