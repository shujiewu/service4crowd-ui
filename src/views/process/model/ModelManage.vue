<template>
  <!--<div class="app-container calendar-list-container" style="padding: 5px; ">-->
  <section class="content">
    <el-row class="panel-group" :gutter="20">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class='card-panel' @click="handleCreate">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="add" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Total Process</div>
            <div class="card-panel-num">{{totalProcess}}</div>
            <!--<count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>-->
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleStatusFilter('Unpublished')">
          <div class="card-panel-icon-wrapper icon-shoppingCard">
            <svg-icon icon-class="model" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Model</div>
            <div class="card-panel-num">{{modelTotal}}</div>
            <!--<count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600"></count-to>-->
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleStatusFilter('Published')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="run" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Running</div>
            <div class="card-panel-num">{{runTotal}}</div>
            <!--<count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200"></count-to>-->
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleStatusFilter('Complete')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="iconfont-complete" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Completed</div>
            <div class="card-panel-num">{{completedTotal}}</div>
            <!--<count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to>-->
          </div>
        </div>
      </el-col>


    </el-row>

    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary box-solid">
          <!--<div class="box-header with-border">-->
          <!--<h3 class="box-title">工人统计</h3>-->
          <!--</div>-->
          <div class="box-body" style="height: auto">
            <div class="col-md-12">
              <!--<model-manage></model-manage>-->
              <!--<el-button @click="handleCreate" type="primary" size='small' icon="el-icon-plus">{{$t('table.add')}}</el-button>-->
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
                <el-table-column min-width="300px" align="center" :label="$t('table.name')">
                  <template slot-scope="scope">
                    <span class="link-type" @click="handleEdit(scope.row)">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column min-width="200px" align="center" :label="$t('table.key')">
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
                    <span>{{ scope.row.lastUpdated | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>

                <el-table-column width="80px"  align="center" :label="$t('table.processInstanceId')">
                <template slot-scope="scope">
                    <span>{{scope.row.processInstanceId}}</span>
                </template>
                </el-table-column>
                <!--<el-table-column width="80px" align="center" :label="$t('table.star')">-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-rate v-if="scope.row.isTemplate === true"  disabled :colors="['#FF9900']" :max='1'-->
                             <!--@change="handleCollect(scope.row)"></el-rate>-->
                    <!--<el-rate v-else :colors="['#FF9900']" :max='1'-->
                             <!--@change="handleCollect(scope.row)"></el-rate>-->
                  <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column align="center" :label="$t('table.readings')" width="95">-->
                <!--<template slot-scope="scope">-->
                <!--<span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
                <!--<span v-else>0</span>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column class-name="status-col" align="center" :label="$t('table.status')" width="150px">
                  <template slot-scope="scope">
                    <el-tag size="small" :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('table.actions')" min-width="300px"
                                 class-name="small-padding fixed-width">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button type="primary" size="mini" @click="handleEdit(scope.row)">{{$t('table.edit')}}</el-button>
                      <!--<el-button v-if="scope.row.status=='Unpublished'" size="small" type="success">{{$t('table.preview')}}-->
                      <!--<router-link v-if="scope.row.status=='Unpublished'" :to="{path:'/process/view/editor/'+scope.row.id}">-->
                        <!--<el-button size="mini" type="success">{{$t('table.preview')}}</el-button>-->
                      <!--</router-link>-->
                      <!--</el-button>-->
                      <!--<router-link :to="{path:'/hotel/'+item.id}">-->

                      <el-button v-if="scope.row.status=='Unpublished'" size="mini" type="info" @click="handleDeploy(scope.row)">
                        {{$t('table.deploy')}}
                      </el-button>
                      <router-link v-else :to="{path:'/process/view/monitor/'+scope.row.processInstanceId}">
                        <el-button size="mini" type="success">{{$t('table.view')}}
                        </el-button>
                      </router-link>

                      <!--<el-button v-else-if="scope.row.status=='Suspend'" size="mini" type="warning"-->
                                 <!--@click="handleDeploy(scope.row)">{{$t('table.restart')}}-->
                      <!--</el-button>-->
                      <!--<el-button v-else size="mini" type="warning" @click="handleDeploy(scope.row)">{{$t('table.suspend')}}-->
                      <!--</el-button>-->
                      <el-button size="mini" type="warning" @click="handleDelete(scope.row)">{{$t('table.delete')}}
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

            </div>
          </div>
        </div>
      </div>
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

    <el-dialog title="ProcessImage" :visible.sync="dialogImgVisible">
      <img :src="imgsrc" width="100px">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogImgVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog title="$t('table.confirm')" :visible.sync="dialogTemplateVisible">
      <el-form :rules="templateRules" ref="templateForm" :model="templateTemp" label-position="left" label-width="70px"
               style='width: 600px; margin-left:50px;'>
        <el-form-item :label="$t('table.name')" prop="name">
          <el-input v-model="templateTemp.name" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.key')" prop="key">
          <el-input v-model="templateTemp.key" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.description')">
          <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="Please input"
                    v-model="templateTemp.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTemplateVisible = false" size="small">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="createTemplate" size="small">
          {{$t('table.confirm')}}
        </el-button>
      </div>
    </el-dialog>
    <!--<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">-->
    <!--<el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>-->
    <!--<el-form-item :label="$t('table.type')" prop="type">-->
    <!--<el-select class="filter-item" v-model="temp.type" placeholder="Please select">-->
    <!--<el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.date')" prop="timestamp">-->
    <!--<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date">-->
    <!--</el-date-picker>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.title')" prop="title">-->
    <!--<el-input v-model="temp.title"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.status')">-->
    <!--<el-select class="filter-item" v-model="temp.status" placeholder="Please select">-->
    <!--<el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.importance')">-->
    <!--<el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='3'></el-rate>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.remark')">-->
    <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>-->
    <!--<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>-->
    <!--<el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->

    <!--<el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">-->
    <!--<el-table :data="pvData" border fit highlight-current-row style="width: 100%">-->
    <!--<el-table-column prop="key" label="Channel"> </el-table-column>-->
    <!--<el-table-column prop="pv" label="Pv"> </el-table-column>-->
    <!--</el-table>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->

    <!--</div>-->
  </section>
</template>

<script>
  import {
    fetchList,
    createModel,
    deleteModel,
    deployModel,
    readResource,
    cloneModel,
    publishProcess,
    modelToTemplate
  } from '@/api/process/model'
  import waves from '@/directive/waves' // 水波纹指令
  // import { parseTime } from '@/utils'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        currentRow: null,
        textMap: {
          new: 'New Model',
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
        templateTemp: {
          name: '',
          key: '',
          description: '',
          modelId: ''
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
        dialogTemplateVisible: false,
        dialogStatus: '',
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          name: '',
          key: '',
          filter: '',
          status: '',
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
          key: [{ required: true, message: 'key is required', trigger: 'blur' }],
          name: [{ required: true, message: 'name is required', trigger: 'blur' }]
        },
        templateRules: {
          key: [{ required: true, message: 'key is required', trigger: 'blur' }],
          name: [{ required: true, message: 'name is required', trigger: 'blur' }]
        },
        models: {
          filters: [
            { id: 'myProcesses', labelKey: 'MY-PROCESSES' }
          ],

          sorts: [
            { id: 'modifiedDesc', labelKey: 'MODIFIED-DESC' },
            { id: 'modifiedAsc', labelKey: 'MODIFIED-ASC' },
            { id: 'nameAsc', labelKey: 'NAME-ASC' },
            { id: 'nameDesc', labelKey: 'NAME-DESC' }
          ]
        },
        runTotal: 0,
        modelTotal: 0,
        completedTotal: 0,
        totalProcess: 0
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
      },
      parseTime(time, cFormat) {
        console.log(time)
        if (arguments.length === 0) {
          return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
          date = time
        } else {
          if (('' + time).length === 10) time = parseInt(time) * 1000
          date = new Date(time)
        }
        const formatObj = {
          y: date.getFullYear(),
          m: date.getMonth() + 1,
          d: date.getDate(),
          h: date.getHours(),
          i: date.getMinutes(),
          s: date.getSeconds(),
          a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
          let value = formatObj[key]
          if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
          if (result.length > 0 && value < 10) {
            value = '0' + value
          }
          return value || 0
        })
        return time_str
      }
      // typeFilter(type) {
      //   return calendarTypeKeyValue[type]
      // }
    },
    created() {
      this.getList()
    },
    methods: {
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
                  title: 'success',
                  message: 'copy success',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.dialogFormVisible = false
                this.$notify({
                  title: 'fail',
                  message: response.message,
                  type: 'fail',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleCollect(row) {
        this.dialogTemplateVisible = true
        this.templateTemp = {
          name: '',
          description: '',
          modelId: row.id
        }
        // this.$message({
        //   type: 'info',
        //   message: this.currentRow.key
        // })
        this.$nextTick(() => {
          this.$refs['templateForm'].clearValidate()
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
            console.log(response)
            this.list = response.list
            this.total = response.totalElements
            this.runTotal = response.run
            this.modelTotal = response.model
            this.completedTotal = response.completed
            this.totalProcess = response.totalProcess
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
                  title: 'success',
                  message: response.message,
                  type: 'success',
                  duration: 2000
                })
                // window.open(window.location.origin + '/modeler.html?modelId=' + this.modelTemp.id, '_blank')
                // window.open(window.location.origin + '/modeler.html?modelId=', '_blank')
              } else {
                this.dialogFormVisible = false
                this.$notify({
                  title: 'error',
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
        this.$confirm('This action will start the process. Do you want to continue?', 'warn', {
          confirmButtonText: 'ok',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          publishProcess(row.id).then(response => {
            if (response.success) {
              // const index = this.list.indexOf(row)
              row.processInstanceId = response.processInstanceID
              console.log(response)
              row.status = 'Published'
              this.$notify({
                title: 'success',
                message: 'successful deployment',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: 'error',
                message: 'deploy error',
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
      createTemplate() {
        this.$refs['templateForm'].validate((valid) => {
          if (valid) {
            modelToTemplate(this.templateTemp).then(response => {
              if (response.success) {
                this.dialogTemplateVisible = false
                this.$notify({
                  title: '成功',
                  message: '收藏成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.dialogTemplateVisible = false
                this.$notify({
                  title: '失败',
                  message: '收藏失败',
                  type: 'fail',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleFilter() {
        // this.listQuery.page
        this.getList()
      },
      handleStatusFilter(val) {
        this.listQuery.status = val
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
      },

      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    .card-panel-col{
      /*margin-bottom: 32px;*/
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 16px;
      position: relative;
      overflow: hidden;
      color: #666;
      background:rgb(240, 242, 245);
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: #666;
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #409EFF
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #34bfa3
        }
        .icon-shoppingCard {
          background: #E6A23C
        }
      }
      .icon-people {
        color: #409EFF
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #34bfa3
      }
      .icon-shoppingCard {
        color: #E6A23C

      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 6px 0 0 8px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 64px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 20px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 24px;
        }
      }
    }
  }
</style>
