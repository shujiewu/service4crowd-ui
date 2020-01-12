<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12 no-padding">
        <div class="filter-container" style="float: left">
          <el-button v-waves class="filter-item" type="primary" :disabled="deleteSelection" icon="el-icon-delete" @click="handleDeleteSelection">{{
            $t('table.delete') }}
          </el-button>

          <el-input :placeholder="$t('table.name')" v-model="listQuery.runName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
          <el-input :placeholder="$t('table.experiment')" v-model="listQuery.sourceVersion" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search') }}
          </el-button>
          <el-button v-waves :loading="refreshLoading" class="filter-item" type="primary" icon="el-icon-refresh" @click="handleRefresh">{{ $t('table.refresh') }}
          </el-button>

        </div>

        <el-table v-loading="listLoading" :key="tableKey" :data="list" fit border highlight-current-row style="width: 100%;height: auto" :default-sort = "{prop: 'startTime', order: 'descending'}"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="name" sortable :label="$t('table.name')" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sourceVersion" sortable :label="$t('table.sourceVersion')">
            <template slot-scope="scope">
              <router-link :to="{path:'/service/mlflow/'+scope.row.experimentId}">
                <el-button type="text">{{ scope.row.sourceVersion }}</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.type')">
              <template slot-scope="scope">
                <span>{{ scope.row.sourceType }}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('table.status')" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status  }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.createTime')" prop="startTime" sortable align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('table.endTime')"  prop="endTime" sortable align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.endTime }}</span>
            </template>
          </el-table-column>


          <el-table-column :label="$t('table.actions')" align="center" min-width="100px" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button-group>
                <router-link :to="{path:'/service/mlflow/'+scope.row.experimentId+'/'+scope.row.runUuid}">
                  <el-button size="mini" type="success">{{ $t('table.detail') }}</el-button>
                </router-link>
                <el-button size="mini" type="warning" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.save_model') }}</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
              </el-button-group>
            </template>
          </el-table-column>

        </el-table>
        <div class="pagination-container">
          <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                         :page-size="listQuery.size" :total="total" background
                         layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { getMLRunList,refreshMLRunList } from '@/api/service/mlflow'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  export default {
    name: 'runtimeAlg',
    directives: {
      waves
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          RUNNING: 'success',
          FINISHED: ''
        }
        return statusMap[status]
      },
      typeFilter(type) {
        const typeMap = {
          RUNNING: 'success',
          FINISHED: ''
        }
        return typeMap[status]
      }
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          size: 20,
          runName: undefined,
          sourceVersion: undefined,
          sort: 'startTime,desc'
        },
        refreshLoading: false,
        multipleSelection: [],
        deleteSelection: true
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listQuery.page = this.listQuery.page - 1
        this.listLoading = true
        getMLRunList(this.listQuery).then(response => {
          this.listQuery.page = this.listQuery.page + 1
          this.list = response.data.rows
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1000)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        if (val.length > 0) {
          this.deleteSelection = false
        } else {
          this.deleteSelection = true
        }
      },
      handleDeleteSelection() {
        if (this.multipleSelection.length > 0) {
          var id = []
          for (var i = 0; i < this.multipleSelection.length; i++) {
            id.push(this.multipleSelection[i].id)
          }
        }
      },
      handleDelete(row) {
        // var data = {
        //   type: row.type,
        //   name: row.name,
        //   version: row.version
        // }
        // deleteService(data).then(response => {
        //   this.$notify({
        //     title: '成功',
        //     message: '删除成功',
        //     type: 'success',
        //     duration: 2000
        //   })
        //   const index = this.list.indexOf(row)
        //   this.list.splice(index, 1)
        // })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        this.listQuery.page = 1
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
      },
      handleRefresh() {
        this.refreshLoading = true
        this.listQuery.page = this.listQuery.page - 1
        refreshMLRunList(this.listQuery).then(response => {
          this.listQuery.page = this.listQuery.page + 1
          this.list = response.data.rows
          this.total = response.data.total
          setTimeout(() => {
            this.refreshLoading = false
          }, 1000)
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
<style>
  .pagination-container {
    margin-bottom: 10px;
    float:right;
  }
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
