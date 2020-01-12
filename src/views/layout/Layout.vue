<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <navbar></navbar>
    <sidebar class="sidebar-container"></sidebar>
    <div class="tag-container">
      <tags-view></tags-view>
    </div>
    <div class="main-container">
      <app-main ></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, TagsView, AppMain } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    TagsView,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../src/styles/mixin.scss";
@import "../../../src/styles/variables.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
