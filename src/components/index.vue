<template>
  <div class="hello">
    <vue-particles color="#f65252" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#8d9feb" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"></vue-particles>
    <router-link tag="a" to="/login">登陆后台</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  position: absolute;
  top: 100px;
  left: 50%;
  color: #42b983;
  display: block;
  margin:100px auto;
  width: 300px;
  height: 30px;
  font-size: 30px;
}
</style>
