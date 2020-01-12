<template>
  <!--<div class="toolbar">-->
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <!-- Widget: user widget style 1 -->
        <div class="box box-widget">
          <!-- Add the bg color to the header using any of the bg-* classes -->
          <div
            style="background-color:#00a65a;color:#ffffff;padding: 1px;border-top-right-radius:3px;border-top-left-radius:3px">

            <!--#00a65a-->
            <!-- /.widget-user-image -->
            <h3 class="text-left" style="padding-bottom: 8px;padding-left: 15px">{{'Method: ' + method}}</h3>
          </div>
          <div class="box-footer no-border">
            <div class="row">
              <div class="col-xs-3 text-center">
                <div class="inner">
                  <h2>{{taskId}}</h2>

                  <h4>TaskId</h4>
                </div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="inner">
                  <h2>{{dataType}}</h2>

                  <h4>DataType</h4>
                </div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="inner">
                  <h2>{{createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</h2>

                  <h4>createTime</h4>
                </div>
              </div>
              <div class="col-xs-3 text-center">
                <div class="inner">
                  <h2>{{duration}}</h2>

                  <h4>Duration</h4>
                </div>
              </div>
              <!-- ./col -->
              <!--<div v-if="dataType==='decisionmaking'||dataType==='singlelabel'" class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{accuracy}}</h2>-->

                  <!--<h4>Accuracy</h4>-->
                <!--</div>-->
              <!--</div>-->
              <!--&lt;!&ndash; ./col &ndash;&gt;-->
              <!--<div v-if="dataType==='decisionmaking'" class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{fscore}}</h2>-->

                  <!--<h4>F-score</h4>-->
                <!--</div>-->
              <!--</div>-->

              <!--<div v-if="dataType==='continuous'" class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{RMSE}}</h2>-->

                  <!--<h4>RMSE</h4>-->
                <!--</div>-->
              <!--</div>-->
              <!--&lt;!&ndash; ./col &ndash;&gt;-->
              <!--<div v-if="dataType==='continuous'" class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{MAE}}</h2>-->

                  <!--<h4>MAE</h4>-->
                <!--</div>-->
              <!--</div>-->
              <!-- ./col -->
            </div>
            <div class="row" style="margin-top: 30px">
              <!-- accepted payments column -->
              <div class="col-xs-6"  style="padding-left: 150px">
                <h3>Params</h3>
                <div class="table-responsive">
                  <table class="table">
                    <tr v-for="(value, key) in params">
                      <th style="width:50%"><h4>{{ key }}</h4></th>
                      <td><h4>{{ value }}</h4></td>
                    </tr>
                  </table>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-xs-6">
                <h3>Metrics</h3>
                <div>
                  <table class="table">
                    <tr v-for="(value, key) in metrics">
                      <th style="width:50%"><h4>{{ key }}</h4></th>
                      <td><h4>{{ value }}</h4></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <!--<div class="row">-->
              <!--<div class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{dataType}}</h2>-->

                  <!--<h4>DataType</h4>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{duration}}</h2>-->

                  <!--<h4>Duration</h4>-->
                <!--</div>-->
              <!--</div>-->
              <!--&lt;!&ndash; ./col &ndash;&gt;-->
              <!--<div v-if="dataType==='decisionmaking'||dataType==='singlelabel'" class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{accuracy}}</h2>-->

                  <!--<h4>Accuracy</h4>-->
                <!--</div>-->
              <!--</div>-->
              <!--&lt;!&ndash; ./col &ndash;&gt;-->
              <!--<div v-if="dataType==='decisionmaking'" class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{fscore}}</h2>-->

                  <!--<h4>F-score</h4>-->
                <!--</div>-->
              <!--</div>-->

              <!--<div v-if="dataType==='continuous'" class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{RMSE}}</h2>-->

                  <!--<h4>RMSE</h4>-->
                <!--</div>-->
              <!--</div>-->
              <!--&lt;!&ndash; ./col &ndash;&gt;-->
              <!--<div v-if="dataType==='continuous'" class="col-xs-3 text-center">-->
                <!--<div class="inner">-->
                  <!--<h2>{{MAE}}</h2>-->

                  <!--<h4>MAE</h4>-->
                <!--</div>-->
              <!--</div>-->
              <!--&lt;!&ndash; ./col &ndash;&gt;-->
            <!--</div>-->


            <!-- /.row -->
          </div>
          <!--<div class="box-footer no-padding">-->
          <!--<ul class="nav nav-stacked">-->
          <!--<li><a href="#">任务类型 <span class="pull-right badge bg-blue">31</span></a></li>-->
          <!--<li><a href="#">数据类型 <span class="pull-right badge bg-aqua">5</span></a></li>-->
          <!--<li><a href="#">错误率 <span class="pull-right badge bg-green">12</span></a></li>-->
          <!--<li><a href="#">F-score <span class="pull-right badge bg-red">842</span></a></li>-->
          <!--</ul>-->
          <!--&lt;!&ndash;<ul class="list-group list-group-unbordered">&ndash;&gt;-->
          <!--&lt;!&ndash;<li class="list-group-item">&ndash;&gt;-->
          <!--&lt;!&ndash;<b>Followers</b> <a class="pull-right">1,322</a>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li class="list-group-item">&ndash;&gt;-->
          <!--&lt;!&ndash;<b>Following</b> <a class="pull-right">543</a>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li class="list-group-item">&ndash;&gt;-->
          <!--&lt;!&ndash;<b>Friends</b> <a class="pull-right">13,287</a>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--&lt;!&ndash;</ul>&ndash;&gt;-->
          <!--</div>-->
        </div>
        <!-- /.widget-user -->
      </div>
    </div>


    <div class="row">
      <div class="col-md-4">
        <div class="box box-primary box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('result.AggregateResults')}}</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="height: auto">
            <div class="table-responsive">
              <!--<button type="button" class="btn btn-block btn-primary">Primary</button>-->
              <el-button @click="handleResultExport" size='small' icon="el-icon-plus">{{$t('table.export')}}</el-button>
              <el-table size='mini'
                        :data="resultPredictTable"
                        stripe
                        style="margin-top:10px;width: 100%">
                <el-table-column
                  label="Id">
                  <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('result.AggregateResults')">
                  <template slot-scope="scope">
                    <span>{{scope.row.predictResult}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('result.GroundTruth')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.truth==='?'">No Value</span>
                    <span v-else>{{scope.row.truth}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('result.TOF')">
                  <template slot-scope="scope">
                    <span class="label label-success" v-if="scope.row.correct===true">{{scope.row.correct}}</span>
                    <span class="label label-warning" v-if="scope.row.truth==='?'">No Truth</span>
                    <span class="label label-danger" v-if="scope.row.correct===false">{{scope.row.correct}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer clearfix">
            <el-pagination class="no-margin pull-right"
                           @current-change="handleResultChange"
                           :page-size="10"
                           layout="total, prev, pager, next"
                           :total="mergeTotal">
            </el-pagination>
            <!--<ul class="pagination pagination-sm no-margin pull-right">-->
            <!--<li><a href="#">&laquo;</a></li>-->
            <!--<li><a href="#">1</a></li>-->
            <!--<li><a href="#">2</a></li>-->
            <!--<li><a href="#">3</a></li>-->
            <!--<li><a href="#">&raquo;</a></li>-->
            <!--</ul>-->
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="box box-primary box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('result.WorkerModel')}}</h3>
          </div>
          <!-- /.box-header -->
          <div v-if="workerModel.length>0">
            <div class="box-body">
              <div class="table-responsive">
                <el-button @click="handleWorkerExport" size='small' icon="el-icon-plus">{{$t('table.export')}}
                </el-button>
                <el-table size='mini'
                          :data="workerTable"
                          stripe
                          style="margin-top:10px;width: 100%">
                  <el-table-column
                    :label="$t('table.id')">
                    <template slot-scope="scope">
                      <span>{{scope.row.id}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('result.value')">
                    <template slot-scope="scope">
                      <span>{{scope.row.value}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix">
              <el-pagination class="no-margin pull-right"
                             @current-change="handleWorkerChange"
                             :page-size="10"
                             layout="total, prev, pager, next"
                             :total="workerTotal">
              </el-pagination>
            </div>
          </div>
          <div v-else>
            <h3 class="text-center" style="padding: 30px">No Worker Model</h3>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="box box-primary box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('result.TaskModel')}}</h3>
          </div>
          <!-- /.box-header -->
          <div v-if="taskModel.length>0">
            <div class="box-body">
              <div class="table-responsive">
                <el-button @click="handleTaskExport" size='small' icon="el-icon-plus">{{$t('table.export')}}</el-button>
                <el-table size='mini'
                          :data="taskModelTable"
                          stripe
                          style="margin-top:10px;width: 100%">
                  <el-table-column
                    :label="$t('table.id')">
                    <template slot-scope="scope">
                      <span>{{scope.row.id}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('result.value')">
                    <template slot-scope="scope">
                      <span>{{scope.row.value}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix">
              <el-pagination class="no-margin pull-right"
                             @current-change="handleTaskChange"
                             :page-size="10"
                             layout="total, prev, pager, next"
                             :total="taskTotal">
              </el-pagination>
            </div>
          </div>
          <div v-else>
            <h3 class="text-center" style="padding: 30px">No Task Model</h3>
          </div>
        </div>
      </div>
    </div>
    <!--<el-row class="row-echarts">-->
    <!--<el-card >-->
    <!--<div class="box-header with-border">-->
    <!--<h3 class="box-title"> INPUT FILE STATISTICAL DATA</h3>-->
    <!--</div>-->
    <!--&lt;!&ndash; /.box-header &ndash;&gt;-->
    <!--<div class="box-body no-padding">-->
    <!--<div class="row">-->
    <!--<div class="col-md-2 col-sm-3">-->
    <!--<div class="pad box-pane-right bg-green" style="height: 400px">-->
    <!--<div class="description-block margin-bottom">-->

    <!--<h5 class="description-header">{{classTotal}}</h5>-->
    <!--<span class="description-text">Classes</span>-->
    <!--</div>-->
    <!--&lt;!&ndash; /.description-block &ndash;&gt;-->
    <!--<div class="description-block margin-bottom">-->

    <!--<h5 class="description-header">{{questionTotal}}</h5>-->
    <!--<span class="description-text">Items</span>-->
    <!--</div>-->
    <!--&lt;!&ndash; /.description-block &ndash;&gt;-->
    <!--<div class="description-block margin-bottom">-->

    <!--<h5 class="description-header">{{workerTotal}}</h5>-->
    <!--<span class="description-text">Workers</span>-->
    <!--</div>-->
    <!--<div class="description-block">-->

    <!--<h5 class="description-header">{{responseTotal}}</h5>-->
    <!--<span class="description-text">Responses</span>-->
    <!--</div>-->
    <!--&lt;!&ndash; /.description-block &ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="col-md-10 col-sm-9">-->
    <!--<div class="pad">-->
    <!--<div class="item-echarts">-->
    <!--&lt;!&ndash;<chart :option="pie_radius" theme="dark"></chart>&ndash;&gt;-->
    <!--<chart :options="itemsStat" style="height: 400px" auto-resize/>-->
    <!--</div>-->
    <!--</div>-->

    <!--</div>-->
    <!--&lt;!&ndash; /.col &ndash;&gt;-->
    <!--&lt;!&ndash; /.col &ndash;&gt;-->
    <!--</div>-->
    <!--&lt;!&ndash; /.row &ndash;&gt;-->
    <!--</div>-->
    <!--</el-card>-->
    <!--&lt;!&ndash; /.box-body &ndash;&gt;-->
    <!--</el-row>-->
    <!--<el-row :gutter="5">-->
    <!--<el-col :span="12">-->
    <!--<el-card class="box-card">-->
    <!--<div class="echarts">-->
    <!--&lt;!&ndash;<chart :option="pie_radius" theme="dark"></chart>&ndash;&gt;-->
    <!--<chart :options="worker_stat"auto-resize/>-->
    <!--</div>-->
    <!--</el-card>-->
    <!--</el-col>-->
    <!--<el-col  :span="12">-->
    <!--<el-card class="box-card">-->
    <!--<div class="echarts">-->
    <!--<chart :options="worker_country" style="height: 500px" auto-resize/>-->
    <!--</div>-->
    <!--</el-card>-->
    <!--</el-col>-->
    <!--</el-row>-->

  </section>
  <!--<monitor v-bind:process-instance-id="processInstanceId"></monitor>-->
  <!--</div>-->
</template>
<script>
  import { getCustomResult } from '@/api/data/result'

  export default {
    name: 'SimulatorReport',
    data() {
      return {
        taskId: '',
        createTime: '',
        method: '',
        dataType: '',
        duration: '',
        accuracy: '',
        fscore: '',
        RMSE: '',
        MAE: '',
        params: '',
        metrics: '',
        mergeTotal: 0,
        workerTotal: 0,
        resultPredict: [],
        resultPredictTable: [],
        workerModel: [],
        workerTable: [],
        taskModel: [],
        taskModelTable: [],
        taskTotal: 0,
        questionTotal: 0,
        responseTotal: 0,
        classTotal: 0
      }
    },
    mounted: function() {
      this.getMergeStat()
    },
    // components: { IEcharts },
    methods: {
      isJSON(str) {
        if (typeof str === 'string') {
          try {
            var obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
              return true
            } else {
              return false
            }
          } catch (e) {
            console.log('error：' + str + '!!!' + e)
            return false
          }
        }
        console.log('It is not a string!')
      },
      getMergeStat() {
        getCustomResult(this.serviceName, this.dataStatId).then(response => {
          console.log(response)

          // this.resultPredict = response.mergeResultList
          // this.mergeTotal = response.mergeResultList.length
          this.taskId = response.taskId
          this.createTime = response.createTime
          this.dataType = response.dataType
          this.params = response.param
          this.metrics = response.resultIndex

          if (this.dataType === 'decisionmaking') {
            this.accuracy = (response.resultIndex['accuracy'] * 100).toFixed(2) + '%'
            this.fscore = (response.resultIndex['fscore'] * 100).toFixed(2) + '%'
          } else if (this.dataType === 'singlelabel') {
            this.accuracy = (response.resultIndex['accuracy'] * 100).toFixed(2) + '%'
          } else if (this.dataType === 'continuous') {
            this.RMSE = (response.resultIndex['RMSE']).toFixed(2)
            this.MAE = (response.resultIndex['MAE']).toFixed(2)
          }

          this.duration = response.duration.toFixed(2) + 's'
          this.method = response.method
          var mergeResultList = response.resultPredict
          var truthList = response.resultTruth
          for (var item in mergeResultList) {
            // console.log(mergeResultList[item])
            var truthValue = '?'
            var correctValue = '?'
            var resultItem = mergeResultList[item]
            // console.log(resultItem)
            var obj = resultItem // JSON.parse(resultItem)
            // console.log(typeof obj)
            if (typeof obj === 'object' && obj) {
              var maxItem = '0'
              var maxValue = 0
              for (var choice in obj) {
                if (obj[choice] > maxValue) {
                  maxItem = choice
                  maxValue = obj[choice]
                }
              }
              if (item in truthList) {
                truthValue = truthList[item]
                correctValue = truthValue === maxItem // mergeResultList[item]
              }
              this.resultPredict.push({ id: item, predictResult: maxItem, truth: truthValue, correct: correctValue })
            } else {
              if (item in truthList) {
                truthValue = truthList[item]
                correctValue = truthValue === mergeResultList[item] // mergeResultList[item]
              }
              this.resultPredict.push({
                id: item,
                predictResult: mergeResultList[item],
                truth: truthValue,
                correct: correctValue
              })
            }
            this.mergeTotal = this.mergeTotal + 1
          }
          this.resultPredictTable = this.resultPredict.slice(0, 10)

          var workerModel = response.workerModel

          for (var x in workerModel) {
            this.workerModel.push({ id: x, value: workerModel[x] })
            this.workerTotal = this.workerTotal + 1
          }
          this.workerTable = this.workerModel.slice(0, 10)

          var taskModel = response.taskModel
          for (x in taskModel) {
            this.taskModel.push({ id: x, value: taskModel[x] })
            this.taskTotal = this.taskTotal + 1
          }
          this.taskModelTable = this.taskModel.slice(0, 10)
        })
      },
      handleResultChange(val) {
        this.resultPredictTable = this.resultPredict.slice((val - 1) * 10, (val - 1) * 10 + 10)
      },
      handleWorkerChange(val) {
        this.workerTable = this.workerModel.slice((val - 1) * 10, (val - 1) * 10 + 10)
      },
      handleTaskChange(val) {
        this.taskModelTable = this.taskModel.slice((val - 1) * 10, (val - 1) * 10 + 10)
      },
      handleResultExport() {

      },
      handleWorkerExport() {

      },
      handleTaskExport() {

      }
    },
    created() {
      this.dataStatId = this.$route.params.id
      this.serviceName = this.$route.params.serviceName
    },
    filters: {
      // 格式化数字
      numFormat(numx) {
        var num = (numx || 0).toString()
        var result = ''
        while (num.length > 3) {
          result = ',' + num.slice(-3) + result
          num = num.slice(0, num.length - 3)
        }
        if (num) {
          result = num + result
        }
        return result
      },
      parseTime(time, cFormat) {
        if (arguments.length === 0) {
          return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
          date = time
        } else {
          time = parseInt(time)
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
    }
  }
</script>

<style>
</style>
