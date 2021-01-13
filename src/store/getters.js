const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  visitedViews: state => state.app.visitedViews,

  type: state => state.user.type,
  userId: state => state.user.id,
  username: state => state.user.username,
  phone: state => state.user.phone,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  userInfo: state => state.user,
  orgId: state => state.user.orgId,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  permissions: state => state.permission.permissions,

}
export default getters
