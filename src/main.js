// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLocalStorage from 'vue-localstorage'
import VideoPlayer from 'vue-video-player' 
import VueLazyLoad from 'vue-lazyload'
import echarts from 'echarts'

require('video.js/dist/video-js.css') 
require('vue-video-player/src/custom-theme.css') 

Vue.use(VueLazyLoad,{
    error:'../static/loading.gif',
    loading:'../static/loading.gif',
    attempt: 1
})
Vue.use(VideoPlayer)
Vue.use(VueLocalStorage)
Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false
// Vue.prototype.URLS = ''
Vue.prototype.URLS = '/api'
Vue.prototype.URLS2 = 'http://192.168.0.130/'
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App
  },
  template: '<App/>'
})
