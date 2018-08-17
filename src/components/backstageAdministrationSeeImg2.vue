<template>
  <el-container>
    <el-header>
      <div class="tab clearfix">
        <p>项目：</p>
        <ul>
          <li :class="{on:num1 === ''}" @click="tab1('', '全部', '')">全部</li>
          <li v-for="(item, index) in projects" :key="index" :class="{on:index === num1}" v-on:click.stop="tab1(index, item.xname, item.pid)">{{item.xname}}</li>
        </ul>
      </div>
      <div class="tab clearfix">
        <p>分类：</p>
        <ul>
          <li :class="{on:num2 === ''}" @click="tab2('', '全部', '')">全部</li>
          <li v-for="(item, index) in types" :key="index" :class="{on:index === num2}" v-on:click.stop="tab2(index, item.lname, item.tid)">{{item.lname}}</li>
        </ul>
      </div>
      <div class="tab clearfix" style="margin-bottom: 50px;">
        <p>小分类：</p>
        <ul :class="{omit:showtype}">
          <li :class="{on:num3 === ''}" @click="tab3('', '全部', '', '', '')">全部</li>
          <li v-for="(item, index) in minTypes2" :key="index" :class="{on:index === num3}" v-on:click.stop="tab3(index, item.dname, item.did, item.tbid, item.pbid)" v-html="item.dname"></li>
          <li class="clearfix"></li>
          <a class="el-button--default is-plain" v-show="showtype" v-on:click.stop="showMinType()">点击查看全部小分类</a>
          <a class="el-button--default is-plain" v-show="!showtype" v-on:click.stop="hideMinType()">收起</a>
        </ul>
      </div>
      <el-table v-loading="loading" :data="article3" style="width: 100% !important;">
        <el-table-column prop="mId" label="id" width="50" align="center"></el-table-column>
        <el-table-column prop="img" label="缩略图" width="100" align="left">
          <template scope="scope" v-if="scope.row.img === ''">暂无图片</template>
          <template scope="scope" v-if="scope.row.img !== ''">
            <img :src="URLS2 + scope.row.img[0].url" alt="" width="90" height="100"/>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="400" align="left"></el-table-column>
        <el-table-column prop="registerTimeImg" label="创建时间" align="center" width="160">
          <template scope="scope">
            {{formatDate(scope.row.registerTimeImg)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <a :href="'/#/article/backstage/all/' + scope.row.mId" target="_blank" style="margin-right: 10px;"><el-button type="success" size="mini" plain>查看</el-button></a>
            <el-button type="primary" size="mini" v-on:click.stop="modifyArticle(scope.row.mId)" plain>更改</el-button>
            <el-button type="danger" size="mini" v-on:click.stop="deleteArticle(scope.row.mId)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="width: 470px;margin: 0 0 0 20%;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="dataList"
          layout="total, prev, pager, next"
          :total="article2.length">
        </el-pagination>
      </div>
    </el-header>
  </el-container>
</template>

<script>
import { formatDate, getProjectID, getProjectName, getTypesID, getTypesName } from '../assets/js/publicAPI'
import { administrationArticleAll, administrationArticleQuery, delArticle2, userList2 } from '../assets/js/api'
export default {
  props: ['navs'],
  name: 'backstageAdministrationSeeImg2',
  data () {
    return {
      loading: true,
      types: this.$store.state.user.types,
      projects: this.$store.state.user.projects,
      minTypes: this.$store.state.user.minType,
      minTypes2: this.$store.state.user.minType,
      article: [],
      article2: [],
      article3: [],
      URLS2: this.URLS2,
      num1: '',
      num2: '',
      num3: '',
      xname: {
        id: '',
        name: '',
        index: ''
      },
      lname: {
        id: '',
        name: '',
        index: ''
      },
      dnames: {
        pbid: '',
        tbid: '',
        did: '',
        name: '',
        index: ''
      },
      showtype: true,
      currentPage1: 1,
      dataList: 5,
      
    }
  },
  watch: {
    article:function (newQuestion, oldQuestion) {
      this.article2 = this.article
      for (let d = 0; d < this.article.length; d++) {
        if (d < this.dataList) {
          this.$set(this.article3, this.article3.length, this.article[d])
        }
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log('每页 ' + val + '条');
    },
    handleCurrentChange(val) {
      console.log('当前页: ' + val)
      // 抓取数据下标开始位置
      let begin = (this.dataList * val) - this.dataList
      // 抓取数据下标开结束位置
      let end = (this.dataList * val) - 1
      // 清空当前页显示数据
      this.article3 = []
      // 循环抓取从起始位置到结束位置的数据
      for (let o = 0; o < this.article2.length; o++) {
        if (o >= begin && o <= end) {
          this.$set(this.article3, this.article3.length, this.article2[o])
        }
      }
    },
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
    tab1 (index, name, pid) {
      console.log('进入项目')
      if (name !== '全部') {
        this.num1 = index
        this.xname.id = pid
        this.xname.name = name
        this.xname.index = index
      } else {
        this.num1 = ''
        this.xname.id = ''
        this.xname.name = ''
        this.xname.index = ''
      }
      this.setdata()
    },
    tab2 (index, name, tid) {
      console.log('进入分类')
      if (name !== '全部') {
        this.num2 = index
        this.lname.id = tid
        this.lname.name = name
        this.lname.index = index
      } else {
        this.num2 = ''
        this.lname.id = ''
        this.lname.name = ''
        this.lname.index = ''
      }
      this.setdata()
    },
    tab3 (index, name, did, tbid, pbid) {
      console.log('进入小分类')
      if (name !== '全部') {
        this.num3 = index
        this.dnames.pbid = pbid
        this.dnames.tbid = tbid
        this.dnames.did = did
        this.dnames.name = name
        this.dnames.index = index
      } else {
        this.num3 = ''
        this.dnames.pbid = ''
        this.dnames.tbid = ''
        this.dnames.did = ''
        this.dnames.name = ''
        this.dnames.index = ''
      }
      this.setdata()
    },
    resetTab () {
      this.num1 = ''
      this.xname.id = ''
      this.xname.name = ''
      this.xname.index = ''
      this.num2 = ''
      this.lname.id = ''
      this.lname.name = ''
      this.lname.index = ''
    },
    showMinType () {
      this.setdata()
      this.showtype = false
    },
    hideMinType () {
      this.setdata()
      this.showtype = true
    },
    setdata () {
      console.log(this.dnames)
      this.minTypes2 = []
      if (this.xname.id === '' && this.lname.id === '' && this.dnames.did === '') {
        for (let a = 0; a < this.minTypes.length; a++) {
          this.minTypes2[this.minTypes2.length] = this.minTypes[a]
        }
      } else if (this.xname.id !== '' && this.lname.id === '' && this.dnames.did === '') {
        for (let b = 0; b < this.minTypes.length; b++) {
          if (this.xname.id === this.minTypes[b].pbid) {
            this.minTypes2[this.minTypes2.length] = this.minTypes[b]
          }
        }
      } else if (this.xname.id === '' && this.lname.id !== '' && this.dnames.did === '') {
        for (let c = 0; c < this.minTypes.length; c++) {
          if (this.lname.id === this.minTypes[c].tbid) {
            this.minTypes2[this.minTypes2.length] = this.minTypes[c]
          }
        }
      } else if (this.xname.id === '' && this.lname.id === '' && this.dnames.did !== '') {
        this.resetTab()
        this.minTypes2 = this.minTypes
      } else if (this.xname.id !== '' && this.lname.id !== '' && this.dnames.did === '') {
        for (let d = 0; d < this.minTypes.length; d++) {
          if (this.xname.id === this.minTypes[d].pbid && this.lname.id === this.minTypes[d].tbid) {
            this.minTypes2[this.minTypes2.length] = this.minTypes[d]
          }
        }
      } else if (this.xname.id === '' && this.lname.id !== '' && this.dnames.did !== '') {
        for (let e = 0; e < this.minTypes.length; e++) {
          if (this.lname.id === this.minTypes[e].tbid) {
            this.minTypes2[this.minTypes2.length] = this.minTypes[e]
          }
        }
      } else if (this.xname.id !== '' && this.lname.id === '' && this.dnames.did !== '') {
        for (let f = 0; f < this.minTypes.length; f++) {
          if (this.xname.id === this.minTypes[f].pbid) {
            this.minTypes2[this.minTypes2.length] = this.minTypes[f]
          }
        }
      } else if (this.xname.id !== '' && this.lname.id !== '' && this.dnames.did !== '') {
        for (let g = 0; g < this.minTypes.length; g++) {
          if (this.xname.id === this.minTypes[g].pbid && this.lname.id === this.minTypes[g].tbid) {
            this.minTypes2[this.minTypes2.length] = this.minTypes[g]
          }
        }
      }
      this.getArticle(this.xname.id, this.lname.id, this.dnames.did)
    },
    getArticle (xid, tid, did) {
      this.article2 = []
      this.article3 = []
      if (xid === '' && tid === '' && did === '') {
        for (let h = 0; h < this.article.length; h++) {
          this.$set(this.article2, this.article2.length, this.article[h])
//        this.article2[this.article2.length] = this.article[h]
        }
      } else if (xid !== '' && tid === '' && did === '') {
        for (let i = 0; i < this.article.length; i++) {
          if (xid === this.article[i].projectid) {
            this.$set(this.article2, this.article2.length, this.article[i])
//          this.article2[this.article2.length] = this.article[i]
          }
        }
      } else if (xid === '' && tid !== '' && did === '') {
        for (let j = 0; j < this.article.length; j++) {
          if (tid === this.article[j].typeid) {
            this.$set(this.article2, this.article2.length, this.article[j])
//          this.article2[this.article2.length] = this.article[j]
          }
        }
      } else if (xid === '' && tid === '' && did !== '') {
        for (let k = 0; k < this.article.length; k++) {
          if (did === this.article[k].detailsid) {
            this.$set(this.article2, this.article2.length, this.article[k])
//          this.article2[this.article2.length] = this.article[k]
          }
        }
      } else if (xid !== '' && tid !== '' && did === '') {
        for (let l = 0; l < this.article.length; l++) {
          if (xid === this.article[l].projectid && tid === this.article[l].typeid) {
            this.$set(this.article2, this.article2.length, this.article[l])
//          this.article2[this.article2.length] = this.article[l]
          }
        }
      } else if (xid === '' && tid !== '' && did !== '') {
        for (let m = 0; m < this.article.length; m++) {
          if (did === this.article[m].detailsid && tid === this.article[m].typeid) {
            this.$set(this.article2, this.article2.length, this.article[m])
//          this.article2[this.article2.length] = this.article[m]
          }
        }
      } else if (xid !== '' && tid === '' && did !== '') {
        for (let n = 0; n < this.article.length; n++) {
          if (did === this.article[n].detailsid && xid === this.article[n].projectid) {
            this.$set(this.article2, this.article2.length, this.article[n])
//          this.article2[this.article2.length] = this.article[n]
          }
        }
      } else if (xid !== '' && tid !== '' && did !== '') {
        for (let o = 0; o < this.article.length; o++) {
          if (did === this.article[o].detailsid && xid === this.article[o].projectid && tid === this.article[o].typeid) {
            this.$set(this.article2, this.article2.length, this.article[o])
//          this.article2[this.article2.length] = this.article[o]
          }
        }
      }
      for (let o = 0; o < this.article2.length; o++) {
        if (o < this.dataList) {
          this.$set(this.article3, this.article3.length, this.article2[o])
        }
      }
    },
    formatDate (time) { // 时间戳转换
      if (time !== null) {
        let date = new Date(parseInt(time) * 1000)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      } else {
        return '暂无'
      }
    },
    modifyArticle (mid) {
      this.$store.commit('setUserMid', mid)
      this.$store.dispatch('setLocalStorage', this.$store.state)
      this.navSwitch('modifyImg')
    },
    deleteArticle (mid) {
      this.$confirm('此操作将删除该文件到回收站, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticle2(this, mid)
        this.article3 = []
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    administrationArticleAll(this)
  }
}
</script>

<style scoped>
.omit{text-overflow:ellipsis; overflow:hidden; white-space:nowrap; height: 30px !important;}
.clearfix:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.el-header{background: none; height: auto !important; padding-bottom: 40px;}
.tab{width: 100%; height: auto; min-height: 30px; margin-bottom: 20px; position: relative;}
.tab p{font-weight: 400;color: #1f2f3d;font-size: 20px;margin: 0; float: left; width: 6%;}
.tab ul{float: left;width: 94%; height: auto;}
.tab ul li{float: left; height: 30px; line-height: 30px; margin: 0 10px;cursor: pointer;}
.tab ul li:hover{color: #409eff; font-weight: bold;}
.tab ul a{position: absolute;bottom: -40px;left: 44%;width: 160px;display: inline-block;line-height: 30px;white-space: nowrap;cursor: pointer;background: #fff;border: 1px solid #dcdfe6;border-top-color: rgb(220, 223, 230);border-right-color: rgb(220, 223, 230);border-bottom-color: rgb(220, 223, 230);border-left-color: rgb(220, 223, 230);border-color: #dcdfe6;color: #606266;-webkit-appearance: none;text-align: center;-webkit-box-sizing: border-box;box-sizing: border-box;outline: none;margin: 0;-webkit-transition: .1s;transition: .1s;font-weight: 500;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;font-size: 14px;border-radius: 4px;}
.tab ul a:hover{background: #fff;border-color: #409eff;color: #409eff;}
.tab ul li.on{color: #fff;background-color: #409eff;border-color: #f56c6c; display: inline-block;white-space: nowrap;cursor: pointer;border: 1px solid #dcdfe6;-webkit-appearance: none;text-align: center;-webkit-box-sizing: border-box;box-sizing: border-box; outline: 0; margin: 0;-webkit-transition: .1s;transition: .1s;font-weight: 500;padding: 5px 10px;font-size: 14px;border-radius: 4px;line-height: 20px;}
table{ width: 100% !important;}
</style>

<style>
  .el-pagination span:not([class*=suffix]){float: right !important;}
  .cell{padding: 0 !important;}
</style>
