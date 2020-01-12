<template>
  <div class="toolbar">
    <section class="content">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-green" @click="getWorkerStat"><i class="fa fa-bar-chart"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">{{$t('result.questions')}}</span>
            <span class="info-box-number">{{ questionTotal | numFormat }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-yellow"><i class="fa fa-area-chart"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">{{$t('result.responses')}}</span>
            <span class="info-box-number">{{ responseTotal | numFormat }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-aqua"><i class="ion ion-ios-people-outline"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">{{$t('result.workers')}}</span>
            <span class="info-box-number">{{ workerTotal | numFormat }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-red"><i class="ion ion-android-person-add"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">Time</span>
            <span class="info-box-number">{{ workerTotal | numFormat }}</span>
            <!--<span class="info-box-number" v-if="this.dataStatId ==='5b2fa253c7eba74738f8e4cd'">68 min</span>-->
            <!--<span class="info-box-number" v-else-if="this.dataStatId ==='5b2fa272c7eba74738f8e4d1'">36 min</span>-->
            <!--<span class="info-box-number" v-else>166 min</span>-->
          </div>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :xs="45" :sm="45" :md="24" :lg="24">
          <el-card class="unit-echarts">
            <div class="unit-echarts">
              <chart :options="uintStat" style="height: 820px" auto-resize/>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <p/>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="box-card">
            <div class="echarts">
              <!--<chart :option="pie_radius" theme="dark"></chart>-->
                <chart :options="worker_stat" style="height: 500px" auto-resize/>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="box-card">
            <div class="echarts">
              <chart :options="worker_country" style="height: 500px" auto-resize/>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <p/>

    </section>
    <!--<monitor v-bind:process-instance-id="processInstanceId"></monitor>-->
  </div>
</template>
<script>
  import monitor from '../view/monitor'
  // import { getReport } from '@/api/data/result'
  import 'echarts/theme/dark.js'
  import 'echarts/theme/macarons.js'
  import 'echarts/extension/dataTool'
  import { getCustomResult } from '@/api/data/result'
  import IEcharts from 'vue-echarts-v3/src/full.js'

  export default {
    name: 'ProcessMonitor',
    data() {
      return {
        ProcessMonitor: '',
        workerTotal: 0,
        questionTotal: 0,
        responseTotal: 0,
        newWorkTotal: 0,
        worker_country: {
          title: {
            text: this.$t('result.RegionalStatistics'),
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series: [
            {
              name: this.$t('result.source'),
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
        schema: [
          { name: 'date', index: 0, text: '日' },
          { name: 'AQIindex', index: 1, text: 'AQI指数' },
          { name: 'PM25', index: 2, text: 'PM2.5' },
          { name: 'PM10', index: 3, text: 'PM10' },
          { name: 'CO', index: 4, text: '一氧化碳（CO）' },
          { name: 'NO2', index: 5, text: '二氧化氮（NO2）' },
          { name: 'SO2', index: 6, text: '二氧化硫（SO2）' }
        ],

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
            text: this.$t('result.WorkerStatistics'),
            x: 'center'
          },
          color: [
            '#80F1BE', '#dd4444', '#fec42c'
          ],
          // legend: {
          //   data: ['北京', '上海', '广州'],
          //   textStyle: {
          //     fontSize: 16
          //   }
          // },
          // grid: {
          //   x: '10%',
          //   x2: 150,
          //   y: '18%',
          //   y2: '10%'
          // },
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
              left: 'right',
              top: '5%',
              dimension: 2,
              min: 0,
              max: 250,
              itemWidth: 30,
              itemHeight: 120,
              calculable: true,
              precision: 0.1,
              text: ['Size: The number of tasks completed'],
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
                  color: ['rgba(255,255,255,.2)']
                }
              }
            },
            {
              left: 'right',
              top: '50%',
              dimension: 3,
              min: 0,
              max: 50,
              itemHeight: 120,
              calculable: true,
              precision: 0.1,
              text: ['Color: average completion time'],
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
                  color: ['rgba(255,255,255,.2)']
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
            // },
            // {
            //   name: '上海',
            //   type: 'scatter',
            //   itemStyle: this.itemStyle,
            //   data: this.dataSH
            // },
            // {
            //   name: '广州',
            //   type: 'scatter',
            //   itemStyle: this.itemStyle,
            //   data: this.dataGZ
            // }
          ]
        },
        timeData: [],
        workerTrust: [],

        uintStat: {
          title: {
            text: this.$t('result.QuestionStatistics'),
            // subtext: '数据来自西安兰特水电测控技术有限公司',
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
                if (value[i].seriesName === 'Interval') {
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
                    'lower: ' + param.data[1]
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
      this.getWorkerStat()
    },
    components: { monitor, IEcharts },
    methods: {
      getWorkerStat() {
        getCustomResult(this.serviceName, this.dataStatId).then(response => {
          // console.log(response.worker.completeTaskNumer)
          var country = response.worker.countryStat

          // country.forEach((value, key) => {
          //   this.worker_country.legend.data.push(value)
          // })
          var ccName = Object.keys(country)

          this.worker_country.legend.data = []
          this.worker_country.series.data = []
          this.worker_country.legend.data = ccName
          var cc = Object.values(country)
          // this.worker_country.series.data = []
          // console.log(cc)
          var xx = []
          for (var i = 0; i < cc.length; i++) {
            this.worker_country.series[0].data.push({ value: cc[i], name: ccName[i] })
          }

          // this.worker_country.legend.data

          // this.worker_country.legend.data.push('直接访问')
          // this.worker_country.legend.data.push('邮件营销')
          // this.worker_country.series[0].data = [
          //   {value:335, name:'直接访问'},
          //   {value:310, name:'邮件营销'}]
          // console.log(this.worker_country)
          // this.worker_country.series.data = xx
          // this.chartLine.setOptions(this.worker_country)
          // 更新数据
          this.workerTotal = response.worker.workerNumber
          // this.worker_stat.xAxis.data = response.worker.workerId
          // this.worker_stat.series.data = response.worker.completeTaskNumer

          this.questionTotal = response.result.unitTotal
          this.responseTotal = response.result.judgementTotal

          // this.unitData = response.worker.workerId

          this.uintStat.xAxis[0].data = response.result.unitId
          this.uintStat.xAxis[1].data = response.result.unitId
          this.uintStat.xAxis[2].data = response.result.unitId
          this.uintStat.series[0].data = response.result.agreement
          this.uintStat.series[1].data = response.result.interval

          var echarts = require('echarts')
          this.workerTrust = echarts.dataTool.prepareBoxplotData(response.result.workerTrust)
          // console.log(data)
          this.uintStat.series[2].data = this.workerTrust.boxData
          this.uintStat.series[3].data = this.workerTrust.outliers

          var workerTrust = response.worker.workerTrust
          var workerStat = []

          var minSize = Math.min.apply(null, response.worker.completeTaskNumer)
          var maxSize = Math.max.apply(null, response.worker.completeTaskNumer)
          var minOpa = Math.min.apply(null, response.worker.avgCompleteTime)
          var maxOpa = Math.max.apply(null, response.worker.avgCompleteTime)
          for (var i = 0; i < workerTrust.length; i++) {
            var data = []
            data.push(response.worker.workerId[i])
            data.push(workerTrust[i])
            data.push(response.worker.completeTaskNumer[i])
            data.push(response.worker.avgCompleteTime[i])
            workerStat.push(data)
          }
          this.worker_stat.visualMap[0].min = minSize
          this.worker_stat.visualMap[0].max = maxSize
          this.worker_stat.visualMap[1].min = minOpa
          this.worker_stat.visualMap[1].max = maxOpa
          // this.worker_stat.xAxis.data = response.worker.workerId
          this.worker_stat.series[0].data = workerStat
          // this.worker_stat.series[1].data = this.dataSH
          // this.worker_stat.series[2].data = this.dataGZ

          // console.log(this.worker_country.legend.data)
        })
      }
    },
    created() {
      this.processInstanceId = this.$route.params.id
      // this.getWorkerStat()
      // console.log(this.worker_country)
      // this.getUnitStat()
      this.dataStatId = this.$route.params.id
      this.serviceName = this.$route.params.serviceName
    },
    // this.Boxplotdata = echarts.dataTool.prepareBoxplotData([
    //   [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
    //   [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
    //   [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
    //   [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
    //   [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
    // ])
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
      // monthTotal() {
      //   // 计算属性: 30天内的用户总数
      //   return this.total.android30Num + this.total.ios30Num
      // }
    }
  }
</script>

<style>
  .toolbar {
    /*background: #f2f2f2;*/
    padding: 10px;
    margin: 10px 0px;
  }

  .echarts {
    width: 100%;
    height: 550px;
  }

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
