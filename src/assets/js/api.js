import Axios from 'axios'
import qs from 'qs'

// login.vue 接口  登陆验证
export function loginLand (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Login/login.html', qs.stringify({userName: _this.userName, Password: _this.password}))
    .then(function (response) {
      if (response.data.msg === '0') {
        // console.log(response.data)
        // 给全局变量赋值
        let user = {
          uId: response.data.uId,
          permissions: response.data.permissions,
          userName: response.data.userName,
          Password: response.data.Password,
          nickname: response.data.nickname,
          sex: response.data.sex,
          registerTime: response.data.registerTime,
          endTime: response.data.endTime,
          state: response.data.state,
          HeadPortraitSrc: response.data.HeadPortraitSrc,
          setPasswordStyle: _this.setPasswordStyle,
          types: response.data.types,
          projects: response.data.projects,
          minType: response.data.details,
          mId: _this.$store.state.mId
        }
        _this.$store.commit('setUsername', user)
        _this.$store.dispatch('setLocalStorage', _this.$store.state.user) // 本地存储用户信息
        // console.log(_this.$store.state.user.permissions)
        // console.log(response.data.types)
        _this.$router.push('/backstage') // 跳转后台首页
      } else if (response.data.msg === '1') {
        _this.userNameTxt = '用户名或密码错误'
        _this.passwordTxt = '用户名或密码错误'
      } else if (response.data.msg === '2') {
        _this.userNameTxt = '该用户已被冻结'
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
      _this.$message({
        message: '发送成功',
        type: 'success'
      })
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

// login.vue 接口  邮箱验证码
export function mailboxVerification2 (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Login/emailrepeat', qs.stringify({userName: _this.userNameAdd}))
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.userNameTxt2 = '账号已被注册'
      } else if (response.data.msg === '1') {
        _this.userNameTxt2 = ''
        Axios.post(_this.URLS + '/index.php/Home/Login/Send.html', qs.stringify({to: _this.userNameAdd}))
          .then(function (response) {
            _this.$message({
              message: '发送成功',
              type: 'success'
            })
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
    })
    .catch(function (error) {
      console.log(error)
    })
}

// login.vue 接口  注册
export function interfaceAddUser (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Index/user_add', qs.stringify({userName: _this.userNameAdd, Password: _this.passwordAdd, Verification: _this.verification}))
    .then(function (response) {
      // console.log(response.data)
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

// backstageAddUser.vue 接口  注册
export function guanliAddUser (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Index/guanliadduser', qs.stringify({userName: _this.userNameAdd, Password: _this.passwordAdd}))
    .then(function (response) {
      // console.log(response.data)
      if (response.data.msg === '0') {
        _this.$alert('用户名或密码不能为空', '提示', {confirmButtonText: '确定'})
      } else if (response.data.msg === '1') {
        _this.$alert('有此用户已存在，请重注册', '提示', {confirmButtonText: '确定'})
      } else if (response.data.msg === '2') {
        _this.$alert('注册成功', '提示', {confirmButtonText: '确定'})
        _this.userNameTxt2 = '注册成功'
        _this.navSwitch('userList')
      } else if (response.data.msg === '3') {
        _this.$alert('注册失败', '提示', {confirmButtonText: '确定'})
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// login.vue 接口  查询账号是否已注册
export function judgeName (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Login/emailrepeat', qs.stringify({userName: _this.userNameAdd}))
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.userNameTxt2 = '账号已被注册'
      } else if (response.data.msg === '1') {
        _this.userNameTxt2 = ''
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
      // console.log(response.data)
      if (response.data !== undefined) {
        if (response.data.msg === '0') {
          _this.$store.commit('cancellation', _this.$store.state)
          _this.$store.dispatch('setLocalStorage', _this.$store.state.user)
          _this.$store.dispatch('getLocalStorage', _this.$store.state.user)
          console.log('0:' + _this.$store.state.user)
          _this.$router.push('/') // 跳转后台首页
        } else {
          _this.$store.commit('cancellation', _this.$store.state)
          _this.$store.dispatch('setLocalStorage', _this.$store.state.user)
          _this.$store.dispatch('getLocalStorage', _this.$store.state.user)
          console.log('1:' + _this.$store.state.user)
          _this.$router.push('/') // 跳转后台首页
        }
      } else {
        _this.$store.commit('cancellation', _this.$store.state)
        _this.$store.dispatch('setLocalStorage', _this.$store.state.user)
        _this.$store.dispatch('getLocalStorage', _this.$store.state.user)
        console.log('null:' + _this.$store.state.user)
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
      // console.log(response.data)
      if (response.data.msg === '0') {
        _this.$message({
          message: '删除成功',
          type: 'success'
        })
      } else if (response.data.msg === '1') {
        _this.$message({
          message: '删除失败',
          type: 'warning'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUploadImg.vue 接口 删除上传临时文件2
export function deleteTemporaryFile2 (_this, imgSrc, type) {
  console.log(imgSrc.length)
  if (imgSrc !== undefined) {
    if (imgSrc.length > 1) {
      for (let i = 0; i < imgSrc.length; i++) {
        Axios.post(_this.URLS + '/index.php/Home/Index/delfile', qs.stringify({filesrc: imgSrc[i]}))
        .then(function (response) {
          // console.log(response.data)
          if (response.data.msg === '0') {
            if (type === 'psd') {
              // _this.article.psd.psdFile = ''
            } else if (type === 'video') {
              // _this.article.video.videoImg = ''
              // _this.article.video.videoFile = ''
            }
            _this.release = true
          } else if (response.data.msg === '1') {
            /* _this.$message({
              message: i === 0 ? '缩略图删除失败' : '文件删除失败',
              type: 'warning'
            }) */
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
      _this.uploadFiles = []
    } else if (imgSrc.length === 1) {
      Axios.post(_this.URLS + '/index.php/Home/Index/delfile', qs.stringify({filesrc: imgSrc[0]}))
      .then(function (response) {
        // console.log(response.data)
        if (response.data.msg === '0') {
          /* _this.$message({
            message: '图片删除成功',
            type: 'success'
          })*/
        } else if (response.data.msg === '1') {
          /* _this.$message({
            message: '图片删除失败',
            type: 'warning'
          }) */
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      _this.uploadFiles = []
    }
  }
}

// backstageUploadImg.vue 接口 用户上传发布图片信息
export function addImgsFile (_this, tid, pid, psdsrc, videosrc, describe, did) {
  console.log('uId:' + _this.$store.state.user.uId + ', title:' + _this.title + ', imgsrc:' + _this.imgCrss + ', psdsrc:' + psdsrc + ', videosrc:' + videosrc + ', tid:' + tid + ', pid:' + pid)
  _this.imgCrss = _this.imgCrss.length === 0 ? '' : _this.imgCrss
  Axios.post(_this.URLS + '/index.php/Home/Index/exhibitionAdd', qs.stringify({uId: _this.$store.state.user.uId, title: _this.title, imgsrc: _this.imgCrss, psdsrc: psdsrc, videosrc: videosrc, tid: tid, pid: pid, did: did, describe: describe, zipfiles:  _this.imgCrsString}))
    .then(function (response) {
      // console.log(response.data)
      if (response.data.msg === '0') {
        _this.$message({
          message: '恭喜你，发布成功',
          type: 'success'
        })
        _this.title = ''
        _this.$refs.fliesImg.clearFiles() // 清除上传的文件 图片
        _this.$refs.videoFile.clearFiles() // 清除上传的文件 视频文件
        _this.$refs.psdFile.clearFiles() // 清除上传的文件 PSD文件
        _this.psdImageUrlls = ''
        _this.videoImageUrlls = ''
        _this.typeImg = ''
        _this.describe = ''
        _this.projectImg = ''
        _this.titleDiv = false
        _this.titleCf = false
        _this.loading = false
        _this.release = true
        if (_this.$store.state.user.permissions === '1') {
          _this.navSwitch('seeImg')
        } else if (_this.$store.state.user.permissions === '2') {
          _this.navSwitch('seeImg2')
        }
      } else if (response.data.msg === '1') {
        _this.$message({
          message: '发布失败',
          type: 'warning'
        })
        _this.title = ''
        _this.$refs.fliesImg.clearFiles() // 清除上传的文件 图片
        _this.$refs.videoFile.clearFiles() // 清除上传的文件 视频文件
        _this.$refs.psdFile.clearFiles() // 清除上传的文件 PSD文件
        _this.psdImageUrlls = ''
        _this.videoImageUrlls = ''
        _this.typeImg = ''
        _this.describe = ''
        _this.projectImg = ''
        _this.titleDiv = false
        _this.titleCf = false
        _this.loading = false
        _this.release = true
        if (_this.$store.state.user.permissions === '1') {
          _this.navSwitch('seeImg')
        } else if (_this.$store.state.user.permissions === '2') {
          _this.navSwitch('seeImg2')
        }
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUploadImg.vue 接口 用户上传发布图片信息
export function addImgsFile3 (_this, tid, pid, psdsrc, videosrc, describe, did) {
  console.log('uId:' + _this.$store.state.user.uId + ', title:' + _this.title + ', imgsrc:' + _this.imgCrss + ', psdsrc:' + psdsrc + ', videosrc:' + videosrc + ', tid:' + tid + ', pid:' + pid)
  _this.imgCrss = _this.imgCrss.length === 0 ? '' : _this.imgCrss
  Axios.post(_this.URLS + '/index.php/Home/Index/exhibitionAdd', qs.stringify({uId: _this.$store.state.user.uId, title: _this.title, imgsrc: _this.imgCrss, psdsrc: psdsrc, videosrc: videosrc, tid: tid, pid: pid, did: did, describe: describe}))
    .then(function (response) {
      // console.log(response.data)
      if (response.data.msg === '0') {
        _this.$message({
          message: '恭喜你，发布成功',
          type: 'success'
        })
        _this.title = ''
        _this.$refs.fliesImg.clearFiles() // 清除上传的文件 图片
        _this.psdImageUrlls = ''
        _this.videoImageUrlls = ''
        _this.typeImg = ''
        _this.describe = ''
        _this.projectImg = ''
        _this.titleDiv = false
        _this.titleCf = false
        _this.release = true
        _this.loading = false
        _this.navSwitch('seeImg')
      } else if (response.data.msg === '1') {
        _this.$message({
          message: '发布失败',
          type: 'warning'
        })
        _this.title = ''
        _this.$refs.fliesImg.clearFiles() // 清除上传的文件 图片
        _this.psdImageUrlls = ''
        _this.videoImageUrlls = ''
        _this.typeImg = ''
        _this.describe = ''
        _this.projectImg = ''
        _this.titleDiv = false
        _this.titleCf = false
        _this.release = true
        _this.loading = false
        _this.navSwitch('seeImg')
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUploadImg.vue 接口 用户上传发布图片信息
export function addImgsFile2 (_this) {
  console.log('uId:' + _this.article.uId + ', title:' + _this.article.title + ', imgsrc:' + _this.article.img + ', psdsrc:' + _this.article.psd + ', videosrc:' + _this.article.video + ', tid:' + _this.article.tid + ', pid:' + _this.article.pid + ',需要删除的文件：' + _this.deleteFiles + ',mId:' + _this.article.mId)
  deleteTemporaryFile2(_this, _this.deleteFiles, 'all')
  _this.article.img = _this.article.img.length === 0 ? '' : _this.article.img
  Axios.post(_this.URLS + '/index.php/Home/Index/exhibitionedit', qs.stringify({uId: _this.article.uId, title: _this.article.title, imgsrc: _this.article.img, psdsrc: _this.article.psd, videosrc: _this.article.video, tid: _this.article.tid, pid: _this.article.pid, describe: _this.article.describe, mId: _this.article.mId, did: _this.article.did}))
    .then(function (response) {
      // console.log(response.data)
      if (response.data.msg === '0') {
        _this.$message({
          message: '修改成功',
          type: 'success'
        })
        _this.article = []
        _this.loading = false
      } else if (response.data.msg === '1') {
        _this.$message({
          message: '修改失败',
          type: 'warning'
        })
        _this.article = []
        _this.loading = false
      }
      if (_this.$store.state.user.permissions === '1') {
        _this.navSwitch('seeImg')
      } else if (_this.$store.state.user.permissions === '2') {
        _this.navSwitch('seeImg2')
      }
      _this.release = true
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUploadImg.vue 接口 标题判断是否重复
export function queryTitle (title, _this) {
  Axios.post(_this.URLS + '/index.php/Home/Index/titlerepeat', qs.stringify({title: title}))
    .then(function (response) {
      // console.log(response.data)
      if (response.data.msg === '0') {
        // 有重复的
        _this.titleDiv = true
        _this.titleCf = false
      } else if (response.data.msg === '1') {
        // 没有重复的
        _this.titleDiv = true
        _this.titleCf = true
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUploadImg.vue 接口 标题判断是否重复
export function queryTitle2 (title, mid, _this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/titlerepeats?title=' + title + '&mId=' + mid)
    .then(function (response) {
      // console.log(response.data)
      if (response.data.msg === '0') {
        // 没有重复的
        _this.titleDiv = true
        _this.titleCf = true
      } else if (response.data.msg === '1') {
        // 有重复的
        _this.titleDiv = true
        _this.titleCf = false
      } else if (response.data.msg === '2') {
        // 没有重复的
        _this.titleDiv = true
        _this.titleCf = true
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUploadImg.vue 接口 标题判断是否重复
export function reductionInterface (_this, mid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionreduction?mId=' + mid)
    .then(function (response) {
      // console.log(response.data)
      if (response.data.msg === '0') {
        _this.$message({
          message: '还原成功',
          type: 'success'
        })
        recoveryArticleAll(_this)
      } else if (response.data.msg === '1') {
        _this.$message({
          message: '还原失败',
          type: 'warning'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUserInfoModify.vue 接口 修改用户信息
export function modifyUserInfo (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Index/editUser', qs.stringify({uId: _this.$store.state.user.uId, HeadPortraitSrc: _this.user.HeadPortraitSrc, nickname: _this.user.nickname, sex: _this.user.sex}))
    .then(function (response) {
      // console.log(response.data)
      if (response.data.msg === '0') {
        // 给全局变量赋值
        let user = {
          nickname: response.data.nickname,
          sex: response.data.sex,
          HeadPortraitSrc: response.data.HeadPortraitSrc
        }
        _this.$store.commit('setUserInfo', user)
        _this.$store.dispatch('setLocalStorage', _this.$store.state.user) // 本地存储用户信息
        // console.log(_this.$store.state.user.permissions + '修改用户信息')
        _this.$message({
          message: '修改成功',
          type: 'success'
        })
        _this.info = true
        _this.infoModify = false
      } else if (response.data.msg === '1') {
        _this.$message({
          message: '修改失败',
          type: 'warning'
        })
        _this.info = true
        _this.infoModify = false
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageSeeImg.vue 接口 查询当前用户的所有文章信息
export function currentUserArticleAll (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibition?uId=' + _this.$store.state.user.uId)
    .then(function (response) {
      _this.loading = true
      console.log(response.data)
      let srcs = []
      if (response.data.msg === '1') {
        _this.article = []
        _this.loading = false
        _this.prompt = '没有查到相关数据'
      } else if (response.data.list.length !== 0) {
        _this.article = response.data.list
        for (let i = 0; i < _this.article.length; i++) {
          _this.article[i].img = JSON.parse(_this.article[i].img)
          _this.article[i].psd = JSON.parse(_this.article[i].psd)
          _this.article[i].video = JSON.parse(_this.article[i].video)
          if (_this.article[i].video.videoImg.url !== '') {
            srcs[0] = _this.article[i].video.videoImg.url
          }
          // _this.article[i].video.videoImg.url.length !== 0 ? srcs[0] = _this.article[i].video.videoImg.url : console.log()
          if (srcs.length === 0) {
            if (_this.article[i].img.length !== 0) {
              for (let j = 0; j < _this.article[i].img.length; j++) {
                if (j <= 3) {
                  srcs[srcs.length] = _this.article[i].img[j].url
                }
              }
            }
          } else if (srcs.length === 1) {
            for (let a = 0; a < _this.article[i].img.length; a++) {
              if (a <= 2) {
                srcs[srcs.length] = _this.article[i].img[a].url
              }
            }
          } else if (srcs.length === 2) {
            for (let b = 0; b < _this.article[i].img.length; b++) {
              if (b <= 1) {
                srcs[srcs.length] = _this.article[i].img[b].url
              }
            }
          }
          _this.article[i].srcs = srcs
          srcs = []
        }
        _this.loading = false
      }
      // console.log(_this.article)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageAdministrationSeeImg.vue 接口 查询所有用户的文章信息
export function administrationArticleAll (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionguanli?permissions=' + _this.$store.state.user.permissions)
    .then(function (response) {
      _this.loading = true
      console.log(response.data)
      let srcs = []
      if (response.data.msg === '1') {
        _this.article = []
        _this.loading = false
        _this.prompt = '没有查到相关数据'
      } else if (response.data.list.length !== 0) {
        _this.article = response.data.list
        for (let i = 0; i < _this.article.length; i++) {
          _this.article[i].img = JSON.parse(_this.article[i].img)
          _this.article[i].psd = JSON.parse(_this.article[i].psd)
          _this.article[i].video = JSON.parse(_this.article[i].video)
          if (_this.article[i].video.videoImg.url !== '') {
            srcs[0] = _this.article[i].video.videoImg.url
          }
          // _this.article[i].video.videoImg.url.length !== 0 ? srcs[0] = _this.article[i].video.videoImg.url : console.log()
          if (srcs.length === 0) {
            if (_this.article[i].img.length !== 0) {
              for (let j = 0; j < _this.article[i].img.length; j++) {
                if (j <= 3) {
                  srcs[srcs.length] = _this.article[i].img[j].url
                }
              }
            }
          } else if (srcs.length === 1) {
            for (let a = 0; a < _this.article[i].img.length; a++) {
              if (a <= 2) {
                srcs[srcs.length] = _this.article[i].img[a].url
              }
            }
          } else if (srcs.length === 2) {
            for (let b = 0; b < _this.article[i].img.length; b++) {
              if (b <= 1) {
                srcs[srcs.length] = _this.article[i].img[b].url
              }
            }
          }
          _this.article[i].srcs = srcs
          srcs = []
        }
        _this.loading = false
      }
      // console.log(_this.article)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageRecoverySeeImg.vue 接口 查询所有用户的文章信息
export function recoveryArticleAll (_this) {
  let uid = _this.$store.state.user.permissions === '1' ? _this.$store.state.user.uId : ''
  let pid = _this.projectImg.length === 0 ? '' : _this.projectImg
  let tid = _this.typeImg.length === 0 ? '' : _this.typeImg
  let did = _this.minTypeImg.length === 0 ? '' : _this.minTypeImg
  if (_this.$store.state.user.permissions === '2') {
    for (let j = 0; j < _this.userList.length; j++) {
      if (_this.userList[j].nickname === _this.userName) {
        uid = _this.userList[j].uId
      }
    }
  }
  if (pid !== '') {
    for (let j = 0; j < _this.projects.length; j++) {
      if (_this.projects[j].xname === pid) {
        pid = _this.projects[j].pid
      }
    }
  }
  if (tid !== '') {
    for (let j = 0; j < _this.types.length; j++) {
      if (_this.types[j].lname === tid) {
        tid = _this.types[j].tid
      }
    }
  }
  if (did !== '') {
    for (let j = 0; j < _this.minTypes.length; j++) {
      if (_this.minTypes[j].dname === did) {
        did = _this.minTypes[j].did
      }
    }
  }
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionrecovery?permissions=' + _this.$store.state.user.permissions + '&uId=' + uid + '&title=' + _this.searchTXT + '&pid=' + pid + '&tid=' + tid + '&did=' + did)
    .then(function (response) {
      _this.loading = true
      // console.log(response.data)
      let srcs = []
      if (response.data.msg === '1') {
        _this.article = []
        _this.loading = false
        _this.prompt = '没有查到相关数据'
      } else if (response.data.length !== 0) {
        _this.article = response.data
        for (let i = 0; i < _this.article.length; i++) {
          _this.article[i].img = JSON.parse(_this.article[i].img)
          _this.article[i].psd = JSON.parse(_this.article[i].psd)
          _this.article[i].video = JSON.parse(_this.article[i].video)
          _this.article[i].video.videoImg.url.length !== 0 ? srcs[0] = _this.article[i].video.videoImg.url : console.log()
          if (srcs.length === 0) {
            if (_this.article[i].img.length !== 0) {
              for (let j = 0; j < _this.article[i].img.length; j++) {
                if (j <= 3) {
                  srcs[srcs.length] = _this.article[i].img[j].url
                }
              }
            }
          } else if (srcs.length === 1) {
            for (let a = 0; a < _this.article[i].img.length; a++) {
              if (a <= 2) {
                srcs[srcs.length] = _this.article[i].img[a].url
              }
            }
          } else if (srcs.length === 2) {
            for (let b = 0; b < _this.article[i].img.length; b++) {
              if (b <= 1) {
                srcs[srcs.length] = _this.article[i].img[b].url
              }
            }
          }
          _this.article[i].srcs = srcs
          srcs = []
        }
        _this.loading = false
      }
      console.log(_this.article)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageSeeImg.vue 接口 条件查询文章
export function userArticleQuery (_this) {
  let title = _this.searchTXT.length === 0 ? '' : _this.searchTXT
  let pid = _this.projectImg.length === 0 ? '' : _this.projectImg
  let tid = _this.typeImg.length === 0 ? '' : _this.typeImg
  let did = _this.minTypeImg.length === 0 ? '' : _this.minTypeImg
  if (pid !== '') {
    for (let j = 0; j < _this.projects.length; j++) {
      if (_this.projects[j].xname === pid) {
        pid = _this.projects[j].pid
      }
    }
  }
  if (tid !== '') {
    for (let j = 0; j < _this.types.length; j++) {
      if (_this.types[j].lname === tid) {
        tid = _this.types[j].tid
      }
    }
  }
  if (did !== '') {
    for (let j = 0; j < _this.minTypes.length; j++) {
      if (_this.minTypes[j].dname === did) {
        did = _this.minTypes[j].did
      }
    }
  }
  // console.log('/index.php/Home/Index/exhibition?title=' + title + '&pid=' + pid + '&tid=' + tid + '&uId=' + _this.$store.state.user.uId)
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibition?title=' + title + '&pid=' + pid + '&tid=' + tid + '&uId=' + _this.$store.state.user.uId + '&did=' + did)
    .then(function (response) {
      // console.log(response.data)
      let srcs = []
      if (response.data.msg === '1') {
        _this.article = []
        _this.prompt = '没有查到相关数据'
      } else if (response.data.list.length !== 0) {
        _this.prompt = ''
        _this.article = response.data.list
        for (let i = 0; i < _this.article.length; i++) {
          _this.article[i].img = JSON.parse(_this.article[i].img)
          _this.article[i].psd = JSON.parse(_this.article[i].psd)
          _this.article[i].video = JSON.parse(_this.article[i].video)
          _this.article[i].video.videoImg.url.length !== 0 ? srcs[0] = _this.article[i].video.videoImg.url : console.log()
          if (srcs.length === 0) {
            for (let j = 0; j < _this.article[i].img.length; j++) {
              if (j <= 3) {
                srcs[j] = _this.article[i].img[j].url
              }
            }
          } else if (srcs.length === 1) {
            for (let a = 0; a < _this.article[i].img.length; a++) {
              if (a <= 2) {
                srcs[srcs.length] = _this.article[i].img[a].url
              }
            }
          } else if (srcs.length === 2) {
            for (let b = 0; b < _this.article[i].img.length; b++) {
              if (b <= 1) {
                srcs[srcs.length] = _this.article[i].img[b].url
              }
            }
          }
          _this.article[i].srcs = srcs
          srcs = []
        }
      }
      // console.log(_this.article)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageAdministrationSeeImg.vue 接口 管理条件查询文章
export function administrationArticleQuery (_this) {
  let title = _this.searchTXT.length === 0 ? '' : _this.searchTXT
  let pid = _this.projectImg.length === 0 ? '' : _this.projectImg
  let tid = _this.typeImg.length === 0 ? '' : _this.typeImg
  let uid = _this.userName.length === 0 ? '' : _this.userName
  let did = _this.minTypeImg.length === 0 ? '' : _this.minTypeImg
  if (pid !== '') {
    for (let j = 0; j < _this.projects.length; j++) {
      if (_this.projects[j].xname === pid) {
        pid = _this.projects[j].pid
      }
    }
  }
  if (tid !== '') {
    for (let i = 0; i < _this.types.length; i++) {
      if (_this.types[i].lname === tid) {
        tid = _this.types[i].tid
      }
    }
  }
  if (uid !== '') {
    for (let e = 0; e < _this.userList.length; e++) {
      if (_this.userList[e].nickname === uid) {
        uid = _this.userList[e].uId
      }
    }
  }
  if (did !== '') {
    for (let j = 0; j < _this.minTypes.length; j++) {
      if (_this.minTypes[j].dname === did) {
        did = _this.minTypes[j].did
      }
    }
  }
  // console.log('/index.php/Home/Index/exhibitionguanli?title=' + title + '&pid=' + pid + '&tid=' + tid + '&uId=' + uid)
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionguanli?title=' + title + '&pid=' + pid + '&tid=' + tid + '&uId=' + uid + '&did=' + did)
    .then(function (response) {
      console.log(response.data)
      let srcs = []
      if (response.data.msg === '1') {
        _this.article = []
        _this.prompt = '没有查到相关数据'
      } else if (response.data.list.length !== 0) {
        _this.prompt = ''
        _this.article = response.data.list
        for (let i = 0; i < _this.article.length; i++) {
          _this.article[i].img = JSON.parse(_this.article[i].img)
          _this.article[i].psd = JSON.parse(_this.article[i].psd)
          _this.article[i].video = JSON.parse(_this.article[i].video)
          _this.article[i].video.videoImg.url.length !== 0 ? srcs[0] = _this.article[i].video.videoImg.url : console.log()
          if (srcs.length === 0) {
            for (let j = 0; j < _this.article[i].img.length; j++) {
              if (j <= 3) {
                srcs[j] = _this.article[i].img[j].url
              }
            }
          } else if (srcs.length === 1) {
            for (let a = 0; a < _this.article[i].img.length; a++) {
              if (a <= 2) {
                srcs[srcs.length] = _this.article[i].img[a].url
              }
            }
          } else if (srcs.length === 2) {
            for (let b = 0; b < _this.article[i].img.length; b++) {
              if (b <= 1) {
                srcs[srcs.length] = _this.article[i].img[b].url
              }
            }
          }
          _this.article[i].srcs = srcs
          srcs = []
        }
      }
      // console.log(_this.article.length)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageSeeImg.vue 接口 删除文章
export function delArticle (_this, mid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionDel?mId=' + mid)
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.$message({
          type: 'success',
          message: '删除成功!'
        })
        userArticleQuery(_this)
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '删除失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageSeeImg.vue 接口 删除文章
export function delArticle2 (_this, mid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionDel?mId=' + mid)
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.$message({
          type: 'success',
          message: '删除成功!'
        })
        administrationArticleAll(_this)
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '删除失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// modifyPassword.vue 接口 修改用户密码
export function updatePwd (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/user_edit?uId=' + _this.$store.state.user.uId + '&Verification=' + _this.verification + '&Password=' + _this.pwd)
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        // 给全局变量赋值
        let user = {
          uId: _this.$store.state.user.uId,
          permissions: _this.$store.state.user.permissions,
          userName: _this.$store.state.user.userName,
          Password: _this.pwd,
          nickname: _this.$store.state.user.nickname,
          sex: _this.$store.state.user.sex,
          registerTime: _this.$store.state.user.registerTime,
          endTime: _this.$store.state.user.endTime,
          state: _this.$store.state.user.state,
          HeadPortraitSrc: _this.$store.state.user.HeadPortraitSrc,
          setPasswordStyle: _this.$store.state.user.setPasswordStyle,
          types: _this.$store.state.user.types,
          projects: _this.$store.state.user.projects,
          minType: _this.$store.state.user.minType,
          mId: _this.$store.state.mId
        }
        _this.$store.commit('setUsername', user)
        _this.$store.dispatch('setLocalStorage', _this.$store.state.user) // 本地存储用户信息
        // console.log(_this.$store.state.user.permissions + '修改用户密码')
        _this.verification = ''
        _this.pwd = ''
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '修改失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUserList.vue 接口 修改用户密码
export function updatePwd2 (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/guanliuser_edit?uId=' + _this.uId + '&Password=' + _this.pwd)
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.centerDialogVisible = false
        _this.pwd = ''
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '修改失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUserList.vue 接口 删除用户
export function delUser (_this, uId) {
  Axios.get(_this.URLS + '/index.php/Home/Index/user_del?uId=' + uId)
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.$message({
          type: 'success',
          message: '删除成功!'
        })
        userList(_this)
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '删除失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUserList.vue 接口 查询所有用户信息
export function userList (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/user_list')
    .then(function (response) {
      _this.loading = true
      if (response.data !== null) {
        _this.userList = response.data
        if (_this.userList.length !== 0) {
          for (let i = 0; i < _this.userList.length; i++) {
            _this.userList[i].registerTime = _this.formatDate(_this.userList[i].registerTime)
            _this.userList[i].endTime = _this.formatDate(_this.userList[i].endTime)
          }
          _this.loading = false
        } else {
          _this.userList = []
        }
        // console.log(_this.userList)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUserList.vue 接口 查询所有用户信息
export function userList2 (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/userxiala')
    .then(function (response) {
      console.log(_this.userList)
      _this.loading = true
      if (response.data !== null) {
        _this.userList = response.data
        if (_this.userList.length !== 0) {
          for (let i = 0; i < _this.userList.length; i++) {
            _this.userList[i].registerTime = _this.formatDate(_this.userList[i].registerTime)
            _this.userList[i].endTime = _this.formatDate(_this.userList[i].endTime)
          }
          _this.loading = false
        } else {
          _this.userList = []
        }
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUserList.vue 接口 权限修改
export function permissions (_this, row, type) {
  console.log(row)
  if (type === '1') {
    Axios.get(_this.URLS + '/index.php/Home/Index/userreduce?uId=' + row.uId + '&Permissions=1')
      .then(function (response) {
        if (response.data.msg === '0') {
          userList(_this)
          _this.$message({
            type: 'success',
            message: '修改成功!'
          })
          _this.centerDialogVisibleP = false
          _this.name = ''
        } else if (response.data.msg === '1') {
          _this.$message({
            type: 'info',
            message: '修改失败!'
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  } else if (type === '2') {
    Axios.get(_this.URLS + '/index.php/Home/Index/userPromotion?uId=' + row.uId + '&Permissions=2')
      .then(function (response) {
        if (response.data.msg === '0') {
          userList(_this)
          _this.$message({
            type: 'success',
            message: '修改成功!'
          })
          _this.centerDialogVisibleP = false
          _this.name = ''
        } else if (response.data.msg === '1') {
          _this.$message({
            type: 'info',
            message: '修改失败!'
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

// backstageUserList.vue 接口 查询被删除的所有用户信息
export function userRecovery (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/userrecovery')
    .then(function (response) {
      _this.loading = true
      _this.userList = []
      if (response.data !== null) {
        _this.userList = response.data
        if (_this.userList.length !== 0) {
          for (let i = 0; i < _this.userList.length; i++) {
            _this.userList[i].registerTime = _this.formatDate(_this.userList[i].registerTime)
            _this.userList[i].endTime = _this.formatDate(_this.userList[i].endTime)
          }
        } else {
          _this.userList = []
        }
        // console.log(_this.userList)
      }
      _this.loading = false
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageUserList.vue 接口 被删除的用户还原
export function reduction (_this, uId) {
  Axios.get(_this.URLS + '/index.php/Home/Index/reduction?uId=' + uId)
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.$message({
          type: 'success',
          message: '还原成功!'
        })
        userRecovery(_this)
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '还原失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 查询项目list（所有）
export function projectList (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/projectlist?flag=0')
    .then(function (response) {
      _this.loadingP = true
      if (response.data.msg !== null && response.data.msg === '1') {
        // 没有数据
        _this.loadingP = false
      } else if (response.data.length !== 0) {
        _this.PList = response.data
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].state === '1') {
            _this.PList[i].state = true
          } else {
            _this.PList[i].state = false
          }
          if (_this.currentP !== undefined) {
            _this.judgeParameter
//          if (i === 0) {
//            _this.currentP.name = _this.PList[i].xname
//            _this.currentP.id = _this.PList[i].pid
//          }
          }
        }
        _this.loadingP = false
      }
      // console.log(_this.PList)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 查询项目list（只查启用的）
export function projectList2 (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/projectlist?flag=1')
    .then(function (response) {
      if (response.data !== '1') {
        // 给全局变量赋值
        let user = {
          uId: _this.$store.state.user.uId,
          permissions: _this.$store.state.user.permissions,
          userName: _this.$store.state.user.userName,
          Password: _this.$store.state.user.Password,
          nickname: _this.$store.state.user.nickname,
          sex: _this.$store.state.user.sex,
          registerTime: _this.$store.state.user.registerTime,
          endTime: _this.$store.state.user.endTime,
          state: _this.$store.state.user.state,
          HeadPortraitSrc: _this.$store.state.user.HeadPortraitSrc,
          setPasswordStyle: _this.$store.state.user.setPasswordStyle,
          types: _this.$store.state.user.types,
          projects: response.data,
          minType: _this.$store.state.user.minType,
          mId: _this.$store.state.mId
        }
        _this.$store.commit('setUsername', user)
        _this.$store.dispatch('setLocalStorage', _this.$store.state.user) // 本地存储用户信息
        // console.log(_this.$store.state.user.permissions + '修改查询项目list')
      }
      // console.log(_this.PList)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 查询类型list（所有）
export function typeList (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/typelist?flag=0')
    .then(function (response) {
      _this.loadingT = true
      if (response.data.msg !== null && response.data.msg === '1') {
        // 没有数据
        _this.loadingT = false
      } else if (response.data.length !== 0) {
        _this.tList = response.data
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].state === '1') {
            _this.tList[i].state = true
          } else {
            _this.tList[i].state = false
          }
        }
        _this.loadingT = false
      }
      // console.log(_this.tList)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 查询类型list（只查启用的）
export function typeList2 (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/typelist?flag=1')
    .then(function (response) {
      if (response.data !== '1') {
        // 给全局变量赋值
        let user = {
          uId: _this.$store.state.user.uId,
          permissions: _this.$store.state.user.permissions,
          userName: _this.$store.state.user.userName,
          Password: _this.$store.state.user.Password,
          nickname: _this.$store.state.user.nickname,
          sex: _this.$store.state.user.sex,
          registerTime: _this.$store.state.user.registerTime,
          endTime: _this.$store.state.user.endTime,
          state: _this.$store.state.user.state,
          HeadPortraitSrc: _this.$store.state.user.HeadPortraitSrc,
          setPasswordStyle: _this.$store.state.user.setPasswordStyle,
          types: response.data,
          projects: _this.$store.state.user.projects,
          minType: _this.$store.state.user.minType,
          mId: _this.$store.state.mId
        }
        _this.$store.commit('setUsername', user)
        _this.$store.dispatch('setLocalStorage', _this.$store.state.user) // 本地存储用户信息
        // console.log(_this.$store.state.user.permissions + '修改类型项目list')
      }
      // console.log(_this.tList)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 禁用类型
export function typeDisable (_this, tid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/typeDisable?tid=' + tid)
    .then(function (response) {
      if (response.data.msg === '0') {
        typeList(_this)
        typeList2(_this)
        _this.$message({
          type: 'success',
          message: '禁用成功!'
        })
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '禁用失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 禁用项目
export function projectDisable (_this, pid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/projectDisable?pid=' + pid)
    .then(function (response) {
      if (response.data.msg === '0') {
        projectList(_this)
        projectList2(_this)
        _this.$message({
          type: 'success',
          message: '禁用成功!'
        })
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '禁用失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 启用类型
export function typeEnable (_this, tid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/typeEnable?tid=' + tid)
    .then(function (response) {
      if (response.data.msg === '0') {
        typeList(_this)
        typeList2(_this)
        _this.$message({
          type: 'success',
          message: '启用成功!'
        })
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '启用失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 启用项目
export function projectEnable (_this, pid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/projectEnable?pid=' + pid)
    .then(function (response) {
      if (response.data.msg === '0') {
        projectList(_this)
        projectList2(_this)
        _this.$message({
          type: 'success',
          message: '启用成功!'
        })
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '启用失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 修改类型名称
export function typesave (_this, tid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/typesave?tid=' + tid + '&lname=' + _this.name)
    .then(function (response) {
      if (response.data.msg === '0') {
        typeList(_this)
        typeList2(_this)
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.centerDialogVisibleT = false
        _this.name = ''
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '修改失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 修改项目名称
export function projectsave (_this, pid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/projectsave?pid=' + pid + '&xname=' + _this.name)
    .then(function (response) {
      if (response.data.msg === '0') {
        projectList(_this)
        projectList2(_this)
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.centerDialogVisibleP = false
        _this.name = ''
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '修改失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageModifyImg.vue 接口 修改文章获取数据
export function exhibitionDetails (_this, mId) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionDetails?mId=' + mId)
    .then(function (response) {
      _this.loading2 = true
      if (response.data.list.length !== 0) {
        _this.article = response.data.list[0]
        console.log(_this.article)
        _this.title = _this.article.title
        _this.projectImg = _this.article.xname
        _this.typeImg = _this.article.lname
        _this.typeImg = _this.article.lname
        _this.did = _this.article.detailsid
        _this.minTypeImg = _this.article.dname
        _this.article.img = JSON.parse(_this.article.img)
        _this.article.psd = JSON.parse(_this.article.psd)
        _this.article.video = JSON.parse(_this.article.video)
        if (_this.article.img.length !== 0) {
          _this.imgDiv = true
        } else {
          _this.article.img = []
          _this.imgDiv = false
        }
        if (_this.article.psd.psdFile !== undefined) {
          _this.psdDiv = true
        } else {
          _this.psdDiv = false
        }
        if (_this.article.video.videoImg.url.length !== 0) {
          _this.videoDiv = true
        } else {
          _this.videoDiv = false
        }
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '获取失败！'
        })
      }
      _this.loading2 = false
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 添加类型名称
export function typeAdd (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Index/typeAdd', qs.stringify({lname: _this.name}))
    .then(function (response) {
      if (response.data.msg === '0') {
        typeList(_this)
        typeList2(_this)
        _this.$message({
          type: 'success',
          message: '添加成功!'
        })
        _this.centerDialogVisibleAdd = false
        _this.name = ''
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '添加失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageProjectType.vue 接口 添加项目名称
export function projectAdd (_this) {
  Axios.post(_this.URLS + '/index.php/Home/Index/projectAdd', qs.stringify({xname: _this.name}))
    .then(function (response) {
      if (response.data.msg === '0') {
        projectList(_this)
        projectList2(_this)
        _this.$message({
          type: 'success',
          message: '添加成功!'
        })
        _this.centerDialogVisibleAdd = false
        _this.name = ''
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '添加失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// webIndex.vue 接口 获取图片集的数量和内容
export function exhibitionAllimg (_this, queryInfo) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionAllimg?title=' + queryInfo.title + '&pid=' + queryInfo.pid + '&tid=' + queryInfo.tid + '&sort=' + queryInfo.sort + '&p=' + queryInfo.p)
    .then(function (response) {
      if (response.data.msg !== "1") {
        console.log(response.data.msg)
        if (_this.imgList.length === 0) {
          _this.imgList = response.data
        } else {
          for (let i = 0; i < response.data.length; i++) {
            if (i < _this.pageSize) {
              _this.$set(_this.imgList, _this.imgList.length, response.data[i])
            }
          }
        }
      } else if (response.data.msg === '1') {
        _this.prompt = '没有查询到相关数据'
      }
      _this.loading = false
    })
    .catch(function (error) {
      console.log(error)
    })
}

// webIndex.vue 接口 获取psd的数量和内容
export function exhibitionAllpsd (_this, queryInfo) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionAllpsd?title=' + queryInfo.title + '&pid=' + queryInfo.pid + '&tid=' + queryInfo.tid + '&sort=' + queryInfo.sort + '&p=' + queryInfo.p)
    .then(function (response) {
      if (response.data.msg !== "1") {
        console.log(response.data.msg)
        if (_this.psdList.length === 0) {
          _this.psdList = response.data
        } else {
          for (let i = 0; i < response.data.length; i++) {
            if (i < _this.pageSize) {
              _this.$set(_this.psdList, _this.psdList.length, response.data[i])
            }
          }
        }
      } else if (response.data.msg === '1') {
        _this.prompt = '没有查询到相关数据'
      }
      _this.loading = false
    })
    .catch(function (error) {
      console.log(error)
    })
}

// webIndex.vue 接口 获取视频的数量和内容
export function exhibitionAllvideo (_this, queryInfo) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionAllvideo?title=' + queryInfo.title + '&pid=' + queryInfo.pid + '&tid=' + queryInfo.tid + '&sort=' + queryInfo.sort + '&p=' + queryInfo.p)
    .then(function (response) {
      if (response.data.msg !== "1") {
        console.log(response.data.msg)
        if (_this.videoList.length === 0) {
          _this.videoList = response.data
        } else {
          for (let i = 0; i < response.data.length; i++) {
            if (i < _this.pageSize) {
              _this.$set(_this.videoList, _this.videoList.length, response.data[i])
            }
          }
        }
      } else if (response.data.msg === '1') {
        _this.prompt = '没有查询到相关数据'
      }
      _this.loading = false
    })
    .catch(function (error) {
      console.log(error)
    })
}

// article.vue 接口 获取文章内容
export function exhibitionDetails2 (_this, mid) {
  Axios.get(_this.URLS + '/index.php/Home/Index/exhibitionDetailse?mId=' + mid)
    .then(function (response) {
      if (response.data.msg !== "1") {
        console.log(response.data)
        if (response.data.list.length !== 0) {
          _this.mid = response.data.list.mId
          _this.title = response.data.list.title
          _this.describe = response.data.list.describe
          _this.registerTime = response.data.list.registerTimeImg
          _this.imgFile = response.data.list.img
          _this.psdFile = response.data.list.psd
          _this.videoFile = response.data.list.video
          _this.loading = false
        }
      } else if (response.data.msg === '1') {
        _this.prompt = '没有查询到相关数据'
        _this.loading = false
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageMinType.vue 接口 获取小分类信息
export function detailslist (_this, flag) {
  Axios.get(_this.URLS + '/index.php/Home/Index/detailslist?flag=' + flag)
    .then(function (response) {
      if (response.data.msg !== "1") {
        console.log(response.data)
        _this.minType = response.data
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].states === '1') {
            _this.minType[i].states = true
          } else {
            _this.minType[i].states = false
          }
        }
        _this.loadingList = false
      } else if (response.data.msg === '1') {
        _this.prompt = '没有查询到相关数据'
        _this.loadingList = false
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageMinType.vue 接口 添加小分类
export function detailsAdd (_this, mixname, pid, tid) {
  Axios.post(_this.URLS + '/index.php/Home/Index/detailsAdd', qs.stringify({pbid: pid, tbid: tid, dname: mixname}))
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.$message({
          type: 'success',
          message: '添加成功!'
        })
        _this.projectName = ''
        _this.typeName = ''
        _this.name = ''
        _this.mixTypeAdd = false
        _this.loadingList = true
        detailslist(_this, '2')
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '添加失败!'
        })
        _this.projectName = ''
        _this.typeName = ''
        _this.name = ''
        _this.mixTypeAdd = false
      } else if (response.data.msg === '2') {
        _this.$message({
          type: 'info',
          message: '重复添加!'
        })
        _this.projectName = ''
        _this.typeName = ''
        _this.name = ''
        _this.mixTypeAdd = false
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageMinType.vue 接口 启用小分类
export function detailsEnable (_this, did) {
  Axios.get(_this.URLS + '/index.php/Home/Index/detailsEnable?did=' + did)
    .then(function (response) {
      if (response.data.msg === '0') {
        detailslist(_this, '2')
        _this.$message({
          type: 'success',
          message: '启用成功!'
        })
      } else if (response.data.msg === '1') {
        detailslist(_this, '2')
        _this.$message({
          type: 'info',
          message: '启用失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageMinType.vue 接口 禁用小分类
export function detailsDisable (_this, did) {
  Axios.get(_this.URLS + '/index.php/Home/Index/detailsDisable?did=' + did)
    .then(function (response) {
      if (response.data.msg === '0') {
        detailslist(_this, '2')
        _this.$message({
          type: 'success',
          message: '禁用成功!'
        })
      } else if (response.data.msg === '1') {
        detailslist(_this, '2')
        _this.$message({
          type: 'info',
          message: '禁用失败!'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageMinType.vue 接口 修改小分类
export function detailssave (_this, did, pbid, tbid, dname) {
  Axios.post(_this.URLS + '/index.php/Home/Index/detailssave', qs.stringify({did: did, pbid: pbid, tbid: tbid, dname: dname}))
    .then(function (response) {
      if (response.data.msg === '0') {
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.dname = ''
        _this.mixTypeModify = false
        _this.mixTypeModifyUp = false
        detailslist(_this, '2')
      } else if (response.data.msg === '1') {
        _this.$message({
          type: 'info',
          message: '修改失败!'
        })
        _this.mixTypeModify = false
         _this.mixTypeModifyUp = false
        _this.dname = ''
      } else if (response.data.msg === '2') {
        _this.$message({
          type: 'info',
          message: '信息重复，请重新修改!'
        })
        _this.mixTypeModify = false
        _this.mixTypeModifyUp = false
        _this.dname = ''
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// backstageRightIndex.vue 接口 统计当前7天的上传数据
export function Statistics (_this) {
  Axios.get(_this.URLS + '/index.php/Home/Index/Statistics')
    .then(function (response) {
      for (let o = 1; o < 8; o++) {
      	_this.tj4data[_this.tj4data.length] = response.data[o].date
      	_this.tj4time[_this.tj4time.length] = parseInt(response.data[o].counts)
      }
      _this.drawLine()
    })
    .catch(function (error) {
      console.log(error)
    })
}
