import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'

export let constantRoutes = [{
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  //todo 新增页面

]

export const teacherRouter = []
export const commonRouter = [
  //公用页面

]
export const permissionsRouter = [
    //管理员
    {
      name: 'dataManagerList',
      path: '/dataManager',
      component: Layout,
      redirect: '/dataManager',
      menu: 'dataManager',
      meta: {
        title: '会员管理',
        icon: 'menu_tongji',

      },
      children: [{
          path: '',
          name: 'dataManager',
          menu: 'dataManager',
          component: () => import('@/views/Admin/dataManager/index'),
          meta: {
            title: '会员管理',
            keepAlive: true,
            icon: 'menu_tongji',

          }
        },
        {
          path: 'statict',
          name: 'statict',
          menu: 'dataManager',
          hidden: true,
          component: () => import('@/views/Admin/dataManager/statict'),
          meta: {
            title: '会员管理',
            icon: 'menu_tongji',

          }
        }
      ]
    },
    {
      name: 'vipList',
      path: '/vip',
      component: Layout,
      redirect: '/vip',
      menu: 'vip',

      children: [{
        path: '',
        name: 'vip',
        menu: 'vip',
        component: () => import('@/views/Admin/vip/index'),
        meta: {
          title: '音频管理',
          keepAlive: true,
          icon: 'menu_tongji',

        }
      }]
    },
    {
      name: 'messageList',
      path: '/message',
      component: Layout,
      redirect: '/message',
      menu: 'message',

      children: [{
        path: '',
        name: 'message',
        menu: 'message',
        component: () => import('@/views/Admin/message/index'),
        meta: {
          title: '消息管理',
          keepAlive: true,
          icon: 'menu_tongji',

        }
      }]
    },

  ]
  .concat(teacherRouter) //todo
  .concat(commonRouter)
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
