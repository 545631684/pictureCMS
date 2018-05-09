import Vue from 'vue'
import store from '@/store/index'
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
      component: BackstageIndex,
      beforeEnter: (to, from, next) => {
        store.dispatch('getLocalStorage', store.state) // 获取本地存储全局用户状态
        if (store.state.user.userName !== '' || store.state.userName.length !== null) {
          if (store.state.user.state === '1') {
            next()
          } else {
            next('/login')
          }
        } else {
          next('/login')
        }
      }
    }
  ]
})
