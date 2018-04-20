<template>
  <div>
    <vue-particles color="#f65252" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#8d9feb" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"></vue-particles>
    <div class="login">
      <div class="login_center">
        <ul class="clearfix">
          <li :class="{on:land}" @click="tab('dl')">登陆</li>
          <li :class="{on:register}" @click="tab('zc')">注册</li>
        </ul>
        <dl v-show="!land">
          <dt><h2>赛奇设计图后台</h2></dt>
          <dd><input type="text" placeholder="请输入邮箱/用户名" name="" id="" v-model="userName" />
            <p>{{userNameTxt}}</p>
          </dd>
          <dd>
            <input type="password" placeholder="请输入密码" name="" id="" v-model="password" />
            <p>{{passwordTxt}}</p>
          </dd>
          <dd>
            <a href="">忘记密码?</a>
          </dd>
          <dd><label :class="{click:setPasswordStyle}" @click="setPassword()"><span><i></i></span>记住密码</label></dd>
          <dd><button class="Button" type="submit" @click="login()">登录</button></dd>
        </dl>
        <dl v-show="!register">
          <dd style="margin-top: 76px;"><input type="text" placeholder="请输入邮箱/用户名" name="" id="" v-model="userNameAdd" />
            <p>{{userNameTxt2}}</p>
          </dd>
          <dd>
            <input type="password" placeholder="请输入密码" name="" id="" v-model="passwordAdd" />
            <p>{{passwordTxt2}}</p>
          </dd>
          <dd>
            <input type="password" placeholder="二次输入密码" name="" id="" v-model="password2" />
            <p>{{password2Txt}}</p>
          </dd>
          <dd class="dd01">
            <input type="text" placeholder="验证码" name="" id="" v-model="verification" />
            <button class="buttonYzm" type="button" @click="gitVerification()" ref="verification">{{verificationInnHtml}}</button>
            <p>{{verificationTxt}}</p>
          </dd>
          <dd><button class="Button" type="submit" @click="addUser()">注册</button></dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { loginLand, mailboxVerification, interfaceAddUser } from '../assets/js/api'
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      userNameAdd: '',
      userNameTxt: '',
      userNameTxt2: '',
      password: '',
      passwordAdd: '',
      passwordTxt: '',
      passwordTxt2: '',
      password2: '',
      password2Txt: '',
      verification: '',
      verificationServer: '',
      verificationTxt: '',
      verificationInnHtml: '获取验证码',
      setPasswordStyle: this.$store.state.user.setPasswordStyle,
      land: false,
      register: true
    }
  },
  methods: {
    tab (type) {
      type === 'dl' ? this.land = false : this.land = true
      type === 'zc' ? this.register = false : this.register = true
    },
    login () {
      if (this.userName.length === 0) {
        this.userNameTxt = '请输入用户名'
      } else if (!(/^[A-Za-z0-9/\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.userName))) {
        this.userNameTxt = '您输入的账号有误，请重新输入'
      } else if (this.password.length === 0) {
        this.passwordTxt = '请输入密码'
      } else {
        this.userNameTxt = ''
        this.passwordTxt = ''
        // 登陆接口
        loginLand(this)
      }
    },
    setPassword () {
      this.setPasswordStyle ? this.setPasswordStyle = false : this.setPasswordStyle = true
    },
    addUser () {
      if (this.userNameAdd.length === 0) {
        this.userNameTxt2 = '请输入用户名'
      } else if (!(/^[A-Za-z0-9/\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.userNameAdd))) {
        this.userNameTxt2 = '您输入的账号有误，请重新输入'
      } else if (this.passwordAdd.length === 0) {
        this.userNameTxt2 = ''
        this.passwordTxt2 = '请输入密码'
      } else if (!(/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/.test(this.passwordAdd))) {
        this.userNameTxt2 = ''
        this.passwordTxt2 = '您输入的密码过于简单请重新输入'
      } else if (this.password2.length === 0) {
        this.userNameTxt2 = ''
        this.passwordTxt2 = ''
        this.password2Txt = '请输入二次密码'
      } else if (this.password2 !== this.passwordAdd) {
        this.userNameTxt2 = ''
        this.passwordTxt2 = ''
        this.password2Txt = '两次输入密码不一致'
      } else if (this.verification.length === 0) {
        this.userNameTxt2 = ''
        this.passwordTxt2 = ''
        this.password2Txt = ''
        this.verificationTxt = '请输入验证码'
      } else if (this.verification.length !== 6) {
        this.userNameTxt2 = ''
        this.passwordTxt2 = ''
        this.password2Txt = ''
        this.verificationTxt = '请正确输入6位数验证码'
      } else if (this.verificationServer !== this.verification) {
        this.userNameTxt2 = ''
        this.passwordTxt2 = ''
        this.password2Txt = ''
        this.verificationTxt = '验证码错误'
      } else {
        this.userNameTxt2 = ''
        this.passwordTxt2 = ''
        this.password2Txt = ''
        this.verificationTxt = ''
        // 注册接口
        interfaceAddUser(this)
      }
    },
    gitVerification () {
      if (this.userNameAdd.length === 0) {
        this.userNameTxt2 = '请输入邮箱'
      } else if (!(/^[A-Za-z0-9/\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.userNameAdd))) {
        this.userNameTxt2 = '您输入的邮箱有误，请重新输入'
      } else {
        this.userNameTxt2 = ' '
        mailboxVerification(this)
      }
    },
    countdown (wait) {
      var _this = this
      var aa = {}
      aa = setInterval(function () {
        _this.$refs.verification.style.background = '#e7e7eb'
        _this.$refs.verification.style.color = '#a6aec1'
        _this.$refs.verification.style.border = '1px solid #dbdbe1'
        _this.verificationInnHtml = '重新发送(' + wait + ')'
        wait--
        if (wait === 0) {
          _this.$refs.verification.style.background = '#00b09d'
          _this.$refs.verification.style.color = '#FFFFFF'
          _this.$refs.verification.style.border = 'none'
          _this.verificationInnHtml = '获取验证码'
          window.clearInterval(aa)
        }
      }, 1000)
    }
  },
  created () {
    this.$store.dispatch('getLocalStorage', this.$store.state.user)
    if (this.$store.state.user.setPasswordStyle === 'true') {
      this.userName = this.$store.state.user.userName
      this.password = this.$store.state.user.Password
      this.setPasswordStyle = true
    } else {
      this.userName = ''
      this.password = ''
      this.setPasswordStyle = false
    }
  }
}
</script>

<style>
  button:focus {
    outline: none;
  }
  .login {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .login_center {
    width: 526px;
    height: 572px;
    margin: 100px auto auto;
    margin-bottom: 10px;
    background: #fff;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 1px 1px 43px #c5cbcb;
    box-sizing: border-box;
    overflow: visible;
    background: #ffffff;
  }
  .login_center ul {
    background: #ffffff;
  }
  .login_center ul li {
    width: 50%;
    float: left;
    text-align: center;
    color: #a3b2b1;
    line-height: 60px;
    height: 60px;
    font-size: 22px;
    cursor:pointer;
  }
  .login_center ul li.on {
    background: #ffffff;
  }
  .login_center ul li:nth-child(1).on {
    box-shadow: inset -5px -4px 10px 0px #d0d6d6;
  }
  .login_center ul li:nth-child(2).on {
    box-shadow: inset 5px -4px 10px 0px #d0d6d6;
  }
  .login_center dl {
    margin: 38px 110px;
  }
  .login_center dl dt {
    height: 80px;
    line-height: 80px;
  }
  .login_center dl dt h2 {
    line-height: 80px;
    text-align: center;
    color: #333333;
    font-size: 30px;
  }
  .login_center dl dd:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .login_center dl dd p {
    color: #dc101a;
  }
  .login_center dl dd a {
    display: block;
    color: #2bb28a;
    text-align: right;
    line-height: 60px;
    width: 70px;
    float: right;
  }
  .login_center dl dd input {
    font-family: inherit;
    font-size: 18px;
    font-weight: inherit;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    border-bottom: 1px dashed #98aba9;
    width: 100%;
    height: 60px;
    color: #a3b2b1;
  }
  .login_center dl dd span {
    border-radius: 50px;
    border: 2px solid #a3b2b1;
    display: block;
    width: 10px;
    height: 10px;
    float: left;
    margin: 5px auto;
    transition: all .5s;
  }
  .login_center dl dd span i {
    border-radius: 50px;
    border: 2px solid #a3b2b1;
    display: block;
    width: 4px;
    height: 4px;
    margin: 1px auto;
    transition: all .5s;
  }
  .login_center dl dd label {
    display: block;
    float: left;
    height: 20px;
    line-height: 23px;
    text-indent: .2em;
    cursor:pointer;
  }
  .login_center dl dd .click span,
  .login_center dl dd .click span i {
    border-color: #2bb28a;
    transition: all 1s;
  }
  .login_center dl dd button.Button {
    display: block;
    width: 260px;
    height: 50px;
    margin: 70px auto;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    color: #ffffff;
    border: none;
    border-radius: 50px;
    letter-spacing: 10px;
    cursor:pointer;
    background: linear-gradient(left, rgb(0, 222, 199) 4%, rgb(8, 186, 167) 49%, rgb(0, 222, 199) 97%);
    background: -o-linear-gradient(left, rgb(0, 222, 199) 4%, rgb(8, 186, 167) 49%, rgb(0, 222, 199) 97%);
    background: -ms-linear-gradient(left, rgb(0, 222, 199) 4%, rgb(8, 186, 167) 49%, rgb(0, 222, 199) 97%);
    background: -moz-linear-gradient(left, rgb(0, 222, 199) 4%, rgb(8, 186, 167) 49%, rgb(0, 222, 199) 97%);
    background: -webkit-linear-gradient(left, rgb(0, 222, 199) 4%, rgb(8, 186, 167) 49%, rgb(0, 222, 199) 97%);
  }
  .login_center dl dd.dd01 input {
    width: 65%;
    float: left;
  }
  .login_center dl dd.dd01 button {
    width: 35%;
    float: left;
    display: block;
    border: none;
    background: #00b09d;
    color: #FFFFFF;
    text-align: center;
    margin-top: 21px;
    height: 40px;
    border-radius: 0 50px 50px 0;
    vertical-align: middle;
    cursor:pointer;
  }
</style>
