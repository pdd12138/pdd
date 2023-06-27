<template>
    <div>
     
        <div class="box">
           
        <el-menu
        :router='true'
        default-active="Home"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        >
     
        <el-menu-item>
            <span slot="title">后台管理系统</span>
        </el-menu-item>
        <hr>
        <el-menu-item v-for="item in menu" :index="item.name" :key="item.path">
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!-- <el-submenu index="All">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span>其他</span>
            </template>
            <el-menu-item-group>
            <el-menu-item index="Mall"  @click="add()">选项1</el-menu-item>
            </el-menu-item-group>
        </el-submenu> -->
        </el-menu>
    </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex';
export default{
    name:'Aside',
    data(){
        return{
        
        }
    },
    methods: {
        add(){
            const item= this.$route
            console.log(item.meta)
            this.$store.commit('tab/TAB',item)
            console.log(this.$store.state.tab.tabList)
        }
    },
    components:{    
    
    },
    computed:{
       ...mapState('tab',['collapse']),
       ...mapState({
            tags:state=>state.tab.tabList,
       }),
       menu(){
        return JSON.parse(Cookies.get('menu')) || this.$store.state.menu.menu
    },
       
    },
  
    mounted(){

        
    }
    
    
}
</script>
<style scoped>
.box{
    width: 100%;
   
}
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100vh;
    width: 200px;
    min-height:400px;
    
  }
  .el-menu-vertical-demo{
    height: 100vh;
    border: 0;

  }

</style>