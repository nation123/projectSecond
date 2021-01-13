import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken,
  removeToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/', '/Protal', '/ProtalList', '/LastCourse', '/CourseDetail',
  '/CourseStudy', '/ActivityList', '/ActivityDetail', '/FamousTeacherList'
] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  // NProgress.start()
  // NProgress.done()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    let addRouters = store.getters.addRouters;
    if (addRouters && addRouters.length > 0) {
      if (to.path === '/home') {
        next(addRouters[0].path)
      } else {
        next()
      }
    } else {
      try {
        const {roles} = await store.dispatch('user/getInfo')
        const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.userInfo) || []
        if (accessRoutes.length > 0) {
          // accessRoutes.push({path: '*', redirect: '/404', hidden: true})//追加在最后
          router.addRoutes(accessRoutes)
          if (to.path === '/home') {
            next(accessRoutes[0].path)
          } else {
            next({ ...to, replace: true })
          }
        } else {
          next();
        }
      } catch (error) {
        console.log(error);
        await store.dispatch('user/logout')
        Message.error(error || 'Has Error')
        next(`/`)
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/`)
    }
  }



})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
