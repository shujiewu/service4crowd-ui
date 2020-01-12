<template>
  <el-row :gutter="5" style='margin: 10px;'>
    <el-col :span="8">
      <el-card style="height: 850px">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px; align-content: center">Database</span>
          <el-button style="float: right" icon="el-icon-plus" type="primary" size="mini" v-waves @click="addNewData">
            {{$t('table.add')}}
          </el-button>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('table.Metadata')" name="meta">
            <el-table height="600" size='mini' ref="metaTable" :data="metaData" tooltip-effect="dark"
                      style="white-space: nowrap;"
                      highlight-current-row
                      stripe
                      @current-change="handleCurrentMetaChange">
              <el-table-column :label="$t('table.name')">
                <template slot-scope="scope">
                  <span class="link-type" @click="changeMetaNameVisible = true">{{ scope.row.metaName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" :label="$t('table.type')" :filters="typeFilter"
                               :filter-method="filterType"
                               filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.type === 'text' ? 'primary' : 'success'" close-transition>
                    {{scope.row.type}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="name" :label="$t('table.createTime')">
                <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
              </el-table-column>
              <el-table-column align="center" :label="$t('table.actions')">
                <template slot-scope="scope">
                  <i style="cursor : pointer" class="el-icon-delete" @click="handleDeleteMeta(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <div class="block">
                <el-pagination
                  @current-change="handleMetaPageChange"
                  :current-page.sync="metaListQuery.page"
                  :page-size="10"
                  layout="total, prev, pager, next"
                  :total="metaListTotal">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane :label="$t('table.AnswerData')" name="sim">
            <el-table height="600" size='mini' ref="simTable" :data="simData" tooltip-effect="dark"
                      style="white-space: nowrap;"
                      highlight-current-row
                      stripe
                      @current-change="handleCurrentSimChange">
              <el-table-column :label="$t('table.name')">
                <template slot-scope="scope">
                  <span class="link-type" @click="changeSimNameVisible = true">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" :label="$t('table.type')" :filters="typeFilter"
                               :filter-method="filterType"
                               filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.taskType === 'label' ? 'primary' : 'success'" close-transition>
                    {{scope.row.dataType}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="name" :label="$t('table.createTime')">
                <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
              </el-table-column>
              <el-table-column align="center" :label="$t('table.actions')">
                <template slot-scope="scope">
                  <i style="cursor : pointer" class="el-icon-delete" @click="handleDeleteSim(scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <div class="block">
                <el-pagination
                  @current-change="handleSimPageChange"
                  :current-page.sync="simListQuery.page"
                  :page-size="10"
                  layout="total, prev, pager, next"
                  :total="simListTotal">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('table.CustomData')" name="custom">
            <custom-data @currentSelectionChange="handleCustomDataChange"></custom-data>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="box-card" style="height: 850px">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleDataFilter" size='mini' style="width: 200px; " class="filter-item"
                    :placeholder="$t('table.name')" v-model="listQuery.name">
          </el-input>
          <el-input @keyup.enter.native="handleDataFilter" size='mini' style="width: 200px;" class="filter-item"
                    :placeholder="$t('table.key')" v-model="listQuery.key">
          </el-input>
          <el-button class="filter-item" type="primary" size='mini' v-waves icon="el-icon-search"
                     @click="handleDataFilter">{{$t('table.search')}}
          </el-button>
        </div>
        <div v-if="activeName==='custom'">
          <el-table height="700" size='mini' ref="customFileTable" :data="customFileData" tooltip-effect="dark"
                    style="white-space: nowrap;"
                    highlight-current-row>
            <el-table-column :label="$t('table.id')">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column :label="$t('table.name')">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('table.type')">
              <template slot-scope="scope">
                <el-tag>{{scope.row.type}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.length')">
              <template slot-scope="scope">{{ scope.row.length }}</template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('table.createTime')">
              <template slot-scope="scope">{{ scope.row.uploadDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.actions')">
              <template slot-scope="scope">
                <i style="cursor : pointer" class="el-icon-download" @click="handleDownloadFile(scope.row)"></i>
                <i style="cursor : pointer" class="el-icon-delete" @click="handleDeleteMeta(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container" style="margin-right: 50px">
            <el-pagination background @size-change="handleCustomSizeChange" @current-change="handleCustomPageChange"
                           :current-page.sync="customListQuery.page"
                           :page-sizes="[10,20,30,50]" :page-size="customListQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper " :total="customFileListTotal">
            </el-pagination>
          </div>
        </div>
        <div v-if="activeName==='meta'">
          <el-table height="750" size='mini' :data="tableData" v-if="tableData.length!==0" highlight-current-row
                    style="width: 100%;margin-top:50px;" :header-row-class-name="getHeaderClass"
                    @header-click="handleColumnClick">
            <el-table-column v-for='item of tableHeader' v-if="item.indexOf('image')===-1" :prop="item" :label="item"
                             :key='item'>
            </el-table-column>
            <el-table-column v-for='item of tableHeader' v-if="item.indexOf('image')!==-1" :prop="item" :label="item"
                             :key='item'>
              <template slot-scope="scope">
                <span class="link-type" @click="handlePreView(scope.row[item+'FileId'])">{{ scope.row[item]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="100" label="">
              <template slot-scope="scope">
                <i style="cursor : pointer" class="el-icon-edit"></i>
                <i style="cursor : pointer" class="el-icon-delete" @click="handleDeleteMeta(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="pagination-container" v-if="tableData.length!==0" style="margin-right: 50px">-->
          <!--<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
          <!--:current-page.sync="listQuery.page"-->
          <!--:page-sizes="[10,20,30,50]" :page-size="listQuery.limit"-->
          <!--layout="total, sizes, prev, pager, next, jumper " :total="total">-->
          <!--</el-pagination>-->
          <!--</div>-->
        </div>

        <div v-if="activeName==='sim'">
          <el-table height="750" size='mini' :data="answerData" v-if="answerData.length!==0" highlight-current-row
                    style="width: 100%;margin-top:50px;" :header-row-class-name="getHeaderClass"
                    @header-click="handleColumnClick">
            <el-table-column v-for='item of answerHeader' v-if="item.indexOf('image')===-1" :prop="item" :label="item"
                             :key='item'>
            </el-table-column>
            <!--<el-table-column v-for='item of tableHeader' v-if="item.indexOf('image')!==-1" :prop="item" :label="item"-->
                             <!--:key='item'>-->
              <!--<template slot-scope="scope">-->
                <!--<span class="link-type" @click="handlePreView(scope.row[item+'FileId'])">{{ scope.row[item]}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" width="100" :label="$t('table.actions')">
              <template slot-scope="scope">
                <i style="cursor : pointer" class="el-icon-edit"></i>
                <i style="cursor : pointer" class="el-icon-delete" @click="handleDeleteMeta(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="pagination-container" v-if="tableData.length!==0" style="margin-right: 50px">-->
            <!--<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                           <!--:current-page.sync="listQuery.page"-->
                           <!--:page-sizes="[10,20,30,50]" :page-size="listQuery.limit"-->
                           <!--layout="total, sizes, prev, pager, next, jumper " :total="total">-->
            <!--</el-pagination>-->
          <!--</div>-->
        </div>
      </el-card>

    </el-col>

    <el-dialog
      title="新建众包数据"
      :visible.sync="metaDialogVisible"
      width="50%">
      <el-form :model="newMetaData" :rules="metaRules" ref="newMetaData" label-width="100px" class="demo-ruleForm">

        <el-form-item label="数据格式" prop="type" label-position="left">
          <el-select class="filter-item" v-model="newMetaData.type" placeholder="请选择">
            <el-option v-for="item in  metaDataOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item v-if="newDataType=='dataSetsOptions[0]'" label="数据格式" prop="type" label-position="left">-->
        <!--<el-select class="filter-item" v-model="newMetaData.type" placeholder="请选择">-->
        <!--<el-option v-for="item in  dataOptions" :key="item" :label="item" :value="item"> </el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->


        <el-form-item label="数据名称" prop="metaName">
          <el-input v-model="newMetaData.metaName"></el-input>
        </el-form-item>

        <el-form-item label="元数据表" prop="data">
          <upload-excel-component flag="1" key="1" @on-selected-file='selected'></upload-excel-component>
        </el-form-item>

        <el-form-item label="上传数据" prop="data" v-if="newMetaData.type === 'file'">
          <upload ref="upload" @fileUploadComplete="fileUploadCompleteHandler"
                  @dataUploadComplete="dataUploadCompleteHandler"></upload>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="metaDialogVisible = false">取 消</el-button>
          <el-button size="mini" @click="resetForm('newMetaData')">重置</el-button>
          <el-button type="primary" size="mini" @click="submitForm('newMetaData')">确定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="新建仿真数据"
      :visible.sync="simDialogVisible"
      width="50%">
      <el-form :model="newSimData" :rules="simRules" ref="newSimData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="数据名称" prop="simName">
          <el-input v-model="newSimData.simName"></el-input>
        </el-form-item>

        <el-form-item label="数据类型" prop="dataType">
          <el-select class="filter-item" v-model="newSimData.dataType" placeholder="请选择">
            <el-option v-for="item in  simDataOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <!--<div v-for="item in items" :key="item.id">-->
        <el-form-item label="answer" prop="answerData">
          <upload-excel-component key="2" flag="2" @on-selected-file=selectedAnswer></upload-excel-component>
        </el-form-item>
        <!--</div>-->

        <el-form-item label="groundTruth" prop="gtData">
          <upload-excel-component key="3" flag="3" @on-selected-file='selectedGT'></upload-excel-component>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="simDialogVisible = false">取 消</el-button>
          <el-button size="mini" @click="resetSimForm('newSimData')">重置</el-button>
          <el-button type="primary" size="mini" @click="submitSimForm('newSimData')">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="自定义数据"
      :visible.sync="customDialogVisible"
      width="50%">
      <el-form :model="newCustomData" :rules="customRules" ref="newCustomData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="数据名称" prop="name">
          <el-input v-model="newCustomData.name"></el-input>
        </el-form-item>
        <!--<div v-for="item in items" :key="item.id">-->
        <el-form-item label="上传数据">
          <upload-custom-data ref="uploadCustomData" @customDataUploadComplete="customDataUploadCompleteHandler"></upload-custom-data>
        </el-form-item>
        <!--</div>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="customDialogVisible = false">取 消</el-button>
          <el-button size="mini" @click="resetCustomForm('newCustomData')">重置</el-button>
          <el-button type="primary" size="mini" @click="submitCustomForm('newCustomData')">确定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="ProcessImage" :visible.sync="dialogImgVisible">
      <img :src="imgsrc" width="100%">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogImgVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>
  </el-row>


</template>

<script>
  import { parseTime } from '@/utils'
  import customData from './components/CustomData'
  import UploadExcelComponent from '@/components/UploadExcel/index'
  import upload from './upload'
  import uploadCustomData from './components/uploadCustomData'
  import {
    createMeta,
    getMeta,
    getMetaPage,
    getData,
    validateMetaName,
    deleteMeta,
    deleteData,
    readFile
  } from '@/api/data/meta'
  import { createSimData, getSimPage, deleteAnswerData } from '@/api/data/simulator'
  import { validateCustomName, createCustomData, getCustomDataFileList, downloadCustomData } from '@/api/data/customData'
  import { getToken } from '@/utils/auth'
  //   存储空间名称作为唯一的 Bucket 识别符，遇到冲突请更换名称。
  // 名称由 4 ~ 63 个字符组成 ，可包含 字母、数字、中划线。

  export default {
    components: { customData, UploadExcelComponent, upload, uploadCustomData },
    created() {
      this.getMetaList()
      this.getSimList()
    },
    data() {
      var validateMeta = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数据表名称不能为空'))
        }
        setTimeout(() => {
          validateMetaName(value).then(response => {
            if (response.success) {
              callback(new Error('数据表名称已存在'))
            } else {
              callback()
            }
          })
        }, 500)
      }
      var validateSim = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数据表名称不能为空'))
        }
        setTimeout(() => {
          validateMetaName(value).then(response => {
            if (response.success) {
              callback(new Error('数据表名称已存在'))
            } else {
              callback()
            }
          })
        }, 1000)
      }
      var validateCustom = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数据集名称不能为空'))
        }
        setTimeout(() => {
          validateCustomName(value).then(response => {
            if (response.exist) {
              callback(new Error('数据集名称已存在'))
            } else {
              callback()
            }
          })
        }, 500)
      }
      return {
        items: [
          { id: '1', method: this.selectedAnswer },
          { id: '2', method: this.selectedGT }
        ],
        key1: 'key1',
        key2: 'key2',
        activeName: 'meta',
        selectionVisible: false,
        changeMetaNameVisible: false,
        typeFilter: [
          { text: 'text', value: 'text' },
          { text: 'file', value: 'file' }
        ],
        metaDialogVisible: false,
        simDialogVisible: false,
        customDialogVisible: false,
        dialogImgVisible: false,
        imgsrc: '',
        uploadComplete: false,
        newMetaData: {
          metaName: '',
          data: [],
          header: [],
          fileList: [],
          type: ''
        },
        newSimData: {
          simName: '',
          dataType: '',
          answerData: [],
          answerHeader: [],
          gtData: [],
          gtHeader: []
        },
        newCustomData: {
          name: ''
        },
        tableData: [],
        tableHeader: [],
        answerData: [],
        answerHeader: [],
        tableId: [],
        metaRules: {
          type: [
            { required: true, message: '请选择数据类型', trigger: 'change' }
          ],
          metaName: [
            { required: true, message: '请输入数据集名称', trigger: 'blur' },
            { validator: validateMeta, trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
          // data: [
          //   { required: true, message: '请选择数据', trigger: 'blur' }
          //   // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          // ]
        },
        simRules: {
          simName: [
            { required: true, message: '请输入数据集名称', trigger: 'blur' },
            { validator: validateSim, trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          dataType: [
            { required: true, message: '请选择数据类型', trigger: 'change' }
          ]
        },
        customRules: {
          name: [
            { required: true, message: '请输入数据集名称', trigger: 'blur' },
            { validator: validateCustom, trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
        metaDataOptions: ['text', 'file'],
        simDataOptions: ['decisionmaking', 'singlelabel', 'continuous'],
        // dataSetsOptions: ['crowd', 'simulator'],
        metaListQuery: {
          page: 1,
          limit: 10
        },
        simListQuery: {
          page: 1,
          limit: 10
        },
        customListQuery: {
          page: 1,
          limit: 10
        },
        simListTotal: 0,
        metaListTotal: 0,
        listQuery: {
          page: 1,
          limit: 20,
          name: '',
          key: '',
          sort: '+id'
        },
        total: null,
        currentMeta: null,
        metaData: [],
        simData: [],
        multipleSelection: [],
        customFileData: [],
        customFileListTotal: 0,
        currentCustomData: null
      }
    },
    filters: {
      parseTime(time, cFormat) {
        return parseTime(time, cFormat)
      }
    },
    methods: {
      filterType(value, row) {
        return row.type === value
      },
      setCurrentMeta(row) {
        this.$refs.metaTable.setCurrentRow(row)
      },
      getHeaderClass({ row, rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 0) {
          return 'success-row'
        }
        return ''
      },
      handleCurrentSimChange(val) {
        if (val.labelList !== undefined && val.labelList !== null) {
          this.answerData = val.labelList
          this.answerHeader = ['answer', 'item', 'worker']
        } else {
          this.answerData = []
          this.answerHeader = []
        }
      },
      handleCurrentMetaChange(val) {
        this.currentMeta = val
        if (this.currentMeta.data === undefined || this.currentMeta.data === null) {
          // val.data = this.getUnitList(this.currentMeta.dataId)
          console.log(val)
          getData(this.currentMeta.dataId).then(response => {
            val.data = response.data.rows
            this.tableData = []
            this.tableHeader = []
            this.tableId = []
            for (var i = 0; i < val.data.length; i++) {
              this.tableId.push(val.dataId[i])
              this.tableData.push(val.data[i].data)
              if (i === 0) {
                for (var key in val.data[i].data) {
                  this.tableHeader.push(key)
                }
              }
            }
            console.log(this.tableData)
            console.log(this.tableHeader)
            // this.tableData = this.newMetaData.data
          })
        } else {
          this.tableData = []
          this.tableHeader = []
          this.tableId = []
          for (var i = 0; i < val.data.length; i++) {
            this.tableId.push(val.dataId[i])
            this.tableData.push(val.data[i].data)
            if (i === 0) {
              for (var key in val.data[i].data) {
                this.tableHeader.push(key)
              }
            }
          }
        }
      },
      addNewData() {
        if (this.activeName === 'meta') {
          this.metaDialogVisible = true
        } else if (this.activeName === 'sim') {
          this.simDialogVisible = true
        } else if (this.activeName === 'custom') {
          this.customDialogVisible = true
        }
      },
      handleDeleteSim(row) {
        this.$confirm('此操作将删除该数据集, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAnswerData(row.id).then(response => {
            if (response.success) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.simData.indexOf(row)
              this.simData.splice(index, 1)
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
      handlePreView(row) {
        var qury = row
        readFile(qury).then(data => {
          this.imgsrc = 'data:image/png;base64,' + data
          this.dialogImgVisible = true
        })
      },
      handleDataFilter() {
        this.listQuery.page = 1
        // this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getMetaList()
      },
      handleCustomSizeChange(val) {
        this.customListQuery.limit = val
        this.getCustomDataFileList()
      },
      handleCustomPageChange(val) {
        this.customListQuery.page = val
        this.getCustomDataFileList()
      },
      handleMetaPageChange(val) {
        // 当前页改变
        this.metaListQuery.page = val
        this.getMetaList()
      },
      handleSimPageChange(val) {
        // 当前页改变
        this.simListQuery.page = val
        this.getSimList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getMetaList()
      },
      handleColumnClick(column) {
        alert(column.property)
      },
      handleSelectionVisible() {
        this.selectionVisible = !this.selectionVisible
      },
      getMetaList() {
        // getMeta().then(response => {
        //   console.log(response)
        //   this.metaData = response.data.rows
        //   this.metaListTotal = response.data.total
        // })
        getMetaPage(this.metaListQuery).then(response => {
          console.log(response)
          this.metaData = response.data.rows
          this.metaListTotal = response.data.total
        })
      },
      getSimList() {
        // getMeta().then(response => {
        //   console.log(response)
        //   this.metaData = response.data.rows
        //   this.metaListTotal = response.data.total
        // })
        getSimPage(this.simListQuery).then(response => {
          console.log(response)
          this.simData = response.data.rows
          this.simListTotal = response.data.total
        })
      },
      getUnitList(dataId) {

      },
      handleDeleteMeta(row) {
        this.$confirm('此操作将删除该数据表, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMeta(row.id).then(response => {
            if (response.success) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              if (this.currentMeta.id === row.id) {
                this.tableData = []
                this.tableHeader = []
                this.tableId = []
              }
              const index = this.metaData.indexOf(row)
              this.metaData.splice(index, 1)
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
      handleDeleteData(row) {
        const index = this.tableData.indexOf(row)
        this.$confirm('此操作将删除该行数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteData(this.currentMeta.id, this.tableId[index]).then(response => {
            if (response.success) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.tableData.splice(index, 1)
              for (var i = 0; i < this.metaData.length; i++) {
                if (this.metaData[i].id === this.currentMeta.id) {
                  this.metaData[i].dataId.splice(index, 1)
                  this.metaData[i].data.splice(index, 1)
                  console.log(this.metaData[i])
                  break
                }
              }
              this.tableId.splice(index, 1)
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.newMetaData.type === 'file') {
              this.$refs.upload.start(this.newMetaData)
            } else {
              createMeta(this.newMetaData).then(response => {
                if (response.success) {
                  this.metaData.push(response.data)
                  this.tableData = this.newMetaData.data
                  this.tableHeader = this.newMetaData.header
                  // console.log(this.tableHeader)
                  // this.$notify({
                  //   title: '成功',
                  //   message: '创建成功',
                  //   type: 'success',
                  //   duration: 2000
                  // })
                  this.resetForm('newMetaData')
                  this.metaDialogVisible = false
                } else {
                  this.$notify({
                    title: '失败',
                    message: '创建失败',
                    type: 'fail',
                    duration: 2000
                  })
                }
              })
            }
            // console.log(this.newMetaData)
          } else {
            return false
          }
        })
      },
      submitSimForm(data) {
        this.$refs[data].validate((valid) => {
          if(valid){
            createSimData(this.newSimData).then(response => {
              this.resetForm('newSimData')
              this.simDialogVisible = false
            })
          }
        })
      },
      submitCustomForm(data) {
        this.$refs[data].validate((valid) => {
          if(valid){
            this.$refs.uploadCustomData.start(this.newCustomData.name)
          }
        })
      },
      customDataUploadCompleteHandler(completeFiles) {
        if (completeFiles.length > 0) {
          console.log(completeFiles)
          createCustomData(this.newCustomData.name, completeFiles).then(response => {
            if (response.status === 200) {
              this.resetForm('newCustomData')
              this.customDialogVisible = false
            }
          })
        }
      },
      handleCustomDataChange(val) {
        this.currentCustomData = val
        this.getCustomDataFileList()
      },
      getCustomDataFileList() {
        if (this.currentCustomData !== null) {
          getCustomDataFileList(this.currentCustomData.fileId, this.customListQuery).then(response => {
            if (response.status === 200) {
              this.customFileData = response.data.rows
              this.customFileListTotal = response.data.total
            }
          })
        }
      },
      handleDownloadFile(val) {
        window.open('/api/data/customData/download/' + val.id + '?token=' + getToken(), '_blank')
        // downloadCustomData(val.name).then(response => {
        // })
      },
      dataUploadCompleteHandler(complete) {
        this.uploadComplete = complete
        if (this.uploadComplete) {
          var metaData = this.newMetaData.data
          for (var i = 0; i < metaData.length; i++) {
            for (var key in metaData[i]) {
              if (key.indexOf('image') !== -1) {
                for (var j = 0; j < this.newMetaData.fileList.length; j++) {
                  if (this.newMetaData.fileList[j].fileName === (metaData[i])[key]) {
                    // metaData[i][key] = metaData[i][key]
                    var IdKey = key + 'FileId'
                    metaData[i][IdKey] = this.newMetaData.fileList[j].fileId
                  }
                }
              }
            }
          }
          console.log(metaData)
          this.newMetaData.data = metaData
          createMeta(this.newMetaData).then(response => {
            if (response.success) {
              this.metaData.push(response.data)
              this.tableData = this.newMetaData.data
              this.tableHeader = this.newMetaData.header
              // console.log(this.tableHeader)
              // this.$notify({
              //   title: '成功',
              //   message: '创建成功',
              //   type: 'success',
              //   duration: 2000
              // })
              this.resetForm('newMetaData')
              this.metaDialogVisible = false
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
      },
      fileUploadCompleteHandler(message) {
        this.newMetaData.fileList.push(message)
        console.log(this.newMetaData.fileList)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.newMetaData.data = []
        this.newMetaData.fileList = []
      },
      resetSimForm(formName) {
        this.$refs[formName].resetFields()
        this.newSimData.answerHeader = []
        this.newSimData.answerData = []
        this.newSimData.gtHeader = []
        this.newSimData.gtData = []
      },
      resetCustomForm(formName) {
        this.$refs[formName].resetFields()
      },
      selectedAnswer(data) {
        this.newSimData.answerHeader = data.header
        this.newSimData.answerData = data.results
        console.log(this.newSimData)
      },
      selectedGT(data) {
        this.newSimData.gtHeader = data.header
        this.newSimData.gtData = data.results
        console.log(this.newSimData)
      },
      selected(data) {
        // this.tableData = data.results
        // this.tableHeader = data.header
        this.newMetaData.header = data.header
        this.newMetaData.data = data.results
        console.log(this.newMetaData)
      },

      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done()
      //     })
      //     .catch(_ => {})
      // },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.metaTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.metaTable.clearSelection()
        }
      }
      // handleSelectionChange(val) {
      //   this.multipleSelection = val
      // }
    }
  }

</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .filter-container {
    float: left;
  }

  .pagination-container {
    margin-top: 10px;
    float: right;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-row {
    margin: 10px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
