<!--<template>-->
  <!--<el-tabs v-model="activeName2" style='margin-top:15px; margin-left: 15px' type="card" @tab-click="handleClick">-->
    <!--<el-tab-pane label="用户管理" name="first"><model-manage></model-manage></el-tab-pane>-->
    <!--<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>-->
    <!--<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
    <!--<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
  <!--</el-tabs>-->
<!--</template>-->
<!--<script>-->
  <!--import modelManage from '../table/ModelManage'-->

  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--activeName2: 'first'-->
      <!--}-->
    <!--},-->
    <!--components: { modelManage },-->
    <!--methods: {-->
      <!--handleClick(tab, event) {-->
        <!--console.log(tab, event)-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
<template>
  <uploader ref="uploader" :options="options" class="uploader-example" :autoStart="false"  @file-success="fileSuccess" @complete="complete">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>select files</uploader-btn>
      <uploader-btn :attrs="attrs">select images</uploader-btn>
      <uploader-btn :directory="true">select folder</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        options: {
          // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
          target: '//192.168.3.216:9529/api/data/upLoad', // ?token=' + getToken(),
          // query: { 'Authorization': getToken() },
          headers: { 'Authorization': getToken() },
          chunkSize: 20 * 1024 * 1024,
          testChunks: false
        },
        attrs: {
          accept: 'image/*'
        }
      }
    },
    methods: {
      complete() {
        // console.log('complete', arguments)
        this.$emit('dataUploadComplete', true)
        this.$notify({
          title: '成功',
          message: '数据文件成功',
          type: 'success',
          duration: 2000
        })
      },
      fileSuccess(rootFile, file, message, chunk) {
        // console.log('complete' + message.fileId)
        message = JSON.parse(message)
        this.$emit('fileUploadComplete', { fileName: file.name, fileId: message.fileId })
      },
      start() {
        this.$refs.uploader.uploader.upload()
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.uploader = this.$refs.uploader.uploader
      })
    }
  }
</script>

<style>
  .uploader-example {
    width: 100%;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
