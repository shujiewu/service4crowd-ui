<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-success">
          <div class="box-header with-border">
            <h3 class="box-title">服务结果</h3>
          </div>

          <div class="box-body">
            <pre>{{result}}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {getCustomResult} from '@/api/data/result'

  export default {
    name: 'custom',
    data() {
      return {
        result: ''
      }
    },
    mounted: function () {
      this.getResult(this.$route.params.serviceName, this.$route.params.id)
    },
    methods: {
      getResult(serviceName, id) {
        getCustomResult(serviceName, id).then(response => {
          this.result = response
          // this.result = JSON.stringify(response, null, 4)
          // alert(this.result)
        })
      }
    }
  }

</script>

<style scoped>

</style>
