/*
 * @Author: yihaosun
 * @Date: 2021-11-03 09:57:19
 * @LastEditTime: 2021-11-05 17:42:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Baize_healthcare_vue_3.0\src\utils\formRules.js
 */
// 手机号码的正则
export const phoneNumber = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
// 邮箱校验
export const email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

// mac 地址校验
export const mac = /^[\da-fA-F]{2}(\-[\da-fA-F]{2}){5}$/

// ip 地址校验
export const ip = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/

// 端口校验
export const port = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

