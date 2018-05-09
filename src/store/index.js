import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 设置变量  语法：this.$store.state
    user: {
      uId: '',
      permissions: '',
      userName: '',
      Password: '',
      nickname: '',
      sex: '',
      registerTime: '',
      endTime: '',
      state: '',
      HeadPortraitSrc: '',
      setPasswordStyle: false,
      types: [],
      projects: []
    },
    mId: ''
  },
  getters: { // 计算数学函数
  },
  mutations: { // 修改函数，必须同步执行，不支持调用外部函数   语法：_this.$store.commit('函数名', 变量 || {名：值,.....})
    setUsername (state, user) { // 赋值
      state.user.uId = user.uId
      state.user.permissions = user.permissions
      state.user.userName = user.userName
      state.user.Password = user.Password
      state.user.nickname = user.nickname
      state.user.sex = user.sex
      state.user.registerTime = user.registerTime
      state.user.endTime = user.endTime
      state.user.state = user.state
      state.user.HeadPortraitSrc = user.HeadPortraitSrc
      state.user.setPasswordStyle = user.setPasswordStyle
      state.user.types = user.types
      state.user.projects = user.projects
      state.mId = user.mId
    },
    setUserInfo (state, user) { // 修改个人信息赋值
      state.user.nickname = user.nickname
      state.user.sex = user.sex
      state.user.HeadPortraitSrc = user.HeadPortraitSrc
    },
    setUserMid (state, mid) { // 修改用户当前查看文章id
      state.mId = mid
    },
    cancellation (state) { // 注销
      state.user = {
        uId: '',
        permissions: '',
        userName: state.user.setPasswordStyle ? state.user.userName : '',
        Password: state.user.setPasswordStyle ? state.user.Password : '',
        nickname: '',
        sex: '',
        registerTime: '',
        endTime: '',
        state: '',
        HeadPortraitSrc: '',
        setPasswordStyle: state.user.setPasswordStyle,
        types: [],
        projects: []
      }
      state.mId = ''
      // localStorage.clear()
    }
  },
  actions: { // 可以执行异步修改函数
    // 本地存储 用户对象 语法：_this.$store.dispatch('函数名', 变量 || {名：值,.....})
    setLocalStorage (user) {
      Vue.localStorage.set('saiqiuId', user.state.user.uId)
      Vue.localStorage.set('saiqipermissions', user.state.user.permissions)
      Vue.localStorage.set('saiqiuserName', user.state.user.userName)
      Vue.localStorage.set('saiqiPassword', user.state.user.Password)
      Vue.localStorage.set('saiqinickname', user.state.user.nickname)
      Vue.localStorage.set('saiqisex', user.state.user.sex)
      Vue.localStorage.set('saiqiregisterTime', user.state.user.registerTime)
      Vue.localStorage.set('saiqiendTime', user.state.user.endTime)
      Vue.localStorage.set('saiqistate', user.state.user.state)
      Vue.localStorage.set('saiqiHeadPortraitSrc', user.state.user.HeadPortraitSrc)
      Vue.localStorage.set('saiqisetPasswordStyle', user.state.user.setPasswordStyle)
      Vue.localStorage.set('saiqiseTtypes', JSON.stringify(user.state.user.types))
      Vue.localStorage.set('saiqiseProjects', JSON.stringify(user.state.user.projects))
      Vue.localStorage.set('saiqisemId', user.state.mId)
      // console.log(user.state.user.types)
      // console.log(Vue.localStorage.get('saiqiuserName') + '存储成功')
    },
    getLocalStorage (store) { // 获取本地存储的用户对象
      // console.log(Vue.localStorage.get('saiqiuserName') + '获取本地存储变量:用户名称')
      store.state.user.uId = Vue.localStorage.get('saiqiuId')
      store.state.user.permissions = Vue.localStorage.get('saiqipermissions')
      store.state.user.userName = Vue.localStorage.get('saiqiuserName')
      store.state.user.Password = Vue.localStorage.get('saiqiPassword')
      store.state.user.nickname = Vue.localStorage.get('saiqinickname')
      store.state.user.sex = Vue.localStorage.get('saiqisex')
      store.state.user.registerTime = Vue.localStorage.get('saiqiregisterTime')
      store.state.user.endTime = Vue.localStorage.get('saiqiendTime')
      store.state.user.state = Vue.localStorage.get('saiqistate')
      store.state.user.HeadPortraitSrc = Vue.localStorage.get('saiqiHeadPortraitSrc')
      store.state.user.setPasswordStyle = Vue.localStorage.get('saiqisetPasswordStyle')
      store.state.user.types = JSON.parse(Vue.localStorage.get('saiqiseTtypes'))
      store.state.user.projects = JSON.parse(Vue.localStorage.get('saiqiseProjects'))
      store.state.mId = Vue.localStorage.get('saiqisemId')
    }
  },
  modules: { // 模块化调用vuwx状态对象
  }
})
