import Vue from "vue";
import vuex from 'vuex'
import CreateState from 'vuex-persistedstate'
Vue.use(vuex)
import tab from "./Header";
import form from'./from'
import menu from './menu'


export default new vuex.Store({
   modules:{
    tab,
    form,
    menu
   },
   plugins:[
      CreateState({
         key:"Menu",
         paths:['menu']
      })
   ]
 
  
})