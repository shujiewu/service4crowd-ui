<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-success">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('service.serviceStatus')}}</h3>
          </div>
          <div class="box-body" >
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="WebService" name="first"><micro-service></micro-service></el-tab-pane>
              <el-tab-pane label="Algorithm" name="second"><truth-inference></truth-inference></el-tab-pane>
              <!--<el-tab-pane>-->
                <!--<span slot="label"><i class="el-icon-date"></i> WebService</span>-->
                <!--<micro-service></micro-service>-->
              <!--</el-tab-pane>-->
              <!--<el-tab-pane>-->
                <!--<span slot="label"><i class="el-icon-date"></i> Algorithm</span>-->
                <!--<truth-inference></truth-inference>-->
              <!--</el-tab-pane>-->
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
  import truthInference from './runtime/algorithm'
  import microService from './runtime/web'
  export default {
    name: 'runtime',
    components: { truthInference, microService },
    data() {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
