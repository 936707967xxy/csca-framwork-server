import { asyncRouterMap, constantRouterMap } from '../../router/routes'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表  filter 返回数组 ages 中所有元素都大于 18 的元素:
 * @param asyncRouterMap
 * @param cpts 组件后台加载的数据
 */
function filterAsyncRouter(asyncRouterMap, cpts) {
  //console.info("权限：" + JSON.stringify(cpts));
  const accessedRouters = asyncRouterMap.filter(router => {
    //console.info("**** router:" + JSON.stringify(router))//静态的路由
    if (hasPermission(cpts, router)) {
      //console.info("router.children  ++  "   +  JSON.stringify(router.children))
      if(router.children && router.children.length) {
        router.children = filterAsyncRouter(router.children, cpts)
        //console.info("router.children + " + JSON.stringify(router.children))
      }
      return true
    }
    return false
  })
  return accessedRouters
}


function hasPermission(cpts,router){
    const routerName = router.name;
    return cpts.some(function(cpt){return routerName==cpt});
    //for(var i = 0 ; 1 < cpts.length; i++){
    //  const cptName = cpts[i];
    //  if (routerName == cptName) {return true};
    //}
   // return false;
}


const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    actions:[]
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_ACTIONS:(state, actions) => {
      state.actions = actions
    },
    CHECK_PERMISS:(state, resule) => {
      return resule;
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menuRouters } = data.session;
        const { actions } = data.session;
        let accessedRouters = filterAsyncRouter(asyncRouterMap, menuRouters)
        //console.info("权限：" + JSON.stringify(accessedRouters))
        //console.info("权限：" + JSON.stringify(actions))
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_ACTIONS', actions)
        resolve()
      })
    }
  }
}

export default permission
