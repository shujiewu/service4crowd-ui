<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <el-button @click="handleCreate" type="primary" size='small' icon="el-icon-plus">{{$t('table.add')}}</el-button>
            <el-button @click="handleClone" type="primary" size='small' icon="el-icon-edit">{{$t('table.clone')}}</el-button>

          </div>
        </div>
        <div class="row" style="margin-top: 15px">
          <div class="col-md-12">
            <div class="box box-primary box-solid">
              <!--<div class="box-header with-border">-->
              <!--<h3 class="box-title">工人统计</h3>-->
              <!--</div>-->
              <div class="box-body" style="height: auto">
                <div class="col-md-12">
                  <div class="filter-container">
                    <el-input @keyup.enter.native="handleFilter" size='small' style="width: 200px; " class="filter-item"
                              :placeholder="$t('table.name')" v-model="listQuery.name">
                    </el-input>
                    <el-input @keyup.enter.native="handleFilter" size='small' style="width: 200px;" class="filter-item"
                              :placeholder="$t('table.key')" v-model="listQuery.key">
                    </el-input>
                    <el-button class="filter-item" type="primary" size='small' v-waves icon="el-icon-search" @click="handleFilter">
                      {{$t('table.search')}}
                    </el-button>
                  </div>
                  <el-table :data="templateList" v-loading="listLoading" element-loading-text="给我一点时间" highlight-current-row @current-change="handleSelectChange" style="margin-top:15px; width: 100%" border>
                    <el-table-column type="expand">
                      <!--<template slot-scope="props">-->
                        <!--<el-form label-position="left" inline class="demo-table-expand">-->
                          <!--<el-form-item label="商品名称">-->
                            <!--<span>{{ props.row.name }}</span>-->
                          <!--</el-form-item>-->
                          <!--<el-form-item label="所属店铺">-->
                            <!--<span>{{ props.row.shop }}</span>-->
                          <!--</el-form-item>-->
                          <!--<el-form-item label="商品 ID">-->
                            <!--<span>{{ props.row.id }}</span>-->
                          <!--</el-form-item>-->
                          <!--<el-form-item label="店铺 ID">-->
                            <!--<span>{{ props.row.shopId }}</span>-->
                          <!--</el-form-item>-->
                          <!--<el-form-item label="商品分类">-->
                            <!--<span>{{ props.row.category }}</span>-->
                          <!--</el-form-item>-->
                          <!--<el-form-item label="店铺地址">-->
                            <!--<span>{{ props.row.address }}</span>-->
                          <!--</el-form-item>-->
                          <!--<el-form-item label="商品描述">-->
                            <!--<span>{{ props.row.desc }}</span>-->
                          <!--</el-form-item>-->
                        <!--</el-form>-->
                      <!--</template>-->
                    </el-table-column>
                    <el-table-column align="center" :label="$t('table.name')">
                      <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="100px" align="center" :label="$t('table.key')">
                      <template slot-scope="scope">
                        <span>{{scope.row.key}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="300px" align="center" :label="$t('table.description')">
                      <template slot-scope="scope">
                        <span>{{scope.row.description}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="100px" align="center" :label="$t('table.version')">
                      <template slot-scope="scope">
                        <span>{{scope.row.version}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="200px" align="center" :label="$t('table.lastUpdateTime')">
                      <template slot-scope="scope">
                        <span v-if="scope.row.lastUpdated!==null">{{ scope.row.lastUpdated | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('table.actions')" min-width="200px"
                                     class-name="small-padding fixed-width">
                      <template slot-scope="scope">
                        <el-button-group>
                          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">{{$t('table.edit')}}</el-button>
                          <el-button type="success" size="mini" @click="handleToProcess(scope.row)">{{$t('table.deploy')}}</el-button>
                          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('table.delete')}}</el-button>
                        </el-button-group>
                      </template>
                    </el-table-column>
                  </el-table>

                  <div class="pagination-container" style="margin-right: 50px; margin-bottom: 10px">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page.sync="listQuery.page"
                                   :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                                   layout="total, sizes, prev, pager, next, jumper " :total="total">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>



    <el-dialog title="Create Template" :visible.sync="dialogFormVisible" width="800px">
      <el-form :rules="rules" ref="dataForm" :model="modelTemp" label-position="left" label-width="70px"
               style='width: 600px; margin-left:50px;'>

        <el-form-item :label="$t('table.name')" prop="name">
          <el-input v-model="templateTemp.name" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.description')">
          <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="Please input"
                    v-model="templateTemp.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">{{$t('table.cancel')}}</el-button>
        <el-button @click="createModel" size="small">{{$t('table.confirm')}}
        </el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
  import {
    fetchTemplateList
  } from '@/api/process/model'
  import { parseTime } from '@/utils'
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        templateList: [],
        templateTemp: {
          name: '',
          description: '',
          modelId: ''
        },
        listQuery: {
          page: 1,
          limit: 20,
          name: '',
          key: '',
          sort: 'created'
        },
        total: 0,
        listLoading: false,
        currentRow: null,
        dialogFormVisible: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCreate() {
        this.dialogFormVisible = true
      },
      handleClone() {

      },
      handleFilter() {
        // this.listQuery.page
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleDelete(row) {

      },
      handleToProcess(row) {

      },
      handleEdit(row) {
        window.open(window.location.origin + '/modeler.html?modelId=' + row.id + '&token=' + getToken(), '_blank')
      },
      createTemplate() {

      },
      getList() {
        this.listLoading = true
        fetchTemplateList(this.listQuery)
          .then(response => {
            console.log(response)
            this.templateList = response.data.rows
            this.total = response.data.total
            this.listLoading = false
          })
      },
      handleSelectChange(val) {
        this.currentRow = val
      }
    }
  }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
