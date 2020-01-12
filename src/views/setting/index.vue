<template>
  <div class="app-container">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人信息" name="first">
        <!--<user-info></user-info>-->
        <user-info></user-info>
      </el-tab-pane>
      <el-tab-pane label="密钥管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="操作日志" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>

</template>


<script>
  import UserInfo from './components/UserInfo'
  export default {
    components: {
      'user-info': UserInfo
    },
    name: 'setting',
    data() {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
