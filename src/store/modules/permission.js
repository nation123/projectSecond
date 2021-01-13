import {
  constantRoutes,
  permissionsRouter,
  teacherRouter
} from '@/router/index'
import {
  systemCode
} from "_u/config"
import api from "../../api/index";
//
let permissionList = []; //权限
function hasPermission(menus, route) {
  // if (route.hidden) { return true } // 二级隐藏界面暂不过滤
  let x = menus.includes(route.menu) || false
  return x
}

function getMenuList() {
  return new Promise(resolve => {
    let accessedRoutes = [];
    api.c.rscenter.getRscenterApiV1PlatformSystemList().then(res => {
      let navList = res.data;
      navList.map(v => {
        if (v.systemCode === systemCode) {
          //  这里获取到当前系统的id
          let params = {
            platFormId: v.id
          };
          api.c.rscenter
            .getRscenterApiV1SysMenuUserOwn({
              params
            })
            .then(res => {
              // 获取到当前用户该显示的路由


              let menuLists = res.data.map(v => {
                if (v.permission) {
                  permissionList.push(v.permission)
                }
                return v.url;
              })
              let AllRouter = permissionsRouter
              accessedRoutes = filterAsyncRoutes(AllRouter, menuLists)
              resolve(accessedRoutes, permission)
            });
        }
      });
    })
  });
}

export function filterAsyncRoutes(routes, menus) {
  return routes.filter(route => {
    if (route.children) {
      route.children = filterAsyncRoutes(route.children, menus)
      return route.children && route.children.length
    }
    return hasPermission(menus, route)
  })
}

const permission = {
  namespaced: true,
  state: {
    permissions: [], //权限列表
    routers: constantRoutes, //本用户所有的路由,包括了固定的路由和下面的addRouters
    addRouters: [] //本用户的角色赋予的新增的动态路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRoutes.concat(routers) //将固定路由和新增路由进行合并, 成为本用户最终的全部路由信息
    },
    SET_PERMISSION: (state, permissions) => {
      state.permissions = permissions
    }
  },
  actions: {
    generateRoutes({
      commit
    }, userInfo) {
      return new Promise(resolve => {
        let accessedRoutes = permissionsRouter.map(v => v)
        // switch (userInfo.type) {
        //   case 1: //超管
        //     accessedRoutes = permissionsRouter.map(v => v)
        //     break;
        //   case 2:
        //     // 管理员
        //     accessedRoutes = permissionsRouter.map(v => v)
        //     break;
        //   case 3:
        //     let userRouter = ['SalesManager', 'Project', 'Client', 'System', 'Dashboard']
        //     accessedRoutes = filterAsyncRoutes(permissionsRouter, userRouter)
        //     break;
        //     // 销售
        //   case 4:
        //     //todo 其他角色的路由
        //     accessedRoutes = permissionsRouter.map(v => v)
        //   default:
        //     accessedRoutes = teacherRouter.map(v => v)
        //     break;
        // }
        commit('SET_ROUTERS', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
export default permission
