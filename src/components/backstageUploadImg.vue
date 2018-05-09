<template>
  <el-container style="margin: 50px 0px;">
    <el-footer>
      <div class="title" >
        <span>标题：</span>
        <el-input placeholder="请输入标题" v-model="title" clearable v-on:blur="titleRepeat"></el-input>
        <span class="true" v-if="titleCf && titleDiv"><img src="../assets/images/true.png" alt="" />没有重复，可正常使用</span>
        <span class="fales" v-if="!titleCf && titleDiv"><img src="../assets/images/fales.png" alt="" />标题重复，请重新填写</span>
      </div>
    </el-footer>
    <el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
      <div class="title" >
        <span>分类：</span>
        <el-select v-model="projectImg" placeholder="请选择项目" clearable style="width:200px; color: #409eff;">
          <el-option
            v-for="item in projects"
            :key="item.pid"
            :label="item.xname"
            :value="item.xname">
          </el-option>
        </el-select>
        <el-select v-model="typeImg" placeholder="请选择项目下小分类" clearable style="width:200px;margin-left: 50px; color: #409eff;">
          <el-option
            v-for="item in types"
            :key="item.tid"
            :label="item.lname"
            :value="item.lname">
          </el-option>
        </el-select>
      </div>
    </el-footer>
    <el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
      <div class="title" ><span>描述：</span><el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="describe"></el-input></div>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
      <p class="imgName" >图片：</p>
      <div class="imgs">
        <el-upload
          :limit="20"
          ref="fliesImg"
          accept=".jpg,.png,.gif"
          :action="action + '?id=1'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
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
      <div class="imgs" style="width: 20%;">
        <el-upload
          class="avatar-uploader uploadImg"
          :limit="1"
          ref="psdImg"
          accept=".jpg,.png"
          :action="action + '?id=3'"
          :show-file-list="false"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="obtainImgSrc">
          <img v-if="psdImageUrlls" :src="psdImageUrlls" class="avatar">
          <div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传PSD缩略图（.jpg/.png）</div>
        </el-upload>
      </div>
      <div class="imgs" style="width: 20%;">
        <el-upload
          style="margin-top: 60px;"
          ref="psdFile"
          :limit="1"
          accept=".psd"
          class="upload-demo"
          :action="action + '?id=4'"
          :on-remove="handleRemove"
          :on-change="obtainImgSrc">
          <el-button size="small" type="primary">点击上传psd文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传psd文件，文件大小不要超过1GB</div>
        </el-upload>
      </div>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
      <p class="imgName" >视频：</p>
      <div class="imgs" style="width: 20%;">
        <el-upload
          class="avatar-uploader uploadImg"
          :limit="1"
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
        </el-upload>
      </div>
      <div class="imgs" style="width: 20%;">
        <el-upload
          style="margin-top: 44px;"
          :limit="1"
          ref="videoFile"
          accept=".mp4,.flv"
          class="upload-demo"
          :action="action + '?id=6'"
          :on-remove="handleRemove"
          :on-change="obtainImgSrc">
          <el-button size="small" type="primary">点击上传视频文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频格式文件，文件大小不要超过1GB<br />建议上传格式：.mp4、.flv （支持在线播放）</div>
        </el-upload>
      </div>
    </el-footer>
    <el-row class="buttonImg">
      <el-button type="primary" v-on:click.stop="submitImg" :loading="loading">提交上传</el-button>
    </el-row>
  </el-container>
</template>

<script>
import { deleteTemporaryFile, addImgsFile, queryTitle } from '../assets/js/api'
export default {
  name: 'UploadImg',
  data () {
    return {
      loading: false,
      title: '',
      titleCf: false,
      titleDiv: false,
      describe: '',
      dialogImageUrl: '',
      dialogVisible: false,
      imgCrss: [],
      psd: {
        psdImg: '',
        psdFile: ''
      },
      video: {
        videoImg: '',
        videoFile: ''
      },
      imgCrsString: '',
      action: this.URLS + '/upfile',
      types: this.$store.state.user.types,
      projects: this.$store.state.user.projects,
      typeImg: '',
      projectImg: '',
      psdImageUrlls: '',
      videoImageUrlls: ''
    }
  },
  methods: {
    obtainImgSrc (file, fileList) { // 获取上传图片的服务器端实际路径地址并保存到数组中
      let srcBoolean = false
      if (file.response !== undefined) {
        console.log(file.response.dataImg)
        if (file.response.type === '1') {
          for (let i = 0; fileList.length > i; i++) {
            if (this.imgCrss[i] === file.response.dataImg) {
              return
            } else {
              srcBoolean = true
            }
          }
          if (srcBoolean) {
            if (this.imgCrss.length === 0) {
              this.imgCrss[0] = file.response.dataImg
            } else {
              this.imgCrss[this.imgCrss.length] = file.response.dataImg
            }
          }
        } else if (file.response.type === '3') {
          this.psd.psdImg = file.response.dataPsdImg
        } else if (file.response.type === '4') {
          this.psd.psdFile = file.response.dataPsd
        } else if (file.response.type === '5') {
          this.video.videoImg = file.response.dataVideoImg
        } else if (file.response.type === '6') {
          this.video.videoFile = file.response.dataVideo
        }
      }
    },
    handleRemove (file, fileList) { // 删除上传的图片
      deleteTemporaryFile(this, file.response.dataImg)
    },
    handlePictureCardPreview (file) { // 查看上传的图片
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitImg () { // 发布用户文章，把数组中的路径拼接成字符串,以及Uid、title发送给后台接口
      let typeId = ''
      let projectId = ''
      for (let i = 0; this.imgCrss.length > i; i++) {
        this.imgCrsString += this.imgCrss[i] + ','
      }
      for (let i = 0; this.types.length > i; i++) {
        if (this.typeImg === this.types[i].lname) {
          typeId = this.types[i].tid
        }
      }
      for (let i = 0; this.projects.length > i; i++) {
        if (this.projectImg === this.projects[i].xname) {
          projectId = this.projects[i].pid
        }
      }
      console.log(this.imgCrsString + ':发布前')
      if (this.title.length === 0) {
        this.$alert('请填写标题', '警告', {confirmButtonText: '确定'})
      } else if (this.titleCf === false) {
        this.$alert('标题重复', '警告', {confirmButtonText: '确定'})
      } else if (this.projectImg.length === 0) {
        this.$alert('请选择项目类型', '警告', {confirmButtonText: '确定'})
      } else if (this.typeImg.length === 0) {
        this.$alert('请选择项目下的小类别', '警告', {confirmButtonText: '确定'})
      } else if (this.describe.length === 0) {
        this.$alert('请填写描述内容', '警告', {confirmButtonText: '确定'})
      } else if (this.imgCrsString.length === 0 && this.psd.psdImg.length === 0 && this.psd.psdFile.length === 0 && this.video.videoImg.length === 0 && this.video.videoFile.length === 0) {
        this.$alert('请添加需要上传的图片/PSD/视频文件', '警告', {confirmButtonText: '确定'})
      } else if (this.psd.psdImg.length === 0 && this.psd.psdFile.length !== 0) {
        this.$alert('请完整添加psd文件和缩略图', '警告', {confirmButtonText: '确定'})
      } else if (this.psd.psdImg.length !== 0 && this.psd.psdFile.length === 0) {
        this.$alert('请完整添加psd文件和缩略图', '警告', {confirmButtonText: '确定'})
      } else if (this.video.videoImg.length !== 0 && this.video.videoFile.length === 0) {
        this.$alert('请完整添加视频文件和缩略图', '警告', {confirmButtonText: '确定'})
      } else if (this.video.videoImg.length === 0 && this.video.videoFile.length !== 0) {
        this.$alert('请完整添加视频文件和缩略图', '警告', {confirmButtonText: '确定'})
      } else {
        console.log('tid:' + typeId + 'pid:' + projectId)
        this.loading = true
        addImgsFile(this, typeId, projectId, this.psd, this.video, this.describe)
      }
    },
    handleAvatarSuccess (res, file) {
      this.psdImageUrlls = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
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
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    titleRepeat () {
      if (this.title.length !== 0) {
        queryTitle(this.title, this)
      }
    }
  },
  created () {
    this.types = this.$store.state.user.types
    this.projects = this.$store.state.user.projects
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
</style>
