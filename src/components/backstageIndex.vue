<template>
    <el-container width="100%" :height="winHeight">
      <el-header>
        <BackstageHeader></BackstageHeader>
      </el-header>
      <el-container>
        <el-aside style="min-height: 943px !important; background-size: contain;">
          <div class="clear"></div>
          <img :src="this.URLS + HeadPortraitSrc" alt="" width="91" height="91" v-if="HeadPortraitSrc !== 'null'"/>
          <img src="../assets/images/touxiang.jpg" alt="" width="91" height="91" v-else/>
          <h2>{{name}}</h2>
          <dl>
            <dt>图片管理</dt>
            <dd :class="{on:navs.uploadImg}" v-on:click.stop="navSwitch('uploadImg')">上传图片</dd>
            <dd v-if="permissions === '1'" :class="{on:navs.seeImg}" v-on:click.stop="navSwitch('seeImg')">查看图片</dd>
            <dd v-if="permissions === '2'" :class="{on:navs.seeImg2}" v-on:click.stop="navSwitch('seeImg2')">查看图片</dd>
          </dl>
          <dl v-if="permissions === '2'">
            <dt>统计图表</dt>
            <dd :class="{on:navs.rightIndex}" v-on:click.stop="navSwitch('rightIndex')">查看统计图</dd>
          </dl>
          <dl>
            <dt>用户管理</dt>
            <dd :class="{on:navs.userInfo}" v-on:click.stop="navSwitch('userInfo')">个人信息</dd>
            <dd :class="{on:navs.userPwd}" v-on:click.stop="navSwitch('userPwd')">修改密码</dd>
            <dd v-if="permissions === '2'" :class="{on:navs.userList}" v-on:click.stop="navSwitch('userList')">用户列表</dd>
            <dd v-if="permissions === '2'" :class="{on:navs.userRecovery}" v-on:click.stop="navSwitch('userRecovery')">用户回收站</dd>
            <dd v-if="permissions === '2'" :class="{on:navs.projectType}" v-on:click.stop="navSwitch('projectType')">项目/类型管理</dd>
          </dl>
        </el-aside>
        <el-main direction="vertical" style="height: 943px !important; overflow:hidden;overflow:scroll;overflow-x:hidden">
          <UploadImg v-if="navs.uploadImg"></UploadImg>
          <BackstageRightIndex v-if="navs.rightIndex"></BackstageRightIndex>
          <BackstageModifyImg v-if="navs.modifyImg" :navs="navs"></BackstageModifyImg>
          <BackstageSeeImg v-if="navs.seeImg" :navs="navs"></BackstageSeeImg>
          <BackstageAdministrationSeeImg v-if="navs.seeImg2" :navs="navs"></BackstageAdministrationSeeImg>
          <BackstageUserInfoModify v-if="navs.userInfo" :navs="navs"></BackstageUserInfoModify>
          <ModifyPassword v-if="navs.userPwd" :navs="navs"></ModifyPassword>
          <BackstageUserList v-if="navs.userList" :navs="navs"></BackstageUserList>
          <BackstageUserListRecovery v-if="navs.userRecovery" :navs="navs"></BackstageUserListRecovery>
          <BackstageProjectType v-if="navs.projectType" :navs="navs"></BackstageProjectType>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import UploadImg from '../components/backstageUploadImg'
import BackstageRightIndex from '../components/backstageRightIndex'
import BackstageModifyImg from '../components/backstageModifyImg'
import BackstageSeeImg from '../components/backstageSeeImg'
import BackstageAdministrationSeeImg from '../components/backstageAdministrationSeeImg'
import BackstageHeader from '../components/backstageHeader'
import BackstageUserInfoModify from '../components/backstageUserInfoModify'
import ModifyPassword from '../components/modifyPassword'
import BackstageUserList from '../components/backstageUserList'
import BackstageUserListRecovery from '../components/backstageUserListRecovery'
import BackstageProjectType from '../components/backstageProjectType'
export default {
  name: 'backstageIndex',
  data () {
    return {
      permissions: this.$store.state.user.permissions,
      winHeight: 0,
      name: this.$store.state.user.nickname === 'null' ? this.$store.state.user.userName : this.$store.state.user.nickname,
      HeadPortraitSrc: this.$store.state.user.HeadPortraitSrc,
      navs: {
        uploadImg: false,
        seeImg: false,
        seeImg2: false,
        modifyImg: false,
        userInfo: true,
        rightIndex: false,
        userPwd: false,
        userList: false,
        userRecovery: false,
        projectType: false
      }
    }
  },
  methods: {
    cancellation () { // 注销
      console.log(111)
    },
    navSwitch (type) {
      type === 'uploadImg' ? this.navs.uploadImg = true : this.navs.uploadImg = false
      type === 'seeImg' ? this.navs.seeImg = true : this.navs.seeImg = false
      type === 'seeImg2' ? this.navs.seeImg2 = true : this.navs.seeImg2 = false
      type === 'modifyImg' ? this.navs.modifyImg = true : this.navs.modifyImg = false
      type === 'rightIndex' ? this.navs.rightIndex = true : this.navs.rightIndex = false
      type === 'userInfo' ? this.navs.userInfo = true : this.navs.userInfo = false
      type === 'userPwd' ? this.navs.userPwd = true : this.navs.userPwd = false
      type === 'userList' ? this.navs.userList = true : this.navs.userList = false
      type === 'userRecovery' ? this.navs.userRecovery = true : this.navs.userRecovery = false
      type === 'projectType' ? this.navs.projectType = true : this.navs.projectType = false
    }
  },
  created () {
    if (window.innerHeight) {
      this.winHeight = window.innerHeight
    }
    this.$store.dispatch('getLocalStorage', this.$store)
    this.name = this.$store.state.user.nickname === 'null' ? this.$store.state.user.userName : this.$store.state.user.nickname
    this.HeadPortraitSrc = this.$store.state.user.HeadPortraitSrc
    this.permissions = this.$store.state.user.permissions
    // console.log(this.permissions)
  },
  components: {
    UploadImg,
    BackstageRightIndex,
    BackstageModifyImg,
    BackstageSeeImg,
    BackstageAdministrationSeeImg,
    BackstageHeader,
    BackstageUserInfoModify,
    ModifyPassword,
    BackstageUserList,
    BackstageUserListRecovery,
    BackstageProjectType
  }
}
</script>

<style>
  .el-container{overflow: hidden;}
  .el-aside{width: 20% !important; height: 100%;  background:url(../assets/images/4.jpg); background-size: 100% 943px !important; }
  .el-aside img{display: block; padding: 4px; background: #04695e;box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.52); border-radius: 50px;    margin: 14px auto;}
  .el-aside h2{text-align: center; height:20px;font-family: MicrosoftYaHei;font-size: 18px;font-weight: normal;font-stretch: normal;line-height: 20px;letter-spacing: 2px;color: #ffffff;}
  .el-aside dl{width: 100%; height:auto;padding: 20px 0 0;}
  .el-aside dl dt{height: 45px; line-height: 35px; text-align: left; text-indent: 8%; color: #FFFFFF; font-size: 25px; background: url(../assets/images/5.png) no-repeat; background-position: left bottom; background-size: 100% 2px;}
  .el-aside dl dd{text-align: left; text-indent: 18%;font-size: 16px;color: #FFFFFF;line-height: 40px; cursor: pointer; }
  .el-aside dl dd.on{ background: url(../assets/images/6.png) right center no-repeat; background-size: 21px 25px;opacity: .8;}
</style>
