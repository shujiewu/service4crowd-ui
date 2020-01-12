<template>

  <div class="app-container calendar-list-container" style="padding: 5px; ">
    <router-link :to="{path:'/taskUI/create'}">
      <el-button type="primary" size='small' icon="el-icon-plus">{{$t('table.add')}}</el-button>
    </router-link>

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

    <el-table :key='tableKey' :data="list" v-loading="listLoading" size='small' element-loading-text="给我一点时间" fit
              highlight-current-row @current-change="handleSelectChange" style="width: 100%">
      <el-table-column min-width="200px" align="center" :label="$t('table.id')">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>


      <el-table-column min-width="300px" align="center" :label="$t('table.name')">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="400px" align="center" :label="$t('table.description')">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" :label="$t('table.createTime')">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" :label="$t('table.lastUpdateTime')">
        <template slot-scope="scope">
          <span>{{ scope.row.lastUpdateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" min-width="200px"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button-group>
            <router-link :to="{path:'/taskUI/preview/'+scope.row.id}">
              <el-button type="primary" icon="el-icon-zoom-in" size="small"></el-button>
            </router-link>
            <!--@click="handleView(scope.row)"-->
            <!--<el-button type="info" icon="el-icon-edit" size="small" @click="handleEdit(scope.row)"></el-button>-->
            <router-link :to="{path:'/taskUI/edit/'+scope.row.id}">
              <el-button type="success" icon="el-icon-edit" size="small"></el-button>

            </router-link>
            <el-button type="warning" icon="el-icon-delete" size="small" @click="handleDelete(scope.row)"></el-button>
            <!--<el-button size="small" type="info" @click="handleDeploy(scope.row)">{{$t('table.deploy')}}</el-button>-->
            <!--<el-button size="small" type="danger" @click="handleDelete(scope.row)">{{$t('table.delete')}}</el-button>-->
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper " :total="total">
      </el-pagination>
    </div>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="800px">
      <el-form :rules="rules" ref="dataForm" :model="modelTemp" label-position="left" label-width="70px"
               style='width: 600px; margin-left:50px;'>

        <el-form-item :label="$t('table.key')" prop="key">
          <el-input v-model="modelTemp.key" size="" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.name')" prop="name">
          <el-input v-model="modelTemp.name" clearable></el-input>
        </el-form-item>


        <el-form-item v-if="dialogStatus=='deploy'" :label="$t('table.description')">
          <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="Please input"
                    v-model="modelTemp.description">
          </el-input>
        </el-form-item>
        <el-form-item v-else :label="$t('table.description')">
          <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="Please input"
                    v-model="modelTemp.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='new'" type="primary" @click="createModel" size="small">{{$t('table.confirm')}}
        </el-button>
        <el-button v-else-if="dialogStatus=='deploy'" type="primary" @click="deployModel" size="small">
          {{$t('table.confirm')}}
        </el-button>
        <el-button v-else type="primary" @click="cloneModel" size="small">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="UIView" :visible.sync="dialogViewVisible">
      <div class="editor-content" v-html="uiContent"></div>
    </el-dialog>
    <!--<el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">-->
    <!--<el-table :data="pvData" border fit highlight-current-row style="width: 100%">-->
    <!--<el-table-column prop="key" label="Channel"></el-table-column>-->
    <!--<el-table-column prop="pv" label="Pv"></el-table-column>-->
    <!--</el-table>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->

  </div>


</template>

<script>
  import {fetchList, createModel, deleteModel, deployModel, readResource, cloneModel} from '@/api/process/model'

  import {fetchUIList, fetchUI, deleteUI} from '@/api/data/ui'
  import waves from '@/directive/waves' // 水波纹指令
  import {parseTime} from '@/utils'
  import {getToken} from '@/utils/auth'

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    filters: {
      parseTime(time, format) {
        return parseTime(time, format)
      }
    },
    data() {
      return {
        dialogViewVisible: false,
        uiContent: '',
        currentRow: null,
        textMap: {
          new: 'New UI Page',
          deploy: 'New App',
          clone: 'Clone UI Page'
        },
        modelTemp: {
          title: '',
          description: '',
          id: '',
          createTime: '',
          lastUpdateTime: ''
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
          sort: '+id'
        },
        imgsrc: '',
        listQueryParam: {
          filter: '',
          sort: 'modifiedDesc',
          modelType: 0
        },
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
    // filters: {
    //   statusFilter(status) {
    //     const statusMap = {
    //       published: 'success',
    //       draft: 'info',
    //       deleted: 'danger'
    //     }
    //     return statusMap[status]
    //   },
    //   typeFilter(type) {
    //     return calendarTypeKeyValue[type]
    //   }
    // },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchUIList(this.listQueryParam)
          .then(response => {
            console.log(response)
            this.list = response.data.rows
            this.total = response.data.total
            this.listLoading = false
          })
      },
      handleView(row) {
        // window.open(window.location.origin + '/modeler.html?modelId=' + row.id + '&token=' + getToken(), '_blank')
        // window.open(window.location.origin + '/editor/index.html', '_blank')
        // console.log(readResource(para))
        // fetchUI(row.id).then(res => {
        //   console.log(res)
        //   this.dialogViewVisible = true
        //   this.uiContent = res.data.instruction
        // })
      },
      handleDelete(row) {
        this.$confirm('此操作将删除该界面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUI(row.id).then(response => {
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

      resetModelTemp() {
        this.modelTemp = {
          name: '',
          key: '',
          description: '',
          id: '',
          modelType: 0,
          createTime: new Date(),
          lastUpdated: new Date(),
          version: '1'
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
          version: '1'
        }
      },
      // resetAppTemp() {
      //   this.appTemp = {
      //     force: true,
      //     publish: false,
      //     appDefinition: {
      //       name: '',
      //       key: '',
      //       description: '',
      //       definition: {
      //         models: []
      //       }
      //     }
      //   }
      // },
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
      // handleDeploy(row) {
      //   this.resetModelTemp()
      //   this.resetAppTemp()
      //   this.appTemp.appDefinition.definition.models.push(row)
      //   this.dialogStatus = 'deploy'
      //   this.dialogFormVisible = true
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].clearValidate()
      //   })
      // },
      // deployModel() {
      //   this.appTemp.appDefinition.name = this.modelTemp.name
      //   this.appTemp.appDefinition.key = this.modelTemp.key
      //   this.appTemp.appDefinition.description = this.modelTemp.description
      //
      //   this.$refs['dataForm'].validate((valid) => {
      //     if (valid) {
      //       deployModel(this.appTemp).then(response => {
      //         if (response.success) {
      //           this.dialogFormVisible = false
      //           this.$notify({
      //             title: '成功',
      //             message: '部署成功',
      //             type: 'success',
      //             duration: 2000
      //           })
      //         } else {
      //           this.dialogFormVisible = false
      //           this.$notify({
      //             title: '失败',
      //             message: '部署失败',
      //             type: 'fail',
      //             duration: 2000
      //           })
      //         }
      //       })
      //     }
      //   })
      // },
      handleFilter() {
        this.listQuery.page = 1
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
