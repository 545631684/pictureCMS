<template>
  <div id="index">
    <header class="header">
      <div class="logo content"><a href=""><img src="../assets/images/sq1.png" alt="" /></a></div>
      <nav class="nav clearfix">
        <div class="normal content">
          <img class="button" src="../assets/images/sq16.png" alt="" @click="navTad"/>
          <p class="userInfo" v-if="state"><router-link tag="a" class="" to="/backstage">{{name}}<img :src="HeadPortraitSrc" alt="" /></router-link></p>
          <p class="land" v-if="!state"><router-link tag="a" class="" to="/login">登陆后台</router-link></p>
          <div class="hideNav content clearfix" v-if="navDiv">
            <img src="../assets/images/sq15.png" alt="" @click="navClose"/>
            <ul>
              <li v-for="(item, index) in PList">
                <router-link v-if="item.state" tag="a" :to="{path:'/project/' + item.xname + '/' + item.pid}" target="_blank">{{item.xname}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="fileType content">
        <p class="title">
          <b>{{currentP.name}}文件分类</b>
          <span>File classification</span>
          <samp></samp>
        </p>
        <dl>
          <dd>
            <router-link tag="a" class="" :to="'/listImg/' + currentP.name + '/' + currentP.id" title="">
              <img src="../assets/images/sq3.png" alt="" />
              <span v-if="imgList.length !== 0" v-html="'数量：' + imgList[0].count"></span>
              <span v-if="imgList.length === 0"><img src="../assets/images/loading.gif" alt="" /></span>
            </router-link>
          </dd>
          <dd>
            <router-link tag="a" class="" :to="'/listPsd/' + currentP.name + '/' + currentP.id" title="">
              <img src="../assets/images/sq4.png" alt="" />
              <span v-if="psdList.length !== 0" v-html="'数量：' + psdList[0].count"></span>
              <span v-if="psdList.length === 0"><img src="../assets/images/loading.gif" alt="" /></span>
            </router-link>
          </dd>
          <dd>
            <router-link tag="a" class="" :to="'/listVideo/' + currentP.name + '/' + currentP.id" title="">
              <img src="../assets/images/sq5.png" alt="" />
              <span v-if="videoList.length !== 0" v-html="'数量：' + videoList[0].count"></span>
              <span v-if="videoList.length === 0"><img src="../assets/images/loading.gif" alt="" /></span>
            </router-link>
          </dd>
        </dl>
      </div>
    </header>
    <section class="content latelyFile">
      <p class="title">
        <b>最近上传</b>
        <span>Recently uploaded</span>
        <samp></samp>
      </p>
      
      <!--
        作者：545631684@qq.com
        时间：2018-05-27
        描述: 图片集
      -->
      <div class="tileType content">
        <p><img src="../assets/images/sq6.png" alt="" />图片集</p>
        <router-link tag="a" class="" :to="'/listImg/' + currentP.name + '/' + currentP.id" title=""><img src="../assets/images/sq9.png" alt="" />更多</router-link>
      </div>
      <div class="files content">
        <dl v-if="imgList.length !== 0">
          <dd v-for="(item, index) in imgList" v-if='index <= 2' >
            <router-link tag="a" class="articleInfo" :to="'/article/' + currentP.name + '/img/' + item.mId" :title="item.title">
              <span class="omit">{{item.title}}</span>
              <span>{{formatDate(item.registerTimeImg)}}</span>
              <span :class="{on:item.nickname.length !== 0 ? true : false}">
                <img :src="getHeadPortraitSrc(item.HeadPortraitSrc)" alt="" />{{item.nickname.length !== 0 ? item.nickname : item.userName}}
              </span>
            </router-link>
          </dd>
        </dl>
        <dl v-if="imgList.length === 0">
          <dd>
            <img src="../assets/images/loading.gif" alt="" style="display: block;margin: 65px auto;"/>
          </dd>
        </dl>
        <img class="files_logo" src="../assets/images/sq11.jpg" alt="" />
      </div>
      
      <!--
                    作者：545631684@qq.com
                    时间：2018-05-27
                    描述: PSD文件
      -->
      <div class="tileType content">
        <p><img src="../assets/images/sq7.png" alt="" />PSD文件</p>
        <router-link tag="a" class="" :to="'/listPsd/' + currentP.name + '/' + currentP.id" title=""><img src="../assets/images/sq9.png" alt="" />更多</router-link>
      </div>
      <div class="files content">
        <dl v-if="psdList.length !== 0">
          <dd v-for="(item, index) in psdList" v-if='index <= 2'>
            <router-link tag="a" class="articleInfo" :to="'/article/' + currentP.name + '/psd/' + item.mId" :title="item.title">
              <span class="omit">{{item.title}}</span>
              <span>{{formatDate(item.registerTimeImg)}}</span>
              <span :class="{on:item.nickname.length !== 0 ? true : false}">
                <img :src="getHeadPortraitSrc(item.HeadPortraitSrc)" alt="" />{{item.nickname.length !== 0 ? item.nickname : item.userName}}
              </span>
            </router-link>
            <!--<a class="download"><img src="../assets/images/sq10.png" alt="" /></a>-->
          </dd>
        </dl>
        <dl v-if="psdList.length === 0">
          <dd>
            <img src="../assets/images/loading.gif" alt="" style="display: block;margin: 65px auto;"/>
          </dd>
        </dl>
        <img class="files_logo" src="../assets/images/sq12.jpg" alt="" />
      </div>
      
      <!--
        作者：545631684@qq.com
        时间：2018-05-27
        描述：视频文件
      -->
      <div class="tileType content">
        <p><img src="../assets/images/sq8.png" alt="" />视频文件</p>
        <router-link tag="a" class="" :to="'/listVideo/' + currentP.name + '/' + currentP.id" title=""><img src="../assets/images/sq9.png" alt="" />更多</router-link>
      </div>
      <div class="content videoFile">
        <dl v-if="videoList.length !== 0">
          <dd v-for="(item, index) in videoList" v-if='index <= 1'>
            <!--<router-link tag="a" class="" to="/" title=""><img class="videoFileImg" src="../assets/images/sq13.jpg" alt="" /></router-link>-->
            <router-link tag="a" class="" :to="'/article/' + currentP.name + '/video/' + item.mId" :title="item.title"><img class="videoFileImg" :src="getHeadPortraitSrc(item.video.videoImg.url)" alt="" /></router-link>
            <p>
              <span>{{item.title}}</span>
              <img class="userLogo" :src="getHeadPortraitSrc(item.HeadPortraitSrc)" alt="" />
              <span>{{item.nickname.length !== 0 ? item.nickname : item.userName}}</span>
              <span>{{formatDate(item.registerTimeImg)}}</span>
              <!--<a href=""><img src="../assets/images/sq10.png" alt="" /></a>-->
            </p>
          </dd>
        </dl>
        <dl v-if="videoList.length === 0">
          <dd>
            <img src="../assets/images/loading.gif" alt="" style="display: block;margin: 65px auto;"/>
          </dd>
          <dd>
            <img src="../assets/images/loading.gif" alt="" style="display: block;margin: 65px auto;"/>
          </dd>
        </dl>
      </div>
      
    </section>
    <footer class="footer">
      <div class="content">
        <a @click="rtop"></a>
      </div>
    </footer>
  </div>
</template>

<script>
import { cancellationUser, projectList, exhibitionAllimg, exhibitionAllpsd, exhibitionAllvideo, } from '../assets/js/api'
import { formatDate, returnTop } from '../assets/js/publicAPI'
export default {
  name: 'webIndex',
  data () {
    return {
      name: '',
      state: false,
      HeadPortraitSrc: '',
      navDiv: false,
      PList: [],
      imgList: [],
      psdList: [],
      videoList: [],
      currentP: {
        name: '',
        id: ''
      }
    }
  },
  methods: {
    rtop () {
      // 获取当前最外围document的scrollTop，返回顶部
      var timer = setInterval(function() {
        var top = document.body.scrollTop || document.documentElement.scrollTop
        var speed = Math.ceil(top / 5)
        document.body.scrollTop = document.documentElement.scrollTop = top - speed
        if (top === 0) {
          clearInterval(timer)
        }
      }, 20)
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
    formatDate (time) { // 时间戳转换
      if (time !== null) {
        let date = new Date(parseInt(time) * 1000)
        return formatDate(date, 'yyyy-MM-dd')
      } else {
        return '暂无'
      }
    },
    judgeParameter () {
      this.$route.params.xname === '' ? this.currentP.name = PList[0].xname : this.currentP.name = this.$route.params.xname
      this.$route.params.id === '' ? this.currentP.id = PList[0].xname : this.currentP.id = this.$route.params.id
      this.judgeParameter2
    },
    judgeParameter2 () {
      projectList(this)
      exhibitionAllimg(this, {title: '', pid: '', tid: '', sort: '1', p: '1'})
      exhibitionAllpsd(this, {title: '', pid: '', tid: '', sort: '1', p: '1'})
      exhibitionAllvideo(this, {title: '', pid: '', tid: '', sort: '1', p: '1'})
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
    }
  },
  created() {
    projectList(this)
    this.currentP.name = this.$route.params.navPname
    this.currentP.id = this.$route.params.id
    exhibitionAllimg(this, {title: '', pid: this.$route.params.id, tid: '', sort: '1', p: '1'})
    exhibitionAllpsd(this, {title: '', pid: this.$route.params.id, tid: '', sort: '1', p: '1'})
    exhibitionAllvideo(this, {title: '', pid: this.$route.params.id, tid: '', sort: '1', p: '1'})
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
  }
}
</script>

<style scoped>
#index .header{width: 100%; height: 550px; background: url(../assets/images/sq2.jpg) no-repeat; background-size: 100% 550px;}
#index .content{width: 1000px; height: auto; margin: 0 auto;}
#index .header .logo{width: 1000px; height: 30px; margin: 0 auto; padding: 5px 0;}
#index .header .logo img{display: block;float: left; width: 107px; height: 27px;}
#index .header .nav{position: relative; width: 100%; height: 60px; border: 1px solid #46b1f0; border-left: none; border-right: none; overflow: hidden;}
#index .header .normal{ height: 44px; margin: 8px auto;}
#index .header .normal .button{display: block;float: left; width: 28px; height: 27px; margin: 8.5px 0; cursor:pointer;}
#index .header .normal .userInfo a{color: #ecf5fa;}
#index .header .normal .userInfo{float: right; width: 200px; height: 44px; line-height: 44px; color: #ecf5fa;}
#index .header .normal .userInfo img{display: block;float: right; width: 44px; height: 44px; border-radius: 50px;}
#index .header .normal .land{float: right; width: 200px; height: 44px; line-height: 44px; color: #ecf5fa;}
#index .header .normal .land a{color: #FFFFFF; display: block; text-align: right; width: 60px; height: 30px; line-height: 30px; float: right; margin: 7px 0; text-align: center;}
#index .header .normal .land a:hover{border-bottom: 1px solid #FFFFFF;}
#index .header .normal .hideNav{position: relative; top: -3px; left: 0; background: #0873d6; height: 50px;-moz-box-shadow:0px 0px 8px #172C54; -webkit-box-shadow:0px 0px 8px #172C54; box-shadow:0px 0px 8px #172C54;}
#index .header .normal .hideNav img{position: relative; top: 0; left: -27px;width: 50px; height: 50px;display: block; cursor:pointer;}
#index .header .normal .hideNav ul{position: relative; top: -50px; left: 51px; width: 950px; height: auto; min-height: 50px;}
#index .header .normal .hideNav ul li{float: left; margin: 16px 25px;}
#index .header .normal .hideNav ul li a{color: #ffffff;}
#index .header .normal .hideNav ul li a:hover{border-bottom: 2px solid #FFFFFF;color: #FFFFFF; padding-bottom: 8px;}
#index .header .normal .hideNav ul li a.on{border-bottom: 2px solid #FFFFFF;color: #FFFFFF; padding-bottom: 8px;}
#index .header .fileType{}
#index .header .fileType .title,#index .latelyFile .title{width: 100%; height: 80px; color: #FFFFFF;    padding: 25px 0;}
#index .header .fileType .title b,#index .latelyFile .title b{display: block; margin:0 auto ; width: 240px; height: 40px; font-size: 24px; text-align: center; font-weight: 500; line-height: 40px;}
#index .header .fileType .title span,#index .latelyFile .title span{display: block; margin:0 auto ; width: 100px; height: 30px;font-size: 12px; text-align: center; color: #d2d2d2;    padding: 0;line-height: 30px;float: initial;}
#index .header .fileType .title samp,#index .latelyFile .title samp{display: block; width: 50px; height: 4px; background: #FFFFFF; margin:0 auto;}
#index .header .fileType dl{width: 100%; height: 300px;}
#index .header .fileType dl dd{float: left; width:250px; height: 300px; background: #FFFFFF; margin-right: 100px;}
#index .header .fileType dl dd:last-of-type{margin-right: 0;}
#index .header .fileType dl dd img{display: block; margin:40px auto 75px;}
#index .header .fileType dl dd span{display: block; margin:0 auto; text-align: center; color: #a8a7a7;}

#index .latelyFile{}
#index .latelyFile .title{width: 100%; height: 80px; color: #474747;    padding: 25px 0;}
#index .latelyFile .title b{display: block; margin:0 auto ; width: 100px; height: 40px; font-size: 24px; text-align: center; font-weight: 500; line-height: 40px;}
#index .latelyFile .title span{display: block; margin:0 auto ; width: 100px; height: 30px;font-size: 12px; text-align: center; color: #8a8787;}
#index .latelyFile .title samp{display: block; width: 50px; height: 4px; background: #0873d6; margin:0 auto;}

#index .files{-moz-box-shadow:0px 0px 6px #172c54; -webkit-box-shadow:0px 0px 6px #172c54; box-shadow:0px 0px 6px #172c54; height: 180px; margin-bottom: 50px;}
#index .files dl{width: 645px; height: 180px; float: left;}
#index .files dl dd{height: 59px; border-bottom: 1px solid #e5e5e5;}
#index .files dl dd:last-of-type{height: 60px;border-bottom:none;}
#index .files dl dd a.articleInfo{display: block;float: left;}
#index .files dl dd a.articleInfo span{display: block;float: left;height: 60px; font-size: 15px; line-height: 60px;}
#index .files dl dd a.articleInfo span:nth-child(1){width: 200px; text-indent: 1em;}
#index .files dl dd a.articleInfo span:nth-child(2){width: 195px; text-align: center;}
#index .files dl dd a.articleInfo span:nth-child(3){width: 250px;}
#index .files dl dd a.articleInfo span:nth-child(3).on{text-align: center;}
#index .files dl dd a.articleInfo span:nth-child(3) img{float: left;display: block; margin: 10px 10px 10px 30px; width: 44px; height: 44px; border-radius: 50px;}
#index .files dl dd a.download{display: block;float: left;width: 95px; height: 59px; background: #0873d6;}
#index .files dl dd a.download img{display: block;margin:20.5px auto; width: 16px; height: 18px;}
#index .files dl dd:last-of-type a.download{display: block;float: left;width: 95px; height: 60px; background: #0873d6;}
#index .files dl dd:last-of-type a.download img{display: block;margin:21px auto; width: 16px; height: 18px;}
#index .files .files_logo{display: block; float: left; width: 355px; height: 180px;}

#index .tileType{ height: 30px; margin: 5px auto 25px;}
#index .tileType p:nth-child(1){float: left; width: 150px;height: 30px; line-height: 30px; font-size: 20px;}
#index .tileType p:nth-child(1) img{display: block; float: left; width: 20px;height: 20px; margin: 5px 15px 5px 10px;}
#index .tileType a:nth-child(2){display:block;float: right;width: 85px;height: 30px; line-height: 30px;font-size: 12px;}
#index .tileType a:nth-child(2) img{display: block; float: left;width: 22px;height: 20px; margin: 5px 15px 5px 10px;}

#index .videoFile{height: 200px;margin-bottom: 50px;}
#index .videoFile dl{width: 100%; height: 200px;}
#index .videoFile dl dd{-moz-box-shadow:0px 0px 6px #172c54; -webkit-box-shadow:0px 0px 6px #172c54; box-shadow:0px 0px 6px #172c54; float: left; width: 475px; height: 200px; margin-right:50px;}
#index .videoFile dl dd:last-of-type{margin-right: 0;}
#index .videoFile dl dd .videoFileImg{display: block; float: left; width: 355px; height: 200px;border-left: 5px solid #0873d6;}
#index .videoFile dl dd p{float: left; width: 115px;}
#index .videoFile dl dd p span,.videoFile dl dd p a,.videoFile dl dd p img{display: block; text-align: center;}
#index .videoFile dl dd p span:nth-child(1){height: 50px; line-height: 50px;}
#index .videoFile dl dd p span:nth-child(3){ height: 30px;line-height: 30px; font-size: 12px;}
#index .videoFile dl dd p span:nth-child(4){height: 46px;line-height: 46px;}
#index .videoFile dl dd p .userLogo{margin: auto; border-radius: 50px; width: 44px; height: 44px;}
#index .videoFile dl dd p a{height: 30px; background: #0873d6;}
#index .videoFile dl dd p a img{margin:auto; padding: 6px 0;}

#index .footer{width: 100%; height: 262px; background: url(../assets/images/sq14.png) no-repeat; background-size: 100% 262px;}
#index .footer div{ height: 262px;background: url(../assets/images/sq18.png) no-repeat; background-size: 100% 262px;}
#index .footer div a{display: block; width: 100%; height: 262px;}
</style>