import Mock from "mockjs";
import home from './MockServe/home'
import user from './MockServe/user'
import persion from './MockServe/persion'
// 定义请求拦截
Mock.mock('/api/home/getData','get',home
    // 拦截到请求后的处理

)
//  模拟数据添加请求
Mock.mock('/api/user/add','post',user.createUser

)
Mock.mock('/api/user/edit','post',user.updateUser

)
Mock.mock('/api/user/del','post',user.deleteUser

)
// 响应获取数据请求
Mock.mock(/api\/user\/getUser/,'get',user.getUserList

)
// 菜单接口
Mock.mock(/api\/persion\/getMenu/,"post",persion.getMenu)