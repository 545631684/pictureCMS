<template>
  <div class="fixedTel" >
    <!--<a href="tel:4008271521">
      <img src="../assets/img/tgb46.jpg" alt="" class="tles" />
    </a>-->
    <a @click='top' >
      <img src="../assets/images/tgb47.jpg" alt="" class="fanhuitop" />
    </a>
  </div>
</template>

<script>
  export default {
    name: 'fixedTel',
    data() {
      return {
        fixedTel: false
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.fixedTel = scrollTop > 800 ? true : false
        // console.log(scrollTop)
      },
      top() {
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
    }
  }
</script>

<style scoped>
.fixedTel{position: fixed; width: 50px; height: 50px; right: 20px; bottom: 50px;}
.fixedTel .tles{width: 0.734375rem; height: 2.3125rem; padding-bottom: .2rem}
.fixedTel .fanhuitop{width: 50px; height: 50px;}
</style>