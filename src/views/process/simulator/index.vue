<template>
  <!--<div class="toolbar">-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <!-- Widget: user widget style 1 -->
          <div class="box box-widget">
            <!-- Add the bg color to the header using any of the bg-* classes -->
            <div style="background-color:#00a65a;color:#ffffff;padding: 1px;border-top-right-radius:3px;border-top-left-radius:3px">
              <!--#00a65a-->
              <!-- /.widget-user-image -->
              <h3 class="text-left" style="padding-bottom: 8px;padding-left: 15px">{{'DataSet Name: ' + dataSetName}}</h3>
            </div>
            <div class="box-footer no-border">
              <div class="row">
                <div class="col-xs-3 text-center">
                  <div class="inner">
                    <h2>{{dataType}}</h2>

                    <h4>DataType</h4>
                  </div>
                </div>
                <div class="col-xs-3 text-center">
                  <div class="inner">
                    <h2>{{duration}}</h2>

                    <h4>Duration</h4>
                  </div>
                </div>
                <!-- ./col -->
                <div class="col-xs-3 text-center">
                  <div class="inner">
                    <h2>{{simWorkerTotal }}</h2>

                    <h4>WorkerTotal
                    </h4>
                  </div>
                </div>
                <!-- ./col -->
                <div class="col-xs-3 text-center">
                  <div class="inner">
                    <h2>{{simAnswerTotal}}</h2>

                    <h4>AnswerTotal
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <!-- Widget: user widget style 1 -->
          <el-card  class="input-echarts">
            <div class="box-header with-border">
              <h3 class="box-title"> INPUT FILE STATISTICAL DATA</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">
              <div class="row">
                <div class="col-md-2 col-sm-4">
                  <div class="pad box-pane-right bg-green" style="height: 330px">
                    <div class="description-block margin-bottom" style="margin-top: 30px">

                      <h5 class="description-header">{{gladAccuracy}}</h5>
                      <span class="description-text">Accuracy</span>
                    </div>
                    <!-- /.description-block -->
                    <div class="description-block margin-bottom">

                      <h5 class="description-header">{{inputQuestion}}</h5>
                      <span class="description-text">Questions</span>
                    </div>
                    <!-- /.description-block -->
                    <div class="description-block margin-bottom">

                      <h5 class="description-header">{{inputWorker}}</h5>
                      <span class="description-text">Workers</span>
                    </div>
                    <div class="description-block">

                      <h5 class="description-header">{{inputResponse}}</h5>
                      <span class="description-text">Answers</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                </div>
                <div class="col-md-5 col-sm-4">
                  <div class="pad">
                    <div class="item-echarts">
                      <!--<chart :option="pie_radius" theme="dark"></chart>-->
                      <chart :options="alphaStat" style="top:10px; width:100%; height: 300px" auto-resize/>
                    </div>
                  </div>
                </div>
                <div class="col-md-5 col-sm-4">
                  <div class="pad">
                    <div class="item-echarts">
                      <!--<chart :option="pie_radius" theme="dark"></chart>-->
                      <chart :options="betaStat" style="top:10px;width:100%; height: 300px" auto-resize/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>


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
  import { getSimReport } from '@/api/data/simulator'
  import 'echarts/theme/dark.js'
  import 'echarts/theme/macarons.js'
  import 'echarts/extension/dataTool'
  import { histogram } from 'echarts-stat/dist/ecStat.js'
  // import IEcharts from 'vue-echarts-v3/src/full.js'

  export default {
    name: 'SimulatorReport',
    data() {
      return {
        inputWorker: 0,
        inputQuestion: 0,
        inputResponse: 0,
        inputClass: 0,
        dataSetName: '',
        duration: '',
        dataType: '',
        simWorkerTotal: 0,
        simAnswerTotal: 0,
        gladAccuracy: 0,
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
        betaMax: 0,
        betaInterval: 0,
        betaMin: 0,
        betaData: [],
        betaStat: {
          title: {
            text: 'Beta Value of All Tasks',
            x: 'center'
          },
          xAxis: [{
            type: 'value',
            min: this.betaMin,
            max: this.betaMax,
            interval: this.betaInterval
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: 'count',
            type: 'custom',
            renderItem: this.renderItem,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            encode: {
              x: [0, 1],
              y: 2,
              tooltip: 2,
              label: 2
            },
            data: this.betaData,
            itemStyle: {
              normal: {
                color: '#3c8dbc'
              }
            }
          }],
          tooltip: {
            trigger: 'item',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          }
        },
        alphaMax: 0,
        alphaInterval: 0,
        alphaMin: 0,
        alphaData: [],
        alphaStat: {
          title: {
            text: 'Alpha Value of All Workers',
            x: 'center'
          },
          xAxis: [{
            type: 'value',
            min: this.alphaMin,
            max: this.alphaMax,
            interval: this.alphaInterval
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: 'count',
            type: 'custom',
            renderItem: this.renderItem,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            encode: {
              x: [0, 1],
              y: 2,
              tooltip: 2,
              label: 2
            },
            data: this.alphaData,
            itemStyle: {
              normal: {
                color: '#605ca8'
              }
            }
          }],
          tooltip: {
            trigger: 'item',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          }
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
      renderItem(params, api) {
        var yValue = api.value(2)

        var start = api.coord([api.value(0), yValue])
        var size = api.size([api.value(1) - api.value(0), yValue])
        var style = api.style()
        // console.log(start,size,style)
        return {
          type: 'rect',
          shape: {
            x: start[0] + 1,
            y: start[1],
            width: size[0],
            height: size[1]
          },
          style: style
        }
      },
      getCustomData(data) {
        var result = []
        for (var i = 0; i < data.bins.length; i++) {
          var x0 = data.bins[i].x0.toFixed(2)
          var x1 = data.bins[i].x1.toFixed(2)
          result.push([x0, x1, data.data[i][1]])
        }
        return result
      },
      getSimStat() {
        getSimReport(this.simId).then(response => {
          var simResultsStatistics = response.simResultsStatistics
          console.log(simResultsStatistics)
          this.inputWorker = simResultsStatistics.initWorkersNum
          this.inputQuestion = simResultsStatistics.itemsNum
          this.inputResponse = simResultsStatistics.initLabelsNum
          this.inputClass = simResultsStatistics.classesNum
          this.dataSetName = simResultsStatistics.dataSetName
          this.duration = simResultsStatistics.duration
          this.dataType = simResultsStatistics.dataType
          this.simWorkerTotal = simResultsStatistics.workersNum
          this.simAnswerTotal = simResultsStatistics.labelsNum
          this.gladAccuracy = (simResultsStatistics.gladAccuracy * 100).toFixed(2) + '%'
          var bins = histogram(simResultsStatistics.beta, 'sturges')
          this.betaData = this.getCustomData(bins)
          this.betaStat.xAxis[0].min = this.betaData[0][0]
          this.betaStat.xAxis[0].max = this.betaData[this.betaData.length - 1][1]
          this.betaInterval = parseFloat((this.betaData[0][1] - this.betaData[0][0]).toFixed(2))
          this.betaStat.xAxis[0].interval = this.betaInterval
          this.betaStat.series[0].data = this.betaData

          bins = histogram(simResultsStatistics.alpha, 'squareRoot')
          this.alphaData = this.getCustomData(bins)
          this.alphaStat.xAxis[0].min = this.alphaData[0][0]
          this.alphaStat.xAxis[0].max = this.alphaData[this.alphaData.length - 1][1]
          this.alphaInterval = parseFloat((this.alphaData[0][1] - this.alphaData[0][0]).toFixed(2))
          this.alphaStat.xAxis[0].interval = this.alpha
          this.alphaStat.series[0].data = this.alphaData

          // this.itemsStat.xAxis[0].data = simResultsStatistics.itemsId
          // this.itemsStat.series[0].data = simResultsStatistics.beta
          //
          // var betaMax = Math.max.apply(null, simResultsStatistics.beta)
          // var betaMin = Math.min.apply(null, simResultsStatistics.beta)
          // // console.log(betaMax)
          // var betaRoundMax = Math.ceil(betaMax)
          // var betaRoundMin = Math.floor(betaMin)
          // this.itemsStat.visualMap[0].min = betaRoundMin
          // this.itemsStat.visualMap[0].max = betaRoundMax
          // var step = (betaRoundMax - betaRoundMin) / 10
          //
          // var cc = simResultsStatistics.beta
          //
          // var mapObj = new Map()
          //
          // for (var i = 0; i < cc.length; i++) {
          //   for (var j = 0; j < 10; j++) {
          //     if (cc[i] >= betaRoundMin + j * step && cc[i] <= betaRoundMin + (j + 1) * step) {
          //       var name = (betaRoundMin + j * step).toFixed(2) + '-' + (betaRoundMin + (j + 1) * step).toFixed(2)
          //       if (mapObj.has(name)) { mapObj.set(name, mapObj.get(name) + 1) } else { mapObj.set(name, 1) }
          //
          //       // this.itemsStat.series[1].data.push({ value: mapObj.get(name), name: name })
          //       break
          //     }
          //   }
          // }
          // mapObj.forEach((value, key) => {
          //   // this.worker_country.legend.data.push(value)
          //   this.itemsStat.series[1].data.push({ value: value, name: key })
          //   this.itemsStat.legend.data.push(key)
          // })

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

          // var workerStat = []
          // var minSize = Math.min.apply(null, simResultsStatistics.tasksPerWorker)
          // var maxSize = Math.max.apply(null, simResultsStatistics.tasksPerWorker)
          // var minOpa = Math.min.apply(null, simResultsStatistics.durationPerWorker)
          // var maxOpa = Math.max.apply(null, simResultsStatistics.durationPerWorker)
          // for (i = 0; i < this.workerTotal; i++) {
          //   var data = []
          //   data.push(simResultsStatistics.workerId[i])
          //   data.push(simResultsStatistics.alpha[i].toFixed(2))
          //   data.push(simResultsStatistics.tasksPerWorker[i])
          //   data.push(simResultsStatistics.durationPerWorker[i])
          //   workerStat.push(data)
          // }
          // console.log(minSize)
          // console.log(maxSize)
          // console.log(minOpa)
          // console.log(maxOpa)
          // this.worker_stat.visualMap[0].min = minSize
          // this.worker_stat.visualMap[0].max = maxSize
          // this.worker_stat.visualMap[1].min = minOpa
          // this.worker_stat.visualMap[1].max = maxOpa
          // this.worker_stat.series[0].data = workerStat
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
  /*.toolbar {*/
  /*}*/

  /*.echarts {*/
    /*width: 100%;*/
    /*height: 350px;*/
  /*}*/

  .input-echarts {
    width: 100%;
    height: 400px;
    /*margin-bottom: 5px;*/
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
