import fetch from '../utils/fetch'

export function loginByNumber(username, password) {
  var qs = require('qs');
  const data = {
    loginName:username,
    passWord:password
  }
  return fetch({
    url: '/sys/emp/login.do',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function logOut() {
  return fetch({
    url: '/sys/emp/loginout.do',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return fetch({
    url: '/sys/emp/menu.do',
    method: 'post'
  })
}
