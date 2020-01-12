<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-success">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('title.UIPreview')}}</h3>
          </div>
          <div class="box-body">
            <div style="margin-left: 30px;margin-top: 20px" v-html="uiContent"></div>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>

<script>
  import { fetchUI } from '@/api/data/ui'
  export default {
    name: 'preview',
    data() {
      return {
        uiContent: '',
        uiId: ''
      }
    },
    created() {
      this.uiId = this.$route.params.id
      fetchUI(this.uiId).then(res => {
        this.uiContent = res.data.instruction
      })
    }
  }
</script>

<style scoped>

</style>
