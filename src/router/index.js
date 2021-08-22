import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/safetyMonitor/area',
    name: '安全监控中心',
    meta: {
      title: '安全监控中心',
      icon: 'dashboard'
    },
    children: [{
        path: '/safetyMonitor/area',
        name: '区域安全监控',
        component: () => import('@/views/safetyMonitor/index'),
        meta: {
          title: '区域安全监控',
          icon: 'dashboard'
        }
      },

      // {
      //   path: '/safetyMonitor/warning',
      //   name: '报警统计分析',
      //   component: () => import('@/views/warning/index'),
      //   meta: {
      //     title: '报警统计分析',
      //     icon: 'dashboard'
      //   }
      // },
      // {
      //   path: '/safetyMonitor/advanceWarning',
      //   name: '预告警管理',
      //   component: () => import('@/views/advanceWarning/index'),
      //   meta: {
      //     title: '预告警管理',
      //     icon: 'dashboard'
      //   }
      // },
    ]
  },

  // {
  //   path: '/energy',
  //   component: Layout,
  //   name: '能源管理中心',
  //   redirect: '/energy/comprehensiveEnergy',
  //   meta: {
  //     title: '预告警管理',
  //     icon: 'el-icon-s-opportunity'
  //   },
  //   children: [{
  //     path: '/energy/comprehensiveEnergy',
  //     name: '综合用能管理',
  //     component: () => import('@/views/comprehensiveEnergy/index'),
  //     meta: {
  //       title: '综合用能管理',
  //       icon: 'el-icon-s-opportunity'
  //     }
  //   },
  //   {
  //     path: '/energy/electricityManagement',
  //     name: '用电管理',
  //     component: () => import('@/views/electricityManagement/index'),
  //     meta: {
  //       title: '用电管理',
  //       icon: 'el-icon-s-opportunity'
  //     }
  //   }
  //   ]
  // },

  // {
  //   path: '/dashboard',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [{
  //     path: 'table',
  //     name: 'Table',
  //     component: () => import('@/views/table/index'),
  //     meta: {
  //       title: 'Table',
  //       icon: 'table'
  //     }
  //   },
  //   {
  //     path: 'tree',
  //     name: 'Tree',
  //     component: () => import('@/views/tree/index'),
  //     meta: {
  //       title: 'Tree',
  //       icon: 'tree'
  //     }
  //   }
  //   ]
  // },

  {
    path: '/eleReport',
    name: '用电量报表',
    meta: {
      title: '用电量报表',
      icon: 'form'
    },
    component: Layout,
    children: [{
        path: 'day',
        name: '用电报表',
        component: () => import('@/views/eleReport/day'),
        meta: {
          title: '日用电量报表',
          icon: 'form'
        }
      },
      {
        path: 'month',
        name: '用电报表',
        component: () => import('@/views/eleReport/month'),
        meta: {
          title: '月用电量报表',
          icon: 'form'
        }
      }
    ]
  },



  {
    path: '/electricityAmountManagement',
    component: Layout,
    redirect: '/electricityAmountManagement/subManagement',
    name: '用电管理',
    meta: {
      title: '用电管理',
      icon: 'form'
    },
    children: [{
      path: 'subManagement',
      component: () => import('@/views/electricityAmountManagement/subManagement/subManagement/index.vue'), // Parent router-view
      name: '分项用电管理',
      meta: {
        title: '分项用能管理',
      },
      children: [{
        path: 'analysis',
        name: '分析',
        children: [{
          path: 'analysis',
          name: '分析',
          component: () => import('@/views/electricityAmountManagement/subManagement/subManagement/index.vue'),
          meta: {
            title: '分析',
          }
        }]
      }]
    }]
  },







  {
    path: '/systemCenter',
    component: Layout,
    redirect: '/systemCenter/powerConfiguration',
    name: '系统配置中心',
    meta: {
      title: '系统配置中心',
      icon: 'form'
    },
    children: [{
        path: 'powerConfiguration',
        component: () => import('@/views/systemCenter/powerConfiguration/powerConfiguration/index.vue'), // Parent router-view
        name: '用电配置',
        meta: {
          title: '用电配置',
        },
        children: [{
          path: 'powerConfiguration',
          name: '用电流向模型配置',
          children: [{
            path: 'powerConfiguration',
            name: '用电流向模型配置',
            component: () => import('@/views/systemCenter/powerConfiguration/powerConfiguration/index.vue'),
            meta: {
              title: '用电流向模型配置',
            }
          }]
        }]
      },
      {
        path: '/safetyMonitor/electricSafety',
        name: '用电监测点配置',
        component: () => import('@/views/electricSafety/index'),
        meta: {
          title: '用电监测点配置',
          icon: 'dashboard'
        }
      },
    ]
  },

  {
    path: '管理页面',
    component: Layout,
    children: [{
      path: 'http://123.57.51.103:7078/gateway/index.html',
      meta: {
        title: '网关管理系统',
        icon: 'link'
      }
    }]
  },

  {
    path: '管理系统',
    component: Layout,
    children: [{
      path: 'http://123.57.51.103:7077/device/view/index.html',
      meta: {
        title: '物联网管理系统',
        icon: 'link'
      }
    }]
  },




  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     name: 'Form',
  //     component: () => import('@/views/form/index'),
  //     meta: {
  //       title: 'Form',
  //       icon: 'form'
  //     }
  //   }]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [{
  //     path: 'menu1',
  //     component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //     name: 'Menu1',
  //     meta: {
  //       title: 'Menu1'
  //     },
  //     children: [{
  //       path: 'menu1-1',
  //       component: () => import('@/views/nested/menu1/menu1-1'),
  //       name: 'Menu1-1',
  //       meta: {
  //         title: 'Menu1-1'
  //       }
  //     },
  //     {
  //       path: 'menu1-2',
  //       component: () => import('@/views/nested/menu1/menu1-2'),
  //       name: 'Menu1-2',
  //       meta: {
  //         title: 'Menu1-2'
  //       },
  //       children: [{
  //         path: 'menu1-2-1',
  //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //         name: 'Menu1-2-1',
  //         meta: {
  //           title: 'Menu1-2-1'
  //         }
  //       },
  //       {
  //         path: 'menu1-2-2',
  //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //         name: 'Menu1-2-2',
  //         meta: {
  //           title: 'Menu1-2-2'
  //         }
  //       }
  //       ]
  //     },
  //     {
  //       path: 'menu1-3',
  //       component: () => import('@/views/nested/menu1/menu1-3'),
  //       name: 'Menu1-3',
  //       meta: {
  //         title: 'Menu1-3'
  //       }
  //     }
  //     ]
  //   },
  //   {
  //     path: 'menu2',
  //     component: () => import('@/views/nested/menu2/index'),
  //     name: 'Menu2',
  //     meta: {
  //       title: 'menu2'
  //     }
  //   }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [{
  //     path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //     meta: {
  //       title: 'External Link',
  //       icon: 'link'
  //     }
  //   }]
  // },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
