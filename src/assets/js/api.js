import Axios from 'axios'
import qs from 'qs'

// login.vue 接口  登陆验证
export function loginLand (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Login/login.html', qs.stringify({userName: _this.userName, Password: _this.password}))
    .then(function (response) {
      console.log(response.data.msg)
      if (response.data.msg === '0') {
        // 给全局变量赋值
        let user = {
          uId: response.data.uId,
          userName: response.data.userName,
          Password: response.data.Password,
          nickname: response.data.nickname,
          state: response.data.state,
          HeadPortraitSrc: response.data.HeadPortraitSrc,
          setPasswordStyle: _this.setPasswordStyle,
          types: response.data.types,
          projects: response.data.projects
        }
        _this.$store.commit('setUsername', user)
        _this.$store.dispatch('setLocalStorage', _this.$store.state.user) // 本地存储用户信息
        console.log(_this.$store.state.user)
        _this.$router.push('/backstage') // 跳转后台首页
      } else if (response.data.msg === '1') {
        _this.userNameTxt = '用户名或密码错误'
        _this.passwordTxt = '用户名或密码错误'
      } else if (response.data.msg === '2') {
        _this.userNameTxt = '该用户以被冻结'
      } else if (response.data.msg === '3') {
        _this.userNameTxt = '用户名不存在'
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// login.vue 接口  邮箱验证码
export function mailboxVerification (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Login/Send.html', qs.stringify({to: _this.userNameAdd}))
    .then(function (response) {
      var wait = 60
      _this.verificationServer = response.data.Verification
      if (_this.verificationServer.length !== 0) {
        _this.countdown(wait)
      } else {
        console.log('未知原因获取失败。。。')
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// login.vue 接口  注册
export function interfaceAddUser (_this) {
  Axios.post(_this.URLS + '/useradd', qs.stringify({userName: _this.userNameAdd, Password: _this.passwordAdd, Verification: _this.verification}))
    .then(function (response) {
      console.log(response.data)
      if (response.data.msg === '0') {
        _this.userNameTxt2 = '用户名或密码错误'
        _this.passwordTxt2 = '用户名或密码错误'
      } else if (response.data.msg === '2') {
        _this.verificationTxt = '验证码错误'
      } else if (response.data.msg === '3') {
        _this.userNameTxt2 = '已被注册'
      } else if (response.data.msg === '4') {
        alert('注册成功！')
        _this.tab('dl')
      } else if (response.data.msg === '5') {
        alert('注册失败，请重新注册！')
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// login.vue 接口  注销
export function cancellationUser (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Index/exitlogin', qs.stringify({uId: _this.$store.state.user.uId}))
    .then(function (response) {
      console.log(response.data)
      if (response.data !== undefined) {
        if (response.data.msg === '0') {
          _this.$store.commit('cancellation', _this.$store.state)
          _this.$store.dispatch('setLocalStorage', _this.$store.state.user)
          _this.$store.dispatch('getLocalStorage', _this.$store.state.user)
          console.log('0:' + _this.$store.state.user.userName)
          _this.$router.push('/') // 跳转后台首页
        } else {
          _this.$store.commit('cancellation', _this.$store.state)
          _this.$store.dispatch('setLocalStorage', _this.$store.state.user)
          _this.$store.dispatch('getLocalStorage', _this.$store.state.user)
          console.log('1:' + _this.$store.state.user.userName)
          _this.$router.push('/') // 跳转后台首页
        }
      } else {
        _this.$store.commit('cancellation', _this.$store.state)
        _this.$store.dispatch('setLocalStorage', _this.$store.state.user)
        _this.$store.dispatch('getLocalStorage', _this.$store.state.user)
        console.log('null:' + _this.$store.state.user.userName)
        _this.$router.push('/') // 跳转后台首页
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUploadImg.vue 接口 删除上传临时文件
export function deleteTemporaryFile (_this, imgSrc) {
  Axios.post(_this.URLS + '/index.php/Home/Index/delfile', qs.stringify({filesrc: imgSrc}))
    .then(function (response) {
      console.log(response.data)
      if (response.data.msg === '0') {
        console.log('删除成功')
      } else if (response.data.msg === '1') {
        console.log('删除失败')
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUploadImg.vue 接口 用户上传发布图片信息
export function addImgsFile (_this, tid, pid) {
  Axios.post(_this.URLS + '/index.php/Home/Index/exhibitionAdd', qs.stringify({uId: _this.$store.state.user.uId, title: _this.title, imgsrc: _this.imgCrsString, tid: tid, pid: pid}))
    .then(function (response) {
      console.log(response.data)
      if (response.data.msg === '0') {
        _this.$message({
          message: '恭喜你，发布成功',
          type: 'success'
        })
        _this.title = ''
        _this.$refs.fliesImg.clearFiles() // 清除上传的文件 图片
        _this.$refs.fliesPsd.clearFiles() // 清除上传的文件 PSD文件
        _this.$refs.fliesVideo.clearFiles() // 清除上传的文件 视频
        _this.typeImg = ''
        _this.projectImg = ''
        _this.$emit('navSwitch', 'seeImg')
      } else if (response.data.msg === '1') {
        _this.message.error('发布失败')
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
