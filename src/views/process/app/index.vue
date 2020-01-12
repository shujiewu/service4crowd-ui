<template>
  <el-tabs v-model="activeName2" style='margin-top:10px;margin-left: 10px; margin-right: 10px' type="border-card" @tab-click="handleClick">
    <el-tab-pane label="所有流程" name="first"><app-manage></app-manage></el-tab-pane>
    <!--<el-tab-pane label="历史模型" name="second"><app-manage></app-manage></el-tab-pane>-->
  </el-tabs>
</template>
<script>
  import appManage from './AppManage'

  export default {
    name: 'model',
    data() {
      return {
        activeName2: 'first'
      }
    },
    components: { appManage },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
