# 目录及配置详解

项目启动需要安装nodejs

安装依赖

```bash
npm i //在本目录下
```

启动预览（生产环境下）

```bash
npm start
```

开发并实时热更新

```bash
npm run dev
```

项目目录结构

├── app		-----------------------------------------页面文件主目录
│   ├── components		-------------------------页面组件，如header、footer，使用ejs模板，介绍见下
│   │   ├── footer.ejs
│   │   └── header.ejs
│   ├── directory.json		----------------------运行或打包后会显示出当前的页面及其路径
│   ├── layout		---------------------------------放置页面布局文件
│   │   ├── layout.js		------------------------将页面组合起来，导出一个带参数的init函数
│   │   └── tpl
│   │       ├── blank.ejs		---------------------------------------空白ejs模板
│   │       ├── mdWithHeader.ejs
│   │       └── withHeader.ejs		-------------------------------带导航的模板
│   ├── pages
│   │   ├── index		--------------------------------页面http:localhost/index
│   │   │   ├── content.ejs
│   │   │   ├── entry.js
│   │   │   └── page.js
│   │   └── login		---------------------页面http:localhost/login
│   │       ├── content.ejs
│   │       ├── entry.js
│   │       └── page.js
│   └── static		-----------------------------css和js资源目录
│       ├── header.css
│       ├── header.scss
│       ├── iconfont.css
│       ├── iconfont.js
│       ├── layout.css
│       └── normalize.css
├── Auth		-----------------------------页面元素配置文件
│   └── auth.json
├── config		-------------------------------项目具体配置目录
│   ├── global.js
│   ├── md-loader.js
│   ├── pages.config.js
│   ├── rules.js
│   ├── utils.js
│   ├── webpack.config.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── config.js		---------------------------------项目简略配置文件
├── dist		-----------------------------------生成目录
│   ├── css
│   │   └── commons.1d77ff8b39bfcc81567c.css
│   ├── index.html
│   ├── js
│   │   ├── commons.5c37a9383f8ee3fedb2d.js
│   │   ├── index.e1cc1ec638eaa471b9f3.js
│   │   ├── login.8a6041a7e997802ba209.js
│   │   └── vendor.92712b6f5a3d20450de1.js
│   └── login
│       └── index.html
├── favicon.png		-------------------------------网站图标
├── LICENSE		--------------------------------开源许可
├── package.json		------------------------------包目录文件
├── package-lock.json
├── postcss.config.js		----------------------------postcss配置文件
├── README.md
├── size-plugin.json		---------------------------记录每次打包文件大小变化
├── stats.json		------------------------------记录每次打包文件详细情况
├── utils		-----------------------测试文件
│   ├── ajax.js
│   ├── func.js
│   ├── generator.js
│   ├── promise.js
│   └── script.js
└── yarn.lock

使用本地存储方案
使用公钥通过hash函数生成本地存储键值

使用AES对称加密得到本地存储值