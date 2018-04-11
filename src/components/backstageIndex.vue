<template>
    <el-container width="100%" :height="winHeight">
      <el-header>
        <dl>
          <dd>
            <img src="../assets/images/1.png" alt="" width="52" height="46"/>
            <h1>图片上传展示后台</h1>
          </dd>
          <dd>
            <p>用户名：XXXX <a href="">退出登陆</a></p>
          </dd>
        </dl>
      </el-header>
      <el-container>
        <el-aside style="min-height: 943px !important">
          <div class="clear"></div>
          <img src="../assets/images/3.png" alt="" width="91" height="91" />
          <h2>name</h2>
          <dl>
            <dt>图片管理</dt>
            <dd>上传图片</dd>
            <dd>查看图片</dd>
            <dd>修改图片</dd>
          </dl>
          <dl>
            <dt>统计图表</dt>
            <dd>查看统计图</dd>
          </dl>
          <dl>
            <dt>用户管理</dt>
            <dd>新增/修改用户</dd>
            <dd>用户列表</dd>
          </dl>
        </el-aside>
        <el-main>
          <uploadImg></uploadImg>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import UploadImg from '../components/backstageUploadImg'
export default {
  name: 'backstageIndex',
  data () {
    return {
      winHeight: 0
    }
  },
  created () {
    if (window.innerHeight) {
      this.winHeight = window.innerHeight
    }
  },
  components: {
    UploadImg
  }
}
</script>

<style>
  .el-container{overflow: hidden;}
  .el-header{width: 100% !important; height: 81px !important; background: url(../assets/images/2.jpg) no-repeat; background-size: 100% 81px !important;}
  .el-header dl{}
  .el-header dl dd{display: block;  width: 50%;height: 81px;}
  .el-header dl dd:nth-child(1){float: left;}
  .el-header dl dd:nth-child(1) img{margin: 17px 26px 18px 18px; display: block;float: left;}
  .el-header dl dd:nth-child(1) h1{color: #ffffff;display: block;float: left; font-size: 25px; padding: 24px 0;}
  .el-header dl dd:nth-child(2){float: right;}
  .el-header dl dd:nth-child(2) p{height: 40px;font-family: MicrosoftYaHei;font-size: 16px;font-weight: normal;font-stretch: normal;line-height: 40px;letter-spacing: 2px;color: #10a696;    margin:35px 15px auto; text-align: right;}
  .el-header dl dd:nth-child(2) p a{width: 70px;height: 19px; font-size:12px; background-color: #02ae9d; color: #FFFFFF; text-align: center;    padding: 3px 8px; border-radius: 50px;    margin-left: 20px;}
  .el-aside{width: 20% !important; height: 100%;  background: url(../assets/images/4.jpg); background-size: 100% 943px; }
  .el-aside img{display: block; padding: 4px; background: #04695e;box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.52); border-radius: 50px;    margin: 14px auto;}
  .el-aside h2{text-align: center; height:20px;font-family: MicrosoftYaHei;font-size: 18px;font-weight: normal;font-stretch: normal;line-height: 20px;letter-spacing: 2px;color: #ffffff;}
  .el-aside dl{width: 100%; height:auto;padding: 20px 0 0;}
  .el-aside dl dt{height: 45px; line-height: 35px; text-align: left; text-indent: 8%; color: #FFFFFF; font-size: 25px; background: url(../assets/images/5.png) no-repeat; background-position: left bottom; background-size: 100% 2px;}
  .el-aside dl dd{text-align: left; text-indent: 18%;font-size: 16px;color: #FFFFFF;line-height: 40px;}
</style>
