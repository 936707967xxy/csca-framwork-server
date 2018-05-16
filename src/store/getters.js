const getters = {
  token: state => state.user.token,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  isLogin: state => state.user.isLogin,
  routers : state => state.permission.routers,
  actions : state => state.permission.actions
}
export default getters
