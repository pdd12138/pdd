<template>
    <div>
        <el-tag
        v-for="(tag,index) in tags"
        :key="tag.name"
        :closable="tag.name!=='HOME'"
        type="success"
        @close="close(index)"
        :effect="$route.name==tag.name?'dark':'plain'"
        @click="add(tag.name)"
        >
        {{tag.name}}
        </el-tag>

    </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
    name:"Tage",
    computed:{
        ...mapState({
            tags:state=>state.tab.tabList
       })
    },
    mounted() {
        
    },
    methods:{
        // 移除tag 标签
        close(i){
            this.tags.splice(i,1)
        },
        // tag 路由跳转
        add(i){
            this.$router.push({name:i})
        }
        
    }

}
</script>