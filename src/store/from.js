export default{
    namespaced:true,
    state:{
        dialogVisible: false
    },
    mutations:{
        DISAB(state,value){
            state.dialogVisible=true
        },
        CLOSE(state,value){
            state.dialogVisible=false
        }
    }
}
