import Vue from 'vue'
import store from '@/store/index'
import Router from 'vue-router'
import Index from '@/components/webIndex'
import VideoList from '@/components/videoList'
import PsdList from '@/components/psdList'
import ImgList from '@/components/imgList'
import Article from '@/components/article'
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
    {// 图片集列表页
      path: '/listImgAll',
      name: 'listImg',
      component: ImgList
    },
    {// psd列表页
      path: '/listPsdAll',
      name: 'listPsd',
      component: PsdList
    },
    {// 视频列表页
      path: '/listVideoAll/',
      name: 'listVideo',
      component: VideoList
    },
    {// 文章页
      path: '/article/:navPname/:nacType/:id',
      name: 'article',
      component: Article
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
