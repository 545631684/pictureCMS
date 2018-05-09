<template>
  <el-container style="margin: 200px 200px 0;">
    <el-footer class="xiugaimima">
      <b>输入新密码：</b>
      <input class="el-input__inner" type="password" placeholder="输入新密码" v-model="pwd" @blur="inspectpwd" />
      <p>{{pwdTxt}}</p>
    </el-footer>
    <el-footer class="xiugaimima">
      <b>输入邮箱验证码：</b>
      <input style="width:100px;border-radius: 4px 0 0 4px;" class="el-input__inner" type="text" placeholder="输入邮箱验证码" v-model="verification"/>
      <button class="buttonYzm" type="button" @click="gitVerification()" ref="verification">{{verificationInnHtml}}</button>
      <p>{{verificationTxt}}</p>
    </el-footer>
    <el-button class="tijiao" type="primary" style="" v-on:click.stop="modifyPwd()">提交</el-button>
  </el-container>
</template>

<script>
import { mailboxVerification, updatePwd } from '../assets/js/api'
export default {
  name: 'modifyPassword',
  data () {
    return {
      userNameAdd: this.$store.state.user.userName,
      pwd: '',
      verification: '',
      pwdTxt: '注：数字、符号、字母任意2种组合才可通过',
      verificationInnHtml: '获取验证码',
      verificationTxt: '',
      verificationServer: '',
      aa: ''
    }
  },
  methods: {
    gitVerification () {
      if (this.userNameAdd.length === 0) {
        this.userNameTxt2 = '请输入邮箱'
      } else if (!(/^[A-Za-z0-9/\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.userNameAdd))) {
        this.userNameTxt2 = '您输入的邮箱有误，请重新输入'
      } else if (this.verificationInnHtml !== '获取验证码') {
        this.$alert('请不要重复点击', '警告', {confirmButtonText: '确定'})
      } else {
        this.userNameTxt2 = ' '
        mailboxVerification(this)
      }
    },
    inspectpwd () {
      if (this.pwd.length === 0) {
        this.pwdTxt = '请输入新密码'
      } else if (!(/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/.test(this.pwd))) {
        this.pwdTxt = '您输入的密码过于简单请重新输入'
      } else {
        this.pwdTxt = '注：数字、符号、字母任意2种组合才可通过'
      }
    },
    countdown (wait) {
      var _this = this
      _this.aa = {}
      _this.aa = setInterval(function () {
        if (wait < 0) {
          _this.$refs.verification.style.background = '#409EFF'
          _this.$refs.verification.style.color = '#FFFFFF'
          _this.$refs.verification.style.border = 'none'
          _this.verificationInnHtml = '获取验证码'
          window.clearInterval(_this.aa)
        } else {
          _this.$refs.verification.style.background = '#e7e7eb'
          _this.$refs.verification.style.color = '#a6aec1'
          _this.$refs.verification.style.border = '1px solid #dbdbe1'
          _this.verificationInnHtml = '重新发送(' + wait + ')'
          wait--
        }
      }, 1000)
    },
    modifyPwd () {
      if (this.pwd.length === 0) {
        this.$alert('请输入新密码', '警告', {confirmButtonText: '确定'})
      } else if (!(/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/.test(this.pwd))) {
        this.$alert('您输入的密码过于简单请重新输入', '警告', {confirmButtonText: '确定'})
      } else if (this.verification.length === 0) {
        this.$alert('请输入验证码', '警告', {confirmButtonText: '确定'})
      } else if (this.verification !== this.verificationServer) {
        this.$alert('验证码错误', '警告', {confirmButtonText: '确定'})
      } else {
        updatePwd(this)
      }
    }
  },
  beforeDestroy () {
    window.clearInterval(this.aa)
    this.aa = null
  }
}
</script>

<style>
  .xiugaimima{width: 750px;}
  .xiugaimima b{display: block;float: left; width: 130px; height: 40px;line-height: 40px; text-align: left;}
  .xiugaimima input{display: block;float: left;width: 200px;}
  .xiugaimima p{float: left;width: 300px;height: 40px;line-height: 40px; padding-left: 10px; color: #f00;}
  .xiugaimima .buttonYzm{width: 100px;float: left;display: block;border: none;background: #409EFF;color: #FFFFFF;text-align: center;height: 40px;border-radius: 0 50px 50px 0;vertical-align: middle;cursor: pointer;}
  .tijiao{width: 100px; margin-left: 150px !important;}
</style>
