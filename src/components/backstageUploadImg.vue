<template>
  <el-container style="margin: 50px 0px;">
    <el-footer class="aaa" id="asda">
      <div class="title" ><span>标题：</span><el-input placeholder="请输入标题" v-model="title" clearable></el-input></div>
    </el-footer>
    <el-footer style="min-height: 200px;height: auto !important; padding-bottom: 50px;">
      <p class="imgName" >图片：</p>
      <div class="imgs">
        <el-upload
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
        </el-dialog>
      </div>
    </el-footer>
    <el-row class="buttonImg">
      <el-button type="primary" v-on:click.stop="submitImg">提交上传</el-button>
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
      imgCrsString: '',
      action: this.URLS + '/upfile'
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
      for (let i = 0; this.imgCrss.length > i; i++) {
        this.imgCrsString += this.imgCrss[i] + ','
      }
      console.log(this.imgCrsString)
      addImgsFile(this)
    }
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
</style>
