<template>
  <el-container style="margin: 50px 0px;" v-loading="loading2">
    <el-footer>
      <div class="title" >
        <span>标题：</span>
        <el-input placeholder="请输入标题" v-model="article.title" clearable v-on:blur="titleRepeat"></el-input>
        <span class="true" v-if="titleCf && titleDiv"><img src="../assets/images/true.png" alt="" />没有重复，可正常使用</span>
        <span class="fales" v-if="!titleCf && titleDiv"><img src="../assets/images/fales.png" alt="" />标题重复，请重新填写</span>
      </div>
    </el-footer>
    <el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
      <div class="title" >
        <span>分类：</span>
        <el-select v-model="article.xname" placeholder="请选择项目" filterable clearable style="width:200px; color: #409eff;">
          <el-option
            v-for="item in projects"
            :key="item.pid"
            :label="item.xname"
            :value="item.xname">
          </el-option>
        </el-select>
        <el-select v-model="article.lname" placeholder="请选择分类" filterable clearable style="width:200px;margin-left: 50px; color: #409eff;">
          <el-option
            v-for="item in types"
            :key="item.tid"
            :label="item.lname"
            :value="item.lname">
          </el-option>
        </el-select>
        <el-select v-model="minTypeImg" placeholder="请选择小分类" filterable clearable style="width:200px;margin-left: 50px; color: #409eff;">
          <el-option
            v-for="item in minTypes2"
            :key="item.did"
            :label="item.dname"
            :value="item.dname">
          </el-option>
        </el-select>
      </div>
    </el-footer>
    <el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
      <div class="title" ><span>描述：</span><el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="article.describe"></el-input></div>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
      <p class="imgName" >图片：</p>
      <div class="imgs" v-if="imgDiv">
        <ul class="el-upload-list el-upload-list--picture-card" style="float: left;" v-if="article.img.length !== 0">
          <li tabindex="0" class="el-upload-list__item is-success" v-for="(item, index) in article.img" :key="index">
            <img :src="URLS2 + item.url" alt="" class="el-upload-list__item-thumbnail">
            <a class="el-upload-list__item-name"><i class="el-icon-document"></i>13-1F51QS039532.jpg</a>
            <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
            <i class="el-icon-close"></i><i class="el-icon-close-tip">按 delete 键可删除</i>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview2(item.url)"><i class="el-icon-zoom-in"></i></span>
              <span class="el-upload-list__item-delete" @click="handleRemove2(item.url)"><i class="el-icon-delete"></i></span>
            </span>
          </li>
        </ul>
        <el-upload
          style="width: 156px;height: 148px;float: left;"
          :limit="200"
          :multiple="true"
          ref="fliesImg"
          accept=".jpg,.png,.gif"
          :action="action + '?id=1'"
          list-type="picture-card"
          :show-file-list="false"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess3"
          :on-remove="handleRemoveImg"
          :on-change="obtainImgSrc"
          >
          <div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传图片<br />（.jpg/.png/.gif）</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="imgs" v-if="!imgDiv">
        <el-upload
          :limit="20"
          ref="fliesImg"
          accept=".jpg,.png,.gif"
          :action="action + '?id=1'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemoveImg"
          :on-change="obtainImgSrc"
          >
          <div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传图片<br />（.jpg/.png/.gif）</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
      <p class="imgName" >PSD：</p>
      <div class="imgs" style="width: 50%;">
        <el-upload
          class="upload-demo2"
          :limit="10"
          :multiple="true"
          accept=".psd"
          :action="action + '?id=4'"
          :on-remove="handleRemovePsd"
          :on-change="obtainImgSrc">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <dl class="psdList" v-if="article.psd.psdFile !== []">
        	<dd v-for="(item, index) in article.psd.psdFile" :key="index">
        	  <span>{{item.name}}</span>
        	  <a :href="URLS2 + item.url" :download="item.name"><i class="el-icon-download"></i></a>
        	  <samp  @click="handleRemove3('', item.url, 'psd')"><i class="el-icon-circle-close"></i></samp>
        	</dd>
        </dl>
      </div>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
      <p class="imgName" >视频：</p>
      <div class="imgs" style="width: 50%;" v-if="videoDiv">
        <ul class="el-upload-list el-upload-list--picture-card" style="float: left;" >
          <li tabindex="0" class="el-upload-list__item is-success">
            <img :src="URLS2 + article.video.videoImg.url" alt="" class="el-upload-list__item-thumbnail">
            <a class="el-upload-list__item-name"><i class="el-icon-document"></i>13-1F51QS039532.jpg</a>
            <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
            <i class="el-icon-close"></i><i class="el-icon-close-tip">按 delete 键可删除</i>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview2(article.video.videoImg.url)"><i class="el-icon-zoom-in"></i></span>
              <span class="el-upload-list__item-delete" @click="handleRemove3(article.video.videoImg.url, article.video.videoFile[0].url, 'video')"><i class="el-icon-delete"></i></span>
            </span>
          </li>
        </ul>
        <p class="navs">
          <el-button class="download" type="danger" @click="handleRemove3(article.video.videoImg.url, article.video.videoFile[0].url, 'video')">删除重新上传</el-button>
          <a :href="URLS2 + article.video.videoImg.url" :download="article.video.videoImg.name" class="download el-button el-button--primary">点击下载缩略图</a>
          <a :href="URLS2 + article.video.videoFile[0].url" :download="article.video.videoFile[0].name" class="download el-button el-button--primary">点击下载文件</a>
        </p>
      </div>
      <div class="imgs" style="width: 20%;" v-if="!videoDiv">
        <el-upload
          class="avatar-uploader uploadImg"
          :limit="20"
          ref="videoImg"
          accept=".jpg,.png"
          :action="action + '?id=5'"
          :show-file-list="false"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload2"
          :on-change="obtainImgSrc">
          <img v-if="videoImageUrlls" :src="videoImageUrlls" class="avatar">
          <div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传视频缩略图（.jpg/.png）</div>
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview2(article.video.videoImg)"><i class="el-icon-zoom-in"></i></span>
            <span class="el-upload-list__item-delete" @click="handleRemove3(article.video.videoImg, article.video.videoFile[0].url, 'video')"><i class="el-icon-delete"></i></span>
          </span>
        </el-upload>
      </div>
      <div class="imgs" style="width: 20%;" v-if="!videoDiv">
        <el-upload
          style="margin-top: 44px;"
          :limit="1"
          ref="videoFile"
          accept=".mp4,.flv"
          class="upload-demo"
          :action="action + '?id=6'"
          :on-remove="handleRemoveVideo"
          :on-change="obtainImgSrc">
          <el-button size="small" type="primary">点击上传视频文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频格式文件，文件大小不要超过1GB<br />建议上传格式：.mp4、.flv （支持在线播放）</div>
        </el-upload>
      </div>
    </el-footer>
    <el-row class="buttonImg">
      <el-button type="primary" v-on:click.stop="submitImg" :loading="loading">提交修改</el-button>
      <el-button v-on:click.stop="navSwitch('seeImg2')">返回列表页</el-button>
    </el-row>
  </el-container>
</template>

<script>
import { deleteTemporaryFile2, addImgsFile2, queryTitle2, exhibitionDetails } from '../assets/js/api'
import { getProjectID, getProjectName, getTypesID, getTypesName, getMinTypesName, getMinTypesID } from '../assets/js/publicAPI'
export default {
  props: ['navs'],
  name: 'UploadImg',
  data () {
    return {
      loading: false,
      loading2: true,
      title: '',
      titleCf: false,
      titleDiv: false,
      describe: '',
      dialogImageUrl: '',
      dialogVisible: false,
      imgDiv: false,
      psdDiv: false,
      videoDiv: false,
      imgCrsString: '',
      action: this.URLS + '/index.php/Home/Index/upfile',
      types: this.$store.state.user.types,
      projects: this.$store.state.user.projects,
      minTypes: this.$store.state.user.minType,
      minTypes2: this.$store.state.user.minType,
      typeImg: '',
      projectImg: '',
      minTypeImg: '',
      psdImageUrlls: '',
      videoImageUrlls: '',
      article: {
        HeadPortraitSrc: '',
        Password: '',
        Verification: '',
        click: '',
        describe: '',
        endTime: '',
        endTimeImg: '',
        img: [],
        lname: '',
        mId: '',
        nickname: '',
        permissions: '',
        pid: '',
        projectid: '',
        psd: {
          psdFile: []
        },
        registerTime: '',
        registerTimeImg: '',
        sex: '',
        state: '',
        tid: '',
        title: '',
        typeid: '',
        uId: '',
        userName: '',
        video: {
          videoFile: [],
          videoImg: {size: '', name: '', url: '', type: '', File: {}}
        },
        xname: '',
        did: '',
        dname: ''
      },
      uploadingFiles: [],
      deleteFiles: [],
      release: false,
      URLS2: this.URLS2
    }
  },
  watch: {
    projectImg: function (newQuestion, oldQuestion) {
      console.log('projectImg')
      this.minTypes2 = []
      if (this.projectImg.length !== 0) {
        let pid = this.projectImg.length !== 0 ? getProjectID(this, this.projectImg) : ''
        let tid = this.typeImg.length !== 0 ? getTypesID(this, this.typeImg) : ''
        if (this.typeImg.length !== 0) {
          for (let i = 0; i < this.minTypes.length; i++) {
            if (pid === this.minTypes[i].pbid && tid === this.minTypes[i].tbid) {
              this.minTypes2[this.minTypes2.length] = this.minTypes[i]
            }
          }
        } else {
          for (let i = 0; i < this.minTypes.length; i++) {
            if (pid === this.minTypes[i].pbid) {
              this.minTypes2[this.minTypes2.length] = this.minTypes[i]
            }
          }
        }
      } else {
        if (this.typeImg.length !== 0) {
          for (let i = 0; i < this.minTypes.length; i++) {
            if (getTypesID(this, this.typeImg) === this.minTypes[i].tbid) {
              this.minTypes2[this.minTypes2.length] = this.minTypes[i]
            }
          }
        } else {
          this.minTypes2 = this.minTypes
        }
      }
    },
    typeImg: function (newQuestion, oldQuestion) {
      console.log('typeImg')
      this.minTypes2 = []
      let pid = this.projectImg.length !== 0 ? getProjectID(this, this.projectImg) : ''
      let tid = this.typeImg.length !== 0 ? getTypesID(this, this.typeImg) : ''
      if (this.typeImg.length !== 0) {
        if (this.projectImg.length !== 0) {
          // this.minTypeImg = ''
          for (let i = 0; i < this.minTypes.length; i++) {
            if (pid === this.minTypes[i].pbid && tid === this.minTypes[i].tbid) {
              this.minTypes2[this.minTypes2.length] = this.minTypes[i]
            }
          }
        } else {
          for (let i = 0; i < this.minTypes.length; i++) {
            if (tid === this.minTypes[i].tbid) {
              this.minTypes2[this.minTypes2.length] = this.minTypes[i]
            }
          }
        }
      } else {
        if (this.projectImg.length !== 0) {
          for (let i = 0; i < this.minTypes.length; i++) {
            if (getProjectID(this, this.projectImg) === this.minTypes[i].pbid) {
              this.minTypes2[this.minTypes2.length] = this.minTypes[i]
            }
          }
        } else {
          this.minTypes2 = this.minTypes
        }
      }
    },
    minTypeImg: function (newQuestion, oldQuestion) {
      console.log(typeof getMinTypesID(this, this.minTypeImg))
      this.minTypes2 = []
      let pid = this.projectImg.length !== 0 ? getProjectID(this, this.projectImg) : ''
      let tid = this.typeImg.length !== 0 ? getTypesID(this, this.typeImg) : ''
      if (this.minTypeImg.length !== 0) {
        this.article.dname = this.minTypeImg
        this.article.did = getMinTypesID(this, this.minTypeImg)
        for (let i = 0; i < this.minTypes.length; i++) {
          if (this.minTypeImg === this.minTypes[i].dname) {
            this.projectImg = getProjectName(this, this.minTypes[i].pbid)
            this.typeImg = getTypesName(this, this.minTypes[i].tbid)
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
        this.article.dname = ''
        this.article.did === ''
        if (this.projectImg.length !== 0) {
          if (this.typeImg.length !== 0) {
            for (let i = 0; i < this.minTypes.length; i++) {
              if (pid === this.minTypes[i].pbid && tid === this.minTypes[i].tbid) {
                this.minTypes2[this.minTypes2.length] = this.minTypes[i]
              }
            }
          } else {
            for (let i = 0; i < this.minTypes.length; i++) {
              if (pid === this.minTypes[i].pbid) {
                this.minTypes2[this.minTypes2.length] = this.minTypes[i]
              }
            }
          }
        } else {
          this.minTypes2 = this.minTypes
        }
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
      if (this.$store.state.user.permissions === '1') {
        type = 'seeImg'
      } else if (this.$store.state.user.permissions === '2') {
        type = 'seeImg2'
      }
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
    obtainImgSrc (file, fileList) { // 获取上传图片的服务器端实际路径地址并保存到数组中
      let srcBoolean = false
      if (file.response !== undefined) {
        console.log(file.response.dataImg)
        if (file.response.type === '1') {
          if (this.article.img.length !== 0) {
            for (let i = 0; this.article.img.length > i; i++) {
              if (this.article.img[i].url === file.response.dataImg) {
                return
              } else {
                srcBoolean = true
              }
            }
          } else {
            srcBoolean = true
          }
          if (srcBoolean) {
            this.article.img[this.article.img.length] = {
              size: file.size,
              name: file.name,
              url: file.response.dataImg,
              type: file.raw.type,
              File: file.raw
            }
            this.uploadingFiles[this.uploadingFiles.length] = file.response.dataImg
          }
        } else if (file.response.type === '4') {
          this.addPsdFile({size: file.size, name: file.name, url: file.response.dataPsd, type: 'image/x-photoshop', File: file.raw})
          this.uploadingFiles[this.uploadingFiles.length] = file.response.dataPsd
        } else if (file.response.type === '5') {
          this.article.video.videoImg = {
            size: file.size,
            name: file.name,
            url: file.response.dataVideoImg,
            type: file.raw.type,
            File: file.raw
          }
          this.uploadingFiles[this.uploadingFiles.length] = file.response.dataVideoImg
        } else if (file.response.type === '6') {
          this.article.video.videoFile[this.article.video.videoFile.length] = {
            size: file.size,
            name: file.name,
            url: file.response.dataVideo,
            type: file.raw.type,
            File: file.raw
          }
          this.uploadingFiles[this.uploadingFiles.length] = file.response.dataVideo
        }
      }
      console.log(this.article)
    },
    handleRemoveImg (file, fileList) { // 删除上传的文件img
      this.deleteFiles[this.deleteFiles.length] = file.response.dataImg
      // this.handleRemove2(file.response.dataImg)
      console.log(this.article)
    },
    handleRemovePsd (file, fileList) { // 删除上传的文件psd
      this.deleteFiles[this.deleteFiles.length] = file.response.dataPsd
      this.article.psd.psdFile = []
      // let srcs = []
      // srcs[0] = file.response.dataImg
      // deleteTemporaryFile2(this, srcs, 'psd')
      // console.log(this.article)
    },
    handleRemoveVideo (file, fileList) { // 删除上传的文件video
      console.log(file)
      this.deleteFiles[this.deleteFiles.length] = file.response.dataVideo
      this.article.video.videoFile = []
      // let srcs = []
      // srcs[0] = file.response.dataImg
      // deleteTemporaryFile2(this, srcs, 'video')
      // console.log(this.article)
    },
    handleRemove2 (src) { // 删除上传的图片
      let num = []
      let srcs = []
      srcs[0] = src
      for (let i = 0; i < this.article.img.length; i++) {
        if (this.article.img[i].url === src) {
          this.article.img[i].url = '1'
        }
      }
      for (let j = 0; j < this.article.img.length; j++) {
        if (this.article.img[j].url !== '1') {
          num[num.length] = this.article.img[j]
        }
      }
      this.article.img = num
      num = []
      this.deleteFiles[this.deleteFiles.length] = src
      // deleteTemporaryFile2(this, srcs, 'img')
      console.log(this.article)
    },
    handleRemove3 (Img, File, type) { // 删除上传的psd/video
      let srcs = []
      srcs[0] = Img
      srcs[1] = File
      console.log('删除的' + type +'文件名称：' + Img + '////' + File)
      if (type === 'psd') {
        this.deleteFilesMethod(File, 'psdFile')
        // this.article.psd.psdFile = ''
        this.article.psd.psdFile.length === 0 ? this.psdDiv = false : this.psdDiv = true
      } else if (type === 'video') {
        this.deleteFilesMethod(File, 'videoFile')
        // this.article.video.videoFile = ''
        this.article.video.videoImg = {size: '', name: '', url: '', type: '', File: {}}
        this.article.video.videoFile.length === 0 ? this.videoDiv = false : this.videoDiv = true
      }
      this.deleteFiles[this.deleteFiles.length] = Img
      this.deleteFiles[this.deleteFiles.length] = File
      // deleteTemporaryFile2(this, srcs, type)
      console.log(this.article)
    },
    deleteFilesMethod (src, type) {
      let num = []
      if (type === 'psdFile') {
        for (let i = 0; i < this.article.psd.psdFile.length; i++) {
          this.article.psd.psdFile[i] = this.article.psd.psdFile[i].url === src ? '' : this.article.psd.psdFile[i]
        }
        for (let i = 0; i < this.article.psd.psdFile.length; i++) {
          if (this.article.psd.psdFile[i].length !== 0) {
            num[i] = this.article.psd.psdFile[i]
          }
        }
        this.article.psd.psdFile = num
      } else if (type === 'videoFile') {
        console.log(src)
        for (let i = 0; i < this.article.video.videoFile.length; i++) {
          this.article.video.videoFile[i] = this.article.video.videoFile[i].url === src ? '' : this.article.video.videoFile[i]
        }
        for (let i = 0; i < this.article.video.videoFile.length; i++) {
          if (this.article.video.videoFile[i].length !== 0) {
            num[i] = this.article.video.videoFile[i]
          }
        }
        this.article.video.videoFile = num
      }
      num = []
    },
    addPsdFile (obj) {
      let psdFile = false
      for (let i = 0; this.article.psd.psdFile.length > i; i++) {
        if (this.article.psd.psdFile[i].url === obj.url) {
          console.log('进来了' + psdFile)
          psdFile = true
        }
      }
      if (!psdFile) {
        this.$set(this.article.psd.psdFile, this.article.psd.psdFile.length, obj)
      }
    },
    handlePictureCardPreview (file) { // 查看上传的图片
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview2 (file) { // 查看上传的图片
      this.dialogImageUrl = this.URLS + file
      this.dialogVisible = true
    },
    submitImg () { // 发布用户文章，把数组中的路径拼接成字符串,以及Uid、title发送给后台接口
      console.log(this.article)
      for (let i = 0; this.article.img.length > i; i++) {
        this.imgCrsString += this.article.img[i].url + ','
      }
      for (let i = 0; this.types.length > i; i++) {
        if (this.article.lname === this.types[i].lname) {
          this.article.tid = this.types[i].tid
        }
      }
      for (let i = 0; this.projects.length > i; i++) {
        if (this.article.xname === this.projects[i].xname) {
          this.article.pid = this.projects[i].pid
        }
      }
      console.log('tid:' + this.article.tid + 'pid:' + this.article.pid)
      if (this.article.title.length === 0) {
        this.$alert('请填写标题', '警告', {confirmButtonText: '确定'})
      } else if (this.titleCf === false && this.titleDiv === true) {
        this.$alert('标题重复', '警告', {confirmButtonText: '确定'})
      } else if (this.article.xname.length === 0) {
        this.$alert('请选择项目类型', '警告', {confirmButtonText: '确定'})
      } else if (this.article.lname.length === 0) {
        this.$alert('请选择项目下的小类别', '警告', {confirmButtonText: '确定'})
      } else if (this.article.dname.length === 0 && this.article.detailsid.length) {
        this.$alert('请填写描述内容', '警告', {confirmButtonText: '确定'})
      } else if (this.article.img.length === 0 && this.article.psd.psdFile.length === 0 && this.article.video.videoImg.url.length === 0 && this.article.video.videoFile.length === 0) {
        this.$alert('请添加需要上传的图片/PSD/视频文件', '警告', {confirmButtonText: '确定'})
      } else if (this.article.psd.psdFile.length !== 0 && this.article.img.length === 0) {
        this.$alert('请添加psd缩略图，在图片里添加', '警告', {confirmButtonText: '确定'})
      } else if (this.article.video.videoImg.url.length !== 0 && this.article.video.videoFile.length === 0) {
        this.$alert('请完整添加视频文件和缩略图', '警告', {confirmButtonText: '确定'})
      } else if (this.article.video.videoImg.url.length === 0 && this.article.video.videoFile.length !== 0) {
        this.$alert('请完整添加视频文件和缩略图', '警告', {confirmButtonText: '确定'})
      } else {
        this.loading = true
        this.article.psd = this.article.psd.psdFile.length !== 0 ? this.article.psd : 'f'
        this.article.video = this.article.video.videoFile.length !== 0 && this.article.video.videoImg.url.length !== 0 ? this.article.video : 'f'
        addImgsFile2(this)
      }
    },
    handleAvatarSuccess (res, file) {
      this.psdImageUrlls = URL.createObjectURL(file.raw)
    },
    handleAvatarSuccess3 (res, file, fileList) {
      this.dialogImageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess2 (res, file) {
      this.videoImageUrlls = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload2 (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    titleRepeat () {
      if (this.title.length !== 0) {
        queryTitle2(this.title, this.article.mId, this)
      }
    }
  },
  created () {
    this.types = this.$store.state.user.types
    this.projects = this.$store.state.user.projects
    exhibitionDetails(this, this.$store.state.mId)
  },
  beforeDestroy () {
    if (this.release === false) {
      deleteTemporaryFile2(this, this.uploadingFiles, 'all')
    }
  }
}
</script>

<style>
  .title{ width: 100%;}
  .title span{display: block;float: left;width: 10%; font-size: 18px; height: 40px; line-height: 40px; text-align: right;    padding-right: 20px;}
  .title span.true{display: block;float: left;color: #1afa29; width: 250px; line-height: 40px; text-align: left;}
  .title span.true img{display: block; float: left;padding-right: 10px; width: 30px; height: 30px; margin:5px 0px 5px 10px;}
  .title span.fales{display: block;float: left;color: #d81e06; width: 250px; line-height: 40px; text-align: left;}
  .title span.fales img{display: block; float: left;padding-right: 10px; width: 30px; height: 30px; margin:5px 0px 5px 10px;}
  .title .el-input, .title .el-textarea{float: left;width: 30%;}
  .imgName{float: left;height: 40px;font-size: 18px;text-align: right;width: 10%;padding-right: 20px; }
  .imgs{width: 55%;float: left;}
  .buttonImg{width: 30%;margin-left: 13%;}
  .el-input--suffix{width: 200px !important;}
  .avatar-uploader{width: 178px;height: 178px;}
  .uploadImg .el-upload{border-radius: 6px !important;}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 148px;
    height: 148px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .navs{width: 100%; float: left;}
  .download{display: block; float: left; width: 150px;}
  .psdList{width:50%; height: auto; margin: 10px 0;}
  .psdList dd{ height: 35px; line-height: 35px; color: #333333; text-align: center; font-size: 14px;}
  .psdList dd span,.psdList dd samp,.psdList dd a{display: block;float: left; height: 35px; line-height: 35px; text-align: center;}
  .psdList dd span{width: 78%; text-align: left; padding-left: 2%;}
  .psdList dd samp{width: 10%;}
  .psdList dd a{width: 10%;}
  .psdList dd samp i,.psdList dd a i{font-size: 22px; line-height: 35px; text-align: center;}
  .psdList dd:hover{background: #eeeeee;}
  .upload-demo2 .el-upload-list{display: none !important;}
</style>
