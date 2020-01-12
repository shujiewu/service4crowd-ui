<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-success">
          <div class="box-header with-border">
            <h3 class="box-title">{{$t('service.createService')}}</h3>
          </div>
          <div class="col-md-6">
            <el-form ref="form" style="margin: 20px auto;" :rules="rules" label-position="left" :model="form" label-width="80px">
              <div class="box-body">
                <el-form-item :label="$t('service.serviceName')" prop="name">
                  <el-input v-model="form.name" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item :label="$t('service.serviceType')" prop="type"  style="width: 100%">
                  <el-select v-model="form.type" placeholder="please select">
                    <el-option key="Processor" label="PROCESSOR" value="PROCESSOR"></el-option>
                    <el-option key="Algorithm" label="ALGORITHM" value="ALGORITHM"></el-option>
                    <el-option key="Web" label="WEB" value="WEB"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('service.serviceVersion')" prop="version">
                  <el-input v-model="form.version" style="width: 90%"></el-input>
                </el-form-item>
                <el-form-item v-if="form.type==='WEB'" label="URI" prop="uriScheme">
                  <el-input :placeholder="form.uriScheme==='docker:'? 'dockerUri':'file'" v-model="form.uriDic"
                            style="width: 50%" class="input-with-select">
                    <el-select v-model="form.uriScheme" slot="prepend" placeholder="please select">
                      <el-option label="docker:" value="docker:"></el-option>
                      <el-option label="file:" value="file:"></el-option>
                    </el-select>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('service.propertyFile')">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :on-success='handleSuccess'
                    :limit="1"
                    :on-exceed="handleExceed"
                    :action="'http://192.168.3.109:9529/api/service/registration/upload/' + form.type + '/' + form.name + '/' + form.version + '?token=' + getToken() + '&&force=' + form.force"
                    :before-upload="handleBefore"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">select</el-button>
                    <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器-->
                    <!--</el-button>-->
                    <div slot="tip" class="el-upload__tip"></div>
                  </el-upload>
                </el-form-item>

                <el-form-item :label="$t('service.force')">
                  <el-switch v-model="form.force"></el-switch>
                </el-form-item>
                <el-form-item :label="$t('service.description')">
                  <el-input type="textarea" rows="8" v-model="form.desc" style="width: 90%"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="col-md-6">
            <el-card class="box-card">
              <div slot="header">
                  {{ $t('table.propertyExample') }}
              </div>
              <div class="box-item">
                <pre style="margin-top:5px;"> {{ jsonProperty }}</pre>
              </div>
            </el-card>
          </div>
          <!-- /.box-body -->
          <!--<div class="box-footer">-->
          <!--<el-form-item>-->
          <!--<el-button type="primary" @click="onSubmit">提交</el-button>-->
          <!--<el-button @click="onReset">取消</el-button>-->
          <!--</el-form-item>-->
          <!--</div>-->
          <div class="col-md-12">
            <div class="box-footer">
              <el-button type="primary" @click="onSubmit">submit</el-button>
              <el-button @click="onReset">cancel</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import {
    createService
  } from '@/api/service/register'
  import { getToken } from '@/utils/auth'
  export default {
    name: 'createService',
    computed: {
      jsonProperty() {
        if (this.form.type === 'WEB') { return this.webProperty } else if (this.form.type === 'ALGORITHM') { return this.algProperty }
      }
    },
    data: function() {
      return {
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          version: [
            { required: true, message: '请输入版本', trigger: 'change' }
          ],
          uriScheme: [
            { required: true, message: '请选择scheme', trigger: 'change' }
          ],
          uriDic: [
            { required: true, message: '请输入资源', trigger: 'change' }
          ]
        },
        form: {
          name: '',
          type: '',
          propertyId: '',
          uriScheme: '',
          uriDic: '',
          uri: '',
          version: '',
          force: false,
          desc: ''
        },
        uploadUrl: '',
        webProperty: JSON.parse('{\n' +
          '\t"name": "service-data-core",\n' +
          '\t"serviceType": "MachineService",\n' +
          '\t"atomicServices": [{\n' +
          '\t\t"name": "loadMetaData",\n' +
          '\t\t"version": 1,\n' +
          '\t\t"description": "loadMetaData",\n' +
          '\t\t"url": "/data/metaData/{dataName}/load",\n' +
          '\t\t"async": false,\n' +
          '\t\t"method": "GET",\n' +
          '\t\t"queryParameters": [],\n' +
          '\t\t"uriParameters": [{\n' +
          '\t\t\t"name": "dataName",\n' +
          '\t\t\t"type": "string",\n' +
          '\t\t\t"default": "",\n' +
          '\t\t\t"description": "dataName"\n' +
          '\t\t}],\n' +
          '\t\t"response": [{\n' +
          '\t\t\t"status": 200,\n' +
          '\t\t\t"description": "",\n' +
          '\t\t\t"parameters": [{\n' +
          '\t\t\t\t\t"name": "MetaDataId",\n' +
          '\t\t\t\t\t"type": "string",\n' +
          '\t\t\t\t\t"description": "meta data id"\n' +
          '\t\t\t\t},\n' +
          '\t\t\t\t{\n' +
          '\t\t\t\t\t"name": "UnitDataList",\n' +
          '\t\t\t\t\t"type": "object[]",\n' +
          '\t\t\t\t\t"description": "unit data list"\n' +
          '\t\t\t\t}\n' +
          '\t\t\t]\n' +
          '\t\t}]\n' +
          '\t}]\n' +
          '}'),
        algProperty: JSON.parse('{\n' +
          '\t"name": "GLAD",\n' +
          '\t"version": 1,\n' +
          '\t"description": "GLAD",\n' +
          '\t"inputParameters": [{\n' +
          '\t\t"type": "double",\n' +
          '\t\t"description": "test",\n' +
          '\t\t"name": "threshold",\n' +
          '\t\t"value": "1e-5"\n' +
          '\t}],\n' +
          '\t"outputParameters": [{\n' +
          '\t\t"name": "dataName",\n' +
          '\t\t"type": "string",\n' +
          '\t\t"default": "",\n' +
          '\t\t"description": "dataName"\n' +
          '\t}],\n' +
          '\t"aggregationProperty": {\n' +
          '\t\t"Task Types": "Decision-Making, Single-Choice",\n' +
          '\t\t"Task Modeling": "Task Difficulty",\n' +
          '\t\t"Worker Modeling": "Worker Probability",\n' +
          '\t\t"Techniques": "Probabilistic Graphical Model"\n' +
          '\t},\n' +
          '\t"implementation": "Java/Python",\n' +
          '\t"lib": ["tesorflow", "pip"]\n' +
          '}')
      }
    },
    methods: {
      getToken() {
        return getToken()
      },
      onReset() {
        this.$refs['form'].resetFields()
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '只能选择一个文件',
          type: 'warning'
        })
      },
      handleBefore(file) {
        const isZip = (file.type === 'application/x-zip-compressed')|| (file.type === 'application/zip')
        const isJson = file.type === 'application/json'
        if (!isZip && !isJson) {
          this.$message({
            message: '只能是zip格式或json格式',
            type: 'warning'
          })
          return false
        }
        return true
      },
      submitUpload() {
        this.uploadUrl = 'http://192.168.3.109:9529/api/service/registration/upload/' + this.form.type + '/' + this.form.name + '/' + this.form.version + '?token=' + getToken() + '&&force=' + this.form.force
        // console.log(this.uploadUrl)
        this.$refs.upload.submit()
      },
      handleSuccess(res, file, fileList) {
        console.log(res)
        if (res.data.success === true) {
          if (res.data.propertyId !== undefined) {
            this.form.propertyId = res.data.propertyId
          }
          createService(this.form).then(response => {
            if (response.data.success) {
              this.$notify({
                title: 'Create Service Success!',
                message: response.message,
                type: 'success',
                duration: 2000
              })
            } else {
              this.form.uri = ''
              this.$notify({
                title: '失败',
                message: response.data.message,
                type: 'error',
                duration: 2000
              })
            }
          })
        } else {
          this.$notify({
            title: '失败',
            message: res.data.message,
            type: 'error',
            duration: 2000
          })
        }
      },
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.submitUpload()
            // this.$refs.upload.submit()
            this.form.uri = this.form.uriScheme + this.form.uriDic
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

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .field-label{
    vertical-align: middle;
  }
  .box-card {
    max-width: 100%;
    margin: 20px auto;
  }
</style>
