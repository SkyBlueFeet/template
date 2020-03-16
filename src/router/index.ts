/*
 * @Date: 2020-03-16 18:02:56
 * @LastEditors: skyblue
 * @LastEditTime: 2020-03-16 18:21:26
 * @repository: https://github.com/SkyBlueFeet
 */
import index from "../pages/App";
import about from "../pages/about";
import { RouteComponentProps } from "react-router-dom";

let router = [
  {
    path: "/", //首页默认加载的页面
    componentName: index,
    exact: true //是否为严格模式
  },
  {
    path: "/product/:id", //后面是传递的参数id
    componentName: about
  },
  {
    path: "/user/",
    componentName: index,
    routes: [
      /** 嵌套路由  User下面又有两个子页面*/
      {
        path: "/user/",
        componentName: about,
        exact: false
      },
      {
        path: "/user/info",
        componentName: about
      }
    ]
  }
];

export default router;
