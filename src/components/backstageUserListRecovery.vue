<template>
  <el-table v-loading="loading" :data="userList" style="width: 100%" >
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="userName" label="用户名" width="180" align="center"></el-table-column>
    <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
    <el-table-column prop="registerTime" label="创建时间" align="center" ></el-table-column>
    <el-table-column prop="endTime" label="最后登陆" align="center"></el-table-column>
    <el-table-column prop="permissions" label="权限" align="center" width="160">
      <template slot-scope="scope">
        {{scope.row.permissions === '1' ? '普通用户':'超级管理员'}}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" plain @click="handleDelete(scope.$index, scope.row)">还原用户</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from '../assets/js/publicAPI'
import { userRecovery, reduction } from '../assets/js/api'
export default {
  name: 'BackstageUserList',
  data () {
    return {
      loading: true,
      userList: [],
      uId: ''
    }
  },
  methods: {
    handleDelete (index, row) {
      // console.log(index, row)
      this.$confirm('还原此用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reduction(this, row.uId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
    userRecovery(this)
  }
}
</script>

<style>
  .v-modal{ position: relative !important;}
  .upPwd{padding: 20px 10px;}
  .upPwd span{display: block;float: left;width: 20%; height: 40px;line-height: 40px; text-align: center;}
  .upPwd input{display: block;float: left; width: 80%;}
</style>
