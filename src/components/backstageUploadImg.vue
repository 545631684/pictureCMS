<template>
  <el-container style="margin: 50px 0px;">
    <el-footer>
      <div class="title" ><span>标题：</span><el-input placeholder="请输入标题" v-model="title" clearable></el-input></div>
    </el-footer>
    <el-footer style="min-height: 50px;height: auto !important; padding-bottom: 15px;">
      <div class="title" >
        <span>分类：</span>
        <el-select v-model="projectImg" placeholder="请选择项目" clearable style="width:200px; color: #409eff;">
          <el-option
            v-for="item in projects"
            :key="item.pid"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-select v-model="typeImg" placeholder="请选择项目下小分类" clearable style="width:200px;margin-left: 50px; color: #409eff;">
          <el-option
            v-for="item in types"
            :key="item.tid"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </div>
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
      <div class="imgs" style="width: 22%;">
        <el-upload
          :limit="1"
          ref="fliesImg"
          accept=".jpg,.png"
          :action="action + '?id=3'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="obtainImgSrc"
          >
          <div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传PSD缩率图（.jpg/.png）</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="imgs" style="width: 20%;">
        <el-upload
          style="margin-top: 60px;"
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
      <div class="imgs" style="width: 22%;">
        <el-upload
          :limit="1"
          ref="fliesImg"
          accept=".jpg,.png"
          :action="action + '?id=5'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="obtainImgSrc"
          >
          <div class="" style="font-size: 12px;line-height: 20px;padding: 55px 0 0;">上传视频缩率图（.jpg/.png）</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="imgs" style="width: 20%;">
        <el-upload
          style="margin-top: 44px;"
          :limit="1"
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
      <el-button :plain="true" type="primary" v-on:click.stop="submitImg">提交上传</el-button>
    </el-row>
  </el-container>
</template>

<script>
import { deleteTemporaryFile, addImgsFile } from '../assets/js/api'
export default {
  name: 'UploadImg',
  data () {
    return {
      title: '',
      dialogImageUrl: '',
      dialogVisible: false,
      imgCrss: [],
      psd: {
        psdImg: '',
        psdFile: '',
        toSting: ''
      },
      video: {
        videoImg: '',
        videoFile: '',
        toSting: ''
      },
      imgCrsString: '',
      action: this.URLS + '/upfile',
      types: this.$store.state.user.types,
      projects: this.$store.state.user.projects,
      typeImg: '',
      projectImg: ''
    }
  },
  methods: {
    obtainImgSrc (file, fileList) { // 获取上传图片的服务器端实际路径地址并保存到数组中
      let srcBoolean = false
      if (file.response !== undefined) {
        if (file.response.type === '1') {
          for (let i = 0; fileList.length > i; i++) {
            if (this.imgCrss[i] === file.response.imgsrc) {
              return
            } else {
              srcBoolean = true
            }
          }
          if (srcBoolean) {
            if (this.imgCrss.length === 0) {
              this.imgCrss[0] = file.response.imgsrc
            } else {
              this.imgCrss[this.imgCrss.length] = file.response.imgsrc
            }
          }
        } else if (file.response.type === '3') {
          this.psd.psdImg = file.response.imgsrc
        } else if (file.response.type === '4') {
          this.psd.psdFile = file.response.imgsrc
        } else if (file.response.type === '5') {
          this.video.videoImg = file.response.imgsrc
        } else if (file.response.type === '6') {
          this.video.videoFile = file.response.imgsrc
        }
      }
      console.log(this.imgCrss)
    },
    handleRemove (file, fileList) { // 删除上传的图片
      deleteTemporaryFile(this, file.response.imgsrc)
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
        if (this.typeImg === this.types[i].name) {
          typeId = this.types[i].tid
        }
      }
      for (let i = 0; this.projects.length > i; i++) {
        if (this.projectImg === this.projects[i].name) {
          projectId = this.projects[i].pid
        }
      }
      console.log(this.imgCrsString + ':发布前')
      if (this.title.length !== 0) {
        if (this.projectImg.length !== 0) {
          if (this.typeImg.length !== 0) {
            if (this.imgCrsString.length !== 0) {
              addImgsFile(this, typeId, projectId)
            } else {
              this.$alert('请添加需要上传的图片/PSD/视频文件', '警告', {confirmButtonText: '确定'})
            }
          } else {
            this.$alert('请选择项目下的小类别', '警告', {confirmButtonText: '确定'})
          }
        } else {
          this.$alert('请选择项目类型', '警告', {confirmButtonText: '确定'})
        }
      } else {
        this.$alert('请填写标题', '警告', {confirmButtonText: '确定'})
      }
    }
  },
  created () {
    this.types = JSON.parse(this.$store.state.user.types)
    this.projects = JSON.parse(this.$store.state.user.projects)
  }
}
</script>

<style>
  .title{ width: 100%;}
  .title span{display: block;float: left;width: 10%; font-size: 18px; height: 40px; line-height: 40px; text-align: right;    padding-right: 20px;}
  .title .el-input{float: left;width: 30%;}
  .imgName{float: left;height: 40px;font-size: 18px;text-align: right;width: 10%;padding-right: 20px; }
  .imgs{width: 55%;float: left;}
  .buttonImg{width: 30%;margin-left: 13%;}
  .el-input--suffix{width: 200px !important;}
</style>
