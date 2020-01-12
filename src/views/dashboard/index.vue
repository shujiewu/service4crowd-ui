<template>
    <!--<div class="dashboard-text">name:{{name}}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
    <!--<section class="content">-->
      <!--&lt;!&ndash; Small boxes (Stat box) &ndash;&gt;-->
      <!--<div class="row">-->
        <!--<div class="col-lg-3 col-xs-6">-->
          <!--&lt;!&ndash; small box &ndash;&gt;-->
          <!--<div class="small-box bg-aqua">-->
            <!--<div class="inner">-->
              <!--<h3>150</h3>-->

              <!--<p>New Orders</p>-->
            <!--</div>-->
            <!--<div class="icon">-->
              <!--<i class="ion ion-bag"></i>-->
            <!--</div>-->
            <!--<a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>-->
          <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; ./col &ndash;&gt;-->
        <!--<div class="col-lg-3 col-xs-6">-->
          <!--&lt;!&ndash; small box &ndash;&gt;-->
          <!--<div class="small-box bg-green">-->
            <!--<div class="inner">-->
              <!--<h3>53<sup style="font-size: 20px">%</sup></h3>-->

              <!--<p>Bounce Rate</p>-->
            <!--</div>-->
            <!--<div class="icon">-->
              <!--<i class="ion ion-stats-bars"></i>-->
            <!--</div>-->
            <!--<a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>-->
          <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; ./col &ndash;&gt;-->
        <!--<div class="col-lg-3 col-xs-6">-->
          <!--&lt;!&ndash; small box &ndash;&gt;-->
          <!--<div class="small-box bg-yellow">-->
            <!--<div class="inner">-->
              <!--<h3>44</h3>-->

              <!--<p>User Registrations</p>-->
            <!--</div>-->
            <!--<div class="icon">-->
              <!--<i class="ion ion-person-add"></i>-->
            <!--</div>-->
            <!--<a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>-->
          <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; ./col &ndash;&gt;-->
        <!--<div class="col-lg-3 col-xs-6">-->
          <!--&lt;!&ndash; small box &ndash;&gt;-->
          <!--<div class="small-box bg-red">-->
            <!--<div class="inner">-->
              <!--<h3>65</h3>-->

              <!--<p>Unique Visitors</p>-->
            <!--</div>-->
            <!--<div class="icon">-->
              <!--<i class="ion ion-pie-graph"></i>-->
            <!--</div>-->
            <!--<a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>-->
          <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; ./col &ndash;&gt;-->
      <!--</div>-->
    <!--</section>-->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
