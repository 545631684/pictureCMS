<template>
  <el-container>
    <div class="userInfo" v-show="info">
      <img class="headPortrait" :src="user.HeadPortraitSrc" alt="" v-if="user.HeadPortraitSrc"/>
      <img class="headPortrait" src="/static/img/3.65c3442.png" alt="" v-else/>
      <p class="nick">{{user.nickname}}</p>
      <p><span>用户名/邮箱</span><span>{{user.userName}}</span></p>
      <p><span style="text-align: center;">性别</span><span v-if="user.sex === '1'">男</span><span v-if="user.sex === '0'">女</span></p>
      <p><span>用户创建时间</span><span>{{user.registerTime}}</span></p>
      <p><span>最后登陆时间</span><span>{{user.endTime}}</span></p>
      <el-button type="warning" style="margin: auto;display: block;" v-on:click.stop="modifyInfo('infoModify')">修改个人信息</el-button>
    </div>
    <div class="userInfo" v-show="infoModify">
      <div class="headPortrait">
        <el-upload
          class="avatar-uploader"
          :action="action + '?id=2'"
          :show-file-list="false"
          :on-change="obtainImgSrc"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="HeadPortraitSrc" :src="HeadPortraitSrc" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <el-container class="inputInfo" style="margin-top: 60px;">
        <el-aside>昵称:</el-aside>
        <el-main>
          <el-input
            placeholder="请输入内容"
            v-model="user.nickname"
            clearable>
          </el-input>
        </el-main>
      </el-container>
      <el-container class="inputInfo">
        <el-aside>用户名/邮箱:</el-aside>
        <el-main>
          <el-input
            placeholder="请输入内容"
            v-model="user.userName"
            :disabled="true">
          </el-input>
        </el-main>
      </el-container>
      <el-container class="inputInfo">
        <el-aside>性别:</el-aside>
        <el-main>
          <el-radio v-model="user.sex" label="1">男</el-radio>
          <el-radio v-model="user.sex" label="0">女</el-radio>
        </el-main>
      </el-container>
      <el-button type="warning" style="margin: auto;display: block;" v-on:click.stop="modifyInfo('info')">保存个人信息</el-button>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'backstageUserInfoModify',
  data () {
    return {
      user: {
        uId: '1',
        userName: '545631684@qq.com',
        nickname: '郑勇宏',
        HeadPortraitSrc: '',
        sex: '1',
        registerTime: '2018/04/22 16:18:56',
        endTime: '2018/04/22 16:18:56'
      },
      HeadPortraitSrc: '',
      action: this.URLS + '/upfile',
      info: true,
      infoModify: false
    }
  },
  methods: {
    modifyInfo (type) {
      type === 'info' ? this.info = true : this.info = false
      type === 'infoModify' ? this.infoModify = true : this.infoModify = false
    },
    obtainImgSrc (file, fileList) { // 获取上传图片的服务器端实际路径地址并保存到数组中
      console.log(fileList)
      if (file.response !== undefined) {
        if (this.user.HeadPortraitSrc.length === 0) {
          this.user.HeadPortraitSrc = file.response.imgsrc
          this.HeadPortraitSrc = file.url
        }
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
    }
  }
}
</script>

<style>
  .userInfo{width: 100%; height: auto;}
  .userInfo .headPortrait{display: block; margin:50px auto 10px; border-radius: 200px; width: 150px;height: 150px;}
  .userInfo .nick{text-align: center;}
  .userInfo p{width: 385px; padding-bottom: 20px; height: 40px; line-height: 40px; margin: auto;}
  .userInfo p span{display: block;float: left;height: 40px; line-height: 40px;}
  .userInfo p span:nth-child(1){width: 90px; text-align: justify; padding-right: 50px;}
  .userInfo p input{display: block;float: left;}
  .inputInfo{width: 385px; height: 40px; line-height: 40px; margin: auto auto 20px;}
  .inputInfo .el-aside{background: none; width: 90px !important; height: auto;}
  .inputInfo .el-main{padding: 0;}
  .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 500px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
