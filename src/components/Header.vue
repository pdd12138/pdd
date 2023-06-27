<template>
  <div>
      <div class="box">
        <div class="text">
       
          <el-button icon="el-icon-menu" @click="collapse"></el-button>
           
          <div>
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:item.path}" v-for="item in tags" :key="item.path">{{ item.name }}</el-breadcrumb-item>
    
            </el-breadcrumb>
          </div>
           
        </div>
  
          <el-dropdown @command="logout">
            <span class="el-dropdown-link">
             <div> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >个人中心</el-dropdown-item>
              <el-dropdown-item command="a" @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      
        
      </div>
  </div>
</template>
<script>
import Cookie from 'js-cookie';
import { mapMutations,mapState } from 'vuex';
export default{
  name:'Header',
  data() {
    return {
      
    }
  },
  methods:{
    collapse(){
     this.$store.commit('tab/COLLAPSE')
    },
    logout(command){
      console.log(command)
     if(command=='a'){
      Cookie.remove('token')
      Cookie.remove('menu')
      this.$router.push('/login')
     }
    }
 

  },
  computed:{
    ...mapState({
            tags:state=>state.tab.tabList
       })
  }
  ,
  mounted() {
    
  },
}
</script>
<style scoped>
.box{
  width: 100%;
  height: 60px;
  background-color: black;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .text{
    display: flex;
    color: white;
    align-items: center;
  }
</style>