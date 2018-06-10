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

