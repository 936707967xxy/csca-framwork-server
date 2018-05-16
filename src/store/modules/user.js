import { loginByNumber, logOut, getUserInfo } from '@/apis/login'
import { getToken,setToken,removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    isLogin : false,
    empName:"admin",
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOGIN: (state,isLogin) => {
      state.isLogin = isLogin
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_EMP_NAME: (state, empName) => {
      state.empName = empName
    }
  },

  actions: {
    // 用户登录
    LoginByNumber({ commit }, userInfo) {
      const username = userInfo.number;
      return new Promise((resolve, reject) => {
        loginByNumber(username, userInfo.pass).then(response => {
          const data = response.data.data;
          setToken(data)
          commit('SET_TOKEN', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          //console.info(JSON.stringify(response.data));
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          commit('SET_ROLES', data.data.roles)
          commit('SET_EMP_NAME', data.data.empName)
          commit('SET_LOGIN', true)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        logOut().then(res => {

        })
        commit('SET_TOKEN', '')
        commit('SET_LOGIN', false)
        removeToken()
        resolve()
      })
      // location.reload();// 为了重新实例化vue-router对象 避免bug
    }
  }
}

export default user
