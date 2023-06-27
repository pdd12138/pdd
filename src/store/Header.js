export default{
    
    namespaced:true,
    actions:{

    },
    mutations:{
        COLLAPSE(state){
            state.collapse=!state.collapse
        },
        TAB(state,value){
            if(value.name!=='home'){
            const index= state.tabList.findIndex(item=>item.name==value.name)
             if(index==-1){
                  state.tabList.push(value)
             }
            }
       
        },
        REMOVE(state,value){
        state.tabList=state.tabList.splice(state.tabList.length-1,1)
        }
    },
    state:{
        //控制菜单的展开与收起
        collapse:false,
        // 面包屑
        tabList:[
            {
                path:'/',
                name:'HOME',
                url:"/home/home", 
            }
        ]
    }

}