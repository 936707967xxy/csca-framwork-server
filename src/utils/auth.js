//登录的key
const TokenKey = 'Admin-Token'
const AuthKey = "Auth-Key"

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
	//clear
  return sessionStorage.removeItem(TokenKey)
}

export function getAuth() {
  return JSON.parse(sessionStorage.getItem(AuthKey))
}

export function setAuth(obj) {
  return sessionStorage.setItem(AuthKey, JSON.stringify(obj))
}

export function removeAuth() {
	//clear
  return sessionStorage.removeItem(AuthKey)
}
