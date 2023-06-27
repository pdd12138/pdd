import axios from "axios";

const http=axios.create({
    // 请求地址
    url:"/api",
    //超时
    timeout:1000,
    headers:{

    }
   

})
// //  请求拦截器
// axios.interceptors.request.use((confing)=>{
//     return confing
// },function(err){
//    return Promise.reject(err)
// }

// )
// // 响应拦截器
// axios.interceptors.response.use((res)=>{
//     return res
// },function(err){
//     return Promise.reject(err)
// }

// )
export default http
