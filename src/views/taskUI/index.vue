<template>
  <!--<el-tabs v-model="activeName3" style='margin-top:10px; margin-left: 10px; margin-right: 10px' type="border-card" @tab-click="handleClick">-->
    <!--<el-tab-pane label="All Task UI" name="first"></el-tab-pane>-->
  <!--</el-tabs>-->

  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-success">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('title.UIList')}}</h3>
          </div>
          <div class="box-body">
            <ui-manage></ui-manage>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import uiManage from './components/UIManage'

  export default {
    name: 'model',
    data() {
      return {
        activeName3: 'first'
      }
    },
    components: { uiManage },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
