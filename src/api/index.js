import http from "@/http/request";

// 请求首页数据的接口
export const getData=()=>{
    return http.get('/api/home/getData')
}
//  获取用户列表数据
export const getUser=(params)=>{
    //返回用户列表
   return http.get('/api/user/getUser',params)
}
// 添加用户列表数据
export const addUser=(data)=>{
    return http.post('/api/user/add',data)
}
// 更新用户列表数据
export const editUser=(data)=>{
    return http.post('/api/user/edit',data)
}
//  删除用户列表数据
export const deleteUser=(data)=>{
    return http.post('/api/user/del',data)
}

// 菜单列表数据
export const getMenu=((data)=>{
    return http.post('/api/persion/getMenu',data)
})
