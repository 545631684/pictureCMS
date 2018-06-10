// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLocalStorage from 'vue-localstorage'
import VideoPlayer from 'vue-video-player' 

require('video.js/dist/video-js.css') 
require('vue-video-player/src/custom-theme.css') 

Vue.use(VideoPlayer)
Vue.use(VueLocalStorage)
Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.URLS = 'http://192.168.0.108/'
// Vue.prototype.URLS = '/api'

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
