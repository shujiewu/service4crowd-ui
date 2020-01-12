<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-success">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('title.createTaskUI')}}</h3>
          </div>

          <div class="box-body">
            <form-detail :is-edit='false'></form-detail>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
  import FormDetail from './components/FormDetail'
  export default {
    name: 'createForm',
    components: { FormDetail }
  }
</script>
