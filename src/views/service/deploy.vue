<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-success">
          <div class="box-header with-border">
            <h3 class="box-title">Deploy Service</h3>
          </div>

          <div class="col-md-6">
            <el-form ref="form" :rules="rules" label-position="left" :model="form" label-width="80px">
              <div class="box-body">
                <el-form-item label="name" prop="name">
                  <el-input  v-model="form.name" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="count" prop="count">
                  <el-input  v-model="form.count" style="width: 30%"></el-input>
                </el-form-item>
                <el-form-item label="registerName" prop="serviceName">
                  <el-input :disabled="true" v-model="form.registerName" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="type" prop="type">
                  <el-select :disabled="true" v-model="form.type" placeholder="请选择">
                    <el-option key="Processor" label="PROCESSOR" value="PROCESSOR"></el-option>
                    <el-option key="Algorithm" label="ALGORITHM" value="ALGORITHM"></el-option>
                    <el-option key="Web" label="WEB" value="WEB"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="version" prop="version">
                  <el-input  :disabled="true" v-model="form.version" style="width: 30%"></el-input>
                </el-form-item>

                <el-form-item label="description">
                  <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                </el-form-item>

              </div>
              <!-- /.box-body -->

            </el-form>
          </div>
          <div class="col-md-6">
            <div style="font-weight: bold;margin-top: 20px;margin-bottom: 20px">Service Property</div>
            <div class="editor-container">
              <json-editor ref="jsonEditor" v-model="jsonProperty"></json-editor>
            </div>
          </div>
          <div class="col-md-12">
            <div class="box-footer">
              <el-button type="primary" @click="onSubmit">Submit</el-button>
              <el-button @click="onReset">Cancel</el-button>
            </div>
          </div>
        </div>
      </div>


      <!--<div class="col-md-6">-->
        <!--<div class="box box-success">-->
          <!--<div class="box-header with-border">-->
            <!--<h3 class="box-title">服务属性</h3>-->
          <!--</div>-->
          <!--<div class="box-body">-->

          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>

  </section>
</template>

<script>
  import {
    createDeployment
  } from '@/api/service/deploy'
  import {
    createMLDeployment,
    createMLRun
  } from '@/api/service/mlflow'
  import JsonEditor from '@/components/JsonEditor'
  const webProperty = '{"indexed":false,"cpu":1,"memory":512,"portmap":["9761:8080"],"uris":[],"env":{"hostname":"server-center"}}'
  const algProperty = '{"param":[{"alpha": 0.4},{"l1_ratio": 0.1}]}'
  export default {
    name: 'createService',
    components: { JsonEditor },
    data: function() {
      return {
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
          ],
          registerName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          version: [
            { required: true, message: '请输入版本', trigger: 'change' }
          ]
        },
        form: {
          name: '',
          count: '',
          registerName: '',
          type: '',
          version: '',
          desc: '',
          property: ''
        },
        jsonProperty: '',
        uploadUrl: ''
      }
    },
    created() {
      this.form.registerName = this.$route.params.serviceName
      this.form.type = this.$route.params.type
      this.form.version = this.$route.params.version
      if (this.form.type === 'WEB') {
        this.jsonProperty = JSON.parse(webProperty)
      } else {
        this.jsonProperty = JSON.parse(algProperty)
      }
    },
    methods: {
      handleFetchProperty() {
      },
      onReset() {
        this.$refs['form'].resetFields()
      },
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.property = JSON.parse(JSON.stringify(this.jsonProperty))
            // if (JSON.parse(this.form.property)) {
            if (this.form.type === 'WEB') {
              createDeployment(this.form.name, this.form).then(response => {
                if (response.data.success) {
                  // this.$refs.upload.submit()
                  this.$notify({
                    title: 'Create Service Success!',
                    message: response.message,
                    type: 'success',
                    duration: 2000
                  })
                } else {
                  this.$notify({
                    title: '失败',
                    message: response.data.message,
                    type: 'error',
                    duration: 2000
                  })
                }
              })
            } else {
              createMLRun(this.form).then(response => {
                if (response.data.total > 0) {
                  // this.$refs.upload.submit()
                  this.$notify({
                    title: 'Create Service Success!',
                    message: response.message,
                    type: 'success',
                    duration: 2000
                  })
                } else {
                  this.$notify({
                    title: '失败',
                    message: response.data.message,
                    type: 'error',
                    duration: 2000
                  })
                }
              })
            }
            // } else {
            //   console.log('属性校验失败')
            // }
          }
        })
      }
    }
  }
</script>
<style>
  .el-select .el-input {
    width: 130px;
  }
  .editor-container{
    position: relative;
    height: 100%;
    font-size: small;
    margin-bottom: 20px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
