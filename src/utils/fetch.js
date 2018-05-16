import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api的base_url
  //timeout: 10000                 // 请求超时时间
})
//service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Token'] = getToken();
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  // response => response,
  response => {
    const res = response.data;
    if (res.code === 4004) {
      Message({
        message: '登录超时!',
        type: 'error',
        duration: 5 * 1000
      });

      store.dispatch('FedLogOut').then(() => {
        location.reload();// 为了重新实例化vue-router对象 避免bug
      });
      return Promise.reject('error');
    }else if(res.code === 4005){
      Message({
        message: '无权操作!',
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 10 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
