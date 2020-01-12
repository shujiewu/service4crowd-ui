<template>
  <el-tabs type="border-card" class="" style='margin-top:5px; margin-left: 5px; margin-right: 5px'>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> Microservices</span>
      <micro-service></micro-service>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> Algorithm</span>
      <truth-inference></truth-inference>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import truthInference from './components/TruthInference'
  import microService from './components/MicroService'
  export default {
    name: 'algorithm',
    components: { truthInference, microService }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
