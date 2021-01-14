// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store' //vuex使用
Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})

// 路由拦截 防止直接输入URL进入页面
// router.beforeEach((to,from,next)=>{//从cookie中取值并给vux中的token赋值
//   store.commit('setToken',sessionStorage.getItem('identity'))　
//   if(store.state.token){//如果vux有值就将登录状态改成1 表示已登录
//     store.commit('changIsSignIn',1)
//   }　
//   //判断是否为true，如果为true就是要登录，去判断token是否存在。存在就执行，不存在就跳转登录页面
//   if(to.meta.requireAuth){
//     if(store.state.token){
//       next()
//     }else{
//       next({path:'/'})
//     }
//   }else{
//     next()
//   }
// })
