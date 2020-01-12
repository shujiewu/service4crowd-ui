<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-success box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('result.ProcessMonitor')}}</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-sm-12" >
                <el-button-group style="float: right">
                <el-button style="width: 100px" :disabled="start" type="success" @click="handleStart()">Start</el-button>
                <el-button style="width: 100px" :disabled="pause" type="warning" @click="handlePause()">Pause</el-button>
                <el-button style="width: 100px" :disabled="terminate" type="danger" @click="handleTerminate()">Terminate</el-button>
                </el-button-group>
              </div>

            </div>
            <div class="row" v-bind:style="{ width: monitorBoxWidth, height: monitorBoxHeight}">
              <monitor @modifyHW="modifyHWHandler" @newUserTask="newUserTaskHandler" @newMachineTask="newMachineTaskHandler" @processComplete="processComplete" v-bind:process-instance-id="processInstanceId"></monitor>
            </div>
          </div>


          <div class="box-footer">
            <div class="row">
              <div class="col-sm-3 col-xs-6">
                <div class="description-block border-right">

                  <!--<h5 class="description-header">$35,210.43</h5>-->
                  <span class="description-header">{{$t('result.ProcessName')+':'}}</span>
                  <span class="description-percentage">{{processName}}</span>
                </div>
                <!-- /.description-block -->
              </div>
              <div class="col-sm-3 col-xs-6">
                <div class="description-block border-right">

                  <!--<h5 class="description-header">$35,210.43</h5>-->
                  <span class="description-header">{{$t('result.Status')+':'}}</span>
                  <span class="description-percentage">{{processStatus}}</span>
                </div>
                <!-- /.description-block -->
              </div>
              <div class="col-sm-3 col-xs-6">
                <div class="description-block border-right">

                  <!--<h5 class="description-header">$35,210.43</h5>-->
                  <span class="description-header">{{$t('result.StartTime')+':'}}</span>
                  <span class="description-percentage text-green">{{startTime| parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <!--<div class="col-sm-3 col-xs-6" v-if="endTime===null || endTime ===''">-->
                <!--<div class="description-block border-right">-->
                  <!--<span class="description-header">运行状态：</span>-->
                  <!--<span class="description-percentage text-green">{{processStatus}}</span>-->
                <!--</div>-->
                <!--&lt;!&ndash; /.description-block &ndash;&gt;-->
              <!--</div>-->
              <div class="col-sm-3 col-xs-6" v-if="endTime!==null && endTime !==''">
                <div class="description-block border-right">
                  <span class="description-header">{{$t('result.EndTime')+':'}}</span>
                  <span class="description-percentage text-green">{{endTime| parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </div>
                <!-- /.description-block -->
              </div>

              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>


        </div>
        <!-- /.box -->
      </div>
      <!-- /.col -->
    </div>

    <div class="row">
      <div class="col-md-6">
        <!-- TABLE: LATEST ORDERS -->
        <div class="box box-primary box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('result.HumanTaskList')}}</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="table-responsive">
              <el-table size='mini'
                        :data="tableData"
                        stripe
                        style="width: 100%">
                <el-table-column
                  :label="$t('table.id')">
                  <template slot-scope="scope">
                    <span>{{scope.row.taskId}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('table.taskTypes')">
                  <template slot-scope="scope">
                    <span>{{scope.row.serviceName}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('table.createTime')">
                  <template slot-scope="scope">
                    <span>{{scope.row.createTime| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('table.taskStatus')">
                  <template slot-scope="scope">
                    <span class="label label-success" v-if="scope.row.status==='complete'">{{scope.row.status}}</span>
                    <span class="label label-info" v-if="scope.row.status==='create'">{{scope.row.status}}</span>
                    <span class="label label-warning" v-if="scope.row.status==='error'">{{scope.row.status}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('table.completeTime')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.completeTime!=null">{{scope.row.completeTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  :label="$t('table.actions')"
                  width="100">
                  <template slot-scope="scope">

                    <router-link v-if="scope.row.serviceName==='service-figureEight:getJobResult'" :to="{path:'/process/view/HumanResult/'+scope.row.jobType+'/'+scope.row.serviceResultId}">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">{{$t('table.viewResults')}}</el-button>
                    </router-link>

                    <router-link v-else-if="scope.row.jobType==='SimulatorTask'" :to="{path:'/process/view/simResult/'+scope.row.taskId}">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">{{$t('table.viewResults')}}</el-button>
                    </router-link>

                    <router-link v-else :to="{path:'/process/result/'+scope.row.jobType+'/'+scope.row.serviceResultId}">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">{{$t('table.viewResults')}}</el-button>
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- /.table-responsive -->
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="box box-primary box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('result.MachineTaskList')}}</h3>
          </div>
          <div class="box-body">
            <div class="table-responsive">

              <el-table size='mini'
                        :data="machineJobData"
                        stripe
                        style="width: 100%">
                <el-table-column
                  :label="$t('table.id')">
                  <template slot-scope="scope">
                    <span>{{scope.row.taskId}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('table.taskTypes')">
                  <template slot-scope="scope">
                    <span>{{scope.row.serviceName}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('table.createTime')">
                  <template slot-scope="scope">
                    <span>{{scope.row.createTime| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('table.taskStatus')">
                  <template slot-scope="scope">
                    <span class="label label-success" v-if="scope.row.status==='complete'">{{scope.row.status}}</span>
                    <span class="label label-info" v-if="scope.row.status==='create'">{{scope.row.status}}</span>
                    <span class="label label-warning" v-if="scope.row.status==='asyncRun'">{{scope.row.status}}</span>
                    <span class="label label-danger" v-if="scope.row.status==='error'">{{scope.row.status}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('table.completeTime')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.completeTime!=null">{{scope.row.completeTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  :label="$t('table.actions')"
                  width="100">
                  <template slot-scope="scope">

                    <router-link v-if="scope.row.serviceName.indexOf('service-mlflow1')!==-1" :to="{path:'/process/view/AnswerAggregate/'+scope.row.serviceResultId}">
                      <el-button :disabled="scope.row.status==='asyncRun'||scope.row.status==='create'" @click="handleClick(scope.row)" type="text" size="small">{{$t('table.viewResults')}}</el-button>
                    </router-link>

                    <router-link v-else-if="scope.row.serviceName==='AnswerAggregate'" :to="{path:'/process/view/'+scope.row.serviceName+'/'+scope.row.serviceResultId}">
                      <el-button :disabled="scope.row.status==='asyncRun'||scope.row.status==='create'" @click="handleClick(scope.row)" type="text" size="small">{{$t('table.viewResults')}}</el-button>
                    </router-link>

                    <router-link v-else-if="scope.row.serviceName.indexOf('answerDataStat')!==-1" :to="{path:'/process/view/dataStat/'+scope.row.serviceName+'/'+scope.row.serviceResultId}">
                      <el-button :disabled="scope.row.status==='asyncRun'||scope.row.status==='create'" @click="handleClick(scope.row)" type="text" size="small">{{$t('table.viewResults')}}</el-button>
                    </router-link>

                    <router-link v-else-if="scope.row.serviceName==='AggregateCompare'" :to="{path:'/process/view/compare/'+scope.row.serviceName+'/'+scope.row.serviceResultId}">
                      <el-button :disabled="scope.row.status==='asyncRun'||scope.row.status==='create'" @click="handleClick(scope.row)" type="text" size="small">{{$t('table.viewResults')}}</el-button>
                    </router-link>

                    <router-link v-else :to="{path:'/process/result/'+scope.row.serviceName+'/'+scope.row.serviceResultId}">
                      <el-button :disabled="scope.row.status==='asyncRun'||scope.row.status==='create'" @click="handleClick(scope.row)" type="text" size="small">{{$t('table.viewResults')}}</el-button>
                    </router-link>
                    <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看结果</el-button>-->
                  </template>
                </el-table-column>
              </el-table>


            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.box -->
  </section>
</template>
<script>
  import { parseTime } from '@/utils'
  import monitor from './monitor'
  import { getCrowdTaskByProcessInstanceId, getMachineJobByProcessInstanceId } from '@/api/data/result'
  import 'echarts/theme/dark.js'
  import 'echarts/theme/macarons.js'
  import 'echarts/extension/dataTool'

  import { getProcessInfo, processComplete } from '@/api/process/view'
  export default {
    name: 'ProcessMonitor',
    data() {
      return {
        processType: '',
        runTime: '',
        startTime: '',
        endTime: null,
        processStatus: '',
        processName: '',
        monitorBoxWidth: '100%',
        monitorBoxHeight: '300px',
        tableData: [],
        machineJobData: [],
        start: true,
        pause: false,
        terminate: false,
        tempRoute: null
      }
    },
    mounted: function() {
      this.tempRoute = Object.assign({}, this.$route)
      this.getProcessInfo()
    },
    components: { monitor },
    methods: {
      handleClick(row) {
        console.log(row)
      },
      getProcessInfo() {
        getProcessInfo(this.processInstanceId).then(response => {
          this.processName = response.processName
          this.processType = 'FigureEight'
          this.processStatus = response.processStatus
          this.runTime = new Date() - response.startTime
          this.startTime = response.startTime
          this.endTime = response.endTime
          if (this.processStatus === 'Completed') {
            this.start = true
            this.pause = true
            this.terminate = true
          }
          this.setTagsViewTitle()
        })
      },
      setTagsViewTitle() {
        const title = 'process-monitor'
        const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.processInstanceId}` })
        this.$store.dispatch('updateVisitedView', route)
      },
      newUserTaskHandler(actId) {
        getCrowdTaskByProcessInstanceId(this.processInstanceId).then(response => {
          console.log(response)
          this.tableData.splice(0)
          this.tableData = response.data.rows
          // alert(this.tableData)
        })
      },
      newMachineTaskHandler() {
        getMachineJobByProcessInstanceId(this.processInstanceId).then(response => {
          this.machineJobData.splice(0)
          this.machineJobData = response.data.rows
          // alert(response)
        })
      },
      modifyHWHandler(h) {
        // monitorBoxHeight() {
        //   console.log(this.$refs.monitorx)
        //   return this.$refs.monitor.INITIAL_CANVAS_HEIGHT
        // },
        // monitorBoxWidth() { console.log(this.$refs.monitorx)
        //   return this.$refs.monitor.INITIAL_CANVAS_WIDTH
        // }
        this.monitorBoxHeight = h + 'px'
        console.log(this.monitorBoxHeight)
        // this.monitorBoxWidth = w
      },
      processComplete() {
        if (this.processStatus !== 'Completed') {
          processComplete(this.processInstanceId).then(response => {
            this.processName = response.processName
            this.processType = 'FigureEight'
            this.processStatus = response.processStatus
            this.runTime = new Date() - response.startTime
            this.startTime = response.startTime
            this.endTime = response.endTime
            this.start = true
            this.pause = true
            this.terminate = true
          })
        }
      },
      handleStart() {
        this.start = !this.start
      },
      handlePause() {

      },
      handleTerminate() {

      }
      // getWorkerStat() {
      //   getReport().then(response => {
      //     // console.log(response.worker.completeTaskNumer)
      //     var country = response.worker.countryStat
      //
      //     // country.forEach((value, key) => {
      //     //   this.worker_country.legend.data.push(value)
      //     // })
      //     var ccName = Object.keys(country)
      //
      //     this.worker_country.legend.data = []
      //     this.worker_country.series.data = []
      //     this.worker_country.legend.data = ccName
      //     var cc = Object.values(country)
      //     // this.worker_country.series.data = []
      //     // console.log(cc)
      //     var xx = []
      //     for (var i = 0; i < cc.length; i++) {
      //       this.worker_country.series[0].data.push({ value: cc[i], name: ccName[i] })
      //     }
      //
      //     // this.worker_country.legend.data
      //
      //     // this.worker_country.legend.data.push('直接访问')
      //     // this.worker_country.legend.data.push('邮件营销')
      //     // this.worker_country.series[0].data = [
      //     //   {value:335, name:'直接访问'},
      //     //   {value:310, name:'邮件营销'}]
      //     // console.log(this.worker_country)
      //     // this.worker_country.series.data = xx
      //     // this.chartLine.setOptions(this.worker_country)
      //     // 更新数据
      //     this.workerTotal = response.worker.workerNumber
      //     // this.worker_stat.xAxis.data = response.worker.workerId
      //     // this.worker_stat.series.data = response.worker.completeTaskNumer
      //
      //     this.questionTotal = response.result.unitTotal
      //     this.responseTotal = response.result.judgementTotal
      //
      //     // this.unitData = response.worker.workerId
      //
      //     this.uintStat.xAxis[0].data = response.result.unitId
      //     this.uintStat.xAxis[1].data = response.result.unitId
      //     this.uintStat.xAxis[2].data = response.result.unitId
      //     this.uintStat.series[0].data = response.result.agreement
      //     this.uintStat.series[1].data = response.result.interval
      //
      //     var echarts = require('echarts')
      //     this.workerTrust = echarts.dataTool.prepareBoxplotData(response.result.workerTrust)
      //     // console.log(data)
      //     this.uintStat.series[2].data = this.workerTrust.boxData
      //     this.uintStat.series[3].data = this.workerTrust.outliers
      //
      //     var workerTrust = response.worker.workerTrust
      //     var workerStat = []
      //
      //     var minSize = Math.min.apply(null, response.worker.completeTaskNumer)
      //     var maxSize = Math.max.apply(null, response.worker.completeTaskNumer)
      //     var minOpa = Math.min.apply(null, response.worker.avgCompleteTime)
      //     var maxOpa = Math.max.apply(null, response.worker.avgCompleteTime)
      //     for (var i = 0; i < workerTrust.length; i++) {
      //       var data = []
      //       data.push(response.worker.workerId[i])
      //       data.push(workerTrust[i])
      //       data.push(response.worker.completeTaskNumer[i])
      //       data.push(response.worker.avgCompleteTime[i])
      //       workerStat.push(data)
      //     }
      //     this.worker_stat.visualMap[0].min = minSize
      //     this.worker_stat.visualMap[0].max = maxSize
      //     this.worker_stat.visualMap[1].min = minOpa
      //     this.worker_stat.visualMap[1].max = maxOpa
      //     // this.worker_stat.xAxis.data = response.worker.workerId
      //     this.worker_stat.series[0].data = workerStat
      //     // this.worker_stat.series[1].data = this.dataSH
      //     // this.worker_stat.series[2].data = this.dataGZ
      //
      //     // console.log(this.worker_country.legend.data)
      //   })
      // }
    },
    created() {
      this.processInstanceId = this.$route.params.id
      getCrowdTaskByProcessInstanceId(this.processInstanceId).then(response => {
        console.log(response)
        this.tableData = response.data.rows
      })
      this.newMachineTaskHandler()
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
        console.log(time)
        return parseTime(time, cFormat)
      }
    },
    computed: {
      // userTotal() {
      //   // 计算属性: 用户总数
      //   return this.userTotal
      // },
      // yesterdayTotal() {
      //   // 计算属性: 昨天的用户总数
      //   return this.total.android1Num + this.total.ios1Num
      // },
      // weekTotal() {
      //   // 计算属性: 7天内的用户总数
      //   return this.total.android7Num + this.total.ios7Num
      // },
      endTimes() {
        // 计算属性: 30天内的用户总数
        return this.endTime
      }

    }
  }
</script>

<style>
  .toolbar {
    /*background: #f2f2f2;*/
    padding: 10px;
    margin: 10px 0px;
  }

  /*.echarts {*/
    /*width: 100%;*/
    /*height: 550px;*/
  /*}*/

  .unit-echarts {
    width: 100%;
    height: 950px;
  }

  .info-box {
    cursor: pointer;
  }

  .info-box-content {
    text-align: center;
    vertical-align: middle;
    display: inherit;
  }

  .c-charts {
    height: 600px;
    width: 100%;
  }

  .info-box {
    cursor: pointer;
  }

  .content {
    min-height: 100px;
  }
</style>
