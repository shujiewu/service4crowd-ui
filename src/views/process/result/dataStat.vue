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
            <h3 class="text-left" style="padding-bottom: 8px;padding-left: 15px">{{'DataSet Name: ' + dataName}}</h3>
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
                  <h2>{{taskTotal}}</h2>

                  <h4>TaskTotal</h4>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-xs-3 text-center">
                <div class="inner">
                  <h2>{{workerTotal }}</h2>

                  <h4>WorkerTotal
                  </h4>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-xs-3 text-center">
                <div class="inner">
                  <h2>{{answerTotal}}</h2>

                  <h4>AnswerTotal
                  </h4>
                </div>
              </div>
            </div>
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
      <div class="col-md-12">
        <div class="box box-primary box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('result.ResponseStatistics')}}</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="height: auto">
            <div class="table-responsive">
              <!--<button type="button" class="btn btn-block btn-primary">Primary</button>-->

              <!--<div class="echarts">-->
              <!--<chart :options="worker_country" style="height: 500px" auto-resize/>-->
              <!--</div>-->
              <div class="col-md-8 text-center">

                  <div>
                    <!--<chart :option="pie_radius" theme="dark"></chart>-->
                    <chart :options="task_stat" class="worker-detail-echarts" auto-resize/>
                  </div>
              </div>
              <div class="col-md-4 text-center">
                  <div class="row">
                    <div>
                      <chart :options="taskConsistency"  class="medium-echarts" style="margin-top: 50px" auto-resize/>
                    </div>
                  </div>
                  <!--<div class="row">-->
                    <!--<div class="small-echarts">-->
                      <!--<chart :options="taskPerWorker"   class="small-echarts" auto-resize/>-->
                    <!--</div>-->
                  <!--</div>-->
              </div>
              <!--<div class="col-xs-4 text-center">-->
                <!--<div class="inner">-->
                  <!--<div class="echarts">-->
                    <!--<chart :options="taskPerWorker" auto-resize/>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            </div>
          </div>
          <!-- /.box-body -->
          <!--<div class="box-footer clearfix">-->
            <!--<el-button @click="handleResultExport" class="pull-right" size='small' icon="el-icon-plus">-->
              <!--{{$t('table.export')}}-->
            <!--</el-button>-->
          <!--</div>-->
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('result.WorkerStatistics')}}</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="height: auto">
            <div class="col-xs-8 text-center">
              <div class="inner">
                <div>
                  <!--<chart :option="pie_radius" theme="dark"></chart>-->
                  <chart :options="worker_stat" class="worker-detail-echarts"  auto-resize/>
                </div>
              </div>
            </div>
            <div class="col-xs-4 text-center">
              <div class="inner">
                <div>
                  <chart :options="workerQuality" class="medium-echarts" style="margin-top: 50px" auto-resize/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!--<div class="col-md-6">-->
        <!--<div class="box box-success box-solid">-->
          <!--<div class="box-header with-border">-->
            <!--<h3 class="box-title">Worker Detail</h3>-->
          <!--</div>-->
          <!--&lt;!&ndash; /.box-header &ndash;&gt;-->
          <!--<div class="box-body" style="height: auto">-->
            <!--<div class="echarts">-->
              <!--&lt;!&ndash;<chart :option="pie_radius" theme="dark"></chart>&ndash;&gt;-->
              <!--<chart :options="worker_stat"auto-resize/>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
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
  import 'echarts/theme/dark.js'
  import 'echarts/theme/macarons.js'
  import 'echarts/extension/dataTool'
  import { histogram } from 'echarts-stat/dist/ecStat.js'

  export default {
    name: 'DataStat',
    data() {
      return {
        dataName: '',
        dataType: '',
        answerTotal: 0,
        workerTotal: 0,
        taskTotal: 0,
        workerDetail: [],
        consisMax: 0,
        consisInterval: 0,
        consisMin: 0,
        consisData: [],
        taskConsistency: {
          title: {
            text: this.$t('result.ConsistencyDistribution'),
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          xAxis: [{
            type: 'value',
            name: 'Interval',
            min: this.consisMin,
            max: this.consisMax,
            interval: this.consisInterval
          }],
          yAxis: [{
            type: 'value',
            name: 'Count'
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
            data: this.consisData,
            itemStyle: {
              normal: {
                color: '#605ca8'
              }
            }
          }]
        },
        tpwMax: 0,
        tpwInterval: 0,
        tpwMin: 0,
        tpwData: [],
        taskPerWorker: {
          title: {
            text: '工人冗余',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          xAxis: [{
            type: 'value',
            min: this.tpwMin,
            max: this.tpwMax,
            interval: this.tpwInterval
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: 'value',
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
            data: this.tpwData,
            itemStyle: {
              normal: {
                color: '#3c8dbc'
              }
            }
          }]
        },

        wqMax: 0,
        wqInterval: 0,
        wqMin: 0,
        wqData: [],
        workerQuality: {
          title: {
            text: this.$t('result.qualitydistribution'),
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          xAxis: [{
            type: 'value',
            name: 'Interval',
            min: this.wqMin,
            max: this.wqMax,
            interval: this.wqInterval
          }],
          yAxis: [{
            type: 'value',
            name: 'Count'
          }],
          series: [{
            name: 'value',
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
            data: this.wqData,
            itemStyle: {
              normal: {
                color: '#00a65a'
              }
            }
          }]
        },
        task_stat: {
          title: {
            text: this.$t('result.ResponseStatistics'),
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
                'TaskId：' + value[0] +
                '</div>' +
                'Consistency：' + value[1] + '<br>' +
                'Redundancy：' + value[2] + '<br>'
            }
          },
          // grid: [{
          //   left: 50,
          //   right: 50
          // }
          // ],
          xAxis: {
            type: 'category',
            name: 'TaskId',
            splitLine: {
              show: false
            },
            axisLine: { onZero: false }
          },
          yAxis: {
            type: 'value',
            name: 'Consistency',
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
              top: '10%',
              dimension: 2,
              min: 0,
              max: 250,
              itemHeight: 120,
              calculable: true,
              precision: 0.1,
              text: ['Size: Redundancy'],
              textGap: 30,
              inRange: {
                symbolSize: [4, 45],
                color: '#f2c31a'
              },
              outOfRange: {
                symbolSize: [4, 45],
                color: ['rgba(255,255,255,.2)']
              },
              controller: {
                inRange: {
                  color: '#f2c31a'
                }
              }
            }
            // {
            //   min: 15202,
            //   max: 159980,
            //   dimension: 1,
            //   orient: 'vertical',
            //   right: 10,
            //   top: 'center',
            //   text: ['HIGH', 'LOW'],
            //   calculable: true,
            //   inRange: {
            //     color: ['#f2c31a', '#24b7f2']
            //   }
            // right: 0,
            // top: '50%',
            // dimension: 3,
            // min: 0,
            // max: 50,
            // itemHeight: 120,
            // calculable: true,
            // precision: 0.1,
            // text: ['明暗：平均完成时间'],
            // textGap: 30,
            // inRange: {
            //   color: ['#80F1BE', '#fec42c']
            // },
            // outOfRange: {
            //   color: ['rgba(255,255,255,.2)']
            // },
            // controller: {
            //   inRange: {
            //     color: ['#80F1BE', '#fec42c']
            //   },
            //   outOfRange: {
            //     color: ['#444']
            //   }
            // }
            // }
          ],
          series: [
            {
              name: 'task',
              type: 'scatter',
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(120, 36, 50, 0.5)',
                  shadowOffsetY: 5
                }
              },
              data: []
            }
          ]
        },
        worker_stat: {
          title: {
            text: this.$t('result.WorkerStatistics'),
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
                'TaskCount：' + value[2] + '<br>'
            }
          },
          // grid: [{
          //   left: 50,
          //   right: 50
          // }
          // ],
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
            name: 'Quality',
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
              top: '10%',
              dimension: 2,
              min: 0,
              max: 250,
              itemHeight: 120,
              calculable: true,
              precision: 0.1,
              text: ['Size: The number of tasks completed'],
              textGap: 30,
              inRange: {
                symbolSize: [4, 45],
                color: '#24b7f2'
              },
              outOfRange: {
                symbolSize: [4, 45],
                color: ['rgba(255,255,255,.2)']
              },
              controller: {
                inRange: {
                  color: '#24b7f2'
                }
              }
            }
            // {
            //   min: 15202,
            //   max: 159980,
            //   dimension: 1,
            //   orient: 'vertical',
            //   right: 10,
            //   top: 'center',
            //   text: ['HIGH', 'LOW'],
            //   calculable: true,
            //   inRange: {
            //     color: ['#f2c31a', '#24b7f2']
            //   }
            // right: 0,
            // top: '50%',
            // dimension: 3,
            // min: 0,
            // max: 50,
            // itemHeight: 120,
            // calculable: true,
            // precision: 0.1,
            // text: ['明暗：平均完成时间'],
            // textGap: 30,
            // inRange: {
            //   color: ['#80F1BE', '#fec42c']
            // },
            // outOfRange: {
            //   color: ['rgba(255,255,255,.2)']
            // },
            // controller: {
            //   inRange: {
            //     color: ['#80F1BE', '#fec42c']
            //   },
            //   outOfRange: {
            //     color: ['#444']
            //   }
            // }
            // }
          ],
          series: [
            {
              name: 'worker',
              type: 'scatter',
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(120, 36, 50, 0.5)',
                  shadowOffsetY: 5
                }
              },
              data: []
            }
          ]
        }
      }
    },
    mounted: function() {
      this.getDataStat()
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

      getDataStat() {
        getCustomResult(this.serviceName, this.dataStatId).then(response => {
          console.log(response)
          // this.resultPredict = response.mergeResultList
          // this.mergeTotal = response.mergeResultList.length
          var answerStat = response.answerStatistics
          this.dataType = answerStat.dataType
          this.dataName = answerStat.dataName
          this.taskTotal = answerStat.taskTotal
          this.workerTotal = answerStat.workerTotal
          this.answerTotal = answerStat.answerTotal
          // var consisMax = Math.max.apply(null, answerStat.taskConsistency)
          // var consisMin = Math.min.apply(null, answerStat.taskConsistency)
          // this.consisRoundMax = Math.ceil(consisMax)
          // // var length = this.consisRoundMax.toString().length
          // var consisRoundMin = Math.floor(consisMin)
          // this.consisInterval = (this.consisRoundMax - consisRoundMin) / 10

          // data = echarts.util.map(bins.data, function (item, index) {
          //   var x0 = bins.bins[index].x0
          //   var x1 = bins.bins[index].x1
          //   interval = x1 - x0
          //   min = Math.min(min, x0)
          //   max = Math.max(max, x1)
          //   return [x0, x1, item[1]]
          // })

          var bins = histogram(answerStat.taskConsistency, 'sturges')
          this.consisData = this.getCustomData(bins)
          this.taskConsistency.xAxis[0].min = this.consisData[0][0]
          this.taskConsistency.xAxis[0].max = this.consisData[this.consisData.length - 1][1]
          this.consisInterval = parseFloat((this.consisData[0][1] - this.consisData[0][0]).toFixed(2))
          this.taskConsistency.xAxis[0].interval = this.consisInterval
          this.taskConsistency.series[0].data = this.consisData
          //
          bins = histogram(answerStat.workerQuality, 'squareRoot')
          this.wqData = this.getCustomData(bins)
          this.workerQuality.xAxis[0].min = this.wqData[0][0]
          this.workerQuality.xAxis[0].max = this.wqData[this.wqData.length - 1][1]
          var it = this.wqData[0][1] - this.wqData[0][0]
          this.wqInterval = parseFloat(it.toFixed(2))
          this.workerQuality.xAxis[0].interval = this.wqInterval
          this.workerQuality.series[0].data = this.wqData
          console.log(this.wqData)

          // bins = histogram(answerStat.taskPerWorker, 'scott')
          // this.tpwData = this.getCustomData(bins)
          // this.taskPerWorker.xAxis[0].min = this.tpwData[0][0]
          // this.taskPerWorker.xAxis[0].max = this.tpwData[this.tpwData.length - 1][1]
          // this.taskPerWorker.xAxis[0].interval = this.tpwData[0][1] - this.tpwData[0][0]
          // this.taskPerWorker.series[0].data = this.tpwData

          var workerStat = []
          var minSize = Math.min.apply(null, answerStat.taskPerWorker)
          var maxSize = Math.max.apply(null, answerStat.taskPerWorker)
          for (var i = 0; i < this.workerTotal; i++) {
            var data = []
            data.push(answerStat.workerId[i])
            data.push(answerStat.workerQuality[i].toFixed(2))
            data.push(answerStat.taskPerWorker[i])
            // data.push(answerStat.taskPerWorker[i])
            workerStat.push(data)
          }
          this.worker_stat.visualMap[0].min = minSize
          this.worker_stat.visualMap[0].max = maxSize
          // this.worker_stat.visualMap[1].min = minOpa
          // this.worker_stat.visualMap[1].max = maxOpa
          this.worker_stat.series[0].data = workerStat

          var taskStat = []
          var minTaskSize = Math.min.apply(null, answerStat.workerPerTask)
          var maxTaskSize = Math.max.apply(null, answerStat.workerPerTask)
          for (i = 0; i < this.workerTotal; i++) {
            var data2 = []
            data2.push(answerStat.taskId[i])
            data2.push(answerStat.taskConsistency[i].toFixed(2))
            data2.push(answerStat.workerPerTask[i])
            // data.push(answerStat.taskPerWorker[i])
            taskStat.push(data2)
          }
          this.task_stat.visualMap[0].min = minTaskSize
          this.task_stat.visualMap[0].max = maxTaskSize
          // this.worker_stat.visualMap[1].min = minOpa
          // this.worker_stat.visualMap[1].max = maxOpa
          this.task_stat.series[0].data = taskStat


          // this.taskConsistency.series[0].renderItem = this.renderItem
          // var taskY = []
          // // var mapObj = new Map()
          // for (var i = 0; i < cc.length; i++) {
          //   for (var j = 0; j < 10; j++) {
          //     if (cc[i] >= consisRoundMin + j * step && cc[i] <= consisRoundMin + (j + 1) * step) {
          //       // var name = (betaRoundMin + j * step).toFixed(2) + '-' + (betaRoundMin + (j + 1) * step).toFixed(2)
          //       // if (mapObj.has(name)) { mapObj.set(name, mapObj.get(name) + 1) } else { mapObj.set(name, 1) }
          //
          //       // this.itemsStat.series[1].data.push({ value: mapObj.get(name), name: name })
          //       break
          //     }
          //   }
          // }

          // if (this.dataType === 'decisionmaking') {
          //   this.accuracy = (response.mergeResultEntity.resultIndex['accuracy'] * 100).toFixed(2) + '%'
          //   this.fscore = (response.mergeResultEntity.resultIndex['fscore'] * 100).toFixed(2) + '%'
          // } else if (this.dataType === 'singlelabel') {
          //   this.accuracy = (response.mergeResultEntity.resultIndex['accuracy'] * 100).toFixed(2) + '%'
          // } else if (this.dataType === 'continuous') {
          //   this.RMSE = (response.mergeResultEntity.resultIndex['RMSE']).toFixed(2)
          //   this.MAE = (response.mergeResultEntity.resultIndex['MAE']).toFixed(2)
          // }
          // this.duration = response.mergeResultEntity.duration.toFixed(2) + 's'
          //
          // var mergeResultList = response.mergeResultEntity.resultPredict
          // var truthList = response.mergeResultEntity.resultTruth
          // for (var item in mergeResultList) {
          //   // console.log(mergeResultList[item])
          //   var truthValue = '?'
          //   var correctValue = '?'
          //   var resultItem = mergeResultList[item]
          //   var obj = JSON.parse(resultItem)
          //   if (typeof obj === 'object' && obj) {
          //     var maxItem = '0'
          //     var maxValue = 0
          //     for (var choice in obj) {
          //       if (obj[choice] > maxValue) {
          //         maxItem = choice
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
          // this.resultPredictTable = this.resultPredict.slice(0, 10)
          //
          // var workerModel = response.mergeResultEntity.workerModel
          //
          // for (var x in workerModel) {
          //   this.workerModel.push({ id: x, value: workerModel[x] })
          //   this.workerTotal = this.workerTotal + 1
          // }
          // this.workerTable = this.workerModel.slice(0, 10)
          //
          // var taskModel = response.mergeResultEntity.taskModel
          // for (x in taskModel) {
          //   this.taskModel.push({ id: x, value: taskModel[x] })
          //   this.taskTotal = this.taskTotal + 1
          // }
          // this.taskModelTable = this.taskModel.slice(0, 10)
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
      }
    }
  }
</script>

<style>
  .small-echarts {
    width: 100%;
    height: 250px;
  }
  .medium-echarts {
    width: 100%;
    height: 350px;
  }
  .worker-detail-echarts {
    width: 100%;
    height: 500px;
  }
</style>
