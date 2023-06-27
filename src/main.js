import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './api/mock'
import Cookies from 'js-cookie';
Vue.use(ElementUI)
Vue.config.productionTip = false
// 路由导航
router.beforeEach((to,from,next)=>{
  // 判断 token 
  const token = Cookies.get('token')
  if(!token&&to.name!=='login'){
    // token 不存在 跳转到 登录
    next({name:"login"})
  }else if(token && to.name==='login'){
    next({name:'HOME'})
  }else{
    next()
  }
})
new Vue({
  render: h => h(App),
  store,
  router,
  created(){

      store.commit('menu/ROUTER',router)

  }
}).$mount('#app')

