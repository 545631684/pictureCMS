<template>
  <el-container>
    <el-footer>
      <p class="titleType">
        <b>小分类<button class="el-button el-button--primary el-button--small" style="margin-left: 20px;" size="mini" @click="firing('', '1')">添加小分类</button></b>
        <el-dialog
          :title="title"
          :visible.sync="mixTypeAdd"
          width="35%"
          center>
          <p class="">
            <el-select class="ma10" v-model="projectName" placeholder="项目" filterable clearable style="width:200px; color: #409eff;margin-left: 20px;">
              <el-option
                v-for="item in projects"
                :key="item.pid"
                :label="item.xname"
                :value="item.xname">
              </el-option>
            </el-select>
            <el-select class="ma10" v-model="typeName" placeholder="分类" filterable clearable style="width:200px;margin-left: 20px; color: #409eff;">
              <el-option
                v-for="item in types"
                :key="item.tid"
                :label="item.lname"
                :value="item.lname">
              </el-option>
            </el-select>
            <input style="float: right;width: 150px;" class="el-input__inner" placeholder="小分类" type="text" name="" id="" value="" v-model="name" @keyup.enter="handleUpdate(scope.$index, scope.row, '1')"/>
          </p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel('3')">取 消</el-button>
            <el-button type="primary" @click="addName()">确 定</el-button>
          </span>
        </el-dialog>
      </p>
    </el-footer>
    <el-footer style="height: auto;" >
      <el-table :data="minType" style="width: 850px; float: left;" v-loading="loadingList" >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="pbid" label="项目名称" width="100" align="center">
          <template scope="scope">
            {{getProjectName(scope.row.pbid)}}
          </template>
        </el-table-column>
        <el-table-column prop="tbid" label="类型名称" width="100" align="center">
          <template scope="scope">
            {{getTypesName(scope.row.tbid)}}
          </template>
        </el-table-column>
        <el-table-column prop="dname" label="小类型名称" width="100" align="center"></el-table-column>
        <el-table-column prop="states" label="小类型状态" width="100" align="center">
          <template scope="scope">
            <span v-bind:style="{color: (scope.row.states === true ? '#13ce66' : '#ff4949')}">{{ typeHTML(scope.row.states) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <el-switch
              @change="handleProhibit(scope.$index, scope.row, scope.row.states)"
              v-model="scope.row.states"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <el-button size="mini" type="primary" plain @click="firing(scope.row, '2')" style="margin-left: 20px;">修改名称</el-button>
            <el-dialog
              :title="title"
              :visible.sync="mixTypeModify"
              width="20%"
              center>
              <p class="">
                <input class="el-input__inner" type="text" name="" id="" value="" v-model="dname" @keyup.enter="handleUpdate(scope.$index, scope.row, '1')"/>
              </p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel('1')">取 消</el-button>
                <el-button type="primary" @click="handleUpdate(scope.$index)">确 定</el-button>
              </span>
            </el-dialog>
            <el-button size="mini" type="primary" plain @click="firing(scope.row, '3')" style="margin-left: 20px;">修改类型</el-button>
            <el-dialog
              :title="title"
              :visible.sync="mixTypeModifyUp"
              width="35%"
              center>
              <p class="">
                <el-select class="ma10" v-model="projectName" placeholder="项目" filterable clearable style="width:200px; color: #409eff;margin-left: 20px;">
                  <el-option
                    v-for="item in projects"
                    :key="item.pid"
                    :label="item.xname"
                    :value="item.xname">
                  </el-option>
                </el-select>
                <el-select class="ma10" v-model="typeName" placeholder="分类" filterable clearable style="width:200px;margin-left: 20px; color: #409eff;">
                  <el-option
                    v-for="item in types"
                    :key="item.tid"
                    :label="item.lname"
                    :value="item.lname">
                  </el-option>
                </el-select>
                <el-input style="float: right;width: 150px;" placeholder="小分类" type="text" name="" id="" value="" v-model="name" :disabled="true" @keyup.enter="handleUpdate(scope.$index, scope.row, '1')" /></el-input>
              </p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel('2')">取 消</el-button>
                <el-button type="primary" @click="modifyUpType()">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-footer>
  </el-container>
</template>

<script>
import { detailsDisable, typeDisable, typeEnable, detailsEnable, typesave, projectsave, detailslist, detailsAdd, detailssave } from '../assets/js/api'
export default {
  name: 'BackstageMinType',
  data () {
    return {
      loading: true,
      types: this.$store.state.user.types || [],
      projects: this.$store.state.user.projects || [],
      minType: [],
      uId: '',
      title: '',
      name: '',
      row: {},
      mixTypeModify: false,
      mixTypeModifyUp: false,
      mixTypeAdd: false,
      loadingList: false,
      projectName: '',
      typeName: '',
      dname: ''
    }
  },
  watch: {
    mixTypeModify: function (newQuestion, oldQuestion) {
      if (this.mixTypeModify === false) {
        this.dname = ''
      }
    },
    mixTypeModifyUp: function (newQuestion, oldQuestion) {
      if (this.mixTypeModifyUp === false) {
        this.projectName = ''
        this.typeName = ''
        this.name = ''
      }
    }
  },
  methods: {
    typeHTML (state) {
      return state === true ? '启用' : '禁用'
    },
    handleProhibit (index, row, id) {
      if (id === false) {
        detailsDisable(this, row.did)
      } else if (id === true) {
        detailsEnable(this, row.did)
      }
    },
    handleFiring (index, row, id) {
      if (id === false) {
        typeDisable(this, row.tid)
      } else if (id === true) {
        typeEnable(this, row.tid)
      }
    },
    handleUpdate (index) {
      if (this.dname.length === 0) {
        this.$alert('修改的名称不能为空', '警告', {confirmButtonText: '确定'})
      } else {
        console.log(index + ",项目id：" + this.row.pbid + "，类型id：" + this.row.tbid + ",小分类id：" + this.row.did + ",小分类名称：" + this.row.dname)
        detailssave(this, this.row.did, this.row.pbid, this.row.tbid, this.dname)
      }
    },
    firing (row, id) {
      this.row = row
      if (id === '1') {
        this.mixTypeAdd = true
        this.title = '输入添加的小类型名称：'
      } else if (id === '2') {
        this.mixTypeModify = true
        this.title = '修改小类型名称（' + row.dname + '）为：'
      } else if (id === '3') {
        this.projectName = this.getProjectName(this.row.pbid)
        this.typeName = this.getTypesName(this.row.tbid)
        this.name = this.row.dname
        this.title = '修改小类型名称（' + row.dname + '）的项目和类型：'
        this.mixTypeModifyUp = true
      }
    },
    cancel (id) {
      if (id === '1') {
        this.mixTypeModify = false
      } else if (id === '2') {
        this.mixTypeModifyUp = false
      } else if (id === '3') {
        this.mixTypeAdd = false
      }
      this.row = {}
      this.name = ''
      this.dname = ''
    },
    addName () {
      if (this.name.length === 0) {
        this.$alert('添加的小类型不能为空', '警告', {confirmButtonText: '确定'})
      } else if (this.projectName.length === 0) {
        this.$alert('请选择项目名称', '警告', {confirmButtonText: '确定'})
      } else if (this.typeName.length === 0) {
        this.$alert('请选择类型名称', '警告', {confirmButtonText: '确定'})
      } else {
        detailsAdd(this, this.name, this.getProjectID(this.projectName), this.getTypesID(this.typeName))
      }
    },
    modifyUpType () {
      if (this.projectName.length === 0) {
        this.$alert('请选择项目名称', '警告', {confirmButtonText: '确定'})
      } else if (this.typeName.length === 0) {
        this.$alert('请选择类型名称', '警告', {confirmButtonText: '确定'})
      } else {
        detailssave(this, this.row.did, this.getProjectID(this.projectName), this.getTypesID(this.typeName), this.row.dname)
        // console.log('小类型：' + this.name + '，项目：' + this.getProjectID(this.projectName) + '，类型：' + this.getTypesID(this.typeName))
      }
    },
    getProjectID (xname) {
      let id = ''
      for (let i = 0; i < this.projects.length; i++) {
      	if (this.projects[i].xname === xname) {
      	  id = this.projects[i].pid
      	}
      }
      return id
    },
    getTypesID (lname) {
      let id = ''
      for (let i = 0; i < this.types.length; i++) {
      	if (this.types[i].lname === lname) {
      	  id = this.types[i].tid
      	}
      }
      return id
    },
    getProjectName (pid) {
      let name = ''
      for (let i = 0; i < this.projects.length; i++) {
      	if (this.projects[i].pid === pid) {
      	  name = this.projects[i].xname
      	}
      }
      return name
    },
    getTypesName (tid) {
      let name = ''
      for (let i = 0; i < this.types.length; i++) {
      	if (this.types[i].tid === tid) {
      	  name = this.types[i].lname
      	}
      }
      return name
    }
  },
  created () {
    this.loadingList = true
    detailslist(this, '2')
  }
}
</script>

<style>
  .v-modal{ position: relative !important;}
  .titleType{height: 60px;line-height: 60px; text-align: left;}
  .titleType b{display: block;float: left; width: 50%; height: 60px; line-height: 60px; font-size: 20px;}
</style>
