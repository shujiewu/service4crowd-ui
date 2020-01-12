<template>
  <div id="app-container">
    <el-row style="margin-top: 50px;">
      <el-col :span="14" :offset="4">
        <!--<header class="form_header">选择食品种类</header>-->
        <el-form ref="form" :model="form" label-width="120px">
          <!--<el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">-->
          <!--<el-row class="category_select">-->
          <!--<el-form-item label="食品种类">-->
          <!--<el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%;">-->
          <!--<el-option-->
          <!--v-for="item in categoryForm.categoryList"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-row>-->
          <!--<el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">-->
          <!--<div class="add_category">-->
          <!--<el-form-item label="食品种类" prop="name">-->
          <!--<el-input v-model="categoryForm.name"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="种类描述" prop="description">-->
          <!--<el-input v-model="categoryForm.description"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
          <!--<el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>-->
          <!--</el-form-item>-->
          <!--</div>-->
          <!--</el-row>-->
          <!--<div class="add_category_button" @click="addCategoryFun">-->
          <!--<i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>-->
          <!--<i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>-->
          <!--<span>添加食品种类</span>-->
          <!--</div>-->
          <!--</el-form>-->
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="键值">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="Activity time">-->
          <!--<el-col :span="11">-->
          <!--<el-date-picker type="date" placeholder="Pick a date" v-model="form.date1"-->
          <!--style="width: 100%;"></el-date-picker>-->
          <!--</el-col>-->
          <!--<el-col class="line" :span="2">-</el-col>-->
          <!--<el-col :span="11">-->
          <!--<el-time-picker type="fixed-time" placeholder="Pick a time" v-model="form.date2"-->
          <!--style="width: 100%;"></el-time-picker>-->
          <!--</el-col>-->
          <!--</el-form-item>-->
          <el-form-item label="是否发布">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>

          <el-button icon="plus" size="large" @click.native="selectModel" style="vertical-align: middle;margin: 10px;"></el-button>
          <el-form-item label="Activity type">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="Online activities" name="type"></el-checkbox>
              <el-checkbox label="Promotion activities" name="type"></el-checkbox>
              <el-checkbox label="Offline activities" name="type"></el-checkbox>
              <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources">
            <el-radio-group v-model="form.resource">
              <el-radio label="Sponsor"></el-radio>
              <el-radio label="Venue"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>


          <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
            <div class="add_category">
              <el-form-item label="食品种类" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="种类描述" prop="description">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-row>
          <div class="add_category_button" @click="addCategoryFun">
            <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
            <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
            <span>添加食品种类</span>
          </div>
          <el-form-item>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>


        </el-form>
      </el-col>
    </el-row>

    <el-dialog title="选择工作流模板" :visible.sync="dialogTableVisible">
      <!--<el-table :data="gridData">-->
      <!--<el-table-column property="date" label="日期" width="150"></el-table-column>-->
      <!--<el-table-column property="name" label="姓名" width="200"></el-table-column>-->
      <!--<el-table-column property="address" label="地址"></el-table-column>-->
      <!--</el-table>-->
      <!--<model-manage></model-manage>-->
      <el-table ref="singleTable" :data="list" v-loading="listLoading" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">

        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="选择" width="155">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="radio" :lable="scope.row.name">{{scope.row.name}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.name')" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.key')" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.key}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.lastUpdateTime')">
        </el-table-column>
        <el-table-column :label="$t('table.status')" width="120">
          <template slot-scope="scope">
            <el-tag :type="scope.row.selected | statusFilter">{{scope.row.selected}}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="confirmModel(currentRow)">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList } from '@/api/process/model'
  import { parseTime } from '@/utils'
  export default {
    created() {
      this.getModelList()
    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        showAddCategory: false,
        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }],
        currentRow: null,
        dialogTableVisible: false,
        radio: '',

        list: null,
        total: null,
        listLoading: true,
        listQueryParam: {
          filter: '',
          sort: 'modifiedDesc',
          modelType: 0
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          seleted: 'success',
          unselected: 'danger'
        }
        return statusMap[status]
      }
    },
    methods: {
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      addCategoryFun() {
        this.showAddCategory = !this.showAddCategory
      },
      handleCurrentChange(val) {
        this.currentRow = val
      },
      selectModel() {
        this.dialogTableVisible = true
      },
      confirmModel(row) {
        this.dialogTableVisible = false
      },
      getModelList() {
        this.listLoading = true
        fetchList(this.listQueryParam)
          .then(response => {
            this.list = response.data.rows
            this.list.map(item => {
              item.selected = 'unselected'
            })
            this.total = response.data.total
            this.listLoading = false
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .line {
    text-align: center;
  }

  .add_category_button {
    text-align: center;
    line-height: 40px;
    /*border-bottom-right-radius: 6px;*/
    /*border-bottom-left-radius: 6px;*/
    /*border: 1px solid #eaeefb;*/
    border-top: none;
    transition: all 400ms;
    &:hover {
      background: #f9fafc;
      span, .edit_icon {
        color: #20a0ff;
      }
    }
    /*span {*/
    /*<!--.sc(14px, #999);-->*/
    /*transition: all 400ms;*/
    /*}*/
    .edit_icon {
      color: #ccc;
      transition: all 400ms;
    }

    .add_category_row {
      height: 0;
      overflow: hidden;
      transition: all 400ms;
      background: #f9fafc;
    }
    .showEdit {
      height: 185px;
    }
    .add_category {
      background: #f9fafc;
      padding: 10px 30px 0px 10px;
      border: 1px solid #eaeefb;
      border-top: none;
    }
  }
</style>

<!--<style scoped>-->
<!--@import '../style/mixin.scss';-->
<!--.form{-->
<!--min-width: 400px;-->
<!--margin-bottom: 30px;-->
<!--&:hover{-->
<!--box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);-->
<!--border-radius: 6px;-->
<!--transition: all 400ms;-->
<!--}-->
<!--}-->
<!--.food_form{-->
<!--border: 1px solid #eaeefb;-->
<!--padding: 10px 10px 0;-->
<!--}-->
<!--.form_header{-->
<!--text-align: center;-->
<!--margin-bottom: 10px;-->
<!--}-->
<!--.category_select{-->
<!--border: 1px solid #eaeefb;-->
<!--padding: 10px 30px 10px 10px;-->
<!--border-top-right-radius: 6px;-->
<!--border-top-left-radius: 6px;-->
<!--}-->
<!--.add_category_row{-->
<!--height: 0;-->
<!--overflow: hidden;-->
<!--transition: all 400ms;-->
<!--background: #f9fafc;-->
<!--}-->
<!--.showEdit{-->
<!--height: 185px;-->
<!--}-->
<!--.add_category{-->
<!--background: #f9fafc;-->
<!--padding: 10px 30px 0px 10px;-->
<!--border: 1px solid #eaeefb;-->
<!--border-top: none;-->
<!--}-->
<!--.add_category_button{-->
<!--text-align: center;-->
<!--line-height: 40px;-->
<!--border-bottom-right-radius: 6px;-->
<!--border-bottom-left-radius: 6px;-->
<!--border: 1px solid #eaeefb;-->
<!--border-top: none;-->
<!--transition: all 400ms;-->
<!--&:hover{-->
<!--background: #f9fafc;-->
<!--span, .edit_icon{-->
<!--color: #20a0ff;-->
<!--}-->
<!--}-->
<!--span{-->
<!--.sc(14px, #999);-->
<!--transition: all 400ms;-->
<!--}-->
<!--.edit_icon{-->
<!--color: #ccc;-->
<!--transition: all 400ms;-->
<!--}-->
<!--}-->
<!--.avatar-uploader .el-upload {-->
<!--border: 1px dashed #d9d9d9;-->
<!--border-radius: 6px;-->
<!--cursor: pointer;-->
<!--position: relative;-->
<!--overflow: hidden;-->
<!--}-->
<!--.avatar-uploader .el-upload:hover {-->
<!--border-color: #20a0ff;-->
<!--}-->
<!--.avatar-uploader-icon {-->
<!--font-size: 28px;-->
<!--color: #8c939d;-->
<!--width: 120px;-->
<!--height: 120px;-->
<!--line-height: 120px;-->
<!--text-align: center;-->
<!--}-->
<!--.avatar {-->
<!--width: 120px;-->
<!--height: 120px;-->
<!--display: block;-->
<!--}-->
<!--.cell{-->
<!--text-align: center;-->
<!--}-->
<!--</style>-->
