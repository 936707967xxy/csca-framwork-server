// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/routes'
import 'font-awesome/css/font-awesome.min.css'
import { getToken,removeToken} from '@/utils/auth'


Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  //NProgress.start();  sessionStorage.setItem('token', obj.data);
  if (to.path === '/login') {
    store.commit('SET_LOGIN', false);
    removeToken();
  }

  let token = getToken();
  if ((null != token && undefined != token) && to.path != '/login') {//token 不为空 加载用户的数据
    if (!store.getters.isLogin) {
      store.dispatch('GetUserInfo').then(res => { // 拉取user_info
            const session = res.data.data;
            store.dispatch('GenerateRoutes', { session }).then(() => { // 生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to }) // hack方法 确保addRoutes已完成
            })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
    }else{
      next()
    }
  } else {
    if (to.path === '/login'){ // 在免登录白名单，直接进入
      next()
    } else {
      next('/login');
    }
  }
})

function checkPermiss(key){
  const actions = store.getters.actions;
  return actions.some(function(currentValue){return currentValue==key});
}

Vue.config.productionTip = false
new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

Vue.prototype.checkAction = function (action){
  const result = checkPermiss(action);
  return result;
}
