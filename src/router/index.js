import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {// 首页
      path: '/',
      name: 'Index',
      component: Index
    },
    {// 登陆
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
