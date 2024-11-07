/*
 * @Author: yihaosun
 * @Date: 2021-11-30 10:33:45
 * @LastEditTime: 2022-01-22 11:47:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Baize_healthcare_vue_3.0\src\utils\getWeek.js
 */
/**
 * 获取用于显示的星期和日期时间
 * @param date
 * @returns {string}
 */
export function getDate(date) {
  const now = new Date()
  const y = now.getFullYear()
  const month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
  const d = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
  const h = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
  const m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
  const s = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
  let w = ''
  if (localStorage.getItem('lang') === 'en') {
    const weekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    w = weekList[now.getDay()]
  } else {
    w = '星期' + '日一二三四五六'.charAt(now.getDay())
  }
  return (y + '/' + month + '/' + d + ' ' + h + ':' + m + ':' + s + ' ' + w)
}

export function timeChange(time) {
  var date = new Date(time)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
  var s = date.getSeconds()
  return Y + M + D + h + m + s
}

export const transformTimestamp = (timestamp) => {
  // let a = new Date(timestamp).getTime();
  // const date = new Date(a);
  const date = new Date(timestamp)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  '
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) // 秒
  const dateString = Y + M + D + h + m + s
  return dateString
}

// js获取当前指定的前几天的日期
export function getBeforeDate(days) {
  var now = new Date().getTime()
  var ago = now - 86400000 * days // 一天的毫秒数为86400000
  var agoData = new Date(ago)
  var year = agoData.getFullYear()
  var mon = agoData.getMonth() + 1
  var day = agoData.getDate()
  mon = mon < 10 ? '0' + mon : mon
  day = day < 10 ? '0' + day : day
  var date = year + '-' + mon + '-' + day
  return date
}
