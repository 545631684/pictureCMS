<template>
  <dl class="usrtAdd">
    <dd>
      <span>用户名：</span>
      <input type="text" class="el-input__inner" placeholder="请输入邮箱" v-model="userNameAdd" @blur="judgeUserName"/>
      <samp>{{userNameTxt2}}</samp>
    </dd>
    <dd>
      <span>密码：</span>
      <input type="password" class="el-input__inner" placeholder="请输入密码" v-model="passwordAdd"/>
      <samp>{{passwordTxt2}}</samp>
    </dd>
    <dd>
      <el-button class="userAddTJ" type="primary" size="small" @click="addUser()">创建用户</el-button>
    </dd>
  </dl>
</template>

<script>
import { judgeName, guanliAddUser } from '../assets/js/api'
export default {
 props: ['navs'],
 name: 'backstageAddUser',
  data () {
    return {
      userNameAdd: '',
      userNameTxt2: '创建用户，请用邮箱账号作为用户名称！',
      passwordAdd: '',
      passwordTxt2: '注：数字、符号、字母任意2种组合才可通过'
    }
  },
  methods: {
    navSwitch (type) {
      type === 'uploadImg' ? this.navs.uploadImg = true : this.navs.uploadImg = false
      type === 'uploadImg2' ? this.navs.uploadImg2 = true : this.navs.uploadImg2 = false
      type === 'seeImg' ? this.navs.seeImg = true : this.navs.seeImg = false
      type === 'seeImg2' ? this.navs.seeImg2 = true : this.navs.seeImg2 = false
      type === 'seeImg3' ? this.navs.seeImg3 = true : this.navs.seeImg3 = false
      type === 'recoverySeeImg' ? this.navs.recoverySeeImg = true : this.navs.recoverySeeImg = false
      type === 'modifyImg' ? this.navs.modifyImg = true : this.navs.modifyImg = false
      type === 'rightIndex' ? this.navs.rightIndex = true : this.navs.rightIndex = false
      type === 'userInfo' ? this.navs.userInfo = true : this.navs.userInfo = false
      type === 'userPwd' ? this.navs.userPwd = true : this.navs.userPwd = false
      type === 'userList' ? this.navs.userList = true : this.navs.userList = false
      type === 'userAdd' ? this.navs.userAdd = true : this.navs.userAdd = false
      type === 'userRecovery' ? this.navs.userRecovery = true : this.navs.userRecovery = false
      type === 'projectType' ? this.navs.projectType = true : this.navs.projectType = false
    },
    judgeUserName () {
      if (!(/^[A-Za-z0-9/\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.userNameAdd))) {
        this.userNameTxt2 = '您输入的邮箱有误，请重新输入'
      } else {
        judgeName(this)
      }
    },
    addUser () {
      if (this.userNameAdd.length === 0) {
        this.$alert('请输入用户名', '警告', {confirmButtonText: '确定'})
      } else if (!(/^[A-Za-z0-9/\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.userNameAdd))) {
        this.$alert('您输入的账号有误，请重新输入', '警告', {confirmButtonText: '确定'})
      } else if (this.passwordAdd.length === 0) {
        this.$alert('请输入密码', '警告', {confirmButtonText: '确定'})
      } else if (!(/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/.test(this.passwordAdd))) {
        this.$alert('您输入的密码过于简单请重新输入', '警告', {confirmButtonText: '确定'})
      } else {
        // 注册接口
        guanliAddUser(this)
      }
    }
  },
  created () {
    this.userNameAdd = ''
    this.passwordAdd = ''
    this.userNameTxt2 = '创建用户，请用邮箱账号作为用户名称！'
    this.passwordTxt2 = '注：数字、符号、字母任意2种组合才可通过'
  }
}
</script>

<style>
.usrtAdd{width: 800px; height: auto; margin: 50px 100px;}
.usrtAdd dd{height: 40px; margin: 30px 0;}
.usrtAdd dd span{display: block;float:left;width:60px;height: 40px; line-height: 40px;text-align: right; font-size: 15px;}
.usrtAdd dd input{float:left; width: 300px;}
.usrtAdd dd samp{display: block;float:left;width:300px;height: 40px; line-height: 40px;font-size: 15px;color: #f00; padding-left: 10px;}
.userAddTJ{padding: 0 15px; height: 38px; margin-left: 60px !important;}
.userAddTJ span{display:block !important; width: 100% !important; line-height: 20px !important; height: 38px !important;}
</style>