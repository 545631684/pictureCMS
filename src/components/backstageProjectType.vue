<template>
  <el-container>
    <el-footer>
      <p class="titleType">
        <b>项目<button class="el-button el-button--primary el-button--small" style="margin-left: 20px;" size="mini" @click="firing('', '3')">添加项目</button></b>
        <b>类型<button class="el-button el-button--primary el-button--small" style="margin-left: 20px;" size="mini" @click="firing('', '4')">添加类型</button></b>
        <el-dialog
          :title="title"
          :visible.sync="centerDialogVisibleAdd"
          width="20%"
          center>
          <p class="upPwd">
            <input class="el-input__inner" type="text" name="" id="" value="" v-model="name" @keyup.enter="handleUpdate(scope.$index, scope.row, '1')"/>
          </p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel('3')">取 消</el-button>
            <el-button type="primary" @click="addName()">确 定</el-button>
          </span>
        </el-dialog>
      </p>
    </el-footer>
    <el-footer style="height: auto;">
      <el-table v-loading="loadingP" :data="PList" style="width: 50%; float: left;" >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="xname" label="项目名称" width="100" align="center"></el-table-column>
        <el-table-column prop="state" label="项目状态" width="100" align="center">
          <template scope="scope">
            <span v-bind:style="{color: (scope.row.state === true ? '#13ce66' : '#ff4949')}">{{ typeHTML(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-switch
              @change="handleProhibit(scope.$index, scope.row, scope.row.state)"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <el-button size="mini" type="primary" plain @click="firing(scope.row, '1')" style="margin-left: 20px;">修改</el-button>
            <el-dialog
              :title="title"
              :visible.sync="centerDialogVisibleP"
              width="20%"
              center>
              <p class="upPwd">
                <input class="el-input__inner" type="text" name="" id="" value="" v-model="name" @keyup.enter="handleUpdate(scope.$index, scope.row, '1')"/>
              </p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel('1')">取 消</el-button>
                <el-button type="primary" @click="handleUpdate(scope.$index, scope.row, '1')">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-loading="loadingT" :data="tList" style="width: 50%; float: left;" >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="lname" label="类型名称" width="100" align="center"></el-table-column>
        <el-table-column prop="state" label="类型状态" width="100" align="center">
          <template scope="scope">
            <span v-bind:style="{color: (scope.row.state === true ? '#13ce66' : '#ff4949')}">{{ typeHTML(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-switch
              @change="handleFiring(scope.$index, scope.row, scope.row.state)"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <el-button size="mini" type="primary" plain @click="firing(scope.row, '2')" style="margin-left: 20px;">修改</el-button>
            <el-dialog
              :title="title"
              :visible.sync="centerDialogVisibleT"
              width="20%"
              center>
              <p class="upPwd">
                <input class="el-input__inner" type="text" name="" id="" value="" v-model="name" @keyup.enter="handleUpdate(scope.$index, scope.row, '2')"/>
              </p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel('2')">取 消</el-button>
                <el-button type="primary" @click="handleUpdate(scope.$index, scope.row, '2')">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-footer>
  </el-container>
</template>

<script>
import { projectList, typeList, projectDisable, typeDisable, typeEnable, projectEnable, typesave, projectsave, projectAdd, typeAdd } from '../assets/js/api'
export default {
  name: 'BackstageProjectType',
  data () {
    return {
      loadingP: true,
      loadingT: true,
      PList: [],
      tList: [],
      uId: '',
      title: '',
      name: '',
      row: {},
      centerDialogVisibleP: false,
      centerDialogVisibleT: false,
      centerDialogVisibleAdd: false
    }
  },
  methods: {
    typeHTML (state) {
      return state === true ? '启用' : '禁用'
    },
    handleProhibit (index, row, id) {
      console.log(index, row)
      if (id === false) {
        projectDisable(this, row.pid)
      } else if (id === true) {
        projectEnable(this, row.pid)
      }
    },
    handleFiring (index, row, id) {
      // console.log(index, row)
      if (id === false) {
        typeDisable(this, row.tid)
      } else if (id === true) {
        typeEnable(this, row.tid)
      }
    },
    handleUpdate (index, row, id) {
      console.log(this.row)
      if (this.name.length === 0) {
        this.$alert('修改的名称不能为空', '警告', {confirmButtonText: '确定'})
      } else if (id === '1') {
        projectsave(this, this.row.pid)
      } else if (id === '2') {
        typesave(this, this.row.tid)
      }
    },
    firing (row, id) {
      this.row = row
      if (id === '1') {
        this.centerDialogVisibleP = true
        this.title = '修改项目名称（' + row.xname + '）为：'
      } else if (id === '2') {
        this.centerDialogVisibleT = true
        this.title = '修改类型名称（' + row.lname + '）为：'
      } else if (id === '3') {
        this.centerDialogVisibleAdd = true
        this.title = '输入添加的项目名称：'
      } else if (id === '4') {
        this.centerDialogVisibleAdd = true
        this.title = '输入添加的类型名称：'
      }
    },
    cancel (id) {
      if (id === '1') {
        this.centerDialogVisibleP = false
      } else if (id === '2') {
        this.centerDialogVisibleT = false
      } else if (id === '3') {
        this.centerDialogVisibleAdd = false
      } else if (id === '4') {
        this.centerDialogVisibleAdd = false
      }
      this.row = {}
      this.name = ''
    },
    addName () {
      if (this.name.length === 0) {
        this.$alert('添加的名称不能为空', '警告', {confirmButtonText: '确定'})
      } else if (this.title.indexOf('项目') !== -1) {
        projectAdd(this)
      } else if (this.title.indexOf('类型') !== -1) {
        typeAdd(this)
      }
    }
  },
  created () {
    projectList(this)
    typeList(this)
  }
}
</script>

<style scoped>
  .v-modal{ position: relative !important;}
  .titleType{height: 60px;line-height: 60px; text-align: left;}
  .titleType b{display: block;float: left; width: 50%; height: 60px; line-height: 60px; font-size: 20px;}
</style>
