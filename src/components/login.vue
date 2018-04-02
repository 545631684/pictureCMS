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
          <dd><input type="text" placeholder="请输入用户名" name="" id="" value="" /></dd>
          <dd><input type="text" placeholder="请输入密码" name="" id="" value="" /></dd>
          <dd><a href="">忘记密码?</a></dd>
          <dd><label class="click" ><span><i></i></span>记住密码</label></dd>
          <dd><button class="Button" type="submit">登录</button></dd>
        </dl>
        <dl v-show="!register">
          <dt><h2>注册</h2></dt>
          <dd><input type="text" placeholder="请输入用户名" name="" id="" value="" /></dd>
          <dd><input type="text" placeholder="请输入密码" name="" id="" value="" /></dd>
          <dd><a href="">忘记密码?</a></dd>
          <dd><label class="click" ><span><i></i></span>记住密码</label></dd>
          <dd><button class="Button" type="submit">登录</button></dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import {loginLand} from '../assets/js/api'
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: '',
      land: false,
      register: true
    }
  },
  methods: {
    tab (type) {
      type === 'dl' ? this.land = false : this.land = true
      type === 'zc' ? this.register = false : this.register = true
    },
    tab2 () {
      console.log(11)
      loginLand(this)
    }
  }
}
</script>

<style>
.login{text-align: center;position: absolute;top: 0;left: 0;width: 100%;}
.login_center{ width: 526px; height: 572px; margin: 100px auto auto;    margin-bottom: 10px;background: #fff;overflow: hidden;border-radius: 2px;box-shadow: 1px 1px 43px #c5cbcb;box-sizing: border-box;    overflow: visible;background: #ffffff;}
.login_center ul{background: #ffffff;}
.login_center ul li{width: 50%;float: left; text-align: center; color: #a3b2b1; line-height: 60px; height: 60px;font-size: 22px;}
.login_center ul li.on{background: #ffffff;}
.login_center ul li:nth-child(1).on{box-shadow:inset -5px -4px 10px 0px #d0d6d6;}
.login_center ul li:nth-child(2).on{box-shadow:inset 5px -4px 10px 0px #d0d6d6;}
.login_center dl{margin: 38px 110px;}
.login_center dl dt{height: 80px; line-height: 80px;}
.login_center dl dt h2{line-height: 80px; text-align: center;color: #333333; font-size: 30px;}
.login_center dl dd:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.login_center dl dd a{display: block; color: #2bb28a; text-align: right; line-height: 60px;width: 70px;float: right;}
.login_center dl dd input{font-family: inherit;font-size: 18px;font-weight: inherit;background: transparent;border: none;outline: none;resize: none;border-bottom: 1px dashed #98aba9; width: 100%; height: 60px; color: #a3b2b1; }
 .login_center dl dd span{border-radius: 50px;border: 2px solid #a3b2b1;display: block;width: 10px;height: 10px;float: left;margin: 5px auto;}
 .login_center dl dd span i{border-radius: 50px;border: 2px solid #a3b2b1;display: block;width: 4px;height: 4px;margin: 1px auto;}
 .login_center dl dd label{display: block;float: left;height: 20px;line-height: 23px;text-indent: .2em;}
 .login_center dl dd .click span,.login_center dl dd .click span i{border-color: #2bb28a;}
 .login_center dl dd button{display: block; width: 260px; height: 50px; margin: 70px auto;text-align: center; line-height: 50px; font-size: 30px; color: #0e514a; border:none; border-radius:50px;letter-spacing:10px;background: linear-gradient(left , rgb(0, 222, 199) 4% , rgb(8, 186, 167) 49% , rgb(0, 222, 199) 97%);background: -o-linear-gradient(left , rgb(0, 222, 199) 4% , rgb(8, 186, 167) 49% , rgb(0, 222, 199) 97%);background: -ms-linear-gradient(left , rgb(0, 222, 199) 4% , rgb(8, 186, 167) 49% , rgb(0, 222, 199) 97%);background: -moz-linear-gradient(left , rgb(0, 222, 199) 4% , rgb(8, 186, 167) 49% , rgb(0, 222, 199) 97%);background: -webkit-linear-gradient(left , rgb(0, 222, 199) 4% , rgb(8, 186, 167) 49% , rgb(0, 222, 199) 97%);}
</style>
