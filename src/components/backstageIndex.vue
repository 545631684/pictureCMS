<template>
    <el-container width="100%" :height="winHeight">
      <el-header>
        <BackstageHeader></BackstageHeader>
      </el-header>
      <el-container>
        <el-aside style="min-height: 943px !important">
          <div class="clear"></div>
          <img src="../assets/images/3.png" alt="" width="91" height="91" />
          <h2>{{name}}</h2>
          <dl>
            <dt>图片管理</dt>
            <dd :class="{on:navs.uploadImg}" v-on:click.stop="navSwitch('uploadImg')">上传图片</dd>
            <!--<dd :class="{on:navs.modifyImg}" v-on:click.stop="navSwitch('modifyImg')">修改图片</dd>-->
            <dd :class="{on:navs.seeImg}" v-on:click.stop="navSwitch('seeImg')">查看图片</dd>
          </dl>
          <dl>
            <dt>统计图表</dt>
            <dd :class="{on:navs.rightIndex}" v-on:click.stop="navSwitch('rightIndex')">查看统计图</dd>
          </dl>
          <dl>
            <dt>用户管理</dt>
            <dd >修改个人信息</dd>
            <dd >修改密码</dd>
            <dd >用户列表</dd>
          </dl>
        </el-aside>
        <el-main direction="vertical" style="height: 943px !important; overflow:hidden;overflow:scroll;">
          <UploadImg v-if="navs.uploadImg"></UploadImg>
          <BackstageRightIndex v-if="navs.rightIndex"></BackstageRightIndex>
          <BackstageModifyImg v-if="navs.modifyImg" :navs="navs"></BackstageModifyImg>
          <BackstageSeeImg v-if="navs.seeImg" :navs="navs"></BackstageSeeImg>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import UploadImg from '../components/backstageUploadImg'
import BackstageRightIndex from '../components/backstageRightIndex'
import BackstageModifyImg from '../components/backstageModifyImg'
import BackstageSeeImg from '../components/backstageSeeImg'
import BackstageHeader from '../components/backstageHeader'
export default {
  name: 'backstageIndex',
  data () {
    return {
      winHeight: 0,
      name: this.$store.state.user.nickname || this.$store.state.user.userName,
      navs: {
        uploadImg: false,
        seeImg: false,
        modifyImg: false,
        rightIndex: true
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
      type === 'modifyImg' ? this.navs.modifyImg = true : this.navs.modifyImg = false
      type === 'rightIndex' ? this.navs.rightIndex = true : this.navs.rightIndex = false
    }
  },
  created () {
    if (window.innerHeight) {
      this.winHeight = window.innerHeight
    }
    this.$store.dispatch('getLocalStorage', this.$store)
    this.name = this.$store.state.user.nickname || this.$store.state.user.userName
    console.log(this.$store.state.user.nickname + '///' + this.$store.state.user.userName)
  },
  components: {
    UploadImg,
    BackstageRightIndex,
    BackstageModifyImg,
    BackstageSeeImg,
    BackstageHeader
  }
}
</script>

<style>
  .el-container{overflow: hidden;}
  .el-aside{width: 20% !important; height: 100%;  background: url(../assets/images/4.jpg); background-size: 100% 943px; }
  .el-aside img{display: block; padding: 4px; background: #04695e;box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.52); border-radius: 50px;    margin: 14px auto;}
  .el-aside h2{text-align: center; height:20px;font-family: MicrosoftYaHei;font-size: 18px;font-weight: normal;font-stretch: normal;line-height: 20px;letter-spacing: 2px;color: #ffffff;}
  .el-aside dl{width: 100%; height:auto;padding: 20px 0 0;}
  .el-aside dl dt{height: 45px; line-height: 35px; text-align: left; text-indent: 8%; color: #FFFFFF; font-size: 25px; background: url(../assets/images/5.png) no-repeat; background-position: left bottom; background-size: 100% 2px;}
  .el-aside dl dd{text-align: left; text-indent: 18%;font-size: 16px;color: #FFFFFF;line-height: 40px;}
  .el-aside dl dd.on{ background: url(../assets/images/6.png) right center no-repeat; background-size: 21px 25px;}
</style>
