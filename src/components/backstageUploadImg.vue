<template>
  <el-container>
    <el-input placeholder="请输入内容" v-model="title" clearable></el-input>
    <el-upload
      action="/api/index.php/Home/Index/upfile"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'UploadImg',
  data () {
    return {
      title: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style>
</style>
