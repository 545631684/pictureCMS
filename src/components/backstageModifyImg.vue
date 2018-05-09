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
        <!--<el-upload
          ref="fliesImg"
          accept=".jpg,.png,.gif"
          :action="action"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="obtainImgSrc"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>-->
        <ul class="el-upload-list el-upload-list--picture-card">
          <li tabindex="0" class="el-upload-list__item is-success" v-for="(item, index) in article.img" :key="index">
            <img :src="'http://img.doudouv.com/' + item" alt="" class="el-upload-list__item-thumbnail">
            <a class="el-upload-list__item-name"><i class="el-icon-document"></i>13-1F51QS039532.jpg</a>
            <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
            <i class="el-icon-close"></i><i class="el-icon-close-tip">按 delete 键可删除</i>
            <span class="el-upload-list__item-actions"><span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span>
            <span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
          </li>
        </ul>
      </div>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
      <p class="imgName" >PSD：</p>
      <div class="imgs">
        <el-upload
          ref="fliesPsd"
          accept=".psd"
          class="upload-demo"
          drag
          :action="action"
          :on-remove="handleRemove"
          :on-change="obtainImgSrc"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传psd文件，文件大小不要超过1GB</div>
        </el-upload>
      </div>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
      <p class="imgName" >视频：</p>
      <div class="imgs">
        <el-upload
          ref="fliesVideo"
          accept=".mp4,.flv"
          class="upload-demo"
          drag
          :action="action"
          :on-remove="handleRemove"
          :on-change="obtainImgSrc"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传视频格式文件，文件大小不要超过1GB<br />建议上传格式：mp4、flv （支持在线播放）</div>
        </el-upload>
      </div>
    </el-footer>
    <el-row class="buttonImg">
      <el-button :plain="true" type="primary" v-on:click.stop="submitImg">提交上传</el-button>
    </el-row>
  </el-container>
</template>

<script>
import { deleteTemporaryFile, addImgsFile, exhibitionDetails } from '../assets/js/api'
export default {
  props: ['navs'],
  name: 'backstageModifyImg',
  data () {
    return {
      title: '',
      describe: '',
      dialogImageUrl: '',
      dialogVisible: false,
      imgCrss: [],
      imgCrsString: '',
      action: this.URLS + '/upfile',
      types: this.$store.state.user.types,
      projects: this.$store.state.user.projects,
      typeImg: '',
      projectImg: '',
      article: []
    }
  },
  methods: {
    obtainImgSrc (file, fileList) { // 获取上传图片的服务器端实际路径地址并保存到数组中
      let srcBoolean = false
      if (file.response !== undefined) {
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
      console.log(this.imgCrsString)
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
    this.types = this.$store.state.user.types
    this.projects = this.$store.state.user.projects
    exhibitionDetails(this, this.$store.state.mId)
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
