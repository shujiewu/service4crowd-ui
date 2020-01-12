<template>
  <div class="app-container calendar-list-container" style="padding: 5px; ">

    <el-button @click="handleCreate" type="primary" size='small' icon="el-icon-plus">{{$t('table.add')}}</el-button>
    <el-button @click="handleClone" type="primary" size='small' icon="el-icon-edit">{{$t('table.clone')}}</el-button>
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

    <el-table :key='tableKey' :data="list" v-loading="listLoading" size='small' element-loading-text="给我一点时间" border fit
              highlight-current-row @current-change="handleSelectChange" style="width: 100%">
      <el-table-column align="center" :label="$t('table.method')">
        <template slot-scope="scope">
          <span>{{scope.row.method}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.taskTypes')">
        <template slot-scope="scope">
          <span>{{scope.row.taskType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.taskModeling')">
        <template slot-scope="scope">
          <span>{{scope.row.taskModel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.workerModeling')">
        <template slot-scope="scope">
          <span>{{scope.row.workerModel}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.techniques')">
        <template slot-scope="scope">
          <span>{{scope.row.technique}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.implType')">
        <template slot-scope="scope">
          <span>{{scope.row.implType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.createTime')">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column class-name="status-col" align="center" :label="$t('table.status')" width="150px">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag size="small" :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column min-width="100px" align="center" :label="$t('table.actions')"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button-group v-if="scope.row.userId!='ALL'">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">{{$t('table.edit')}}</el-button>
            <!--<el-button v-if="scope.row.status=='Unpublished'" size="small" type="success">{{$t('table.preview')}}-->
            <router-link v-if="scope.row.status=='Unpublished'" :to="{path:'/process/view/editor/'+scope.row.id}">
              <el-button size="small" type="success">{{$t('table.preview')}}</el-button>
            </router-link>
            <!--</el-button>-->
            <!--<router-link :to="{path:'/hotel/'+item.id}">-->
            <router-link v-else :to="{path:'/process/view/monitor/'+scope.row.processInstanceId}">
              <el-button size="small" type="success">{{$t('table.viewPara')}}
              </el-button>
            </router-link>

            <!--<el-button v-if="scope.row.status=='Unpublished'" size="small" type="info" @click="handleDeploy(scope.row)">-->
              <!--{{$t('table.deploy')}}-->
            <!--</el-button>-->
            <!--<el-button v-else-if="scope.row.status=='Suspend'" size="small" type="warning"-->
                       <!--@click="handleDeploy(scope.row)">{{$t('table.restart')}}-->
            <!--</el-button>-->
            <!--<el-button v-else size="small" type="warning" @click="handleDeploy(scope.row)">{{$t('table.suspend')}}-->
            <!--</el-button>-->
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">{{$t('table.delete')}}
            </el-button>
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


    <el-dialog title="New Method" :visible.sync="dialogFormVisible" width="800px">
      <upload ref="upload" @fileUploadComplete="fileUploadCompleteHandler"></upload>
      <div class="callout">
        <h4>Method Description Example</h4>
        {
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"Method": "MV",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"Task Types": "Decision-Making, Single-Choice",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"Task Modeling": "No Model",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"Worker Modeling": "No Model",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"Techniques": "Direct Computation",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"Implementation Type": "Java",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"Properties": [{
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"type": "long",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"description": "test",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"name": "semitest1"
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;},{
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"type": "string",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"description": "test2",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"name": "semitest2",
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;"value": "defaultValue"
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;}
        <br/>&nbsp;&nbsp;]
        <br/>}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="createTruthInference" size="small">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    createModel,
    deleteModel,
    deployModel,
    readResource,
    cloneModel,
    publishProcess,
    viewProcess
  } from '@/api/process/model'

  import {fetchList} from '@/api/data/algorithm'
  import waves from '@/directive/waves' // 水波纹指令
  import {parseTime} from '@/utils'
  import upload from './upload'
  import {getToken} from '@/utils/auth'

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    components: {upload},
    data() {
      return {
        currentRow: null,
        textMap: {
          new: 'New Model',
          deploy: 'New App',
          clone: 'Clone Model'
        },
        modelTemp: {
          name: '',
          key: '',
          description: '',
          id: '',
          modelType: 0,
          createTime: '',
          lastUpdated: '',
          version: '1',
          star: false,
          status: 'Unpublished'
        },
        appTemp: {
          force: true,
          publish: false,
          appDefinition: {
            name: '',
            key: '',
            description: '',
            definition: {
              models: []
            }
          }
        },
        dialogFormVisible: false,
        dialogImgVisible: false,
        dialogStatus: '',
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          // importance: undefined,
          // title: undefined,
          // type: undefined,
          name: '',
          key: '',
          filter: '',
          sort: 'modifiedDesc',
          modelType: 0
        },
        imgsrc: '',
        // listQueryParam: {
        //   filter: '',
        //   sort: 'modifiedDesc',
        //   modelType: 0
        // },
        rules: {
          // type: [{ required: true, message: 'type is required', trigger: 'change' }],
          // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          key: [{required: true, message: 'key is required', trigger: 'blur'}],
          name: [{required: true, message: 'name is required', trigger: 'blur'}]
        },
        models: {
          filters: [
            {id: 'myProcesses', labelKey: 'MY-PROCESSES'}
          ],

          sorts: [
            {id: 'modifiedDesc', labelKey: 'MODIFIED-DESC'},
            {id: 'modifiedAsc', labelKey: 'MODIFIED-ASC'},
            {id: 'nameAsc', labelKey: 'NAME-ASC'},
            {id: 'nameDesc', labelKey: 'NAME-DESC'}
          ]
        }
        // importanceOptions: [1, 2, 3],
        // calendarTypeOptions,
        // sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        // statusOptions: ['published', 'draft', 'deleted'],
        // showReviewer: false,
        // temp: {
        //   id: undefined,
        //   importance: 1,
        //   remark: '',
        //   timestamp: new Date(),
        //   title: '',
        //   type: '',
        //   status: 'published'
        // },
        // dialogPvVisible: false,
        // pvData: [],
        // downloadLoading: false
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          Published: 'success',
          Unpublished: '',
          Suspend: 'warning',
          Error: 'danger'
        }
        return statusMap[status]
      }
      // typeFilter(type) {
      //   return calendarTypeKeyValue[type]
      // }
    },
    created() {
      this.getList()
    },
    methods: {
      createTruthInference() {
        this.dialogFormVisible = false
      },
      fileUploadCompleteHandler() {
        this.dialogFormVisible = false
      },
      handleSelectChange(val) {
        this.currentRow = val
      },
      handleClone() {
        if (this.currentRow) {
          // this.$confirm('此操作将复制一个模型, 是否继续?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'info'
          // }).then(() => {
          //   cloneModel(this.currentRow.id).then(response => {
          //     if (response.success) {
          //       this.$notify({
          //         title: '成功',
          //         message: '复制成功',
          //         type: 'success',
          //         duration: 2000
          //       })
          //       this.modelTemp.id = response.id
          //       this.list.unshift(this.modelTemp)
          //     } else {
          //       this.$notify({
          //         title: '失败',
          //         message: '删除失败',
          //         type: 'fail',
          //         duration: 2000
          //       })
          //     }
          //   })
          //   this.$message({
          //     type: 'success',
          //     message: '删除成功!'
          //   })
          // }).catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          //   })
          // })
          this.resetModelTempByRow(this.currentRow)
          // this.resetModelTemp()
          this.dialogStatus = 'clone'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        } else {
          this.$message({
            message: '请选中一个模型',
            type: 'warning'
          })
        }
      },
      cloneModel() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            cloneModel(this.modelTemp).then(response => {
              if (response.success) {
                this.dialogFormVisible = false
                this.modelTemp.id = response.id
                this.list.unshift(this.modelTemp)
                this.$notify({
                  title: '成功',
                  message: '复制成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.dialogFormVisible = false
                this.$notify({
                  title: '失败',
                  message: response.message,
                  type: 'fail',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleDelete(row) {
        this.$confirm('此操作将删除该模型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteModel(row.id).then(response => {
            if (response.success) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            } else {
              this.$notify({
                title: '失败',
                message: '删除失败',
                type: 'fail',
                duration: 2000
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery)
          .then(response => {
            console.log(response.data.rows)
            this.list = response.data.rows
            this.total = response.data.total
            this.listLoading = false
          })
      },
      resetModelTemp() {
        this.modelTemp = {
          name: '',
          key: '',
          description: '',
          id: '',
          modelType: 0,
          createTime: new Date(),
          lastUpdated: new Date(),
          version: '1',
          status: 'Unpublished'
        }
      },
      resetModelTempByRow(row) {
        this.modelTemp = {
          name: '',
          key: '',
          description: '',
          id: row.id,
          modelType: 0,
          createTime: new Date(),
          lastUpdated: new Date(),
          version: '1',
          status: 'Unpublished'
        }
      },
      resetAppTemp() {
        this.appTemp = {
          force: true,
          publish: false,
          appDefinition: {
            name: '',
            key: '',
            description: '',
            definition: {
              models: []
            }
          }
        }
      },
      handleCreate() {
        this.resetModelTemp()
        this.dialogStatus = 'new'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createModel() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createModel(this.modelTemp).then(response => {
              if (response.success) {
                this.modelTemp.id = response.id
                this.list.unshift(this.modelTemp)
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: response.message,
                  type: 'success',
                  duration: 2000
                })
                // window.open(window.location.origin + '/modeler.html?modelId=' + this.modelTemp.id, '_blank')
                // window.open(window.location.origin + '/modeler.html?modelId=', '_blank')
              } else {
                this.dialogFormVisible = false
                this.$notify({
                  title: '失败',
                  message: response.message,
                  type: 'error',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleDeploy(row) {
        // this.resetModelTemp()
        // this.resetAppTemp()
        // this.appTemp.appDefinition.definition.models.push(row)
        // this.dialogStatus = 'deploy'
        // this.dialogFormVisible = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
        this.$confirm('此操作将启动该流程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          publishProcess(row.id).then(response => {
            if (response.success) {
              // const index = this.list.indexOf(row)
              row.processInstanceId = response.processInstanceID
              console.log(response)
              row.status = 'Published'
              this.$notify({
                title: '成功',
                message: '部署成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '部署失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消部署'
          })
        })
      },
      deployModel() {
        this.appTemp.appDefinition.name = this.modelTemp.name
        this.appTemp.appDefinition.key = this.modelTemp.key
        this.appTemp.appDefinition.description = this.modelTemp.description

        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            deployModel(this.appTemp).then(response => {
              if (response.success) {
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '部署成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.dialogFormVisible = false
                this.$notify({
                  title: '失败',
                  message: '部署失败',
                  type: 'fail',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleFilter() {
        this.listQuery.page
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleEdit(row) {
        window.open(window.location.origin + '/modeler.html?modelId=' + row.id + '&token=' + getToken(), '_blank')
        // window.open(window.location.origin + '/editor/index.html', '_blank')
      },
      handleView(row) {
        // var para = {
        //   id: row.id,
        //   imageVersion: new Date()
        // }
        // // console.log(readResource(para))
        // readResource(para).then(data => {
        //   console.log(data)
        //   this.imgsrc = 'data:image/png;base64,' + data
        //   // this.imgsrc = 'https://cn.vuejs.org/images/logo.png'
        //   this.dialogImgVisible = true
        // })
        // viewProcess(row.id).then(data => {
        //  console.log(data)
        // this.imgsrc = 'data:image/png;base64,' + data
        // // this.imgsrc = 'https://cn.vuejs.org/images/logo.png'
        // this.dialogImgVisible = true
        // })
        console.log(row.processInstanceId)
      },
      handlePreView(row) {
        // window.open(window.location.origin + '/modeler.html?modelId=' + row.id + '&token=' + getToken(), '_blank')
        // window.open(window.location.origin + '/editor/index.html', '_blank')
        var para = {
          id: row.id,
          imageVersion: new Date()
        }
        // console.log(readResource(para))
        readResource(para).then(data => {
          console.log(data)
          this.imgsrc = 'data:image/png;base64,' + data
          // this.imgsrc = 'https://cn.vuejs.org/images/logo.png'
          this.dialogImgVisible = true
        })
      }
      // handleModifyStatus(row, status) {
      //   this.$message({
      //     message: '操作成功',
      //     type: 'success'
      //   })
      //   row.status = status
      // },
      // handleCreate() {
      //   this.resetTemp()
      //   this.dialogStatus = 'create'
      //   this.dialogFormVisible = true
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].clearValidate()
      //   })
      // },
      // createData() {
      //   this.$refs['dataForm'].validate((valid) => {
      //     if (valid) {
      //       this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      //       this.temp.author = 'vue-element-admin'
      //       createArticle(this.temp).then(() => {
      //         this.list.unshift(this.temp)
      //         this.dialogFormVisible = false
      //         this.$notify({
      //           title: '成功',
      //           message: '创建成功',
      //           type: 'success',
      //           duration: 2000
      //         })
      //       })
      //     }
      //   })
      // },
      // handleUpdate(row) {
      //   this.temp = Object.assign({}, row) // copy obj
      //   this.temp.timestamp = new Date(this.temp.timestamp)
      //   this.dialogStatus = 'update'
      //   this.dialogFormVisible = true
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].clearValidate()
      //   })
      // },
      // updateModel() {
      //   this.$refs['dataForm'].validate((valid) => {
      //     if (valid) {
      //       createModel(this.modelTemp).then(() => {
      //         this.list.unshift(this.modelTemp)
      //         this.dialogFormVisible = false
      //         this.$notify({
      //           title: '成功',
      //           message: '创建成功',
      //           type: 'success',
      //           duration: 2000
      //         })
      //         // window.open(window.location.origin + '/modeler.html?modelId=1', '_blank')
      //       })
      //     }
      //   })
      // },

      // edit(row) {
      //   this.resetModelTemp()
      //   this.dialogStatus = 'create'
      //   this.dialogFormVisible = true
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].clearValidate()
      //   })
      // },
      // updateData() {
      //   this.$refs['dataForm'].validate((valid) => {
      //     if (valid) {
      //       const tempData = Object.assign({}, this.temp)
      //       tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
      //       updateArticle(tempData).then(() => {
      //         for (const v of this.list) {
      //           if (v.id === this.temp.id) {
      //             const index = this.list.indexOf(v)
      //             this.list.splice(index, 1, this.temp)
      //             break
      //           }
      //         }
      //         this.dialogFormVisible = false
      //         this.$notify({
      //           title: '成功',
      //           message: '更新成功',
      //           type: 'success',
      //           duration: 2000
      //         })
      //       })
      //     }
      //   })
      // },
      // handleFetchPv(pv) {
      //   fetchPv(pv).then(response => {
      //     this.pvData = response.data.pvData
      //     this.dialogPvVisible = true
      //   })
      // },
      // handleDownload() {
      //   this.downloadLoading = true
      //   import('@/vendor/Export2Excel').then(excel => {
      //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //     const data = this.formatJson(filterVal, this.list)
      //     excel.export_json_to_excel(tHeader, data, 'table-list')
      //     this.downloadLoading = false
      //   })
      // },
      // formatJson(filterVal, jsonData) {
      //   return jsonData.map(v => filterVal.map(j => {
      //     if (j === 'timestamp') {
      //       return parseTime(v[j])
      //     } else {
      //       return v[j]
      //     }
      //   }))
      // }
    }
  }
</script>
