import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import audit from './modules/audit'
import preaudit from './modules/preaudit'
import contract from './modules/contract'
import tagsView from './modules/tagsView'
//import getters from './getters'

Vue.use(Vuex)

const getters = {
  empName : state => state.user.empName,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  isLogin: state => state.user.isLogin,
  routers : state => state.permission.routers,
  actions : state => state.permission.actions
}

const store = new Vuex.Store({
  modules: {
  	user,
    permission,
    tagsView,
    audit,
    contract,
    preaudit
  },
  getters
})

export default store
