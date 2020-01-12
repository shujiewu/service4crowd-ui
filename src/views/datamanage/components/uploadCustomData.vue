<template>
  <uploader ref="uploader" :options="options" class="uploader-example" :autoStart="false"  @complete="complete" @file-success="fileSuccess">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>select files</uploader-btn>
      <!--<uploader-btn :attrs="attrs">select images</uploader-btn>-->
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
          target: '//192.168.3.109:9529/api/data/customData/upload',
          headers: { 'Authorization': getToken() },
          chunkSize: 20 * 1024 * 1024,
          testChunks: false
        },
        successFileList: [],
        customDataName: ''
      }
    },
    watch: {
      // 如果 `question` 发生改变，这个函数就会运行
      customDataName: function(newName, oldName) {
      }
    },
    methods: {
      complete() {
        // console.log('complete', arguments)
        this.$emit('customDataUploadComplete', this.successFileList)
        this.successFileList = []
        this.$notify({
          title: '成功',
          message: '数据文件上传成功',
          type: 'success',
          duration: 2000
        })
      },
      fileSuccess(rootFile, file, message, chunk) {
        message = JSON.parse(message)
        if(message.success===true){
          this.successFileList.push({"fileName":message.fileName,"fileId":message.fileId})
        }
      },
      start(val) {
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
