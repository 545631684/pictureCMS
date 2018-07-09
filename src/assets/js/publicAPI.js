/**
 * 获取后台时间戳转换为正常的时间格式：yyyy-MM-dd
 * */
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    let str = o[k] + ''
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

/**
 * 返回文件的大小（单位：MB）
 * */
export function fileSize (size) {
  size = (file.size/1024*100)/100
  return size.toFixed(1)
}

/**
 * 生成防查看路径链接地址
 * */
export function fileUrl (file) {
  return URL.createObjectURL(file)
}

/**
 * 给单数1~9前添加0，以表示正常时间格式
 * */
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/**
 * 返回项目名称的所属id
 * */
export function getProjectID (_this, xname) {
  let id = ''
  for (let i = 0; i < _this.projects.length; i++) {
    if (_this.projects[i].xname === xname) {
      id = _this.projects[i].pid
    }
  }
  return id
}

/**
 * 返回项目id所属名称
 * */
export function getProjectName (_this, pid) {
  let name = ''
  for (let i = 0; i < _this.projects.length; i++) {
    if (_this.projects[i].pid === pid) {
      name = _this.projects[i].xname
    }
  }
  return name
}

/**
 * 返回项目类型的所属id
 * */
export function getTypesID (_this, lname) {
  let id = ''
  for (let i = 0; i < _this.types.length; i++) {
    if (_this.types[i].lname === lname) {
      id = _this.types[i].tid
    }
  }
  return id
}

/**
 * 返回项目类型id所属类型名称
 * */
export function getTypesName (_this, tid) {
  let name = ''
  for (let i = 0; i < _this.types.length; i++) {
    if (_this.types[i].tid === tid) {
      name = _this.types[i].lname
    }
  }
  return name
}

/**
 * 返回项目的小分类ID
 * */
export function getMinTypesID (_this, name) {
  let id = ''
  for (let i = 0; i < _this.minTypes.length; i++) {
    if (_this.minTypes[i].dname === name) {
      id = _this.minTypes[i].did
    }
  }
  return id
}

/**
 * 返回项目小分类id所属名称
 * */
export function getMinTypesName (_this, did) {
  let name = ''
  for (let i = 0; i < _this.minTypes.length; i++) {
    if (_this.minTypes[i].did === did) {
      name = _this.minTypes[i].dname
    }
  }
  return name
}

/**
 * 返回顶部
 * */
function returnTop () {
  // 获取当前最外围document的scrollTop，返回顶部
  var timer = setInterval(function() {
    var top = document.body.scrollTop || document.documentElement.scrollTop
    var speed = Math.ceil(top / 5)
    document.body.scrollTop = document.documentElement.scrollTop = top - speed
    if (top === 0) {
      clearInterval(timer)
    }
  }, 20)
}

