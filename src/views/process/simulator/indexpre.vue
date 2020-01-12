<template>
  <!--<div class="toolbar">-->
    <section class="content">
      <el-row class="row-echarts">
            <el-card >
              <div class="box-header with-border">
                <h3 class="box-title"> INPUT FILE STATISTICAL DATA</h3>
              </div>
              <!-- /.box-header -->
              <div class="box-body no-padding">
                <div class="row">
                  <div class="col-md-2 col-sm-3">
                    <div class="pad box-pane-right bg-green" style="height: 400px">
                      <div class="description-block margin-bottom">

                        <h5 class="description-header">{{classTotal}}</h5>
                        <span class="description-text">Classes</span>
                      </div>
                      <!-- /.description-block -->
                      <div class="description-block margin-bottom">

                        <h5 class="description-header">{{questionTotal}}</h5>
                        <span class="description-text">Items</span>
                      </div>
                      <!-- /.description-block -->
                      <div class="description-block margin-bottom">

                        <h5 class="description-header">{{workerTotal}}</h5>
                        <span class="description-text">Workers</span>
                      </div>
                      <div class="description-block">

                        <h5 class="description-header">{{responseTotal}}</h5>
                        <span class="description-text">Responses</span>
                      </div>
                      <!-- /.description-block -->
                    </div>
                  </div>
                  <div class="col-md-10 col-sm-9">
                    <div class="pad">
                      <div class="item-echarts">
                        <!--<chart :option="pie_radius" theme="dark"></chart>-->
                        <chart :options="itemsStat" style="height: 400px" auto-resize/>
                      </div>
                    </div>

                  </div>
                  <!-- /.col -->
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
            </el-card>
          <!-- /.box-body -->
      </el-row>

      <!--<el-row :gutter="20">-->
        <!--<el-col :xs="45" :sm="45" :md="24" :lg="24">-->
          <!--<el-card class="unit-echarts">-->
            <!--<div class="unit-echarts">-->
              <!--<chart :options="uintStat" style="height: 820px" auto-resize/>-->
            <!--</div>-->
          <!--</el-card>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<p/>-->
      <el-row :gutter="5">
        <el-col :span="12">
          <el-card class="box-card">
            <div class="echarts">
              <!--<chart :option="pie_radius" theme="dark"></chart>-->
              <chart :options="worker_stat"auto-resize/>
            </div>
          </el-card>
        </el-col>
        <el-col  :span="12">
          <el-card class="box-card">
            <div class="echarts">
              <chart :options="worker_country" style="height: 500px" auto-resize/>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </section>
    <!--<monitor v-bind:process-instance-id="processInstanceId"></monitor>-->
  <!--</div>-->
</template>
<script>
  import { getSimReport } from '@/api/data/simulator'
  import 'echarts/theme/dark.js'
  import 'echarts/theme/macarons.js'
  import 'echarts/extension/dataTool'

  // import IEcharts from 'vue-echarts-v3/src/full.js'

  export default {
    name: 'SimulatorReport',
    data() {
      return {
        workerTotal: 0,
        questionTotal: 0,
        responseTotal: 0,
        classTotal: 0,
        worker_country: {
          title: {
            text: '数据一致性',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          series: [
            {
              name: '来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },

        itemStyle: {
          normal: {
            opacity: 0.8,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0, 0, 0, 1)'
          }
        },
        worker_stat: {
          title: {
            text: '工人统计',
            x: 'center'
          },
          color: [
            '#80F1BE', '#dd4444', '#fec42c'
          ],
          tooltip: {
            trigger: 'axis',
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function(obj) {
              var value = obj[0].value
              return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                'WorkerId：' +
                value[0] +
                '</div>' +
                'Trust：' + value[1] + '<br>' +
                'TaskCount：' + value[2] + '<br>' +
                'AvgSeconds：' + value[3] + '<br>'
            }
          },
          grid: [{
            left: 50,
            right: 50
          }
          ],
          xAxis: {
            type: 'category',
            name: 'workerId',
            splitLine: {
              show: false
            },
            axisLine: { onZero: false }
          },
          yAxis: {
            type: 'value',
            name: 'Trust',
            // nameLocation: 'end',
            // nameGap: 20,
            // nameTextStyle: {
            //   fontSize: 16
            // },
            scale: true,
            splitLine: {
              show: false
            }
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 20
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 20
            }
          ],
          visualMap: [
            {
              right: 0,
              top: '5%',
              dimension: 2,
              min: 0,
              max: 250,
              itemHeight: 120,
              calculable: true,
              precision: 0.1,
              text: ['大小：完成任务数量'],
              textGap: 30,
              inRange: {
                symbolSize: [4, 45]
              },
              outOfRange: {
                symbolSize: [4, 45],
                color: ['rgba(255,255,255,.2)']
              },
              controller: {
                inRange: {
                  color: ['#dd4444']
                },
                outOfRange: {
                  color: ['#444']
                }
              }
            },
            {
              right: 0,
              top: '50%',
              dimension: 3,
              min: 0,
              max: 50,
              itemHeight: 120,
              calculable: true,
              precision: 0.1,
              text: ['明暗：平均完成时间'],
              textGap: 30,
              inRange: {
                color: ['#80F1BE', '#fec42c']
              },
              outOfRange: {
                color: ['rgba(255,255,255,.2)']
              },
              controller: {
                inRange: {
                  color: ['#80F1BE', '#fec42c']
                },
                outOfRange: {
                  color: ['#444']
                }
              }
            }
          ],
          series: [
            {
              name: 'worker',
              type: 'scatter',
              itemStyle: this.itemStyle,
              data: []
            }
          ]
        },
        timeData: [],
        workerTrust: [],

        itemsStat: {
          title: {
            text: 'Beta Value of All Tasks',
            x: 'center'
          },
          grid: [{
            left: 50,
            top: 50,
            right: 0,
            width: '60%',
            containLabel: true
          }],
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 20
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 20
            }
          ],
          xAxis: [{
            type: 'category',
            axisLine: { onZero: false },
            data: [],
            splitLine: {
              show: false
            }
          }],
          yAxis: [
            {
              type: 'value',
              name: 'Beta Value'
            }
          ],
          series: [
            {
              type: 'line',
              showSymbol: false,
              data: []
            },
            {
              name: '占比',
              type: 'pie',
              radius: '55%',
              center: ['78%', '50%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          legend: {
            orient: 'vertical',
            right: 10,
            top: 30,
            bottom: 20,
            data: []
          },
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }],
          tooltip: [{
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          }
          ]
        },

        uintStat: {
          title: {
            text: 'Beta Value of All Tasks',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //   animation: false
            // }
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function(obj) {
              var value = obj
              var agreementValue
              var intevalValue
              var boxValue = []
              var outlierValue = 'No Value'
              for (var i = 0; i < value.length; i++) {
                if (value[i].seriesName === 'Agreement') {
                  agreementValue = value[i].data
                  continue
                }
                if (value[i].seriesName === 'Inteval') {
                  intevalValue = value[i].data
                  continue
                }
                if (value[i].seriesName === 'WorkerTrust') {
                  boxValue.push(value[i].data[1].toFixed(2))
                  boxValue.push(value[i].data[2].toFixed(2))
                  boxValue.push(value[i].data[3].toFixed(2))
                  boxValue.push(value[i].data[4].toFixed(2))
                  boxValue.push(value[i].data[5].toFixed(2))
                  continue
                }
                if (value[i].seriesName === 'outlier') {
                  outlierValue = value[i].data[1]
                  continue
                }
              }
              return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                'UnitId:' +
                value[0].name +
                '</div>' +
                'Agreement：' + agreementValue + '<br>' +
                'Interval：' + intevalValue + '<br>' +
                'WorkerTrustMin：' + boxValue[0] + '<br>' +
                'WorkerTrustQ1：' + boxValue[1] + '<br>' +
                'WorkerTrustQ2：' + boxValue[2] + '<br>' +
                'WorkerTrustQ3：' + boxValue[3] + '<br>' +
                'WorkerTrustMax：' + boxValue[4] + '<br>' +
                'Outlier：' + outlierValue + '<br>'
            }
          },
          legend: {
            data: ['Agreement', 'Interval'],
            x: 'left'
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          axisPointer: {
            link: { xAxisIndex: 'all' }
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 20,
              xAxisIndex: [0, 1, 2]
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 20,
              xAxisIndex: [0, 1, 2]
            }
          ],
          grid: [{
            left: 50,
            right: 50,
            height: '24%'
          }, {
            left: 50,
            right: 50,
            top: '39%',
            height: '24%'
          }, {
            left: 50,
            right: 50,
            top: '70%',
            height: '24%'
          }
          ],
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: { onZero: false },
              data: [],
              splitLine: {
                show: false
              }
            },
            {
              gridIndex: 1,
              type: 'category',
              boundaryGap: false,
              axisLine: { onZero: false },
              data: []
            },
            {
              gridIndex: 2,
              type: 'category',
              boundaryGap: false,
              axisLine: { onZero: false },
              data: []
            }
          ],
          yAxis: [
            {
              name: 'Agreement',
              type: 'value',
              splitArea: {
                show: true
              }
            },
            {
              gridIndex: 1,
              name: 'Interval(seconds)',
              type: 'value',
              splitArea: {
                show: true
              }
            }, {
              type: 'value',
              gridIndex: 2,
              name: 'WorkerTrust',
              splitArea: {
                show: true
              },
              scale: true
            }
          ],
          series: [
            {
              name: 'Agreement',
              type: 'line',
              symbolSize: 8,
              hoverAnimation: false,
              data: []
            },
            {
              name: 'Interval',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 8,
              hoverAnimation: false,
              data: []
            },
            {
              name: 'WorkerTrust',
              type: 'boxplot',
              xAxisIndex: 2,
              yAxisIndex: 2,
              data: [],
              tooltip: {
                formatter: function(param) {
                  return [
                    'Experiment ' + param.name + ': ',
                    'upper: ' + param.data[5],
                    'Q3: ' + param.data[4],
                    'median: ' + param.data[3],
                    'Q1: ' + param.data[2],
                    'lowe: ' + param.data[1]
                  ].join('<br/>')
                }
              }
            },
            {
              xAxisIndex: 2,
              yAxisIndex: 2,
              name: 'outlier',
              type: 'scatter',
              data: []
            }
          ]
        }
      }
    },
    mounted: function() {
      this.getSimStat()
    },
    // components: { IEcharts },
    methods: {
      getSimStat() {
        getSimReport(this.simId).then(response => {
          var simResultsStatistics = response.simResultsStatistics
          console.log(simResultsStatistics)
          this.workerTotal = simResultsStatistics.workersNum
          this.questionTotal = simResultsStatistics.itemsNum
          this.responseTotal = simResultsStatistics.labelsNum
          this.classTotal = simResultsStatistics.classesNum

          this.itemsStat.xAxis[0].data = simResultsStatistics.itemsId
          this.itemsStat.series[0].data = simResultsStatistics.beta

          var betaMax = Math.max.apply(null, simResultsStatistics.beta)
          var betaMin = Math.min.apply(null, simResultsStatistics.beta)
          // console.log(betaMax)
          var betaRoundMax = Math.ceil(betaMax)
          var betaRoundMin = Math.floor(betaMin)
          this.itemsStat.visualMap[0].min = betaRoundMin
          this.itemsStat.visualMap[0].max = betaRoundMax
          var step = (betaRoundMax - betaRoundMin) / 10

          var cc = simResultsStatistics.beta

          var mapObj = new Map()

          for (var i = 0; i < cc.length; i++) {
            for (var j = 0; j < 10; j++) {
              if (cc[i] >= betaRoundMin + j * step && cc[i] <= betaRoundMin + (j + 1) * step) {
                var name = (betaRoundMin + j * step).toFixed(2) + '-' + (betaRoundMin + (j + 1) * step).toFixed(2)
                if (mapObj.has(name)) { mapObj.set(name, mapObj.get(name) + 1) } else { mapObj.set(name, 1) }

                // this.itemsStat.series[1].data.push({ value: mapObj.get(name), name: name })
                break
              }
            }
          }
          mapObj.forEach((value, key) => {
            // this.worker_country.legend.data.push(value)
            this.itemsStat.series[1].data.push({ value: value, name: key })
            this.itemsStat.legend.data.push(key)
          })
          // this.itemsStat.series[1].data = aa
          // console.log(aa)
          // for (var k in mapObj) {
          //   this.itemsStat.series[1].data.push({ value: mapObj[k], name: k })
          // }
          // var names = Object.keys(mapObj) // .keys()
          // var values = Object.values(mapObj) // .values()
          // for (i = 0; i < names.length; i++) {
          //   this.itemsStat.series[1].data.push({ value: values[i], name: names[i] })
          // }
          // console.log(mapObj)
          // console.log(this.itemsStat.series[1].data)
          // var country = response.worker.countryStat
          //
          // var ccName = Object.keys(country)
          //
          // this.worker_country.legend.data = []
          // this.worker_country.series.data = []
          // this.worker_country.legend.data = ccName
          // var cc = Object.values(country)
          // var xx = []
          // for (var i = 0; i < cc.length; i++) {
          //   this.worker_country.series[0].data.push({ value: cc[i], name: ccName[i] })
          // }
          // 更新数据
          // this.workerTotal = response.worker.workerNumber
          // this.questionTotal = response.result.unitTotal
          // this.responseTotal = response.result.judgementTotal
          // this.uintStat.xAxis[0].data = response.result.unitId
          // this.uintStat.xAxis[1].data = response.result.unitId
          // this.uintStat.xAxis[2].data = response.result.unitId
          // this.uintStat.series[0].data = response.result.agreement
          // this.uintStat.series[1].data = response.result.interval
          //
          // var echarts = require('echarts')
          // this.workerTrust = echarts.dataTool.prepareBoxplotData(response.result.workerTrust)
          // this.uintStat.series[2].data = this.workerTrust.boxData
          // this.uintStat.series[3].data = this.workerTrust.outliers
          //
          // var workerTrust = response.worker.workerTrust
          var workerStat = []
          var minSize = Math.min.apply(null, simResultsStatistics.tasksPerWorker)
          var maxSize = Math.max.apply(null, simResultsStatistics.tasksPerWorker)
          var minOpa = Math.min.apply(null, simResultsStatistics.durationPerWorker)
          var maxOpa = Math.max.apply(null, simResultsStatistics.durationPerWorker)
          for (i = 0; i < this.workerTotal; i++) {
            var data = []
            data.push(simResultsStatistics.workerId[i])
            data.push(simResultsStatistics.alpha[i].toFixed(2))
            data.push(simResultsStatistics.tasksPerWorker[i])
            data.push(simResultsStatistics.durationPerWorker[i])
            workerStat.push(data)
          }
          console.log(minSize)
          console.log(maxSize)
          console.log(minOpa)
          console.log(maxOpa)
          this.worker_stat.visualMap[0].min = minSize
          this.worker_stat.visualMap[0].max = maxSize
          this.worker_stat.visualMap[1].min = minOpa
          this.worker_stat.visualMap[1].max = maxOpa
          this.worker_stat.series[0].data = workerStat
        })
      }
    },
    created() {
      this.simId = this.$route.params.id
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

<style>
  .toolbar {
  }

  .echarts {
    width: 100%;
    height: 550px;
  }

  .row-echarts {
    width: 100%;
    height: 500px;
    margin-bottom: 5px;
  }
  .item-echarts {
    width: 100%;
    height:400px;
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

  /*.content {*/
    /*min-height: 100px;*/
  /*}*/
</style>
