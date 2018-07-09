import Vue from 'vue'
import store from '@/store/index'
import Router from 'vue-router'
import Index from '@/components/webIndex'
import PIndex from '@/components/pIndex'
import VideoList from '@/components/videoList'
import PVideoList from '@/components/pVideoList'
import PsdList from '@/components/psdList'
import PPsdList from '@/components/pPsdList'
import ImgList from '@/components/imgList'
import PImgList from '@/components/pImgList'
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
    {// 项目首页
      path: '/project/:navPname/:id',
      name: 'project',
      component: PIndex
    },
    {// 图片集列表页
      path: '/listImgAll',
      name: 'listImg',
      component: ImgList
    },
    {// 图片集列表页(项目)
      path: '/listImg/:navPname/:id',
      name: 'listImg',
      component: PImgList
    },
    {// psd列表页
      path: '/listPsdAll',
      name: 'listPsd',
      component: PsdList
    },
    {// psd列表页(项目)
      path: '/listPsd/:navPname/:id',
      name: 'listPsd',
      component: PPsdList
    },
    {// 视频列表页
      path: '/listVideoAll/',
      name: 'listVideo',
      component: VideoList
    },
    {// 视频列表页
      path: '/listVideo/:navPname/:id',
      name: 'listVideo',
      component: PVideoList
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
