import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'swiper/css/swiper.min.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import echarts from 'echarts'
import * as filter from "./utils/filters.js" //全局过滤器
import instruct from './utils/directive.js'//全局指令
import Swiper from 'swiper';
import App from './App'
import store from './store'
import router from './router'
import {hasPermission} from "./utils/hasPermission";
import VueVideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VueVideoPlayer)

import './components'

//todo
import HeaderNav from "_c/Header/HeaderNav";
Vue.component(HeaderNav.name,HeaderNav)

import '@/icons' // icon
import '@/permission'


import api from "./api/index";
Vue.prototype.$api = api
window.xq = api
Vue.prototype.hasPerm = hasPermission
Vue.prototype.$echarts = echarts
Vue.prototype.Swiper = Swiper
//全局过滤器
Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})


Vue.use(instruct)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
