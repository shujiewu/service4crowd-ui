import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/process',
    component: Layout,
    name: 'process',
    meta: { title: 'process', icon: 'process' },
    children: [
      {
        path: 'models',
        component: () => import('@/views/process/model/index'),
        name: 'manageModel',
        meta: { title: 'manageModel' }
      },
      {
        path: 'templates',
        name: 'templateModels',
        component: () => import('@/views/process/template/index'),
        meta: { title: 'templateModels' }
      },
      {
        path: 'view/HumanResult/:serviceName/:id',
        name: 'taskResult',
        component: () => import('@/views/process/result/humanResult'),
        meta: { title: 'taskResult' },
        hidden: true
      },
      {
        path: 'view/simResult/:id',
        name: 'simResult',
        component: () => import('@/views/process/simulator/index'),
        meta: { title: 'simulatorResult' },
        hidden: true
      },
      {
        path: 'view/monitor/:id',
        name: 'monitor',
        component: () => import('@/views/process/view/index'),
        meta: { title: 'monitorModel', noCache: true },
        hidden: true
      },
      {
        path: 'view/:serviceName/:id',
        name: 'AggregateReport',
        component: () => import('@/views/process/result/aggregate'),
        meta: { title: 'AggregateReport', noCache: false },
        hidden: true
      },
      {
        path: 'view/dataStat/:serviceName/:id',
        name: 'AnswerDataStat',
        component: () => import('@/views/process/result/dataStat'),
        meta: { title: 'AnswerDataStat', noCache: false },
        hidden: true
      },
      {
        path: 'result/:serviceName/:id',
        name: 'mergeResult',
        component: () => import('@/views/process/result/custom'),
        meta: { title: 'dataStat', noCache: false },
        hidden: true
      },
      {
        path: 'view/compare/:serviceName/:id',
        name: 'AggregateCompare',
        component: () => import('@/views/process/result/aggregateCompare'),
        meta: { title: 'AggregateCompare', noCache: false },
        hidden: true
      }
      // {
      //   path: 'run',
      //   component: () => import('@/views/table/ProcessRun'),
      //   name: '运行的流程',
      //   meta: { title: '运行的流程' }
      // }
    ]
  },
  {
    path: '/taskUI',
    component: Layout,
    name: 'taskUI',
    meta: { title: 'manageUI', icon: 'UI2' },
    children: [
      // {
      //   path: 'create',
      //   name: 'new',
      //   component: () => import('@/views/process/create/index'),
      //   meta: { title: 'createApp' }
      // },
      {
        path: 'create',
        component: () => import('@/views/taskUI/create'),
        name: 'create',
        meta: { title: 'createUI' }
      },
      {
        path: 'preview/:id',
        component: () => import('@/views/taskUI/preview'),
        name: 'create',
        meta: { title: 'previewUI' },
        hidden: true
      },
      {
        path: 'ui',
        name: 'def',
        component: () => import('@/views/taskUI/index'),
        meta: { title: 'UIList' }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import('@/views/taskUI/edit'),
        meta: { title: 'modifyUI' },
        hidden: true
      }
      // {
      //   path: 'run',
      //   component: () => import('@/views/table/ProcessRun'),
      //   name: '运行的流程',
      //   meta: { title: '运行的流程' }
      // }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'form', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/data',
    component: Layout,
    name: 'data',
    meta: { title: 'manageData', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'dataList',
        component: () => import('@/views/datamanage/index'),
        meta: { title: 'dataList', icon: 'data' }
      }
    ]
  },

  // {
  //   path: '/service',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'service',
  //       component: () => import('@/views/process/mergeResult/index'),
  //       meta: { title: 'service', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/resultmangage',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'resultmangage',
  //       component: () => import('@/views/datamanage/index'),
  //       meta: { title: 'manageResult', icon: 'stat' }
  //     }
  //   ]
  // },
  {
    path: '/service',
    component: Layout,
    name: 'service',
    meta: { title: 'serviceManage', icon: 'microservice' },
    children: [
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/service/create'),
        meta: { title: 'serviceCreate' }
        // hidden: true
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/service/register'),
        meta: { title: 'serviceRegistry' }
        // hidden: true
      },
      {
        path: 'deploy/:type/:serviceName/:version',
        name: 'deploy',
        component: () => import('@/views/service/deploy'),
        meta: { title: 'serviceDeploy' },
        hidden: true
      },
      {
        path: 'runtime',
        name: 'runtime',
        component: () => import('@/views/service/runtime'),
        meta: { title: 'serviceMonitor' }
        // hidden: true
      },
      {
        path: 'mlflow/:experimentsId/:runId',
        name: 'mlflow',
        component: () => import('@/views/service/runDetail/mlflow'),
        meta: { title: 'mlflow' },
        hidden: true
      },
      {
        path: 'mlflow/:experimentsId',
        name: 'mlflowExperiment',
        component: () => import('@/views/service/runDetail/mlflow'),
        meta: { title: 'mlflowExperiment' },
        hidden: true
      },
      {
        path: 'update/:type/:serviceName/:version',
        name: 'update',
        component: () => import('@/views/service/update'),
        meta: { title: 'serviceUpdate' },
        hidden: true
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    name: 'setting',
    meta: { title: 'setting', icon: 'setting' },
    children: [
      {
        path: 'index',
        name: 'setting',
        component: () => import('@/views/setting/index'),
        meta: { title: 'setting', icon: 'setting' }
      },
      {
        path: 'modify',
        name: 'modify',
        component: () => import('@/views/setting/infoModify'),
        meta: { title: 'modify', icon: 'modify' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

