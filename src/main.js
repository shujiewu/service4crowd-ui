import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import vueWaves from './directive/waves'// 水波纹指令
import '@/permission' // permission control
import './icons' // icon
import * as filters from './filters' // global filters
import uploader from 'vue-simple-uploader'
// 手动引入 ECharts 各模块来减小打包体积
import myUpload from 'vue-image-crop-upload'
import ECharts from 'vue-echarts'

// 注册组件后即可使用
Vue.component('chart', ECharts)
Vue.component('my-upload', myUpload)
// require('echarts-stat')
Vue.use(uploader)
Vue.use(ElementUI, { locale })
Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(vueWaves)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app', // div id
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
