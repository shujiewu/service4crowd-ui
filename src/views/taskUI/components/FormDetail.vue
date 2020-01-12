<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                {{$t('table.name')}}
              </MDinput>
              <span v-show="postForm.title.length>=26" class='title-prompt'>app可能会显示不全</span>
            </el-form-item>

            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.description" required :maxlength="100">
                {{$t('table.description')}}
              </MDinput>
              <span v-show="postForm.description.length>=26" class='title-prompt'>app可能会显示不全</span>
            </el-form-item>
          </el-col>
        </el-row>


        <div class="editor-container">
          <tinymce :height="500" ref="editor" v-model="postForm.instruction"></tinymce>
        </div>

        <div>
          <el-button v-loading="loading" type="success" @click="submitForm()">{{$t('button.save')}}
          </el-button>
        </div>

      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/singleImage3'
  import MDinput from '@/components/MDinput'
  import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
  import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { validateURL } from '@/utils/validate'
  import { fetchUI, createUI } from '@/api/data/ui'
  // import { userSearch } from '@/api/remoteSearch'
  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    instruction: '', // 文章内容
    description: '', // 文章摘要
    // source_uri: '', // 文章外链
    // image_uri: '', // 文章图片
    // source_name: '', // 文章外部作者
    // display_time: undefined, // 前台展示时间
    id: undefined
    // platforms: ['a-platform'],
    // comment_disabled: false
  }
  export default {
    name: 'formDetail',
    components: { Tinymce, MDinput, Upload, Multiselect, Sticky },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(null)
        } else {
          callback()
        }
      }
      const validateSourceUri = (rule, value, callback) => {
        if (value) {
          if (validateURL(value)) {
            callback()
          } else {
            this.$message({
              message: '外链url填写不正确',
              type: 'error'
            })
            callback(null)
          }
        } else {
          callback()
        }
      }
      return {
        postForm: Object.assign({}, defaultForm),
        fetchSuccess: true,
        loading: false,
        userLIstOptions: [],
        // platformsOptions: [
        //   { key: 'a-platform', name: 'a-platform' },
        //   { key: 'b-platform', name: 'b-platform' },
        //   { key: 'c-platform', name: 'c-platform' }
        // ],
        rules: {
          image_uri: [{ validator: validateRequire }],
          title: [{ validator: validateRequire }],
          instruction: [{ validator: validateRequire }],
          source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        }
      }
    },
    computed: {
      contentShortLength() {
        return this.postForm.description.length
      }
    },
    created() {
      if (this.isEdit) {
        this.fetchData()
      } else {
        this.postForm = Object.assign({}, defaultForm)
      }
    },
    methods: {
      fetchData() {
        fetchUI().then(response => {
          this.postForm = response.data
        }).catch(err => {
          this.fetchSuccess = false
          console.log(err)
        })
      },
      submitForm() {
        // this.postForm.display_time = parseInt(this.display_time / 1000)
        console.log(this.postForm)
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true
            createUI(this.postForm).then(response => {
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
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      draftForm() {
        if (this.postForm.instruction.length === 0 || this.postForm.title.length === 0) {
          this.$message({
            message: '请填写必要的标题和内容',
            type: 'warning'
          })
          return
        }
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        this.postForm.status = 'draft'
      }
      // getRemoteUserList(query) {
      //   userSearch(query).then(response => {
      //     if (!response.data.items) return
      //     console.log(response)
      //     this.userLIstOptions = response.data.items.map(v => ({
      //       key: v.name
      //     }))
      //   })
      // }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 0px 15px 15px 15px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 400px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;
          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>

