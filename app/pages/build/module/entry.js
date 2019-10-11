import 'static/layout.scss';
import 'app/static/iconfont.js';
import 'static/auth/init.js';
import auth from 'tpl/Auth/auth.json';
const header = require('components/headeres6.ejs');

console.log(header(auth));
console.log(header);