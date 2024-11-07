/*
 * @Author: yihaosun 1015095073@qq.com
 * @Date: 2021-01-15 12:54:54
 * @LastEditors: yihaosun 1015095073@qq.com
 * @LastEditTime: 2023-01-18 15:12:43
 * @FilePath: \hicling_vue\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/style/index.scss'

//引入swiper
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'


// 地图组件
import VueAMap from 'vue-amap'

import animated from 'animate.css' // npm install animate.css --save安装，在引入
// import '@/permission'

Vue.use(animated)



Vue.use(ElementUI);


Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '899e960e3d93e1f07383d12b7f66b1fc',
  plugin: [
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图工具条
    'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor', // 编辑 折线、多边形
    'AMap.CircleEditor', // 圆形编辑器插件
    'MarkerClusterer', // 点聚合
    'AMap.Geolocation', // 定位控件，用来获取和展示用户主机所在的经纬度位置,
    'AMap.DistrictSearch',
    'AMap.CitySearch',
    'AMap.MarkerClusterer',
    'Geocoder'

  ],
  v: '1.4.15', // 默认高德 sdk 版本为 1.4.4
  uiVersion: '1.0.11'
})
// 解决高德地图刷新显示不出来
const amapKeys = Object.keys(localStorage).filter(key => key.match(/^_AMap_/))
amapKeys.forEach(key => { localStorage.removeItem(key) })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
