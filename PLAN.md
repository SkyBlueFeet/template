# 计划

1. 由于Proxy无法在IE中使用,拟在application class 使用ES5 Objext.definePrototype间接实现`Proxy`的get和set方法    `已完成`

2. 使用工厂模式实现`module`、`element`、`role`、`auth` `class`的改写    `未完成`

3. 优化 `application` 工作流程，使用isInit资源检测优化状态继承逻辑  `不再使用此方案`

4. 全局引入`bootstrap`并自定义主题样式    `已完成`

5. 添加版本号作为检测本地资源和远程资源差别的标志   `不再使用此方案`

6. 资源修改后修改与之相关的表和数据    `已修改方案`

7. 建立超级管理员账户并完成登录系统    `已完成`

8. 本地存储和cookie的容错处理   `由于Cookies容量限制，不再使用此方案`

9. 是否进行加密的控制   `不再使用此方案`

10. 全局元素控制    `已完成`

11. 用户和角色权限系统的设计    `完成度80%`

12. 使用`SessionStorage`作为介质实现页面资源预请求    `已完成`