<template>
    <div>
      
        <el-container>
            <el-aside width="atuo">
                <AsideVue/>
            </el-aside>
            <el-container>
                <el-header style="padding: 0;"><Header/></el-header>
                <el-main>
                <Tag/>

                    <!-- 路由出口  -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>
<script>
import { mapState } from "vuex";
import AsideVue from "../components/Aside.vue";
import Header from "@/components/Header.vue";
import Tag from '@/components/Tag.vue'
import store from "@/store";
export default{
    name:'Home',
    data() {
        return {
            
        }
    },
    components:{
        AsideVue,
        Header,
        Tag
    },
}
</script>
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;

  
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

