<template>
  <el-container>
    <el-footer>
      <el-input placeholder="请输入搜索内容" v-model="searchTXT" clearable style="width:400px;"></el-input>
      <el-select v-model="projectImg" placeholder="项目" clearable style="width:200px; color: #409eff;margin-left: 20px;">
        <el-option
          v-for="item in projects"
          :key="item.pid"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-select v-model="typeImg" placeholder="项目下小分类" clearable style="width:200px;margin-left: 20px; color: #409eff;">
        <el-option
          v-for="item in types"
          :key="item.tid"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 20px;">查询</el-button>
      <el-button type="primary" style="margin-left: 20px;" v-on:click.stop="navSwitch('uploadImg')">上传图片</el-button>
    </el-footer>
    <el-footer style="height: auto; margin-bottom: 50px;">
      <dl class="articleList clearfix">
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
        <dd>
          <p class="shrinkageImg clearfix">
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
            <img src="../assets/images/sign_bg.db29b0fbd2f78dd8c1b7.png" alt="" />
          </p>
          <p class="articleTime">
            <span>01</span>
            <span>发布：2018/04/20<br />最后修改：2018/04/20</span>
          </p>
          <p class="articleButton">
            <span class="omit2">拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片拔河照片</span>
            <span class="">
              <a v-on:click.stop="navSwitch('uploadImg')">更改</a>
              <a v-on:click.stop="deleteArticle()">删除</a>
              <a href="">查看</a>
            </span>
          </p>
        </dd>
      </dl>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  props: ['navs'],
  name: 'backstageSeeImg',
  data () {
    return {
      types: this.$store.state.user.types,
      projects: this.$store.state.user.projects,
      typeImg: '',
      projectImg: '',
      searchTXT: ''
    }
  },
  methods: {
    navSwitch (type) {
      type === 'uploadImg' ? this.navs.uploadImg = true : this.navs.uploadImg = false
      type === 'seeImg' ? this.navs.seeImg = true : this.navs.seeImg = false
      type === 'modifyImg' ? this.navs.modifyImg = true : this.navs.modifyImg = false
      type === 'rightIndex' ? this.navs.rightIndex = true : this.navs.rightIndex = false
    },
    deleteArticle () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.types = JSON.parse(this.$store.state.user.types)
    this.projects = JSON.parse(this.$store.state.user.projects)
  }
}
</script>

<style>
  .el-input--suffix{width: 200px !important;}
  .articleList{}
  .articleList dd{width: 340px; height: 382px;-moz-box-shadow:0px 0px 20px #034B43; -webkit-box-shadow:0px 0px 20px #034B43; box-shadow:0px 0px 20px #034B43;border-radius: 1em; float: left; margin: 10px 10px 50px;}
  .articleList dd .shrinkageImg{}
  .articleList dd .shrinkageImg img{max-width: 100%; width: 170px;height: 116px; display: block; float: left;}
  .articleList dd .shrinkageImg img:nth-child(1){border-radius: 1em 0 0 0;}
  .articleList dd .shrinkageImg img:nth-child(2){border-radius: 0 1em 0 0;}
  .articleList dd .shrinkageImg img:nth-child(3){border-radius: 0  0 0 1em;}
  .articleList dd .shrinkageImg img:nth-child(4){border-radius: 0  0 1em 0;}
  .articleList dd .articleTime{width:100%;height: 60px;line-height: 60px;    padding: 10px 0;}
  .articleList dd .articleTime span{display: block;float: left;height: 60px; width: 50%;color: #2f6d66;}
  .articleList dd .articleTime span:nth-child(1){font-weight: bold; font-size: 40px;  text-indent: .5em; line-height: 60px;}
  .articleList dd .articleTime span:nth-child(2){ text-align: right; line-height: 30px;width: 45%;padding-right: 5%;}
  .articleList dd .articleButton{width:100%;height: 70px;}
  .articleList dd .articleButton span{display: block;float: left;height: 70px; width: 50%;color: #2f6d66;}
  .articleList dd .articleButton span:nth-child(1){font-weight: bold; font-size: 16px; text-align: justify;  text-indent: .5em;width: 46%; line-height:24px;    padding: 0 2%;}
  .articleList dd .articleButton span:nth-child(2){ text-align: right; line-height: 30px;}
  .articleList dd .articleButton span:nth-child(2) a{display: block; float: left; width: 33%; text-align: center; color: #FFFFFF; margin-top: 40px;}
  .articleList dd .articleButton span:nth-child(2) a:nth-child(1){background: #00bca8;border-radius:  1em 0 0 0;}
  .articleList dd .articleButton span:nth-child(2) a:nth-child(2){background: #e60012;}
  .articleList dd .articleButton span:nth-child(2) a:nth-child(3){width: 34%; background: #00e620; border-radius: 0 0 1em 0;}
</style>
