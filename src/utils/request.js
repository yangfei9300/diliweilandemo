import axios from 'axios'
import router from '../router'
import store from '@/store'
import { succeed, failed, warning } from "@/utils"
import {
  getToken,
  setToken,
  removeToken
} from './auth'
import {
  MessageBox,
  Message
} from 'element-ui'
import {
  getRefreshToken,
} from '../api/token'
import {
  getTimestamp,
  randomString,
  getSignature
} from './index'
// const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

//是否正在刷新token的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
// function alertMessage(message) {
//   Message({
//     message: message,
//     type: 'error',
//     duration: 3 * 1000,
//     showClose: true
//   })
// }
const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options
  // let { access_token } = getToken()
  let access_token = getToken() ? JSON.parse(getToken()).access_token : ""
  let rid = randomString(16)
  let time = getTimestamp()
  let sign = getSignature(rid, time, data, '82588CA9CA40ED0DCD51F1013ED2FE75', method.toUpperCase())
  options.headers = {
    "hc-rid": rid, //随机字符串（16位字符数据混合）
    "hc-time": time, //当前时间戳毫秒 13位
    "hc-sign": sign, //签名 用于校验数据完整性
    "AccessToken": access_token //访问接口授权TOKEN (签名中不使用)
  }
  // const cloneData = lodash.cloneDeep(data)
  const cloneData = data
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        headers: options.headers,
        params: cloneData,
      }, {
        headers: options.headers
      })
    case 'delete':
      return axios.delete(url, {
        headers: options.headers,
        params: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData, {
        headers: options.headers
      })
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request(options) {
  return fetch(options).then((response) => {
    const {
      statusText,
      status,
      config
    } = response
    let data = response.data
    let dataStatus = +data.status
    if (dataStatus === 6002 || dataStatus === 6010) {
      // this.$message.warning('该账号不存在')
      warning("该账号不存在")
    }
    else if(dataStatus===4012){
      warning("一天只能发送十次")
    }
    else if(dataStatus===4028){
      warning('验证码不正确')
    } else if(dataStatus===4034){
      warning('系统错误,无法发送')
    }
    else if(dataStatus===6015){
      warning('账号或者密码错误')
    }
    else if(dataStatus===4001){
      warning('非法请求')
    }
    else if(dataStatus===6001){
      warning('昵称或者邮箱已存在')
    }
    

    else if (dataStatus === 4000) {
      removeToken()
      MessageBox('登录过期，请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          localStorage.clear()
         // window.location.href="http://my.hicling.com/#/home/signIn?returnUrl="+encodeURIComponent(window.location.href);
        }
      });
    } else if (dataStatus === 4001) {
      if (!isRefreshing) {
        isRefreshing = true
        let { request_token } = JSON.parse(getToken())
        return getRefreshToken({
          // userid: 
          request_token: request_token
        }).then(res => {
          if (res.status == 200) {
            const {
              access_token,
            } = res.data
            setToken(JSON.stringify({
              request_token,
              access_token
            }), 24, '/', '.hicling.com')
            config.headers['AccessToken'] = access_token
            // config.baseURL = ''
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach(cb => cb(access_token).then(res => {
              const {
                statusText,
                status,
                data
              } = res
              return {
                success: true,
                message: statusText,
                status,
                ...data,
              }
            }))
            requests = []
            return axios(config).then(res => {
              const {
                statusText,
                status,
                data
              } = res
              return {
                success: true,
                message: statusText,
                status,
                ...data,
              }
            })
          }
        }).catch(res => {
          console.error('request_token error =>', res)
        }).finally(() => {
          isRefreshing = false
        })
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((access_token) => {
            // config.baseURL = ''
            config.headers['Authorization'] = `Bearer ${access_token}`
            resolve(axios(config))
          })
        })
      }
    }
    return {
      success: true,
      message: statusText,
      status,
      ...data,
    }
  }).catch((error) => {
    console.log(error)
    const {
      response
    } = error
    let msg
    let status
    let otherData = {}
    if (response) {
      const {
        data,
        statusText,
        config
      } = response
      otherData = data
      status = response.status
      msg = data.message || statusText
      failed('系统开小差');
      return;
    } else {
      status = 600
      msg = 'Network Error'
    }
    return {
      success: false,
      status,
      message: msg,
      ...otherData
    }
  })
}
