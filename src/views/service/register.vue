<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-success">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('service.registerService')}}</h3>
          </div>

          <div class="box-body">
            <div class="filter-container" style="float: left">
              <el-button v-waves class="filter-item" type="primary" :disabled="deleteSelection" icon="el-icon-delete"
                         @click="handleDeleteSelection">{{
                $t('table.delete') }}
              </el-button>


              <router-link :to="{path:'/service/create'}">
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit">{{ $t('table.add') }}
                </el-button>
              </router-link>

              <el-input :placeholder="$t('table.name')" v-model="listQuery.name" style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"/>
              <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item"
                         style="width: 130px">
                <el-option v-for="item in TypeOptions" :key="item.key"
                           :label="item.display_name"
                           :value="item.key"/>
              </el-select>
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{
                $t('table.search') }}
              </el-button>
              <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                         @click="handleDownload">{{ $t('table.export') }}
              </el-button>

            </div>

            <el-table
              v-loading="listLoading"
              :key="tableKey"
              :data="list"
              fit
              highlight-current-row
              style="width: 100%;height: auto"
              :default-sort="{prop: 'createTime', order: 'descending'}"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="name" sortable :label="$t('table.name')" align="center" width="120px">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" sortable :label="$t('table.type')" min-width="20px" align="center">
                <template slot-scope="scope">
                  <!--<el-tag v-if="scope.row.type === 'WEB'" type="success">{{ scope.row.type}}</el-tag>-->
                  <!--<el-tag v-else-if="scope.row.type === 'PROCESSOR'" type="info">{{ scope.row.type}}</el-tag>-->
                  <el-tag :type="scope.row.type | statusFilter">{{ scope.row.type}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.version')" width="100">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.defaultVersion" type="warning">{{ scope.row.version}}</el-tag>
                  <el-tag v-else>{{ scope.row.version}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" sortable :label="$t('table.createTime')" min-width="20px"
                               align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="lastUpdateTime" sortable :label="$t('table.lastUpdateTime')" min-width="20px"
                               align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.lastUpdatedTime }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.uri')" min-width="40px" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.uri }}</span>
                </template>
              </el-table-column>
              <!--<el-table-column :label="$t('table.metadataUri')" min-width="50px" align="center">-->
              <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.metaDataUri }}</span>-->
              <!--</template>-->
              <!--</el-table-column>-->

              <el-table-column :label="$t('table.actions')" align="center" min-width="30px"
                               class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button-group>
                    <router-link
                      :to="{path:'/service/update/'+scope.row.type+'/'+scope.row.name+'/'+scope.row.version}">
                      <el-button size="mini" type="primary">{{ $t('table.update') }}
                      </el-button>
                    </router-link>
                    <router-link v-if="scope.row.type==='WEB'"
                                 :to="{path:'/service/deploy/'+scope.row.type+'/'+scope.row.name+'/'+scope.row.version}">
                      <el-button size="mini" type="success">{{ $t('table.deploy') }}
                      </el-button>
                    </router-link>
                    <router-link v-else
                                 :to="{path:'/service/deploy/'+scope.row.type+'/'+scope.row.name+'/'+scope.row.version}">
                      <el-button size="mini" type="success">{{ $t('table.run') }}
                      </el-button>
                    </router-link>

                    <el-button size="mini" type="warning" @click="handleViewProperty(scope.row)">{{$t('table.property')
                      }}
                    </el-button>
                    <!--<el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.property') }}-->
                    <!--</el-button>-->
                    <el-button size="mini" type="danger"
                               @click="handleDelete(scope.row)">{{ $t('table.delete') }}
                    </el-button>
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
      </div>
    </div>

    <!--<el-dialog title="Edit" :visible.sync="dialogFormVisible">-->
    <!--<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">-->
    <!--<el-form-item :label="$t('table.type')" prop="type">-->
    <!--<el-select v-model="temp.type" class="filter-item" placeholder="Please select">-->
    <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name"-->
    <!--:value="item.key"/>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.date')" prop="timestamp">-->
    <!--<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.title')" prop="title">-->
    <!--<el-input v-model="temp.title"/>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.status')">-->
    <!--<el-select v-model="temp.status" class="filter-item" placeholder="Please select">-->
    <!--<el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.importance')">-->
    <!--<el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3"-->
    <!--style="margin-top:8px;"/>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.remark')">-->
    <!--<el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea"-->
    <!--placeholder="Please input"/>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>-->
    <!--<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm')-->
    <!--}}-->
    <!--</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
    <el-dialog :visible.sync="dialogVisible" title="Service Property">
      <pre style="margin-top:5px;"> {{ jsonProperty }}</pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import {getServiceList, deleteService, getProperty} from '@/api/service/register'
  import waves from '@/directive/waves' // 水波纹指令
  import {parseTime} from '@/utils'

  const TypeOptions = [
    {key: undefined, display_name: ''},
    {key: 'PROCESSOR', display_name: 'PROCESSOR'},
    {key: 'ALGORITHM', display_name: 'ALGORITHM'},
    {key: 'WEB', display_name: 'WEB'}
  ]
  // arr to obj ,such as { CN : "China", US : "USA" }
  const TypeKeyValue = TypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
  export default {
    name: 'ComplexTable',
    directives: {
      waves
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          PROCESSOR: 'success',
          ALGORITHM: 'info',
          WEB: ''
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return TypeKeyValue[type]
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
          // importance: undefined,
          name: undefined,
          type: undefined
          // sort: 'type'
        },
        jsonProperty: '',
        dialogVisible: false,
        importanceOptions: [1, 2, 3],
        TypeOptions,
        sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
        downloadLoading: false,
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
        getServiceList(this.listQuery).then(response => {
          this.listQuery.page = this.listQuery.page + 1
          this.list = response.data.rows
          this.total = response.data.total
          // Just to simulate the time of the request
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
        var data = {
          type: row.type,
          name: row.name,
          version: row.version
        }
        deleteService(data).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
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
      handleViewProperty: function (row) {
        var data = {
          'type': row.type,
          'name': row.name,
          'version': row.version
        }
        getProperty(data).then(response => {
          if (response !== null) {
            this.jsonProperty = JSON.parse(JSON.stringify(response))
            this.dialogVisible = true
          }

          // Just to simulate the time of the request
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
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
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },

      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
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
    float: right;
  }
</style>
