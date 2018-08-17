<template>
  <div id="videoList">
    <header class="header">
      <div class="logo content"><div><a href="/"><img src="../assets/images/sq22.png" alt="" /></a></div></div>
      <nav class="nav clearfix">
        <div class="normal content">
          <img class="button" src="../assets/images/sq16.png" alt="" @click="navTad"/>
          <p class="userInfo" v-if="state"><router-link tag="a" class="" to="/backstage">{{name}}<img :src="HeadPortraitSrc" alt="" /></router-link></p>
          <p class="land" v-if="!state"><router-link tag="a" class="" to="/login">登陆后台</router-link></p>
          <div class="hideNav content clearfix" v-if="navDiv">
            <div class="project">
              <img src="../assets/images/sq15.png" alt="" @click="navClose"/>
              <ul>
                <li v-for="(item, index) in PList" v-if="PList.length !== 0">
                  <a v-if="item.state" @mouseover="navTadname(item.xname, item.pid, $event)" @mouseout="navTadname2(item.xname, item.pid, $event, index)" >{{item.xname}}</a>
                </li>
              </ul>
            </div>
            <div class="tad clearfix">
              <dl>
                <dd>
                  <router-link tag="a" class="" :to="{path:href.img}" target="_blank">{{navName}}</router-link>
                </dd>
                <dd>
                  <router-link tag="a" class="" :to="{path:href.psd}" target="_blank">{{navName}}</router-link>
                </dd>
                <dd>
                  <router-link tag="a" class="" :to="{path:href.video}" target="_blank">{{navName}}</router-link>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <section class="content ">
      <div class="FileCheck ">
        <ul>
          <li>排序：<a @click="sort1">时间</a><a @click="sort2">名称</a></li>
          <li>
            <input type="text" v-model="searchTitle"  placeholder="输入名称"/>
            <button @click="loadVideo2()"></button>
          </li>
        </ul>
      </div>
      <div class="fileList clearfix">
        <ul class="clearfix">
          <li v-for="(item, index) in videoList">
            <router-link tag="a" class="" :to="'/article/' + currentP.name + '/video/' + item.mId" :title="item.title">
              <img class="fileImg" :src="getHeadPortraitSrc2(item.img[0].url)" alt="" v-if="item.img.length !== 0"/>
              <img class="fileImg" :src="URLS2 + 'image/timg.jpg'" alt="" v-else=""/>
              <p>{{item.title}}</p>
              <p>
                <img class="userLogo" :src="getHeadPortraitSrc(item.HeadPortraitSrc)" alt="" />
                <span>用户：{{item.nickname.length !== 0 ? item.nickname : item.userName}}<br />时间：{{formatDate(item.registerTimeImg)}}</span>
              </p>
            </router-link>
          </li>
        </ul>
        <p v-if="!loading" ref="jaizai" @click="loadVideo($event)" style="width: 200px;height: 50px;margin: 0 auto;text-align: center;line-height: 50px;color: #969292cc;">{{prompt}}</p>
        <p v-if="loading"><img src="../assets/images/loading.gif" alt="" style="display: block;margin: 0 auto;" /></p>
      </div>
    </section>
    <footer class="footer content">
      <div class="content">
        <img src="../assets/images/list3.jpg" alt="" />
      </div>
    </footer>
  </div>
</template>

<script>
import { cancellationUser, projectList, exhibitionAllimg, exhibitionAllpsd, exhibitionAllvideo, } from '../assets/js/api'
import { formatDate } from '../assets/js/publicAPI'
export default {
  name: 'pPsdList',
  data () {
    return {
      name: '',
      currentP: {
        name: '',
        id: ''
      },
      state: false,
      navDiv: false,
      navName: '东莞',
      href:{
        img: '/listImg',
        psd: '/listPsd',
        video: '/listVideo'
      },
      PList: [],
      videoList: [],
      count: 0,
      PageCount: 0,
      page: 1,
      pageSize: 6,
      searchTitle: '',
      sort: '1',
      loading: false,
      prompt: '点击加载更多',
      navPname: '',
      URLS2: this.URLS2
    }
  },
  watch: {
    // 如果 `videoList` 发生改变，这个函数就会运行
    videoList: function (newQuestion, oldQuestion) {
      this.count = this.videoList.length !== 0 ?  parseInt(this.videoList[0].count) : 0
      if (this.count !== 0) {
        this.PageCount = parseInt(this.count / this.pageSize)
      }
    },
    PList: function (newQuestion, oldQuestion) {
      this.href.img = '/listImg' + '/' + this.PList[0].xname + '/' + this.PList[0].pid
      this.href.psd = '/listPsd' + '/' + this.PList[0].xname + '/' + this.PList[0].pid
      this.href.video = '/listVideo' + '/' + this.PList[0].xname + '/' + this.PList[0].pid
      this.navName = this.PList[0].xname
    }
  },
  methods: {
    loadVideo (e) {
      if (this.page < this.PageCount) {
        this.loading = true
        this.page =  this.page + 1
        exhibitionAllvideo(this, {title: this.searchTitle, pid: this.$route.params.id, tid: '', sort: this.sort, p: this.page})
      } else {
        this.prompt = '已经被你掏空了。。。o(╥﹏╥)o'
      }
    },
    loadVideo2 () {
      this.loading = true
      this.videoList = []
      this.page = 1
      this.PageCount = 0
      this.count = 0
      if (this.searchTitle.length !== 0) {
        exhibitionAllvideo(this, {title: this.searchTitle, pid: this.$route.params.id, tid: '', sort: this.sort, p: '1'})
        this.prompt = '已经被你掏空了。。。o(╥﹏╥)o'
      } else {
        exhibitionAllvideo(this, {title: this.searchTitle, pid: this.$route.params.id, tid: '', sort: this.sort, p: '1'})
        this.prompt = '点击加载更多'
      }
    },
    sort1 () {
      this.loading = true
      this.sort = '1'
      this.videoList = []
      this.page = 1
      this.PageCount = 0
      this.count = 0
      exhibitionAllvideo(this, {title: this.searchTitle, pid: this.$route.params.id, tid: '', sort: this.sort, p: '1'})
      this.prompt = '点击加载更多'
    },
    sort2 () {
      this.loading = true
      this.sort = '2'
      this.videoList = []
      this.page = 1
      this.PageCount = 0
      this.count = 0
      exhibitionAllvideo(this, {title: this.searchTitle, pid: this.$route.params.id, tid: '', sort: this.sort, p: '1'})
      this.prompt = '点击加载更多'
    },
    navTad () {
      this.navDiv = true
    },
    navClose () {
      this.navDiv = false
    },
    getHeadPortraitSrc (src) {
      return src.length !== 0 ? this.URLS + src : '../assets/images/sq17.png'
    },
    getHeadPortraitSrc2 (src) {
      return src.length !== 0 ? this.URLS + src : '../assets/images/list2.jpg'
    },
    formatDate (time) { // 时间戳转换
      if (time !== null) {
        let date = new Date(parseInt(time) * 1000)
        return formatDate(date, 'yyyy-MM-dd')
      } else {
        return '暂无'
      }
    },
    navTadname (name, id, e) {
      e.target.classList.remove('on')
      this.href.img = '/listImg' + '/' + name + '/' +id
      this.href.psd = '/listPsd' + '/' + name + '/' +id
      this.href.video = '/listVideo' + '/' + name + '/' +id
      this.navName = name
    },
    navTadname2 (name, id, e, index) {
      e.target.classList.remove('on')
    }
  },
  created() {
    this.loading = true
    projectList(this)
    this.$store.dispatch('getLocalStorage', this.$store.state.user)
    if (this.$store.state.user.state === '1') {
      this.name = this.$store.state.user.nickname || this.$store.state.user.name
      this.HeadPortraitSrc = this.URLS + this.$store.state.user.HeadPortraitSrc
      console.log(this.$store.state.user.state)
      console.log(this.$store.state.user.nickname)
      this.state = true
    } else {
      this.state = false
    }
    this.navPname = this.$route.params.navPname
    this.currentP.name = this.$route.params.navPname
    this.currentP.id = this.$route.params.id
    exhibitionAllvideo(this, {title: '', pid: this.$route.params.id, tid: '', sort: '1', p: '1'})
  }
}
</script>

<style scoped>
#videoList .header{width: 100%; height: 97px; background:#087ada;}
#videoList .content{width: 1000px; height: auto; margin: 0 auto;}
#videoList .header .logo{width: 100%; height: 37px;background:#1a2c34;}
#videoList .header .logo div{width: 1000px; height: 37px; margin: 0 auto; padding: 5px 0; }
#videoList .header .logo img{display: block;float: left; width: 107px; height: 27px;}
#videoList .header .nav{position: relative; width: 100%; height: 59px; border: 1px solid #46b1f0; border-left: none; border-right: none;}
#videoList .header .normal{ height: 44px; margin: 8px auto;}
#videoList .header .normal .button{display: block;float: left; width: 28px; height: 27px; margin: 8.5px 0; }
#videoList .header .normal .userInfo{float: right; width: 200px; height: 44px; line-height: 44px; color: #ecf5fa;}
#videoList .header .normal .userInfo a{color: #FFFFFF;}
#videoList .header .normal .userInfo img{display: block;float: right; width: 44px; height: 44px;border-radius: 50px;}
#videoList .header .normal .land{float: right; width: 100px; height: 44px; line-height: 12px; color: #ecf5fa;text-align: center}
#videoList .header .normal .land a{color: #FFFFFF; display: block; text-align: right; width: 100px; height: 12px; line-height: 12px; float: right; margin: 16px 0; text-align: center;}
#videoList .header .normal .login a{border-right: 1px solid #fff;}
/*#videoList .header .normal .land a:hover{border-bottom: 1px solid #FFFFFF;}*/
#videoList .header .normal .hideNav{position: relative; top: -3px; left: 0; background: #30414b; height: auto;-moz-box-shadow:0px 0px 8px #172C54; -webkit-box-shadow:0px 0px 8px #172C54; box-shadow:0px 0px 8px #172C54;}
#videoList .header .normal .hideNav .project{position: relative;top: -44px;left: 0; width: 1000px; height: 50px; overflow: hidden;    background: #0873d6;}
#videoList .header .normal .hideNav .project img{float: left; width: 50px; height: 50px;display: block;}
#videoList .header .normal .hideNav .project ul{float: left; width: 950px; height: auto; min-height: 50px;}
#videoList .header .normal .hideNav ul li{float: left; margin: 16px 25px;}
#videoList .header .normal .hideNav ul li a{color: #ffffff;}
#videoList .header .normal .hideNav ul li a:hover{border-bottom: 2px solid #FFFFFF;color: #FFFFFF; padding-bottom: 8px;}
#videoList .header .normal .hideNav ul li a.on{border-bottom: 2px solid #FFFFFF;color: #FFFFFF; padding-bottom: 8px;}
#videoList .header .normal .tad{width: 100%; height: auto;background: #30414b;    margin-top: -44px;}
#videoList .header .normal .tad dl{padding-left: 50px;}
#videoList .header .normal .tad dl dd{float: left;width: 279px; height: 94px; margin: 30px 0;     margin-right: 37px; }
#videoList .header .normal .tad dl dd a{display: block; width: 279px; height: 94px; line-height: 94px; font-size: 20px; color: #FFFFFF; text-indent: 1em;}
#videoList .header .normal .tad dl dd:nth-child(1){ background: url(../assets/images/sq23.jpg) no-repeat;}
#videoList .header .normal .tad dl dd:nth-child(2){background: url(../assets/images/sq24.jpg) no-repeat;}
#videoList .header .normal .tad dl dd:nth-child(3){background: url(../assets/images/sq25.jpg) no-repeat;}
#videoList .header .fileType{}
#videoList .header .fileType .title,#videoList .latelyFile .title{width: 100%; height: 80px; color: #FFFFFF;    padding: 25px 0;}
#videoList .header .fileType .title b,#videoList .latelyFile .title b{display: block; margin:0 auto ; width: 100px; height: 40px; font-size: 24px; text-align: center; font-weight: 500; line-height: 40px;}
#videoList .header .fileType .title span,#videoList .latelyFile .title span{display: block; margin:0 auto ; width: 100px; height: 30px;font-size: 12px; text-align: center; color: #d2d2d2;}
#videoList .header .fileType .title samp,#videoList .latelyFile .title samp{display: block; width: 50px; height: 4px; background: #FFFFFF; margin:0 auto;}
#videoList .header .fileType dl{width: 100%; height: 300px;}
#videoList .header .fileType dl dd{float: left; width:250px; height: 300px; background: #FFFFFF; margin-right: 100px;}
#videoList .header .fileType dl dd:last-of-type{margin-right: 0;}
#videoList .header .fileType dl dd img{display: block; margin:40px auto 75px;}
#videoList .header .fileType dl dd span{display: block; margin:0 auto; text-align: center; color: #a8a7a7;}

#videoList .FileCheck{background: url(../assets/images/list1.jpg) no-repeat; height: 168px; background-size: 100% 168px;}
#videoList .FileCheck ul{padding-top: 116px;width: 100%; height: 28px;}
#videoList .FileCheck ul li{width: 50%;height: 28px; float: left;}
#videoList .FileCheck ul li:nth-child(1){color: #FFFFFF; text-indent: 2em;}
#videoList .FileCheck ul li:nth-child(1) a{padding: 0 20px;color: #FFFFFF; cursor: pointer;}
#videoList .FileCheck ul li:nth-child(2){}
#videoList .FileCheck ul li:nth-child(2) input{display: block;border: none; float: left; background: none; width: 325px; height: 28px;    margin-left: 90px;}
#videoList .FileCheck ul li:nth-child(2) input:focus{border: none;}
#videoList .FileCheck ul li:nth-child(2) button{display: block;border: none; float: left;background: none;  width: 58px; height: 28px;}
#videoList .fileList{width: 100%; height: auto;}
#videoList .fileList ul{padding: 0 10px;}
#videoList .fileList ul li{ float: left; width: 300px; height: auto;-moz-box-shadow:0px 0px 8px #172C54; -webkit-box-shadow:0px 0px 8px #172C54; box-shadow:0px 0px 8px #172C54; margin: 20px 13px;    padding-bottom: 10px;}
#videoList .fileList ul li .fileImg{width: 300px; height: 168px;}
#videoList .fileList ul li p:nth-child(2){height: 30px; text-indent: .5em; line-height: 30px; font-size: 15px;}
#videoList .fileList ul li p:nth-child(3){ height: 44px; width: 260px; margin: 0 auto;}
#videoList .fileList ul li p:nth-child(3) .userLogo{display: block;float: left; width: 44px; height: 44px; border-radius: 50px;}
#videoList .fileList ul li p:nth-child(3) span{display: block;float: left;height: 33px;width: 156px;padding: 5px 10px;line-height: 18px;font-size: 12px;}
#videoList .fileList ul li p:nth-child(3) a{display: block;float: left;height: 44px; width: 40px;}
#videoList .fileList ul li p:nth-child(3) a img{width: 16px;height: 18px;margin: 13px auto;display: block;}

#videoList .footer{ background: #f6f7f7;}
#videoList .footer div{border-top: 1px solid #e0e0e0;}
#videoList .footer div img{display: block; padding: 50px 0; margin: auto;}
</style>