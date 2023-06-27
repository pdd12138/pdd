import Cookies from "js-cookie"

export default{
    namespaced:true,
    actions:{},
    mutations:{
        MENU(state,val){
            state.menu=val
            Cookies.set('menu',JSON.stringify(val))
        },
        // 动态注册路由
        ROUTER(state,router){
            if(!Cookies.get('menu'))return
            const menu=JSON.parse(Cookies.get('menu'))
            state.menu=menu
            let menuArry=[]
            menu.forEach(item => {
                if(item.children){
                    item.children=item.children.map(item=>{
                      
                        item.component= () => import(`../views/${item.url}`)
                        return item
                      
                    })
                    menuArry.push(...item.children)
                }else{
                 
                    item.component=() => import(`../views/${item.url}`)
                 
                    menuArry.push(item)
                }
             
            });

                menuArry.forEach(item=>{
                    router.addRoute('Main',item)
                })
           
        }
    },
    state:{
        menu:[]
    }
}