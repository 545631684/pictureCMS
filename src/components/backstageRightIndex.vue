<template>
  <el-container>
    <div style="width: 343px; float: left;margin: 0 0 10px;">
      <div class="tj1 tj1-hover">
        <div class="user-info">
          <p>
            <img src="../assets/images/touxiang.jpg" alt=""/>
            <span><b>{{name}}</b><br>{{permissions === 1? '普通用户':'超级管理员'}}</span>
          </p>
                上次登录时间： <samp>{{formatDate(endTime)}}</samp>
        </div>
      </div>
      <div class="tj2 tj1-hover">
        <p>最近发布</p>
        <dl>
        	<dd v-for="(item, index) in article" :key="index" v-if="index < 5"><a :href="'/#/article/backstage/all/' + item.mId" target="_blank" :title="item.title"><b>{{item.title}}</b><span>{{formatDate(item.registerTimeImg)}}</span></a></dd>
        	
        </dl>
      </div>
    </div>
    <div style="width: 75%; float: right;margin: 0 0 10px 2%;">
      <div class="tj3">
        <dl>
          <dd class="tj1-hover">
            <span><img src="../assets/images/ti_img1.png" alt="" /></span>
            <samp>
              <b>0</b>
              <b>当日查看</b>
            </samp>
          </dd>
          <dd class="tj1-hover">
            <span><img src="../assets/images/ti_img2.png" alt="" /></span>
            <samp>
              <b>{{article.length}}</b>
              <b>总发布文章数</b>
            </samp>
          </dd>
          <dd class="tj1-hover">
            <span><img src="../assets/images/ti_img3.png" alt="" /></span>
            <samp>
              <b>{{userList.length}}</b>
              <b>当前用户数</b>
            </samp>
          </dd>
        </dl>
      </div>
      <div class="tj4 tj1-hover">
         <div id="myChart" style="width: 100%;height:100%;"></div>
      </div>
    </div>
  </el-container>
</template>

<script>
import { formatDate } from '../assets/js/publicAPI'
import { administrationArticleAll, administrationArticleQuery, delArticle2, userList2, detailsDisable, Statistics } from '../assets/js/api'
export default {
  name: 'BackstageRightIndex',
  data () {
    return {
      name: this.$store.state.user.nickname === 'null' ? this.$store.state.user.userName : this.$store.state.user.nickname,
      permissions: this.$store.state.user.permissions,
      endTime: this.$store.state.user.endTime,
      article: [],
      userList: [],
      tj4data: [],
      tj4time: []
    }
  },
  watch: {
  	tj4data: function (newQuestion, oldQuestion) {
  		console.log('健康')
  		if (this.tj4data.length !== 0) {
  			this.drawLine()
  		}
    }
  },
  mounted(){
    this.drawLine()
  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
          title: { 
            text: '当日发布数量',
            textAlign:'center',
            x:'center',
            y:'10px',
            textStyle: {
              align: 'center',
              fontSize: 20,
            }
          },
          tooltip: {},
          xAxis: {
              type: 'category',
              data: this.tj4data
          },
          yAxis: {},
          series: [{
              data: this.tj4time,
              type: 'line',
              symbolSize: 20
          }]
      });
    },
    formatDate (time) { // 时间戳转换
      if (time !== null) {
        let date = new Date(parseInt(time) * 1000)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      } else {
        return '暂无'
      }
    }
  },
  created () {
    administrationArticleAll(this)
    userList2(this)
    Statistics(this)
  }
}
</script>

<style scoped>
  .omit{text-overflow:ellipsis; overflow:hidden; white-space:nowrap;}
  .tj1{width:300px;border:1px solid #ebeef5;background-color:#fff;color:#303133;transition:.3s;border-radius:4px;overflow:hidden;padding:20px; margin-bottom: 20px;}
  .tj1-hover:hover{box-shadow:0 2px 12px 0 rgba(39, 31, 31, 0.46);}
  .tj1 .user-info{}
  .tj1 .user-info p{display:flex;margin-bottom:20px;padding-bottom:20px;border-bottom:2px solid #ccc;align-items:center}
  .tj1 .user-info p img{width:100px;height:100px;border-radius:50%}
  .tj1 .user-info p span{padding-left:50px;color:#999;font-size:14px;-ms-flex:1;flex:1}
  .tj1 .user-info p span b{color:#222;font-size:30px}
  .tj1 .user-info samp{margin-left:45px}
  .tj2{width:300px;    padding: 20px;border:1px solid #ebeef5;background-color:#fff;color:#303133;transition:.3s}
  .tj2 p{padding:18px 20px;border-bottom:1px solid #ebeef5;box-sizing:border-box; font-size: 18px; font-weight: bold;}
  .tj2 dl{padding:20px}
  .tj2 dl dd{height: 30px; line-height: 30px; }
  .tj2 dl dd a{color: #585858;}
  .tj2 dl dd a b{display: block; float: left; width: 170px;height: 30px; line-height: 30px;text-overflow:ellipsis; overflow:hidden; white-space:nowrap;}
  .tj2 dl dd a span{display: block; float: left;width: 90px;font-size:14px;color:#606266;display:inline-block;vertical-align:middle;line-height:1; text-align: center;height: 30px; line-height: 30px;    overflow: hidden;}
  .tj3{width: 100%; height: auto; }
  .tj3 dl{display: flex;justify-content:space-between;}
  .tj3 dl dd{width: 30%; height: 100px; background: #FFFFFF; overflow: hidden;border:1px solid #ebeef5;transition:.3s}
  .tj3 dl dd span{display:inline;width: 50px; height: 50px;padding: 25px; background: #0077E6; float: left;}
  .tj3 dl dd span img{display: block; }
  .tj3 dl dd samp{display: inline;float: left; width: 69%;}
  .tj3 dl dd samp b{display: block; text-align: center;}
  .tj3 dl dd samp b:nth-child(1){color: #0077E6; font-size: 28px;padding: 20px 0 10px;}
  .tj3 dl dd samp b:nth-child(2){ color: #999;}
  .tj4{width: 99.8%; height: 400px; margin-top: 14px;border:1px solid #ebeef5;transition:.3s}
</style>
