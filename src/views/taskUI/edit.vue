<template>
  <div class="components-container">
    <!--<code>-->
    <!--{{$t('components.tinymceTips')}}-->
    <!--&lt;!&ndash;<a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/#/rich-editor"> {{$t('components.documentation')}}</a>&ndash;&gt;-->
    <!--</code>-->
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                {{$t('table.name')}}
              </MDinput>
            </el-form-item>

            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.description" required :maxlength="100">
                {{$t('table.description')}}
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="editor-container">
          <tinymce :height="500" v-model="postForm.instruction"></tinymce>
        </div>
        <div>
          <el-button v-loading="loading" type="success" @click="submitForm()">save
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { fetchUI, updateUI } from '@/api/data/ui'
  import MDinput from '@/components/MDinput'

  export default {
    name: 'tinymce-demo',
    components: { Tinymce, MDinput },
    data() {
      return {
        content: '',
        postForm: {
          status: 'draft',
          title: '',
          instruction: '',
          description: '',
          id: undefined
        },
        loading: false
      }
    },
    created() {
      this.uiId = this.$route.params.id
      this.getUI()
    },
    methods: {
      getUI() {
        fetchUI(this.uiId).then(res => {
          this.postForm.instruction = res.data.instruction
          this.postForm.title = res.data.title
          // this.postForm.description = res.data.description
          this.postForm = res.data
        })
      },
      submitForm() {
        updateUI(this.postForm).then(response => {
          if (response.success) {
            this.$notify({
              title: '成功',
              message: '界面保存成功',
              type: 'success',
              duration: 2000
            })
            this.postForm.status = 'published'
            this.loading = false
          }
        }).catch(err => {
          this.fetchSuccess = false
          console.log(err)
        })
        // this.postForm.display_time = parseInt(this.display_time / 1000)
        // this.$refs.postForm.validate(valid => {
        //   if (valid) {
        //     this.loading = true
        //     updateUI(this.postForm).then(response => {
        //       if (response.success) {
        //         this.$notify({
        //           title: '成功',
        //           message: '界面保存成功',
        //           type: 'success',
        //           duration: 2000
        //         })
        //         this.postForm.status = 'published'
        //         this.loading = false
        //       }
        //     }).catch(err => {
        //       this.fetchSuccess = false
        //       console.log(err)
        //     })
        //   } else {
        //     console.log('error submit!!')
        //     return false
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
  .editor-content {
    margin-top: 20px;
  }

  .editor-container {
    min-height: 400px;
    margin: 0 0 30px;
  }
</style>
