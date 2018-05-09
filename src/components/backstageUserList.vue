<template>
  <el-table v-loading="loading" :data="userList" style="width: 100%" >
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="userName" label="用户名" width="180" align="center"></el-table-column>
    <el-table-column prop="nickname" label="昵称" align="center" width="180"></el-table-column>
    <el-table-column prop="registerTime" label="创建时间" align="center" width="160"></el-table-column>
    <el-table-column prop="endTime" label="最后登陆" align="center" width="160"></el-table-column>
    <el-table-column prop="permissions" label="权限" align="center" width="160">
      <template slot-scope="scope">
        {{scope.row.permissions === '1' ? '普通用户':'超级管理员'}}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="500">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">修改密码</el-button>
        <el-dialog
          title="修改用户密码"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <p class="upPwd">
            <span>输入密码</span>
            <input class="el-input__inner" type="password" name="" id="" value="" v-model="pwd"/>
          </p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="updatePwdCancel">取 消</el-button>
            <el-button type="primary" @click="updatePwd">确 定</el-button>
          </span>
        </el-dialog>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
        <el-button v-if="scope.row.permissions === '1'" :disabled="scope.row.permissions === '1' ? false : true" type="warning" size="mini" @click="uploadPermissions(scope.$index, scope.row, '2')">提升为超级管理员</el-button>
        <el-button v-if="scope.row.permissions === '2'" :disabled="scope.row.permissions === '2' ? false : true" type="success" size="mini" @click="uploadPermissions(scope.$index, scope.row, '1')">降级为普通管理员</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from '../assets/js/publicAPI'
import { userList, updatePwd2, delUser, permissions } from '../assets/js/api'
export default {
  name: 'BackstageUserList',
  data () {
    return {
      loading: true,
      userList: [],
      centerDialogVisible: false,
      pwd: '',
      uId: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
      this.centerDialogVisible = true
      this.uId = row.uId
    },
    handleDelete (index, row) {
      // console.log(index, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(this, row.uId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updatePwdCancel () {
      this.centerDialogVisible = false
      this.pwd = ''
      this.uId = ''
    },
    updatePwd () {
      if (this.pwd.length === 0) {
        this.$alert('请输入密码在提交', '警告', {confirmButtonText: '确定'})
      } else if (!(/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/.test(this.pwd))) {
        this.$alert('输入的密码过于简单请重新输入', '警告', {confirmButtonText: '确定'})
      } else {
        updatePwd2(this)
      }
      this.centerDialogVisible = false
      this.pwd = ''
    },
    uploadPermissions (index, row, type) {
      if (type === '1') {
        this.$confirm('是否将用户：' + row.nickname + '降级为普通用户？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          permissions(this, row, type)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else if (type === '2') {
        this.$confirm('是否将用户：' + row.nickname + '升级为超级管理员？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          permissions(this, row, type)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
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
    userList(this)
  }
}
</script>

<style>
  .v-modal{ position: relative;}
  .upPwd{padding: 20px 10px;}
  .upPwd span{display: block;float: left;width: 20%; height: 40px;line-height: 40px; text-align: center;}
  .upPwd input{display: block;float: left; width: 80%;}
</style>
