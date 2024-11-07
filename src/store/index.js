/*
 * @Author: your name
 * @Date: 2021-04-06 14:01:24
 * @LastEditTime: 2021-10-09 13:59:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my_hicling_vue\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    // 数据状态持久化
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        return {
          // 只储存state中的gps
          // order: state.order,
          user: {
            userid: state.user.userid
          }
        }
      },
    }),
  ],
})

export default store
