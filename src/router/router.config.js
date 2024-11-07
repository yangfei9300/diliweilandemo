/*
 * @Author: yihaosun 1015095073@qq.com
 * @Date: 2022-12-09 10:20:07
 * @LastEditors: yihaosun 1015095073@qq.com
 * @LastEditTime: 2023-01-18 15:05:43
 * @FilePath: \heart-rate-demo\src\router\router.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: (resolve) => require(['@/views/index'], resolve),
    hidden: true
  },


]
