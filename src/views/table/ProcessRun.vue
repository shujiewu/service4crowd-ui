<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.name')" v-model="listQuery.name">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.key')" v-model="listQuery.key">
      </el-input>
      <!--<el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">-->
        <!--<el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">-->
        <!--<el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">-->
        <!--</el-option>-->
      <!--</el-select>-->

      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">-->
        <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="addModel" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <!--<el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>-->
      <!--<el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>-->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column  min-width="150px" align="center" :label="$t('table.id')" >
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('table.name')">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('table.definitionId')">
        <template slot-scope="scope">
          <span>{{scope.row.definitionId}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.deploymentId')">
        <template slot-scope="scope">
          <span>{{scope.row.deploymentId}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" :label="$t('table.activityId')">
        <template slot-scope="scope">
          <span>{{scope.row.activityId}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" :label="$t('table.nodeName')">
        <template slot-scope="scope">
          <span>{{scope.row.nodeName}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" :label="$t('table.suspended')">
        <template slot-scope="scope">
          <el-tag :type="scope.row.suspended | statusFilter">{{scope.row.suspended}}</el-tag>
        </template>
      </el-table-column>

      <!--<el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">-->
        <!--<template slot-scope="scope">-->
          <!--<span style='color:red;'>{{scope.row.reviewer}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column width="80px" :label="$t('table.importance')">-->
        <!--<template slot-scope="scope">-->
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" :label="$t('table.readings')" width="95">-->
        <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
          <!--<span v-else>0</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column class-name="status-col" :label="$t('table.status')" width="100">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" :label="$t('table.actions')" min-width="200px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleStart(scope.row)">{{$t('table.start')}}</el-button>
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleRead(scope.row)">{{$t('table.view')}}
          </el-button>
          <!--<el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.draft')}}-->
          <!--</el-button>-->
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <el-dialog title="New Model" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="modelTemp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item :label="$t('table.key')" prop="key">
          <el-input v-model="modelTemp.key"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.name')" prop="name">
          <el-input v-model="modelTemp.name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('table.description')">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="modelTemp.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='new'" type="primary" @click="createModel">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateModel">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>


    <el-dialog title="ProcessImage" :visible.sync="dialogImgVisible">
      <img :src = "imgsrc">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogImgVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchRunProcess, fetchPv, createModel, deleteDeploy, readResource ,startProcess} from '@/api/process/index'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
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
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
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
      modelTemp: {
        name: '',
        key: '',
        description: '',
        id: '',
        createTime: '',
        lastUpdateTime: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogImgVisible: false,
      imgsrc: '@/assets/404_images/404.png',
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        key: [{ required: true, message: 'key is required', trigger: 'blur' }],
        name: [{ required: true, message: 'name is required', trigger: 'blur' }]
      },
      downloadLoading: false,

      para: {
        processDefinitionId: '',
        resourceType: 'image'
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        false: 'success',
        true: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchRunProcess(this.listQuery)
        .then(response => {
          console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          this.listLoading = false
        })
    },
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
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
    resetModelTemp() {
      this.modelTemp = {
        name: '',
        key: '',
        description: '',
        id: '',
        createTime: new Date(),
        lastUpdateTime: new Date()
      }
    },
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
    addModel() {
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
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              window.open(window.location.origin + '/modeler.html?modelId=1', '_blank')
            } else {
              this.$notify({
                title: '失败',
                message: '删除失败',
                type: 'fail',
                duration: 2000
              })
            }
          })
        }
      })
    },
    updateModel() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createModel(this.modelTemp).then(() => {
            this.list.unshift(this.modelTemp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            window.open(window.location.origin + '/modeler.html?modelId=1', '_blank')
          })
        }
      })
    },
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
    handleDelete(row) {
      deleteDeploy(row.deploymentId).then(response => {
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
    },
    handleStart(row) {
      startProcess(row.id).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '流程启动成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        } else {
          this.$notify({
            title: '失败',
            message: '流程启动失败',
            type: 'fail',
            duration: 2000
          })
        }
      })
    },
    handleRead(row) {
      this.para = {
        processDefinitionId: row.id,
        resourceType: 'image'
      }
      readResource(this.para).then(response => {
        this.imgsrc = response.data
        this.dialogImgVisible = true
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
        excel.export_json_to_excel(tHeader, data, 'table-list')
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
