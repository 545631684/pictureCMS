import Vue from 'vue'
import Vuex from 'vuex'
import localstorage from 'vue-localstorage'

Vue.use(Vuex)
Vue.use(localstorage)

export default new Vuex.Store({
  state: { // 设置变量  语法：this.$store.state
    user: {
      uId: '',
      userName: '',
      Password: '',
      nickname: '',
      state: '',
      HeadPortraitSrc: '',
      setPasswordStyle: false
    }
  },
  getters: { // 计算数学函数
  },
  mutations: { // 修改函数，必须同步执行，不支持调用外部函数   语法：_this.$store.commit('函数名', 变量 || {名：值,.....})
    setUsername (state, users) { // 赋值
      state.user = users
    },
    Cancellation (state, users) { // 注销
      state.user = users
      // localStorage.clear()
    }
  },
  actions: { // 可以执行异步修改函数
    // 本地存储 用户对象 语法：_this.$store.dispatch('函数名', 变量 || {名：值,.....})
    setLocalStorage (user) {
      window.localStorage.setItem('saiqiuId', user.uId)
      window.localStorage.setItem('saiqiuserName', user.userName)
      window.localStorage.setItem('saiqiPassword', user.Password)
      window.localStorage.setItem('saiqinickname', user.nickname)
      window.localStorage.setItem('saiqistate', user.state)
      window.localStorage.setItem('saiqiHeadPortraitSrc', user.HeadPortraitSrc)
      window.localStorage.setItem('saiqisetPasswordStyle', user.setPasswordStyle)
      console.log(window.localStorage + '存储成功')
    },
    getLocalStorage (user) { // 获取本地存储的用户对象
      console.log(localStorage.saiqisetPasswordStyle)
      user.uId = localStorage.saiqiuId
      user.userName = localStorage.saiqiuserName
      user.Password = localStorage.saiqiPassword
      user.nickname = localStorage.saiqinickname
      user.state = localStorage.saiqistate
      user.HeadPortraitSrc = localStorage.saiqiHeadPortraitSrc
      user.setPasswordStyle = localStorage.saiqisetPasswordStyle
    }
  },
  modules: { // 模块化调用vuwx状态对象
  }
})
