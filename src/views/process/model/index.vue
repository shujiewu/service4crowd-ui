<template>
  <model-manage></model-manage>
</template>
<script>
  import ModelManage from './ModelManage'
  import PanelGroup from './components/PanelGroup'
  export default {
    name: 'model',
    components: { ModelManage, PanelGroup }
  }
</script>
