// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'
// import md5 from 'js-md5'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// let base64 = require('js-base64').Base64
Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false
// Vue.prototype.URLS = ''
Vue.prototype.URLS = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
