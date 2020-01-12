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
              <span>{{ scope.row.appId }}</span>
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
              <span>{{ scope.row.deployTime }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('table.endTime')"  prop="endTime" sortable align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unDeployTime }}</span>
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
  import { getServiceInstanceList, refreshMLRunList } from '@/api/service/marathon'
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
          sort: 'deployTime,desc'
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
        getServiceInstanceList(this.listQuery).then(response => {
          console.log(response)
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

<!--<template>-->
  <!--<section class="content">-->
    <!--<div class="row">-->
      <!--<div class="col-md-12 no-padding">-->
        <!--<div class="filter-container" style="float: left">-->
          <!--<el-button v-waves class="filter-item" type="primary" :disabled="deleteSelection" icon="el-icon-delete" @click="handleDeleteSelection">{{-->
            <!--$t('table.delete') }}-->
          <!--</el-button>-->

          <!--<el-input :placeholder="$t('table.name')" v-model="listQuery.name" style="width: 200px;"-->
                    <!--class="filter-item"-->
                    <!--@keyup.enter.native="handleFilter"/>-->
          <!--<el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item"-->
                     <!--style="width: 130px">-->
            <!--<el-option v-for="item in TypeOptions" :key="item.key"-->
                       <!--:label="item.display_name"-->
                       <!--:value="item.key"/>-->
          <!--</el-select>-->
          <!--<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{-->
            <!--$t('table.search') }}-->
          <!--</el-button>-->
          <!--<el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"-->
                     <!--@click="handleDownload">{{ $t('table.export') }}-->
          <!--</el-button>-->

        <!--</div>-->

        <!--<el-table-->
          <!--v-loading="listLoading"-->
          <!--:key="tableKey"-->
          <!--:data="list"-->
          <!--fit-->
          <!--highlight-current-row-->
          <!--style="width: 100%;height: auto"-->
          <!--:default-sort = "{prop: 'name', order: 'descending'}"-->
          <!--@selection-change="handleSelectionChange">-->
          <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
          <!--<el-table-column prop="name" sortable :label="$t('table.name')" align="center" width="120px">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.name }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="type" sortable :label="$t('table.type')" min-width="20px" align="center">-->
            <!--<template slot-scope="scope">-->
              <!--&lt;!&ndash;<el-tag v-if="scope.row.type === 'WEB'" type="success">{{ scope.row.type}}</el-tag>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-tag v-else-if="scope.row.type === 'PROCESSOR'" type="info">{{ scope.row.type}}</el-tag>&ndash;&gt;-->
              <!--<el-tag :type="scope.row.type | statusFilter">{{ scope.row.type}}</el-tag>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column :label="$t('table.version')" width="100">-->
            <!--<template slot-scope="scope">-->
              <!--<el-tag v-if="scope.row.defaultVersion" type="warning">{{ scope.row.version}}</el-tag>-->
              <!--<el-tag v-else>{{ scope.row.version}}</el-tag>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column  :label="$t('table.uri')" min-width="40px" align="center">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.uri }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column :label="$t('table.metadataUri')" min-width="50px" align="center">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.metaDataUri }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column :label="$t('table.actions')" align="center" min-width="30px"-->
                           <!--class-name="small-padding fixed-width">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button-group>-->
                <!--<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}-->
                <!--</el-button>-->
                <!--<router-link :to="{path:'/service/deploy/'+scope.row.type+'/'+scope.row.name+'/'+scope.row.version}">-->
                  <!--<el-button size="mini" type="success">{{ $t('table.definition') }}-->
                  <!--</el-button>-->
                <!--</router-link>-->
                <!--<el-button size="mini" type="warning" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.property') }}-->
                <!--</el-button>-->
                <!--&lt;!&ndash;<el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.property') }}&ndash;&gt;-->
                <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
                <!--<el-button size="mini" type="danger"-->
                           <!--@click="handleDelete(scope.row)">{{ $t('table.delete') }}-->
                <!--</el-button>-->
              <!--</el-button-group>-->

            <!--</template>-->
          <!--</el-table-column>-->

        <!--</el-table>-->
        <!--<div class="pagination-container">-->
          <!--<el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"-->
                         <!--:page-size="listQuery.size" :total="total" background-->
                         <!--layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"-->
                         <!--@current-change="handleCurrentChange"/>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <!--&lt;!&ndash;<el-dialog title="Edit" :visible.sync="dialogFormVisible">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.type')" prop="type">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-select v-model="temp.type" class="filter-item" placeholder="Please select">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name"&ndash;&gt;-->
    <!--&lt;!&ndash;:value="item.key"/>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.date')" prop="timestamp">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.title')" prop="title">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input v-model="temp.title"/>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.status')">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-select v-model="temp.status" class="filter-item" placeholder="Please select">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.importance')">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3"&ndash;&gt;-->
    <!--&lt;!&ndash;style="margin-top:8px;"/>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.remark')">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea"&ndash;&gt;-->
    <!--&lt;!&ndash;placeholder="Please input"/>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form>&ndash;&gt;-->
    <!--&lt;!&ndash;<div slot="footer" class="dialog-footer">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm')&ndash;&gt;-->
    <!--&lt;!&ndash;}}&ndash;&gt;-->
    <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-dialog>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-table :data="pvData" border fit highlight-current-row style="width: 100%">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-table-column prop="key" label="Channel"/>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-table-column prop="pv" label="Pv"/>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-table>&ndash;&gt;-->
    <!--&lt;!&ndash;<span slot="footer" class="dialog-footer">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>&ndash;&gt;-->
    <!--&lt;!&ndash;</span>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-dialog>&ndash;&gt;-->
  <!--</section>-->
<!--</template>-->

<!--<script>-->
  <!--import { getServiceList, deleteService } from '@/api/service/register'-->
  <!--import waves from '@/directive/waves' // 水波纹指令-->
  <!--import { parseTime } from '@/utils'-->

  <!--const TypeOptions = [-->
    <!--{ key: undefined, display_name: '' },-->
    <!--{ key: 'PROCESSOR', display_name: 'PROCESSOR' },-->
    <!--{ key: 'ALGORITHM', display_name: 'ALGORITHM' },-->
    <!--{ key: 'WEB', display_name: 'WEB' }-->
  <!--]-->
  <!--// arr to obj ,such as { CN : "China", US : "USA" }-->
  <!--const TypeKeyValue = TypeOptions.reduce((acc, cur) => {-->
    <!--acc[cur.key] = cur.display_name-->
    <!--return acc-->
  <!--}, {})-->
  <!--export default {-->
    <!--name: 'ComplexTable',-->
    <!--directives: {-->
      <!--waves-->
    <!--},-->
    <!--filters: {-->
      <!--statusFilter(status) {-->
        <!--const statusMap = {-->
          <!--PROCESSOR: 'success',-->
          <!--ALGORITHM: 'info',-->
          <!--WEB: ''-->
        <!--}-->
        <!--return statusMap[status]-->
      <!--},-->
      <!--typeFilter(type) {-->
        <!--return TypeKeyValue[type]-->
      <!--}-->
    <!--},-->
    <!--data() {-->
      <!--return {-->
        <!--tableKey: 0,-->
        <!--list: null,-->
        <!--total: null,-->
        <!--listLoading: false,-->
        <!--listQuery: {-->
          <!--page: 1,-->
          <!--size: 20,-->
          <!--// importance: undefined,-->
          <!--name: undefined,-->
          <!--type: undefined-->
          <!--// sort: 'type'-->
        <!--},-->
        <!--importanceOptions: [1, 2, 3],-->
        <!--TypeOptions,-->
        <!--sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],-->
        <!--statusOptions: ['published', 'draft', 'deleted'],-->
        <!--showReviewer: false,-->
        <!--temp: {-->
          <!--id: undefined,-->
          <!--importance: 1,-->
          <!--remark: '',-->
          <!--timestamp: new Date(),-->
          <!--title: '',-->
          <!--type: '',-->
          <!--status: 'published'-->
        <!--},-->
        <!--dialogFormVisible: false,-->
        <!--dialogStatus: '',-->
        <!--textMap: {-->
          <!--update: 'Edit',-->
          <!--create: 'Create'-->
        <!--},-->
        <!--dialogPvVisible: false,-->
        <!--pvData: [],-->
        <!--rules: {-->
          <!--type: [{ required: true, message: 'type is required', trigger: 'change' }],-->
          <!--timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],-->
          <!--title: [{ required: true, message: 'title is required', trigger: 'blur' }]-->
        <!--},-->
        <!--downloadLoading: false,-->
        <!--multipleSelection: [],-->
        <!--deleteSelection: true-->
      <!--}-->
    <!--},-->
    <!--created() {-->
      <!--this.getList()-->
    <!--},-->
    <!--methods: {-->
      <!--getList() {-->
        <!--this.listQuery.page = this.listQuery.page - 1-->
        <!--this.listLoading = true-->
        <!--getServiceList(this.listQuery).then(response => {-->
          <!--this.listQuery.page = this.listQuery.page + 1-->
          <!--this.list = response.data.rows-->
          <!--this.total = response.data.total-->
          <!--// Just to simulate the time of the request-->
          <!--setTimeout(() => {-->
            <!--this.listLoading = false-->
          <!--}, 1000)-->
        <!--})-->
      <!--},-->
      <!--handleSelectionChange(val) {-->
        <!--this.multipleSelection = val-->
        <!--if (val.length > 0) {-->
          <!--this.deleteSelection = false-->
        <!--} else {-->
          <!--this.deleteSelection = true-->
        <!--}-->
      <!--},-->
      <!--handleDeleteSelection() {-->
        <!--if (this.multipleSelection.length > 0) {-->
          <!--var id = []-->
          <!--for (var i = 0; i < this.multipleSelection.length; i++) {-->
            <!--id.push(this.multipleSelection[i].id)-->
          <!--}-->
        <!--}-->
      <!--},-->
      <!--handleDelete(row) {-->
        <!--var data = {-->
          <!--type: row.type,-->
          <!--name: row.name,-->
          <!--version: row.version-->
        <!--}-->
        <!--deleteService(data).then(response => {-->
          <!--this.$notify({-->
            <!--title: '成功',-->
            <!--message: '删除成功',-->
            <!--type: 'success',-->
            <!--duration: 2000-->
          <!--})-->
          <!--const index = this.list.indexOf(row)-->
          <!--this.list.splice(index, 1)-->
        <!--})-->
      <!--},-->
      <!--handleFilter() {-->
        <!--this.listQuery.page = 1-->
        <!--this.getList()-->
      <!--},-->
      <!--handleSizeChange(val) {-->
        <!--this.listQuery.size = val-->
        <!--this.listQuery.page = 1-->
        <!--this.getList()-->
      <!--},-->
      <!--handleCurrentChange(val) {-->
        <!--this.listQuery.page = val-->
        <!--this.getList()-->
      <!--},-->
      <!--handleModifyStatus(row, status) {-->
        <!--this.$message({-->
          <!--message: '操作成功',-->
          <!--type: 'success'-->
        <!--})-->
        <!--row.status = status-->
      <!--},-->
      <!--resetTemp() {-->
        <!--this.temp = {-->
          <!--id: undefined,-->
          <!--importance: 1,-->
          <!--remark: '',-->
          <!--timestamp: new Date(),-->
          <!--title: '',-->
          <!--status: 'published',-->
          <!--type: ''-->
        <!--}-->
      <!--},-->
      <!--handleCreate() {-->
        <!--this.resetTemp()-->
        <!--this.dialogStatus = 'create'-->
        <!--this.dialogFormVisible = true-->
        <!--this.$nextTick(() => {-->
          <!--this.$refs['dataForm'].clearValidate()-->
        <!--})-->
      <!--},-->
      <!--createData() {-->
        <!--this.$refs['dataForm'].validate((valid) => {-->
          <!--if (valid) {-->
            <!--this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id-->
            <!--this.temp.author = 'vue-element-admin'-->
            <!--createArticle(this.temp).then(() => {-->
              <!--this.list.unshift(this.temp)-->
              <!--this.dialogFormVisible = false-->
              <!--this.$notify({-->
                <!--title: '成功',-->
                <!--message: '创建成功',-->
                <!--type: 'success',-->
                <!--duration: 2000-->
              <!--})-->
            <!--})-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--handleUpdate(row) {-->
        <!--this.temp = Object.assign({}, row) // copy obj-->
        <!--this.temp.timestamp = new Date(this.temp.timestamp)-->
        <!--this.dialogStatus = 'update'-->
        <!--this.dialogFormVisible = true-->
        <!--this.$nextTick(() => {-->
          <!--this.$refs['dataForm'].clearValidate()-->
        <!--})-->
      <!--},-->
      <!--updateData() {-->
        <!--this.$refs['dataForm'].validate((valid) => {-->
          <!--if (valid) {-->
            <!--const tempData = Object.assign({}, this.temp)-->
            <!--tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464-->
            <!--updateArticle(tempData).then(() => {-->
              <!--for (const v of this.list) {-->
                <!--if (v.id === this.temp.id) {-->
                  <!--const index = this.list.indexOf(v)-->
                  <!--this.list.splice(index, 1, this.temp)-->
                  <!--break-->
                <!--}-->
              <!--}-->
              <!--this.dialogFormVisible = false-->
              <!--this.$notify({-->
                <!--title: '成功',-->
                <!--message: '更新成功',-->
                <!--type: 'success',-->
                <!--duration: 2000-->
              <!--})-->
            <!--})-->
          <!--}-->
        <!--})-->
      <!--},-->

      <!--handleFetchPv(pv) {-->
        <!--fetchPv(pv).then(response => {-->
          <!--this.pvData = response.data.pvData-->
          <!--this.dialogPvVisible = true-->
        <!--})-->
      <!--},-->
      <!--handleDownload() {-->
        <!--this.downloadLoading = true-->
        <!--import('@/vendor/Export2Excel').then(excel => {-->
          <!--const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']-->
          <!--const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']-->
          <!--const data = this.formatJson(filterVal, this.list)-->
          <!--excel.export_json_to_excel({-->
            <!--header: tHeader,-->
            <!--data,-->
            <!--filename: 'table-list'-->
          <!--})-->
          <!--this.downloadLoading = false-->
        <!--})-->
      <!--},-->
      <!--formatJson(filterVal, jsonData) {-->
        <!--return jsonData.map(v => filterVal.map(j => {-->
          <!--if (j === 'timestamp') {-->
            <!--return parseTime(v[j])-->
          <!--} else {-->
            <!--return v[j]-->
          <!--}-->
        <!--}))-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style>-->
  <!--.pagination-container {-->
    <!--margin-bottom: 10px;-->
    <!--float:right;-->
  <!--}-->
<!--</style>-->
