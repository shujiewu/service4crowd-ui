<!--<script src="../../../../../vue-element-admin-master/config/index.js"></script>-->
<template>
    <el-menu class="navbar" mode="horizontal">

      <a href="" class="logo-mini" v-if="isCollapse">
        <span><b>C</b></span>
      </a>
      <a href="" class="logo" v-if="!isCollapse">
        <span><b>Service4Crowd</b></span>
      </a>
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <div class="right-menu">
        <lang-select class="international right-menu-item"></lang-select>
        <el-dropdown class="avatar-container right-menu-item user-image" trigger="click">
          <div class="avatar-wrapper">
            <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
            <img class="user-avatar" src="../../../assets/user-orange.png">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>
                {{$t('navbar.dashboard')}}
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item>
              {{$t('navbar.setting')}}
            </el-dropdown-item>

            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'
// import '@/styles/variables.scss'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
      // this.isCollapse = !this.isCollapse
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/variables.scss';
  .navbar {
    position: fixed;
    z-index: 1000;
    height: 50px;
    width: 100%;
    line-height: 50px;
    background-color:$navBg;
    border-radius: 0px !important;
    .logo {
      -webkit-transition: width 0.2s ease-in-out;
      -o-transition: width 0.2s ease-in-out;
      transition: width 0.2s ease-in-out;
      float: left;
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      width: 180px;
      color: #fff;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      padding: 0 15px;
      font-weight: 300;
      /*overflow: hidden;*/
      z-index: 100;
      display: inline-block;
    }
    .logo-mini {
      -webkit-transition: width 0.3s ease-in-out;
      -o-transition: width 0.3s ease-in-out;
      transition: width 0.3s ease-in-out;
      float: left;
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      width: 36px;
      color: #fff;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      padding: 0 15px;
      font-weight: 300;
      /*overflow: hidden;*/
      z-index: 100;
      display: inline-block;
    }
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container{
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international{
        vertical-align: top;
        color: #ffffff;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 10px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 0px;
          position: relative;
          .user-avatar {
            width: 30px;
            height: 30px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

