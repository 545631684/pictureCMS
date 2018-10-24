<template>
  <el-container>
    <el-footer class="clearfix" style="height:auto">
      <el-input class="ma10" placeholder="请输入搜索内容" v-model="searchTXT" clearable style="width:400px;"></el-input>
      <el-select class="ma10" v-model="userName" placeholder="用户" filterable clearable style="width:200px; color: #409eff;margin-left: 20px;">
        <el-option
          v-for="item in userList"
          :key="item.uId"
          :label="item.nickname"
          :value="item.nickname">
        </el-option>
      </el-select>
      <el-select class="ma10" v-model="projectImg" placeholder="项目" filterable clearable style="width:200px; color: #409eff;margin-left: 20px;">
        <el-option
          v-for="item in projects"
          :key="item.pid"
          :label="item.xname"
          :value="item.xname">
        </el-option>
      </el-select>
      <el-select class="ma10" v-model="typeImg" placeholder="分类" filterable clearable style="width:200px;margin-left: 20px; color: #409eff;">
        <el-option
          v-for="item in types"
          :key="item.tid"
          :label="item.lname"
          :value="item.lname">
        </el-option>
      </el-select>
      <el-select v-model="minTypeImg" placeholder="小分类" filterable clearable style="width:200px;margin-left: 50px; color: #409eff;">
          <el-option
            v-for="item in minTypes2"
            :key="item.did"
            :label="item.dname"
            :value="item.dname">
          </el-option>
        </el-select>
      <el-button class="ma10" type="primary" style="margin-left: 20px;" v-on:click.stop="queryArticle()">查询</el-button>
      <el-button class="ma10" type="primary" style="margin-left: 20px;" v-on:click.stop="navSwitch('uploadImg')">上传图片</el-button>
    </el-footer>
    <el-footer style="height: auto; margin-bottom: 50px;">
      <dl v-loading="loading" class="articleList clearfix" v-if="article.lenght !== 0">
        <dd v-for="(item, index) in article" :key="item.mId">
          <p class="shrinkageImg1 clearfix" v-if="item.srcs.length === 0">
            <img v-lazy="URLS2 + 'image/timg.jpg'" width="340" height="234" id="000"/>
          </p>
          <p class="shrinkageImg1 clearfix" v-if="item.srcs.length === 1">
            <img v-lazy="returnSrc(items)" v-for="(items, index) in item.srcs" :key="index" width="340" height="234" id="111"/>
          </p>
          <p class="shrinkageImg2 clearfix" v-else-if="item.srcs.length === 2">
            <img v-lazy="returnSrc(items)" v-for="(items, index) in item.srcs" :key="index" id="222"/>
          </p>
          <p class="shrinkageImg2 clearfix" v-else-if="item.srcs.length === 3">
            <img v-lazy="returnSrc(item.srcs[0])"  id="333"/>
            <img v-lazy="returnSrc(item.srcs[1])" />
          </p>
          <p class="shrinkageImg clearfix" v-else-if="item.srcs.length === 4">
            <img v-lazy="returnSrc(items)" v-for="(items, index) in item.srcs" :key="index" id="444"/>
          </p>
          <p class="articleTime">
            <span>{{item.mId}}</span>
            <span>发布：{{formatDate(item.registerTimeImg)}}<br />最后修改：{{formatDate(item.endTimeImg)}}</span>
          </p>
          <p class="articleButton">
            <span class="omit2">{{item.title}}</span>
            <span class="">
              <!--<a v-on:click.stop="modifyArticle(item.mId)">更改</a>-->
              <!--<a v-on:click.stop="deleteArticle(item.mId)">删除</a>-->
              <router-link tag="a" class="" :to="'/article/backstage/all/' + item.mId">查看</router-link>
            </span>
          </p>
        </dd>
      </dl>
      <p class="prompt" v-if="prompt.lenght !== 0">{{prompt}}</p>
    </el-footer>
  </el-container>
</template>

<script>
import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from '../assets/js/publicAPI'
import { administrationArticleAll, administrationArticleQuery, delArticle2, userList2 } from '../assets/js/api'
export default {
  props: ['navs'],
  name: 'backstageSeeImgAll',
  data () {
    return {
      loading: true,
      types: this.$store.state.user.types,
      projects: this.$store.state.user.projects,
      minTypes: this.$store.state.user.minType,
      minTypes2: this.$store.state.user.minType,
      typeImg: '',
      projectImg: '',
      minTypeImg: '',
      userName: '',
      searchTXT: '',
      article: [],
      prompt: '',
      userList: [],
      URLS2: this.URLS2
    }
  },
  watch: {
//  projectImg: function (newQuestion, oldQuestion) {
//    console.log('projectImg')
//    this.minTypes2 = []
//    if (this.projectImg.length !== 0) {
//      let pid = this.projectImg.length !== 0 ? getProjectID(this, this.projectImg) : ''
//      let tid = this.typeImg.length !== 0 ? getTypesID(this, this.typeImg) : ''
//      if (this.typeImg.length !== 0) {
//        for (let i = 0; i < this.minTypes.length; i++) {
//        	if (pid === this.minTypes[i].pbid && tid === this.minTypes[i].tbid) {
//        	  this.minTypes2[this.minTypes2.length] = this.minTypes[i]
//        	}
//        }
//      } else {
//        for (let i = 0; i < this.minTypes.length; i++) {
//        	if (pid === this.minTypes[i].pbid) {
//        	  this.minTypes2[this.minTypes2.length] = this.minTypes[i]
//        	}
//        }
//      }
//    } else {
//      if (this.typeImg.length !== 0) {
//        for (let i = 0; i < this.minTypes.length; i++) {
//          if (getTypesID(this, this.typeImg) === this.minTypes[i].tbid) {
//            this.minTypes2[this.minTypes2.length] = this.minTypes[i]
//          }
//        }
//      } else {
//        this.minTypes2 = this.minTypes
//      }
//    }
//  },
    typeImg: function (newQuestion, oldQuestion) {
      console.log('typeImg')
      this.minTypes2 = []
//    this.minTypeImg = ''
      let pid = this.projectImg.length !== 0 ? getProjectID(this, this.projectImg) : ''
      let tid = this.typeImg.length !== 0 ? getTypesID(this, this.typeImg) : ''
      if (this.typeImg.length !== 0) {
	      for (let i = 0; i < this.minTypes.length; i++) {
	        if (tid === this.minTypes[i].tbid) {
	          this.minTypes2[this.minTypes2.length] = this.minTypes[i]
	        }
	      }
      } else {
      	this.minTypes2 = this.minTypes
      }
    },
    minTypeImg: function (newQuestion, oldQuestion) {
      console.log('minTypeImg')
      this.minTypes2 = []
      let pid = this.projectImg.length !== 0 ? getProjectID(this, this.projectImg) : ''
      let tid = this.typeImg.length !== 0 ? getTypesID(this, this.typeImg) : ''
      if (this.minTypeImg.length !== 0) {
        for (let i = 0; i < this.minTypes.length; i++) {
          if (this.minTypeImg === this.minTypes[i].dname) {
//          this.projectImg = getProjectName(this, this.minTypes[i].pbid)
//          this.typeImg = getTypesName(this, this.minTypes[i].tbid)
            pid = this.minTypes[i].pbid
            tid = this.minTypes[i].tbid
          }
        }
        for (let i = 0; i < this.minTypes.length; i++) {
          if (this.minTypes[i].pbid === pid && this.minTypes[i].tbid === tid) {
            this.minTypes2[this.minTypes2.length] = this.minTypes[i]
          }
        }
      } else if (this.minTypeImg.length === 0) {
    		this.minTypes2 = this.minTypes
      }
    },
    minTypes2: function (newQuestion, oldQuestion) {
      if (this.minTypes2.length === 0) {
        this.minTypeImg = ''
      }
    }
  },
  methods: {
    navSwitch (type) {
      type === 'uploadImg' ? this.navs.uploadImg = true : this.navs.uploadImg = false
      type === 'uploadImg2' ? this.navs.uploadImg2 = true : this.navs.uploadImg2 = false
      type === 'seeImg' ? this.navs.seeImg = true : this.navs.seeImg = false
      type === 'seeImg2' ? this.navs.seeImg2 = true : this.navs.seeImg2 = false
      type === 'seeImg3' ? this.navs.seeImg3 = true : this.navs.seeImg3 = false
      type === 'recoverySeeImg' ? this.navs.recoverySeeImg = true : this.navs.recoverySeeImg = false
      type === 'modifyImg' ? this.navs.modifyImg = true : this.navs.modifyImg = false
      type === 'rightIndex' ? this.navs.rightIndex = true : this.navs.rightIndex = false
      type === 'userInfo' ? this.navs.userInfo = true : this.navs.userInfo = false
      type === 'userPwd' ? this.navs.userPwd = true : this.navs.userPwd = false
      type === 'userList' ? this.navs.userList = true : this.navs.userList = false
      type === 'userAdd' ? this.navs.userAdd = true : this.navs.userAdd = false
      type === 'userRecovery' ? this.navs.userRecovery = true : this.navs.userRecovery = false
      type === 'projectType' ? this.navs.projectType = true : this.navs.projectType = false
    },
    deleteArticle (mid) {
      this.$confirm('此操作将删除该文件到回收站, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticle2(this, mid)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    modifyArticle (mid) {
      this.$store.commit('setUserMid', mid)
      this.$store.dispatch('setLocalStorage', this.$store.state)
      this.navSwitch('modifyImg')
    },
    queryArticle () {
      administrationArticleQuery(this)
    },
    returnSrc (src) {
      return this.URLS + src
    },
    formatDate (time) { // 时间戳转换
      if (time !== null) {
        let date = new Date(parseInt(time) * 1000)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      } else {
        return '暂无'
      }
    }
  },
  created () {
    this.types = this.$store.state.user.types
    this.projects = this.$store.state.user.projects
    administrationArticleAll(this)
    userList2(this)
  }
}
</script>

<style scoped>
  .ma10{margin-bottom: 10px;}
  .el-input--suffix{width: 200px !important;}
  .articleList{}
  .articleList dd{width: 340px; height: 382px;-moz-box-shadow:0px 0px 20px #034B43; -webkit-box-shadow:0px 0px 20px #034B43; box-shadow:0px 0px 20px #034B43;border-radius: 1em; float: left; margin: 10px 10px 50px;}
  .articleList dd .shrinkageImg{}
  .articleList dd .shrinkageImg1 img{max-width: 100%; width: 340px;height: 234px; display: block;border-radius: 1em;}
  .articleList dd .shrinkageImg2 img{max-width: 100%; width: 170px;height: 234px; display: block;float: left;}
  .articleList dd .shrinkageImg2 img:nth-child(1){border-radius: 1em 0 0 1em;}
  .articleList dd .shrinkageImg2 img:nth-child(2){border-radius:0 1em 1em 0;}
  .articleList dd .shrinkageImg img{max-width: 100%; width: 170px;height: 116px; display: block; float: left;}
  .articleList dd .shrinkageImg img:nth-child(1){border-radius: 1em 0 0 0;}
  .articleList dd .shrinkageImg img:nth-child(2){border-radius: 0 1em 0 0;}
  .articleList dd .shrinkageImg img:nth-child(3){border-radius: 0  0 0 1em;}
  .articleList dd .shrinkageImg img:nth-child(4){border-radius: 0  0 1em 0;}
  .articleList dd .articleTime{width:100%;height: 60px;line-height: 60px;    padding: 10px 0;}
  .articleList dd .articleTime span{display: block;float: left;height: 60px; width: 40%;color: #2f6d66;}
  .articleList dd .articleTime span:nth-child(1){font-weight: bold; font-size: 40px;  text-indent: .5em; line-height: 60px;}
  .articleList dd .articleTime span:nth-child(2){ text-align: right; line-height: 30px;width: 55%;padding-right: 5%;    font-size: 12px;}
  .articleList dd .articleButton{width:100%;height: 70px;}
  .articleList dd .articleButton span{display: block;float: left;height: 70px; width: 50%;color: #2f6d66;}
  .articleList dd .articleButton span:nth-child(1){font-weight: bold; font-size: 16px; text-align: justify; width: 46%; line-height:24px;    padding: 0 2%;}
  .articleList dd .articleButton span:nth-child(2){ text-align: right; line-height: 30px;}
  .articleList dd .articleButton span:nth-child(2) a{display: block; float: left; width: 33%; text-align: center; color: #FFFFFF; margin-top: 40px; cursor: pointer;}
  .articleList dd .articleButton span:nth-child(2) a:nth-child(1){background: #00bca8;border-radius:  1em 0 0 0;}
  .articleList dd .articleButton span:nth-child(2) a:nth-child(2){background: #f56c6c;}
  .articleList dd .articleButton span:nth-child(2) a:nth-child(3){width: 34%; background: #67c23a; border-radius: 0 0 1em 0;}
  .prompt{height: 100px;text-align: center;line-height: 100px;font-size: 20px;}
</style>
