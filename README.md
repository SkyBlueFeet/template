# webpack4-typescript-template

#### Description

基于 Vue-cli@2 脚手架升级改造的全 typescript 实现

#### 技术栈

JS、TS、TSX、Vue 全家桶

#### 开发支持

Eslint、Babel、PostCss、Prettier

#### 关键第三方依赖版本

```json
"typescript": "^3.7.4",
"ts-node": "^8.5.4",
"vue": "^2.6.11",
"webpack": "^4.41.2",
"@babel/core": "^7.7.5",
"eslint": "^6.7.2",
"prettier": "^1.19.1",
```

#### 额外支持

1. 支持markdown、json5解析；
2. 使用babel解析ejs文件以支持在lodash模板中使用ES6语法；
3. 打包文件解析；

#### 特色

在vue-cli@2基础上升级为webpack4的基础上，webpack配置文件全部使用ts重构，模块化、参数化配置结构，为构建多页面应用留下配置空间。完全支持js、jsx、ts、tsx作为开发语言。

#### 目前的缺陷

Vue文件中无法同时检查ts和js。

内部配置文件没有jsdoc。

#### 开发方向

1. 支持Vue、React、Angular
2. 支持ts、tsx、js、jsx
3. 支持ejs、vue多页面
4. 支持库文档书写和编译

#### 命令

```json
"dev": "ts-node --project tsconfig.node.json ./script/dev",
"start": "npm run dev",
"lint": "eslint --ext .js,.vue,.ts,.tsx src",
"build": "ts-node --project tsconfig.node.json script/build.ts",
"analyzer": "npm run build --report",
"format": "prettier --write \"*/**/*.ts\" \"*/**/*.vue\" \"*/**/*.tsx\""
```

#### 安装

```js 
$ npm install
$ npm run dev
$ npm run build
```

#### build for production and view the bundle analyzer report

```js 
npm run analyzer
```

`推荐使用VS Code开发本应用`

#### 开发日志

2020-01-27 完成Vue SPA开发环境

参考链接

[使用不同语言配置webpack](https://webpack.docschina.org/configuration/configuration-languages)；

[Vue + TypeScript 新项目起手式](https://juejin.im/post/59f29d28518825549f7260b6)；

[vue + typescript 进阶篇](https://segmentfault.com/a/1190000011878086)；

[使用webpack搭建基于TypeScript的node开发环境](https://www.jianshu.com/p/6aab86403dc1)；

[【webpack4】用不同语言语法编写webpack配置文件](https://segmentfault.com/a/1190000018738802)；

[如果我的项目混用 js 和 ts，如何正确设置配置Eslint？](https://github.com/AlloyTeam/eslint-config-alloy/issues/67)；