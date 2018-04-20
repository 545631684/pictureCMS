import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 设置变量  语法：this.$store.state
    user: {
      uId: '',
      userName: '',
      Password: '',
      nickname: '',
      state: '',
      HeadPortraitSrc: '',
      setPasswordStyle: false,
      types: [],
      projects: []
    }
  },
  getters: { // 计算数学函数
  },
  mutations: { // 修改函数，必须同步执行，不支持调用外部函数   语法：_this.$store.commit('函数名', 变量 || {名：值,.....})
    setUsername (state, user) { // 赋值
      state.user.uId = user.uId
      state.user.userName = user.userName
      state.user.Password = user.Password
      state.user.nickname = user.nickname
      state.user.state = user.state
      state.user.HeadPortraitSrc = user.HeadPortraitSrc
      state.user.setPasswordStyle = user.setPasswordStyle
      state.user.types = user.types
      state.user.projects = user.projects
    },
    cancellation (state) { // 注销
      state.user = {
        uId: '',
        userName: state.user.setPasswordStyle ? state.user.userName : '',
        Password: state.user.setPasswordStyle ? state.user.Password : '',
        nickname: '',
        state: '',
        HeadPortraitSrc: '',
        setPasswordStyle: state.user.setPasswordStyle,
        types: [],
        projects: []
      }
      // localStorage.clear()
    }
  },
  actions: { // 可以执行异步修改函数
    // 本地存储 用户对象 语法：_this.$store.dispatch('函数名', 变量 || {名：值,.....})
    setLocalStorage (user) {
      Vue.localStorage.set('saiqiuId', user.state.user.uId)
      Vue.localStorage.set('saiqiuserName', user.state.user.userName)
      Vue.localStorage.set('saiqiPassword', user.state.user.Password)
      Vue.localStorage.set('saiqinickname', user.state.user.nickname)
      Vue.localStorage.set('saiqistate', user.state.user.state)
      Vue.localStorage.set('saiqiHeadPortraitSrc', user.state.user.HeadPortraitSrc)
      Vue.localStorage.set('saiqisetPasswordStyle', user.state.user.setPasswordStyle)
      Vue.localStorage.set('saiqiseTtypes', JSON.stringify(user.state.user.types))
      Vue.localStorage.set('saiqiseProjects', JSON.stringify(user.state.user.projects))
      // console.log(user.state.user.types)
      // console.log(Vue.localStorage.get('saiqiuserName') + '存储成功')
    },
    getLocalStorage (store) { // 获取本地存储的用户对象
      // console.log(Vue.localStorage.get('saiqiuserName') + '获取本地存储变量:用户名称')
      store.state.user.uId = Vue.localStorage.get('saiqiuId')
      store.state.user.userName = Vue.localStorage.get('saiqiuserName')
      store.state.user.Password = Vue.localStorage.get('saiqiPassword')
      store.state.user.nickname = Vue.localStorage.get('saiqinickname')
      store.state.user.state = Vue.localStorage.get('saiqistate')
      store.state.user.HeadPortraitSrc = Vue.localStorage.get('saiqiHeadPortraitSrc')
      store.state.user.setPasswordStyle = Vue.localStorage.get('saiqisetPasswordStyle')
      store.state.user.types = Vue.localStorage.get('saiqiseTtypes')
      store.state.user.projects = Vue.localStorage.get('saiqiseProjects')
    }
  },
  modules: { // 模块化调用vuwx状态对象
  }
})
