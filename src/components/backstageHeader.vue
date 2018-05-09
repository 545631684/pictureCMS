<template>
  <dl>
    <dd>
      <img src="../assets/images/1.png" alt="" width="52" height="46"/>
      <h1>图片上传展示后台</h1>
    </dd>
    <dd>
      <p>用户名：{{name}} <a v-on:click.stop="cancellation" style="cursor: pointer;">退出登陆</a></p>
    </dd>
  </dl>
</template>

<script>
import { cancellationUser } from '../assets/js/api'
export default {
  name: 'BackstageHeader',
  data () {
    return {
      name: this.$store.state.user.nickname === 'null' ? this.$store.state.user.userName : this.$store.state.user.nickname
    }
  },
  methods: {
    cancellation () {
      cancellationUser(this)
    }
  }
}
</script>

<style>
  .el-header{width: 100% !important; height: 81px !important; background: url(../assets/images/2.jpg) no-repeat; background-size: 100% 81px !important;}
  .el-header dl{}
  .el-header dl dd{display: block;  width: 50%;height: 81px;}
  .el-header dl dd:nth-child(1){float: left;}
  .el-header dl dd:nth-child(1) img{margin: 17px 26px 18px 18px; display: block;float: left;}
  .el-header dl dd:nth-child(1) h1{color: #ffffff;display: block;float: left; font-size: 25px; padding: 24px 0;}
  .el-header dl dd:nth-child(2){float: right;}
  .el-header dl dd:nth-child(2) p{height: 40px;font-family: MicrosoftYaHei;font-size: 16px;font-weight: normal;font-stretch: normal;line-height: 40px;letter-spacing: 2px;color: #10a696;    margin:35px 15px auto; text-align: right;}
  .el-header dl dd:nth-child(2) p a{width: 70px;height: 19px; font-size:12px; background-color: #02ae9d; color: #FFFFFF; text-align: center;    padding: 3px 8px; border-radius: 50px;    margin-left: 20px;}
</style>
