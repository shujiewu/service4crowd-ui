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
            <h3 class="text-left" style="padding-bottom: 5px;padding-left: 15px">{{'Algorithm Name: ' + this.algorithmList}}</h3>
          </div>
          <div class="box-footer no-border">

            <!--<div class="row">-->
            <!--<div class="col-xs-12 text-left" style="padding-left: 100px">-->
            <!--<div class="inner">-->
            <!--<h4>{{'DataName:'+ dataType}}</h4>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="row">-->
            <!--<div class="col-xs-12 text-left" style="padding-left: 100px">-->
            <!--<div class="inner">-->
            <!--<h4>{{'DataType:'+ dataType}}</h4>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->


            <div class="row" style="margin-top: 30px">
              <div class="col-xs-4 text-center">
                <div class="inner">
                  <chart :options="durationComp" class="medium-echarts" auto-resize/>
                </div>
              </div>
              <div class="col-xs-4 text-center">
                <div class="inner">
                  <chart :options="accuracyComp" class="medium-echarts" auto-resize/>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-xs-4 text-center">
                <div class="inner">
                  <chart :options="fscoreComp" class="medium-echarts" auto-resize/>
                </div>
              </div>
            </div>
            <!-- /.row -->
          </div>
        </div>
        <!-- /.widget-user -->
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">Result statistics</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="height: auto">
            <div class="table-responsive">
              <el-button @click="handleWorkerExport" size='small' icon="el-icon-plus">{{$t('table.export')}}</el-button>
              <el-table size='mini'
                        :data="resultPredictTable"
                        stripe
                        style="margin-top:10px;width: 100%">
                <el-table-column label="Id">
                  <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                  </template>
                </el-table-column>
                <el-table-column :key='algorithm' v-for='algorithm in algorithmList' :label="algorithm">
                  <template slot-scope="scope">
                    <span class="label label-success" v-if="scope.row[algorithm]===scope.row.truth">{{scope.row[algorithm]}}</span>
                    <span class="label label-warning" v-if="scope.row[algorithm]!==scope.row.truth">{{scope.row[algorithm]}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="goldValue">
                  <template slot-scope="scope">
                    <span>{{scope.row.truth}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="box-footer clearfix">
            <el-pagination class="no-margin pull-right"
                           @current-change="handleListChange"
                           :page-size="10"
                           layout="total, prev, pager, next"
                           :total="mergeTotal">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

  </section>
  <!--<monitor v-bind:process-instance-id="processInstanceId"></monitor>-->
  <!--</div>-->
</template>
<script>
  import { getCustomResult } from '@/api/data/result'
  import 'echarts/theme/dark.js'
  import 'echarts/theme/macarons.js'
  import 'echarts/extension/dataTool'

  export default {
    name: 'SimulatorReport',
    data() {
      return {
        method: '',
        dataType: '',
        duration: '',
        accuracy: '',
        fscore: '',
        RMSE: '',
        MAE: '',
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
        classTotal: 0,

        algorithmList: [],
        durationComp: {
          title: {
            text: 'Time spent',
            subtext: 'Unit: second'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#605ca8'
              }
            }
          }]
        },
        accuracyComp: {
          title: {
            text: 'Accuracy',
            subtext: 'Unit: %'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#3c8dbc'
              }
            }
          }]
        },
        fscoreComp: {
          title: {
            text: 'F-score',
            subtext: 'Unit: %'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#00a65a'
              }
            }
          }]
        }
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
      getMergeStat: function() {
        getCustomResult(this.serviceName, this.dataStatId).then(response => {
          console.log(response)

          // this.resultPredict = response.mergeResultList
          // this.mergeTotal = response.mergeResultList.length
          var aggregateCompare = response.AggregateCompare
          this.dataType = aggregateCompare.dataType
          // if (this.dataType === 'decisionmaking') {
          //   this.accuracy = (response.AggregateStatistics.resultIndex['accuracy'] * 100).toFixed(2) + '%'
          //   this.fscore = (response.AggregateStatistics.resultIndex['fscore'] * 100).toFixed(2) + '%'
          // } else if (this.dataType === 'singlelabel') {
          //   this.accuracy = (response.AggregateStatistics.resultIndex['accuracy'] * 100).toFixed(2) + '%'
          // } else if (this.dataType === 'continuous') {
          //   this.RMSE = (response.AggregateStatistics.resultIndex['RMSE']).toFixed(2)
          //   this.MAE = (response.AggregateStatistics.resultIndex['MAE']).toFixed(2)
          // }
          if (this.dataType === 'decisionmaking') {
            for (var i = 0; i < aggregateCompare.aggregateStat.length; i++) {
              var item = aggregateCompare.aggregateStat[i]
              this.algorithmList.push(item['algorithm'])
              // console.log(aggregateCompare.aggregateStat)
              this.durationComp.series[0].data.push(item['duration'].toFixed(2))
              this.fscoreComp.series[0].data.push((item['fscore'] * 100).toFixed(2))
              this.accuracyComp.series[0].data.push((item['accuracy'] * 100).toFixed(2))
            }
            this.durationComp.xAxis.data = this.algorithmList
            this.fscoreComp.xAxis.data = this.algorithmList
            this.accuracyComp.xAxis.data = this.algorithmList

            var mergeResultList = aggregateCompare.resultPredict
            for (var item in mergeResultList) {
              var key = item
              var value = mergeResultList[item]
              var oneline = {}
              oneline['id'] = key
              oneline['truth'] = value['gold']
              for (var item2 in value) {
                var key2 = item2
                var algValue = value[key2]
                if (key2 !== 'gold' && key2 !== 'id') {
                  var obj = algValue// JSON.parse(algValue)
                  // console.log(key2)
                  if (obj.indexOf('{') !== -1) {
                    obj = JSON.parse(obj)
                    // console.log(key2)
                    var maxItem = '0'
                    var maxValue = 0
                    for (var choice in obj) {
                      if (obj[choice] > maxValue) {
                        maxItem = choice
                        maxValue = obj[choice]
                      }
                    }
                    oneline[key2] = maxItem
                  } else {
                    oneline[key2] = algValue
                  }
                }
              }
              this.resultPredict.push(oneline)
              this.mergeTotal = this.mergeTotal + 1
            }
          }
          this.resultPredictTable = this.resultPredict.slice(0, 10)
          // mergeResultList.forEach((key, value) => {
          // }

          // var truthList = response.AggregateStatistics.resultTruth
          // for (var item in mergeResultList) {
          //   // console.log(mergeResultList[item])
          //   var truthValue = '?'
          //   var correctValue = '?'
          //   var resultItem = mergeResultList[item]
          //   // console.log(resultItem)
          //   var obj = resultItem // JSON.parse(resultItem)
          //   // console.log(typeof obj)
          //   if (typeof obj === 'object' && obj) {
          //     var maxItem = '0'
          //     var maxValue = 0
          //     for (var choice in obj) {
          //       if (obj[choice] > maxValue) {
          //         maxItem = choice
          //         maxValue = obj[choice]
          //       }
          //     }
          //     if (item in truthList) {
          //       truthValue = truthList[item]
          //       correctValue = truthValue === maxItem // mergeResultList[item]
          //     }
          //     this.resultPredict.push({ id: item, predictResult: maxItem, truth: truthValue, correct: correctValue })
          //   } else {
          //     if (item in truthList) {
          //       truthValue = truthList[item]
          //       correctValue = truthValue === mergeResultList[item] // mergeResultList[item]
          //     }
          //     this.resultPredict.push({
          //       id: item,
          //       predictResult: mergeResultList[item],
          //       truth: truthValue,
          //       correct: correctValue
          //     })
          //   }
          //   this.mergeTotal = this.mergeTotal + 1
          // }

          // var workerModel = response.AggregateStatistics.workerModel
          //
          // for (var x in workerModel) {
          //   this.workerModel.push({ id: x, value: workerModel[x] })
          //   this.workerTotal = this.workerTotal + 1
          // }
          // this.workerTable = this.workerModel.slice(0, 10)
          //
          // var taskModel = response.AggregateStatistics.taskModel
          // for (x in taskModel) {
          //   this.taskModel.push({ id: x, value: taskModel[x] })
          //   this.taskTotal = this.taskTotal + 1
          // }
          // this.taskModelTable = this.taskModel.slice(0, 10)
        })
      },
      handleListChange(val) {
        this.resultPredictTable = this.resultPredict.slice((val - 1) * 10, (val - 1) * 10 + 10)
      },
      // handleListChange(val) {
      //   this.workerTable = this.workerModel.slice((val - 1) * 10, (val - 1) * 10 + 10)
      // },
      // handleTaskChange(val) {
      //   this.taskModelTable = this.taskModel.slice((val - 1) * 10, (val - 1) * 10 + 10)
      // },
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
      }
    }
  }
</script>

<style scoped>
  .medium-echarts {
    width: 100%;
    height: 350px;
  }
</style>
