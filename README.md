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

由于在eslint配置项中找不到分文件定制配置选项（ts的语法检查无法适用于js），因此为了适应整个项目，目前项目中使用js,jsx时不使用eslint检查,如果使用js、jsx作为主开发语言，请自定义`.eslintrc`文件以适应项目。

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

npm run analyzer
