import Vue from "vue";
import VueRouter from 'vue-router'
import { mapState } from "vuex";
Vue.use(VueRouter)
// Home 
import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Mall from '@/views/Mall.vue'
import Login from '@/views/Login.vue'
import Video from '@/views/Video.vue'
export default new VueRouter({
    mode:"history",
    routes:[
     
        {
            path:'/',
            redirect:"/Home",
            name:'Main',
            component:Main,
            children:[
                // {
                //     path:"/Home",
                //     name:'HOME',
                //     component:Home,
                  
                    
                // },
                // {
                //     path:'/User',
                //     name:"USER",
                //     component:User,
                  
                // },
                // {
                    
                //     path:'/Mall',
                //     name:'MALL',
                //     component:Mall,
              
                // },
                // {
                //     path:"/Video",
                //     name:"page1",
                //     component:Video
                // }
                
            ],
            
        },
        ,
        {
            path:"/login",
            name:"login",
            component:Login
            
        }
       
    ]
})
