<template>
  <div class="articleHtml">
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
                  <router-link tag="a" class="" :to="{path:href.img}">{{navName}}</router-link>
                </dd>
                <dd>
                  <router-link tag="a" class="" :to="{path:href.psd}">{{navName}}</router-link>
                </dd>
                <dd>
                  <router-link tag="a" class="" :to="{path:href.video}">{{navName}}</router-link>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <section class="content" v-show="!loading">
        <div class="FileCheck ">
            <ul>
              <li><a href=""><img src="../assets/images/psd_1.jpg"/></a><a href="" class="tit">{{title}}</a></li>
              <li><a>{{formatDate(registerTime)}}</a></li>
                <li><a :href="navPnameSrc">{{navPname}}</a>/<a :href="navTnameSrc">{{navTname}}</a>/<a class="blue">{{title}}</a></li>
            </ul>
        </div>
        <div class="fileTypeTad" v-if="navTname === 'all'">
          <p @click="fileTypeTad('img')" :class="{on:imgDiv}">图片集</p>
          <p @click="fileTypeTad('psd')" :class="{on:psdDiv}">psd</p>
          <p @click="fileTypeTad('video')" :class="{on:videoDiv}">视频</p>
        </div>
        <div v-show="imgDiv">
          <div v-if="imgHtml.length === 0">
            <div v-for="(item, index) in imgFile" v-if="imgFile">
              <ul class="pic_box">
                <li><img :src="'http://192.168.0.108/' + item.url" alt="" /></li>
              </ul>
              <ul class="clearfix" style="margin: 20px auto;" v-if="navTname === 'all'">
                <li style="float: right; padding-right: 20px;"><a :href="'http://192.168.0.108/' + item.url" :download="item.name"><img src="../assets/images/pic_5.jpg"/></a></li>
              </ul>
            </div>
          </div>
          <div v-if="imgHtml.length !== 0" style="width: 960px; height: 540px; text-align: center; line-height: 100px; font-size: 25px;">{{imgHtml}}</div>
        </div>
        <div v-show="psdDiv">
          <div v-if="psdHtml.length === 0">
            <div v-for="(item, index) in imgFile" v-if="imgFile">
              <ul class="pic_box">
                <li><img :src="'http://192.168.0.108/' + item.url" alt="" /></li>
              </ul>
              <ul class="clearfix" style="margin: 20px auto;" v-if="navTname === 'all'">
                <li style="float: right; padding-right: 20px;"><a :href="'http://192.168.0.108/' + item.url" :download="item.name"><img src="../assets/images/pic_5.jpg"/></a></li>
              </ul>
            </div>
            <div v-for="(item, index) in psdFile.psdFile" v-if="navTname === 'all'">
              <ul class="clearfix" style="margin: 20px auto;">
                <li><a :href="'http://192.168.0.108/' + item.url" :download="item.name">PSD文件：{{item.name}}&emsp;&emsp;&emsp;&emsp;点击下载</a></li>
              </ul>
            </div>
          </div>
          <div v-if="psdHtml.length !== 0" style="width: 960px; height: 540px; text-align: center; line-height: 100px; font-size: 25px;">{{psdHtml}}</div>
        </div>
        <div v-if="videoDiv">
          <div v-if="videoHtml.length === 0">
            <div v-if="videoFile.videoFile">
              <ul class="pic_box">
                <li>
                  <video-player  
                    class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"></video-player>
                </li>
              </ul>
            </div>
            <div>
              <ul class="clearfix" style="margin: 20px auto;" v-if="navTname === 'all'">
                <li><a @click="download2('http://192.168.0.108/' + videoFile.videoFile[0].url)" :download="videoFile.videoFile[0].name">视频文件：{{videoFile.videoFile[0].name}}&emsp;&emsp;&emsp;&emsp;点击下载</a></li>
              </ul>
            </div>
          </div>
          <div v-if="videoHtml.length !== 0" style="width: 960px; height: 540px; text-align: center; line-height: 100px; font-size: 25px;">{{videoHtml}}</div>
        </div>
    </section>
    <section class="content" v-show="loading"><img src="../assets/images/loading.gif" alt="" style="display: block; margin: 100px auto;"/></section>
    <div class="footer">
        <div class="foot">
            <img src="../assets/images/pic_bottom.jpg" alt="" />
        </div>
    </div>
  </div>
</template>

<script>
import { cancellationUser, projectList, exhibitionDetails2 } from '../assets/js/api'
import { formatDate } from '../assets/js/publicAPI'
export default {
  name: 'articleFile',
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
      loading: false,
      mid: '',
      title: '',
      describe: '',
      imgFile: [],
      psdFile: {},
      videoFile: {},
      registerTime: '',
      imgDiv: true,
      psdDiv: false,
      videoDiv: false,
      playerOptions: { 
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度 
        autoplay: false, //如果true,浏览器准备好时开始回放。
        lmuted: false, // 默认情况下将会消除任何音频。 
        oop: false, // 导致视频一结束就重新开始。 
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持） 
        language: 'zh-CN', 
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"） 
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。 
        sources: [{ 
          type: "", 
          src: "" //url地址 
          }], 
        poster: "", //你的封面地址  
        // width: document.documentElement.clientWidth, 
        notSupportedMessage: '不是MP4格式视频无法播放，请下载后自行观看', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: { 
          timeDivider: true, 
          durationDisplay: true, 
          remainingTimeDisplay: false, 
          fullscreenToggle: true //全屏按钮 
          }
      },
      navPname: '', // 东莞、、、 index
      navPnameSrc: '',
      pid: '',
      navTname: '',  // img、psd、video、imgAll、psdAll、videoAll、all
      navTnameSrc: '',
      imgHtml: '',
      psdHtml: '',
      videoHtml: ''
    }
  },
  watch: {
    // 如果 `videoFile` 发生改变，这个函数就会运行
    videoFile: function (newQuestion, oldQuestion) {
      if (this.videoFile.videoFile.length !== 0) {
        this.videoHtml = ''
        this.playerOptions.sources[0].src = 'http://192.168.0.108/' + this.videoFile.videoFile[0].url
        this.playerOptions.poster = 'http://192.168.0.108/' + this.videoFile.videoImg.url
      } else {
        this.videoHtml = '主人很懒，什么都没上传(ಥ_ಥ)'
      }
    },
    psdFile: function (newQuestion, oldQuestion) {
      if (this.psdFile.psdFile.length !== 0) {
        this.psdHtml = ''
      } else {
        this.psdHtml = '主人很懒，什么都没上传(ಥ_ಥ)'
      }console.log(this.psdHtml.length)
    },
    imgFile: function (newQuestion, oldQuestion) {
      if (this.imgFile.length !== 0) {
        this.imgHtml = ''
      } else {
        this.imgHtml = '主人很懒，什么都没上传(ಥ_ಥ)'
      }
    },
    PList: function (newQuestion, oldQuestion) {
      this.navPSrc(this.$route.params.navPname)
      this.navTSrc(this.$route.params.nacType)
    }
  },
  methods: {
    fileTypeTad (type) {
      if (type === 'img') {
        this.imgDiv = true
        this.psdDiv = false
        this.videoDiv = false
      }
      if (type === 'psd') {
        this.imgDiv = false
        this.psdDiv = true
        this.videoDiv = false
      }
      if (type === 'video') {
        this.imgDiv = false
        this.psdDiv = false
        this.videoDiv = true
      }
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
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
    },
    download2(url) {
      window.open(url)
      /* var form =  document.createElement("form")
      form.method = 'GET'
      form.action = url
      document.body.appendChild(form)
      form.submit() */
    },
    navPSrc (name) {
      console.log(name)
      if (name === 'index') {
        this.navPnameSrc = 'http://192.168.0.108/'
        this.navPname = '首页'
      } else if (name === 'backstage') {
        this.navPnameSrc = 'http://192.168.0.108/#/backstage'
        this.navPname = '后台'
      } else {
        for (let i = 0; i < this.PList.length; i++) {
          if (name === this.PList[i].xname) {
            this.pid = this.PList[i].pid
          }
          if (i === this.PList.length - 1) {
            this.navPnameSrc = 'http://192.168.0.108/#/pindex/' + name + '/' + this.pid
          }
        }
      }
    },
    navTSrc (name) {
      /**
       * 首页  /index/{img/psd/video}/id
       * 后台查看 /backstage/all/id
       * 全部列表img   /index/imgAll/id
       * 全部列表psd   /index/psdAll/id
       * 全部列表video /index/videoAll/id
       * 项目首页      /项目/{img/psd/video}/id
       * 项目列表页img /项目/{img}/id
       * 项目列表页psd /项目/{psd}/id
       *  项目列表页video/项目/{video}/id
       * */
      console.log(name)
      switch(name)
      {
        case 'img':
          this.navTnameSrc = 'http://192.168.0.108/#/listImg/' + this.navPname + '/' + this.pid
          this.navTname = '图片集'
          this.imgDiv = true
          this.psdDiv = false
          this.videoDiv = false
          break;
        case 'psd':
          this.navTnameSrc = 'http://192.168.0.108/#/listPsd/' + this.navPname + '/' + this.pid
          this.navTname = 'psd'
          this.imgDiv = false
          this.psdDiv = true
          this.videoDiv = false
          break;
        case 'video':
          this.navTnameSrc = 'http://192.168.0.108/#/listVideo/' + this.navPname + '/' + this.pid
          this.navTname = 'video'
          this.imgDiv = false
          this.psdDiv = false
          this.videoDiv = true
          break;
        case 'imgAll':
          this.navTnameSrc = 'http://192.168.0.108/#/listImgAll/'
          this.navTname = '图片集'
          this.imgDiv = true
          this.psdDiv = false
          this.videoDiv = false
          break;
        case 'psdAll':
          this.navTnameSrc = 'http://192.168.0.108/#/listPsdAll/'
          this.navTname = 'psd'
          this.imgDiv = false
          this.psdDiv = true
          this.videoDiv = false
          break;
        case 'videoAll':
          this.navTnameSrc = 'http://192.168.0.108/#/listVideoAll/'
          this.navTname = 'video'
          this.imgDiv = false
          this.psdDiv = false
          this.videoDiv = true
          break;
        case 'all':
          this.navTnameSrc = 'http://192.168.0.108/#/backstage'
          this.navTname = 'all'
          break;
      }
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
    this.nacType = this.$route.params.nacType
    exhibitionDetails2(this, this.$route.params.id)
    
  }
}
</script>

<style>
.articleHtml .header{width: 100%; height: 97px; background:#087ada;}
.articleHtml .content{width: 1000px; height: auto; margin: 0 auto;}
.articleHtml .header .logo{width: 100%; height: 37px;background:#1a2c34;}
.articleHtml .header .logo div{width: 1000px; height: 37px; margin: 0 auto; padding: 5px 0; }
.articleHtml .header .logo img{display: block;float: left; width: 107px; height: 27px;}
.articleHtml .header .nav{position: relative; width: 100%; height: 59px; border: 1px solid #46b1f0; border-left: none; border-right: none;}
.articleHtml .header .normal{ height: 44px; margin: 8px auto;}
.articleHtml .header .normal .button{display: block;float: left; width: 28px; height: 27px; margin: 8.5px 0; }
.articleHtml .header .normal .userInfo{float: right; width: 200px; height: 44px; line-height: 44px; color: #ecf5fa;}
.articleHtml .header .normal .userInfo a{color: #FFFFFF;}
.articleHtml .header .normal .userInfo img{display: block;float: right; width: 44px; height: 44px; border-radius: 50px;}
.articleHtml .header .normal .land{float: right; width: 100px; height: 44px; line-height: 12px; color: #ecf5fa;text-align: center}
.articleHtml .header .normal .land a{color: #FFFFFF; display: block; text-align: right; width: 100px; height: 12px; line-height: 12px; float: right; margin: 16px 0; text-align: center;}
.articleHtml .header .normal .login a{border-right: 1px solid #fff;}
/*.articleHtml .header .normal .land a:hover{border-bottom: 1px solid #FFFFFF;}*/
.articleHtml .header .normal .hideNav{position: relative; top: -3px; left: 0; background: #30414b; height: auto;-moz-box-shadow:0px 0px 8px #172C54; -webkit-box-shadow:0px 0px 8px #172C54; box-shadow:0px 0px 8px #172C54;}
.articleHtml .header .normal .hideNav .project{position: relative;top: -44px;left: 0; width: 1000px; height: 50px; overflow: hidden;    background: #0873d6;}
.articleHtml .header .normal .hideNav .project img{float: left; width: 50px; height: 50px;display: block;}
.articleHtml .header .normal .hideNav .project ul{float: left; width: 950px; height: auto; min-height: 50px;}
.articleHtml .header .normal .hideNav ul li{float: left; margin: 16px 25px;}
.articleHtml .header .normal .hideNav ul li a{color: #ffffff;}
.articleHtml .header .normal .hideNav ul li a:hover{border-bottom: 2px solid #FFFFFF;color: #FFFFFF; padding-bottom: 8px;}
.articleHtml .header .normal .hideNav ul li a.on{border-bottom: 2px solid #FFFFFF;color: #FFFFFF; padding-bottom: 8px;}
.articleHtml .header .normal .tad{width: 100%; height: auto;background: #30414b;    margin-top: -44px;}
.articleHtml .header .normal .tad dl{padding-left: 50px;}
.articleHtml .header .normal .tad dl dd{float: left;width: 279px; height: 94px; margin: 30px 0;     margin-right: 37px; }
.articleHtml .header .normal .tad dl dd a{display: block; width: 279px; height: 94px; line-height: 94px; font-size: 20px; color: #FFFFFF; text-indent: 1em;}
.articleHtml .header .normal .tad dl dd:nth-child(1){ background: url(../assets/images/sq23.jpg) no-repeat;}
.articleHtml .header .normal .tad dl dd:nth-child(2){background: url(../assets/images/sq24.jpg) no-repeat;}
.articleHtml .header .normal .tad dl dd:nth-child(3){background: url(../assets/images/sq25.jpg) no-repeat;}
.articleHtml .header .fileType{}
.articleHtml .header .fileType .title,.articleHtml .latelyFile .title{width: 100%; height: 80px; color: #FFFFFF;    padding: 25px 0;}
.articleHtml .header .fileType .title b,.articleHtml .latelyFile .title b{display: block; margin:0 auto ; width: 100px; height: 40px; font-size: 24px; text-align: center; font-weight: 500; line-height: 40px;}
.articleHtml .header .fileType .title span,.articleHtml .latelyFile .title span{display: block; margin:0 auto ; width: 100px; height: 30px;font-size: 12px; text-align: center; color: #d2d2d2;}
.articleHtml .header .fileType .title samp,.articleHtml .latelyFile .title samp{display: block; width: 50px; height: 4px; background: #FFFFFF; margin:0 auto;}
.articleHtml .header .fileType dl{width: 100%; height: 300px;}
.articleHtml .header .fileType dl dd{float: left; width:250px; height: 300px; background: #FFFFFF; margin-right: 100px;}
.articleHtml .header .fileType dl dd:last-of-type{margin-right: 0;}
.articleHtml .header .fileType dl dd img{display: block; margin:40px auto 75px;}
.articleHtml .header .fileType dl dd span{display: block; margin:0 auto; text-align: center; color: #a8a7a7;}

.articleHtml .FileCheck{background: url(../assets/images/psd_2.jpg) no-repeat; height: 157px; background-size: 100% 157px;}
.articleHtml .FileCheck ul li{color: #838383; text-indent: 2em;padding: 12px 0;}
.articleHtml .FileCheck ul li a{padding: 0 20px;color: #838383;}
.articleHtml .FileCheck ul li .tit{font: 26px/30px "微软雅黑";padding: 0;color: #000;}
.articleHtml .FileCheck ul li .blue{color: #347fb5;}

.articleHtml .pic_box{background: #FFFFFF;}
.articleHtml .pic_box li {width: 960px;margin: auto;}
.articleHtml .pic_box li img{display: block; margin: 10px auto; max-width: 900px;}
.articleHtml .footer .foot{width: 100%;margin: 0 auto;}
.articleHtml .footer div img{width: 100%;display: block; margin: auto;}
.articleHtml a{cursor: pointer;}
.articleHtml .fileTypeTad{position: fixed; top: 335px; right: 50px;}
.articleHtml .fileTypeTad p{background: #EBB563; width: 100px; height: 40px; line-height: 40px; text-align: center; color: #FFFFFF; font-size: 15px; margin: 10px 0;}
.articleHtml .fileTypeTad p.on{ background: #fbcf00;}
.vjs-custom-skin > .video-js .vjs-menu li{width: auto !important;}
</style>