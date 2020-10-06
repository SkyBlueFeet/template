/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-10-06 19:13:41
 * @LastEditTime: 2020-10-06 23:48:07
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */
declare module '*.jsonc' {
  const content: JSON
  export default content
}

declare module '*.json5' {
  const content: JSON
  export default content
}

declare module '*.md' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}
