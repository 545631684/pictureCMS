import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import BackstageIndex from '@/components/backstageIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {// 首页
      path: '/',
      name: 'index',
      component: Index
    },
    {// 登陆
      path: '/login',
      name: 'login',
      component: Login
    },
    {// 后台首页
      path: '/backstage',
      name: 'backstage',
      component: BackstageIndex
    }
  ]
})
